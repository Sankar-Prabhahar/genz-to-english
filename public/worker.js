// Web Worker for GenZ Translator in-browser inference
// Using Transformers.js v3 with WebGPU and WASM fallback

let generator = null;
let currentDevice = "wasm";
let isModelReady = false;

const MODEL_ID = "Sankar-2910/genz-translator";

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

async function loadPipeline(preferredDevice = "auto") {
  try {
    self.postMessage({
      type: "status",
      data: { status: "checking", message: "Detecting GPU capabilities..." }
    });

    const webGPUSupported = await checkWebGPU();
    let targetDevice = "wasm";
    if (preferredDevice === "webgpu" && webGPUSupported) {
      targetDevice = "webgpu";
    } else if (preferredDevice === "wasm") {
      targetDevice = "wasm";
    } else {
      targetDevice = webGPUSupported ? "webgpu" : "wasm";
    }
    currentDevice = targetDevice;

    self.postMessage({
      type: "status",
      data: {
        status: "downloading",
        device: targetDevice,
        deviceSupported: webGPUSupported,
        message: `Initializing ${targetDevice.toUpperCase()} inference engine...`
      }
    });

    // Dynamically import Transformers.js in worker module
    const { pipeline, env } = await import(
      "https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.3.3"
    );

    // Configure caching and environment
    env.allowLocalModels = true;
    env.useBrowserCache = true;

    // Load pipeline with progress callback
    let lastTime = Date.now();
    let lastLoaded = 0;

    generator = await pipeline("text-generation", MODEL_ID, {
      device: targetDevice,
      dtype: targetDevice === "webgpu" ? "q8" : "q8",
      progress_callback: (data) => {
        if (data.status === "progress") {
          const now = Date.now();
          const timeDiff = (now - lastTime) / 1000;
          let speedMBps = 0;
          if (timeDiff > 0.3) {
            const bytesDiff = (data.loaded || 0) - lastLoaded;
            speedMBps = bytesDiff / (1024 * 1024 * timeDiff);
            lastTime = now;
            lastLoaded = data.loaded || 0;
          }

          const total = data.total || 50 * 1024 * 1024;
          const loaded = data.loaded || 0;
          const progressPercent = data.progress || (total > 0 ? (loaded / total) * 100 : 0);
          const remainingBytes = Math.max(0, total - loaded);
          const etaSeconds = speedMBps > 0 ? Math.round(remainingBytes / (speedMBps * 1024 * 1024)) : 0;

          self.postMessage({
            type: "progress",
            data: {
              file: data.file,
              progress: Math.min(100, Math.round(progressPercent)),
              loadedBytes: loaded,
              totalBytes: total,
              speedMBps: parseFloat(speedMBps.toFixed(2)),
              etaSeconds: etaSeconds,
              status: "downloading"
            }
          });
        } else if (data.status === "ready" || data.status === "done") {
          self.postMessage({
            type: "progress",
            data: {
              file: data.file,
              progress: 100,
              status: "loading"
            }
          });
        }
      }
    });

    isModelReady = true;

    self.postMessage({
      type: "ready",
      data: {
        device: targetDevice,
        deviceSupported: webGPUSupported,
        modelName: MODEL_ID
      }
    });
  } catch (error) {
    console.warn("Could not load remote ONNX model directly from HuggingFace:", error);
    // If remote ONNX is not yet pushed to Hugging Face or user is offline,
    // notify main thread to use local high-precision hybrid engine
    self.postMessage({
      type: "error",
      data: {
        message: error.message || "Model weights need ONNX conversion or network access",
        fallbackReady: true
      }
    });
  }
}

async function runTranslation(id, text) {
  const startTime = performance.now();
  const prompt = `<s><|instruction|>Translate the following Gen Z slang sentence into clear, standard English.<|input|>${text}<|response|>`;

  try {
    if (!generator) {
      throw new Error("Model pipeline not initialized");
    }

    const output = await generator(prompt, {
      max_new_tokens: 128,
      temperature: 0,
      top_p: 1,
      repetition_penalty: 1,
      return_full_text: false,
    });

    const elapsed = Math.round(performance.now() - startTime);
    let generatedText = "";
    if (Array.isArray(output) && output[0]?.generated_text) {
      generatedText = output[0].generated_text;
    } else if (typeof output === "string") {
      generatedText = output;
    }

    // Clean up template tokens and artifacts
    let cleanText = generatedText
      .replace(/<\|response\|>/g, "")
      .replace(/<\/s>/g, "")
      .replace(/<eos>/g, "")
      .replace(/<pad>/g, "")
      .trim();

    self.postMessage({
      type: "translation_result",
      data: {
        id,
        output: cleanText,
        latencyMs: elapsed,
        backend: currentDevice
      }
    });
  } catch (err) {
    self.postMessage({
      type: "translation_error",
      data: {
        id,
        error: err.message || "Inference error"
      }
    });
  }
}

self.onmessage = async (e) => {
  const { type, data } = e.data;
  if (type === "init") {
    await loadPipeline(data?.preferredDevice || "auto");
  } else if (type === "translate") {
    await runTranslation(data.id, data.text);
  }
};
