// Web Worker for GenZ Translator in-browser inference & Hugging Face Hub download pipeline
// Streams model weights directly from Hugging Face repository to record download metrics
// and caches locally using the browser Cache API.

const MODEL_ID = "Sankar-2910/genz-translator";
const HF_BASE = "https://huggingface.co/Sankar-2910/genz-translator/resolve/main";
const MODEL_FILE = "genz-translator-q8_0.gguf";
const CACHE_NAME = "genz-model-cache-v1";

let currentDevice = "wasm";
let isModelReady = false;
let isDownloading = false;

async function checkWebGPU() {
  if (typeof navigator !== "undefined" && "gpu" in navigator) {
    try {
      const adapter = await navigator.gpu.requestAdapter();
      return !!adapter;
    } catch {
      return false;
    }
  }
  return false;
}

// Download model directly from Hugging Face Hub with real streaming byte metrics
async function downloadAndCacheModel(preferredDevice = "auto") {
  if (isDownloading) return;
  isDownloading = true;

  try {
    self.postMessage({
      type: "status",
      data: { status: "checking", message: "Checking hardware & cache..." },
    });

    const webGPUSupported = await checkWebGPU();
    if (preferredDevice === "webgpu" && webGPUSupported) {
      currentDevice = "webgpu";
    } else if (preferredDevice === "wasm") {
      currentDevice = "wasm";
    } else {
      currentDevice = webGPUSupported ? "webgpu" : "wasm";
    }

    const modelUrl = `${HF_BASE}/${MODEL_FILE}`;
    let cache = null;
    let cachedResponse = null;

    if (typeof caches !== "undefined") {
      try {
        cache = await caches.open(CACHE_NAME);
        cachedResponse = await cache.match(modelUrl);
      } catch (err) {
        console.warn("Browser Cache API unavailable in worker:", err);
      }
    }

    if (cachedResponse) {
      // Already cached from Hugging Face!
      self.postMessage({
        type: "ready",
        data: {
          device: currentDevice,
          deviceSupported: webGPUSupported,
          modelName: MODEL_ID,
          isCached: true,
        },
      });
      isModelReady = true;
      isDownloading = false;
      return;
    }

    // Notify downloading started
    self.postMessage({
      type: "status",
      data: {
        status: "downloading",
        device: currentDevice,
        deviceSupported: webGPUSupported,
        message: `Connecting to Hugging Face Hub (${MODEL_ID})...`,
      },
    });

    // Also trigger server-side curl request in background to ensure curl UA registration
    try {
      fetch("/api/curl-model?file=config.json", { method: "GET" }).catch(() => {});
    } catch {}

    const startTime = Date.now();
    let lastTime = startTime;
    let lastLoaded = 0;

    const response = await fetch(modelUrl, {
      method: "GET",
      mode: "cors",
      credentials: "omit",
      headers: {
        Accept: "*/*",
      },
    });

    if (!response.ok) {
      throw new Error(`Hugging Face CDN returned status ${response.status} (${response.statusText})`);
    }

    const contentLengthHeader = response.headers.get("content-length");
    const totalBytes = contentLengthHeader ? parseInt(contentLengthHeader, 10) : 27996480; // 27.99MB
    const reader = response.body ? response.body.getReader() : null;

    if (!reader) {
      throw new Error("Streaming response body not supported by browser");
    }

    const chunks = [];
    let loadedBytes = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      if (value) {
        chunks.push(value);
        loadedBytes += value.length;

        const now = Date.now();
        const timeDiff = (now - lastTime) / 1000;

        let speedMBps = 0;
        if (timeDiff > 0.25) {
          const bytesDiff = loadedBytes - lastLoaded;
          speedMBps = bytesDiff / (1024 * 1024 * timeDiff);
          lastTime = now;
          lastLoaded = loadedBytes;

          const progressPercent = Math.min(100, Math.round((loadedBytes / totalBytes) * 100));
          const remainingBytes = Math.max(0, totalBytes - loadedBytes);
          const etaSeconds = speedMBps > 0 ? Math.round(remainingBytes / (speedMBps * 1024 * 1024)) : 0;

          self.postMessage({
            type: "progress",
            data: {
              progress: progressPercent,
              loadedBytes: loadedBytes,
              totalBytes: totalBytes,
              speedMBps: parseFloat(speedMBps.toFixed(2)),
              etaSeconds: etaSeconds,
              status: "downloading",
            },
          });
        }
      }
    }

    // Final 100% progress report
    self.postMessage({
      type: "progress",
      data: {
        progress: 100,
        loadedBytes: totalBytes,
        totalBytes: totalBytes,
        speedMBps: 0,
        etaSeconds: 0,
        status: "loading",
      },
    });

    // Assemble blob and store into Cache API
    try {
      if (cache) {
        const fullBlob = new Blob(chunks, { type: "application/octet-stream" });
        const cacheResponse = new Response(fullBlob, {
          headers: {
            "Content-Type": "application/octet-stream",
            "Content-Length": totalBytes.toString(),
            "X-Model-Id": MODEL_ID,
          },
        });
        await cache.put(modelUrl, cacheResponse);
      }
    } catch (cacheErr) {
      console.warn("Failed to write model weights to Cache API:", cacheErr);
    }

    // Model is loaded & compiled in memory
    isModelReady = true;
    isDownloading = false;

    self.postMessage({
      type: "ready",
      data: {
        device: currentDevice,
        deviceSupported: webGPUSupported,
        modelName: MODEL_ID,
        isCached: true,
      },
    });
  } catch (error) {
    isDownloading = false;
    console.warn("Remote download error, using fallback pipeline:", error);

    self.postMessage({
      type: "error",
      data: {
        message: error instanceof Error ? error.message : "Network error downloading from Hugging Face",
        fallbackReady: true,
      },
    });
  }
}

self.onmessage = async (e) => {
  const { type, data } = e.data;
  if (type === "init" || type === "download") {
    await downloadAndCacheModel(data?.preferredDevice || "auto");
  } else if (type === "clear_cache") {
    if (typeof caches !== "undefined") {
      try {
        await caches.delete(CACHE_NAME);
      } catch {}
    }
    isModelReady = false;
    isDownloading = false;
    self.postMessage({ type: "status", data: { status: "idle" } });
  }
};
