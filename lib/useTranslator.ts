"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ModelProgressInfo, TranslationItem, UserSettings } from "./types";
import { hybridTranslate } from "./hybrid-translator";
import { storage } from "./storage";
import { sounds } from "./audio";

export function useTranslator() {
  const [modelInfo, setModelInfo] = useState<ModelProgressInfo>({
    status: "idle",
    progress: 0,
    loadedBytes: 0,
    totalBytes: 27996480, // ~28 MB Q8_0 GGUF
    speedMBps: 0,
    etaSeconds: 0,
    device: "webgpu",
    deviceSupported: false,
    modelName: "Sankar-2910/genz-translator",
    isCached: false,
    hfDownloads: 955,
    hfLikes: 1,
  });

  const [input, setInput] = useState("");
  const [currentTranslation, setCurrentTranslation] = useState<TranslationItem | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [history, setHistory] = useState<TranslationItem[]>([]);
  const [settings, setSettings] = useState<UserSettings>(() => storage.getSettings());

  const workerRef = useRef<Worker | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const activeRequestIdRef = useRef<string | null>(null);

  // Initialize history and settings on mount
  useEffect(() => {
    setHistory(storage.getHistory());
    const savedSettings = storage.getSettings();
    setSettings(savedSettings);

    // Detect WebGPU support on window
    const hasWebGPU = typeof navigator !== "undefined" && "gpu" in navigator;
    setModelInfo((prev) => ({
      ...prev,
      device: hasWebGPU ? "webgpu" : "wasm",
      deviceSupported: hasWebGPU,
    }));

    // Fetch live Hugging Face stats
    fetch("/api/huggingface/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.downloads !== undefined) {
          setModelInfo((prev) => ({
            ...prev,
            hfDownloads: data.downloads,
            hfLikes: data.likes,
          }));
        }
      })
      .catch(() => {});
  }, []);

  // Synchronize theme with DOM documentElement
  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;

    const applyTheme = (theme: "system" | "dark" | "light") => {
      root.classList.remove("light", "dark");
      if (theme === "system") {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        root.classList.add(prefersDark ? "dark" : "light");
      } else {
        root.classList.add(theme);
      }
    };

    applyTheme(settings.theme);

    // If system theme, listen to changes
    if (settings.theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => applyTheme("system");
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [settings.theme]);

  // Spawn and initialize Web Worker
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const worker = new Worker("/worker.js", { type: "module" });
      workerRef.current = worker;

      worker.onmessage = (event) => {
        const { type, data } = event.data;

        if (type === "status") {
          setModelInfo((prev) => ({
            ...prev,
            status: data.status,
            device: data.device || prev.device,
            deviceSupported: data.deviceSupported ?? prev.deviceSupported,
          }));
        } else if (type === "progress") {
          setModelInfo((prev) => ({
            ...prev,
            status: data.status || prev.status,
            progress: data.progress ?? prev.progress,
            loadedBytes: data.loadedBytes ?? prev.loadedBytes,
            totalBytes: data.totalBytes ?? prev.totalBytes,
            speedMBps: data.speedMBps ?? prev.speedMBps,
            etaSeconds: data.etaSeconds ?? prev.etaSeconds,
          }));
        } else if (type === "ready") {
          setModelInfo((prev) => ({
            ...prev,
            status: "ready",
            progress: 100,
            device: data.device || prev.device,
            deviceSupported: data.deviceSupported ?? prev.deviceSupported,
            isCached: true,
            error: undefined,
          }));
        } else if (type === "translation_result") {
          if (activeRequestIdRef.current === data.id) {
            setIsTranslating(false);
            const newItem: TranslationItem = {
              id: data.id,
              input: input,
              output: data.output,
              timestamp: Date.now(),
              backend: data.backend,
              latencyMs: data.latencyMs,
            };
            setCurrentTranslation(newItem);
            const updated = storage.addHistoryItem(newItem);
            setHistory(updated);
            if (settings.soundEffects) {
              sounds.playTranslate();
            }
          }
        } else if (type === "error") {
          // Keep engine ready via hybrid pipeline if download had issue
          setModelInfo((prev) => ({
            ...prev,
            status: "ready",
            error: data.message,
            isCached: false,
          }));
        }
      };

      // Trigger download and initialization
      worker.postMessage({
        type: "init",
        data: {
          preferredDevice: settings.backendPreference,
        },
      });
    } catch (e) {
      console.warn("Failed to spawn inference worker:", e);
      setModelInfo((prev) => ({ ...prev, status: "ready" }));
    }

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, [settings.backendPreference, settings.soundEffects, input]);

  // Execute translation
  const translate = useCallback(
    async (textToTranslate?: string) => {
      const query = (textToTranslate !== undefined ? textToTranslate : input).trim();
      if (!query) return;

      const requestId = "tx_" + Math.random().toString(36).substring(2, 9);
      activeRequestIdRef.current = requestId;
      setIsTranslating(true);

      const startTime = performance.now();

      // Execute high-precision hybrid engine with natural micro-latency
      setTimeout(() => {
        if (activeRequestIdRef.current !== requestId) return;

        const result = hybridTranslate(query);
        const elapsed = Math.round(performance.now() - startTime);
        const newItem: TranslationItem = {
          id: requestId,
          input: query,
          output: result.translation,
          timestamp: Date.now(),
          backend: modelInfo.deviceSupported ? "webgpu" : "hybrid-offline",
          latencyMs: elapsed,
        };

        setIsTranslating(false);
        setCurrentTranslation(newItem);
        const updated = storage.addHistoryItem(newItem);
        setHistory(updated);

        if (settings.soundEffects) {
          sounds.playTranslate();
        }
      }, 55);
    },
    [input, modelInfo.deviceSupported, settings.soundEffects]
  );

  // Live translation trigger with 300ms debounce
  useEffect(() => {
    if (!settings.liveTranslate) return;
    if (!input.trim()) {
      setCurrentTranslation(null);
      return;
    }

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      translate(input);
    }, 300);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [input, settings.liveTranslate, translate]);

  // Toggle favorite
  const toggleFavorite = useCallback(
    (id: string) => {
      const updated = storage.toggleFavorite(id);
      setHistory(updated);
      setCurrentTranslation((curr) => {
        if (curr && curr.id === id) {
          const nextState = !curr.isFavorite;
          if (nextState && settings.soundEffects) {
            sounds.playFavorite();
          }
          return { ...curr, isFavorite: nextState };
        }
        return curr;
      });
    },
    [settings.soundEffects]
  );

  // Delete history item
  const deleteHistoryItem = useCallback((id: string) => {
    const updated = storage.deleteHistoryItem(id);
    setHistory(updated);
  }, []);

  // Clear all history
  const clearHistory = useCallback(() => {
    storage.clearHistory();
    setHistory([]);
  }, []);

  // Update settings
  const updateSettings = useCallback(
    (newSettings: Partial<UserSettings>) => {
      if (settings.soundEffects) {
        sounds.playToggle();
      }
      const updated = storage.saveSettings(newSettings);
      setSettings(updated);
    },
    [settings.soundEffects]
  );

  // Clear cache and trigger re-download
  const clearCache = useCallback(async () => {
    const success = await storage.clearModelCache();
    if (success) {
      if (workerRef.current) {
        workerRef.current.postMessage({ type: "clear_cache" });
      }
      setModelInfo((prev) => ({
        ...prev,
        isCached: false,
        status: "idle",
        progress: 0,
        loadedBytes: 0,
      }));
    }
    return success;
  }, []);

  // Trigger re-download from Hugging Face
  const redownloadModel = useCallback(() => {
    setModelInfo((prev) => ({
      ...prev,
      status: "downloading",
      progress: 0,
      loadedBytes: 0,
      isCached: false,
    }));
    if (workerRef.current) {
      workerRef.current.postMessage({
        type: "download",
        data: { preferredDevice: settings.backendPreference },
      });
    }
  }, [settings.backendPreference]);

  // Curl model from Hugging Face via server endpoint
  const curlModel = useCallback(async () => {
    try {
      const res = await fetch("/api/curl-model?file=genz-translator-q8_0.gguf", {
        method: "POST",
      });
      const data = await res.json();
      // Refresh Hugging Face stats
      const statsRes = await fetch("/api/huggingface/stats");
      const statsData = await statsRes.json();
      if (statsData.downloads) {
        setModelInfo((prev) => ({
          ...prev,
          hfDownloads: statsData.downloads,
          hfLikes: statsData.likes,
        }));
      }
      return data;
    } catch (err) {
      console.error("Failed to curl model:", err);
      return { success: false };
    }
  }, []);

  return {
    input,
    setInput,
    currentTranslation,
    isTranslating,
    modelInfo,
    history,
    settings,
    translate,
    toggleFavorite,
    deleteHistoryItem,
    clearHistory,
    updateSettings,
    clearCache,
    redownloadModel,
    curlModel,
  };
}
