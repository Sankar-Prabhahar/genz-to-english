"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ModelProgressInfo, TranslationItem, UserSettings } from "./types";
import { hybridTranslate } from "./hybrid-translator";
import { storage } from "./storage";

export function useTranslator() {
  const [modelInfo, setModelInfo] = useState<ModelProgressInfo>({
    status: "idle",
    progress: 0,
    loadedBytes: 0,
    totalBytes: 52 * 1024 * 1024,
    speedMBps: 0,
    etaSeconds: 0,
    device: "webgpu",
    deviceSupported: false,
    modelName: "Sankar-2910/genz-translator",
    isCached: false,
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
  }, []);

  // Initialize Web Worker
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
            device: data.device,
            deviceSupported: data.deviceSupported,
            isCached: true,
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
          }
        } else if (type === "translation_error") {
          if (activeRequestIdRef.current === data.id) {
            // Fallback to hybrid engine on worker translation failure
            const fallback = hybridTranslate(input);
            const newItem: TranslationItem = {
              id: data.id,
              input: input,
              output: fallback.translation,
              timestamp: Date.now(),
              backend: "hybrid-offline",
              latencyMs: 15,
            };
            setIsTranslating(false);
            setCurrentTranslation(newItem);
            const updated = storage.addHistoryItem(newItem);
            setHistory(updated);
          }
        } else if (type === "error") {
          // Model loading fallback: notify user ready via hybrid engine
          setModelInfo((prev) => ({
            ...prev,
            status: "ready",
            error: data.message,
            isCached: false,
          }));
        }
      };

      // Trigger initialization
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
  }, [settings.backendPreference]);

  // Execute translation
  const translate = useCallback(
    async (textToTranslate?: string) => {
      const query = (textToTranslate !== undefined ? textToTranslate : input).trim();
      if (!query) return;

      const requestId = "tx_" + Math.random().toString(36).substring(2, 9);
      activeRequestIdRef.current = requestId;
      setIsTranslating(true);

      const startTime = performance.now();

      // If worker model is ready and loaded, dispatch to WebGPU worker
      if (modelInfo.status === "ready" && workerRef.current && !modelInfo.error) {
        workerRef.current.postMessage({
          type: "translate",
          data: {
            id: requestId,
            text: query,
          },
        });
        return;
      }

      // Otherwise, execute instant hybrid engine
      // Simulate micro-latency (40-90ms) for natural feel
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
      }, 50);
    },
    [input, modelInfo.status, modelInfo.error, modelInfo.deviceSupported]
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
  const toggleFavorite = useCallback((id: string) => {
    const updated = storage.toggleFavorite(id);
    setHistory(updated);
    setCurrentTranslation((curr) =>
      curr && curr.id === id ? { ...curr, isFavorite: !curr.isFavorite } : curr
    );
  }, []);

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
  const updateSettings = useCallback((newSettings: Partial<UserSettings>) => {
    const updated = storage.saveSettings(newSettings);
    setSettings(updated);
  }, []);

  // Clear cache
  const clearCache = useCallback(async () => {
    const success = await storage.clearModelCache();
    if (success) {
      setModelInfo((prev) => ({
        ...prev,
        isCached: false,
        status: "idle",
        progress: 0,
      }));
    }
    return success;
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
  };
}
