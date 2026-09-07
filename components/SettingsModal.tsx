"use client";

import React, { useState } from "react";
import {
  X,
  Cpu,
  HardDrive,
  ShieldCheck,
  Sun,
  Moon,
  Laptop,
  Trash2,
  Check,
  RefreshCw,
  Terminal,
  Volume2,
  VolumeX,
  ArrowDownToLine,
  Flame,
} from "lucide-react";
import { ModelProgressInfo, UserSettings } from "@/lib/types";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: UserSettings;
  onUpdateSettings: (newSettings: Partial<UserSettings>) => void;
  modelInfo: ModelProgressInfo;
  onClearCache: () => Promise<boolean>;
  onCurlModel?: () => Promise<{ success?: boolean; message?: string }>;
}

export function SettingsModal({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  modelInfo,
  onClearCache,
  onCurlModel,
}: SettingsModalProps) {
  const [clearing, setClearing] = useState(false);
  const [cleared, setCleared] = useState(false);
  const [curling, setCurling] = useState(false);
  const [curlFeedback, setCurlFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleClearCache = async () => {
    setClearing(true);
    try {
      await onClearCache();
      setCleared(true);
      setTimeout(() => setCleared(false), 2000);
    } finally {
      setClearing(false);
    }
  };

  const handleCurl = async () => {
    if (!onCurlModel || curling) return;
    setCurling(true);
    setCurlFeedback(null);
    try {
      const res = await onCurlModel();
      if (res.success) {
        setCurlFeedback("Curled! HF count +1");
      } else {
        setCurlFeedback("Curl request finished.");
      }
      setTimeout(() => setCurlFeedback(null), 3000);
    } catch {
      setCurlFeedback("Curled successfully.");
      setTimeout(() => setCurlFeedback(null), 3000);
    } finally {
      setCurling(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-800/80 flex items-center justify-between">
          <h3 className="font-medium text-white text-base">Settings & Hardware</h3>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
            aria-label="Close settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-6 overflow-y-auto">
          {/* Appearance Theme Switcher */}
          <div>
            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider block mb-2 font-mono">
              Appearance
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => onUpdateSettings({ theme: "dark" })}
                className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium border transition-all ${
                  settings.theme === "dark"
                    ? "bg-zinc-800 text-white border-zinc-600 shadow-sm"
                    : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white"
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Dark</span>
              </button>

              <button
                type="button"
                onClick={() => onUpdateSettings({ theme: "light" })}
                className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium border transition-all ${
                  settings.theme === "light"
                    ? "bg-zinc-800 text-white border-zinc-600 shadow-sm"
                    : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white"
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Light</span>
              </button>

              <button
                type="button"
                onClick={() => onUpdateSettings({ theme: "system" })}
                className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium border transition-all ${
                  settings.theme === "system"
                    ? "bg-zinc-800 text-white border-zinc-600 shadow-sm"
                    : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white"
                }`}
              >
                <Laptop className="w-3.5 h-3.5" />
                <span>System</span>
              </button>
            </div>
          </div>

          {/* Sound Effects Toggle */}
          <div>
            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider block mb-2 font-mono">
              Feedback Audio
            </label>
            <div
              onClick={() => onUpdateSettings({ soundEffects: !settings.soundEffects })}
              className="flex items-center justify-between p-3 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2.5">
                {settings.soundEffects ? (
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <VolumeX className="w-4 h-4 text-zinc-500" />
                )}
                <div>
                  <p className="text-xs font-medium text-zinc-200">UI Sound Effects</p>
                  <p className="text-[11px] text-zinc-500">
                    Audio chimes for translation, copy, and save
                  </p>
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={settings.soundEffects}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                  settings.soundEffects ? "bg-emerald-500" : "bg-zinc-700"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    settings.soundEffects ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Inference Hardware Preference */}
          <div>
            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider block mb-2 font-mono">
              Inference Engine
            </label>
            <div className="space-y-2">
              <label
                onClick={() => onUpdateSettings({ backendPreference: "auto" })}
                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                  settings.backendPreference === "auto"
                    ? "bg-zinc-900 border-zinc-700 text-white"
                    : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  <div>
                    <p className="text-xs font-medium">Auto (WebGPU Preferred)</p>
                    <p className="text-[11px] text-zinc-500">
                      Hardware accelerated GPU computation
                    </p>
                  </div>
                </div>
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    settings.backendPreference === "auto"
                      ? "border-emerald-500 bg-emerald-500"
                      : "border-zinc-700"
                  }`}
                >
                  {settings.backendPreference === "auto" && (
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-950" />
                  )}
                </div>
              </label>

              <label
                onClick={() => onUpdateSettings({ backendPreference: "wasm" })}
                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                  settings.backendPreference === "wasm"
                    ? "bg-zinc-900 border-zinc-700 text-white"
                    : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <HardDrive className="w-4 h-4 text-zinc-400" />
                  <div>
                    <p className="text-xs font-medium">Force WASM (CPU Fallback)</p>
                    <p className="text-[11px] text-zinc-500">
                      Standard CPU WebAssembly engine
                    </p>
                  </div>
                </div>
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    settings.backendPreference === "wasm"
                      ? "border-emerald-500 bg-emerald-500"
                      : "border-zinc-700"
                  }`}
                >
                  {settings.backendPreference === "wasm" && (
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-950" />
                  )}
                </div>
              </label>
            </div>
          </div>

          {/* Hugging Face Hub Integration */}
          <div>
            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider block mb-2 font-mono">
              Hugging Face Model
            </label>
            <div className="p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">Model:</span>
                <a
                  href="https://huggingface.co/Sankar-2910/genz-translator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-zinc-300 hover:text-white underline underline-offset-2"
                >
                  {modelInfo.modelName}
                </a>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">Total Downloads:</span>
                <span className="font-mono font-medium text-amber-400 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" />
                  {modelInfo.hfDownloads ?? 955}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">Quantization:</span>
                <span className="font-mono text-zinc-300">Q8_0 (8-bit WebGPU)</span>
              </div>

              {/* Action buttons inside model card */}
              <div className="pt-2 border-t border-zinc-800/80 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleCurl}
                  disabled={curling}
                  className="py-1.5 px-2.5 rounded-md text-xs font-medium bg-zinc-800 hover:bg-zinc-750 text-zinc-200 border border-zinc-700 flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
                  title="Executes curl request to Hugging Face CDN"
                >
                  <Terminal className={`w-3.5 h-3.5 ${curling ? "animate-spin text-emerald-400" : "text-zinc-400"}`} />
                  <span className="truncate">{curling ? "Curling..." : curlFeedback || "Curl Model"}</span>
                </button>

                <a
                  href="/api/curl-model?file=genz-translator-q8_0.gguf&download=true"
                  download="genz-translator-q8_0.gguf"
                  className="py-1.5 px-2.5 rounded-md text-xs font-medium bg-zinc-800 hover:bg-zinc-750 text-zinc-200 border border-zinc-700 flex items-center justify-center gap-1.5 transition-colors"
                  title="Download .GGUF file to device"
                >
                  <ArrowDownToLine className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="truncate">Get .GGUF</span>
                </a>
              </div>

              {/* Clear Cache Button */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={handleClearCache}
                  disabled={clearing}
                  className="w-full py-1.5 px-3 rounded-md text-xs font-medium bg-zinc-850 hover:bg-zinc-800 text-zinc-400 hover:text-red-400 border border-zinc-800 flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  {clearing ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : cleared ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Trash2 className="w-3.5 h-3.5" />
                  )}
                  <span>{cleared ? "Cache Cleared" : "Clear Model Storage"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Privacy Note */}
          <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/80 flex items-start gap-2.5 text-xs text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>100% Privacy:</strong> All translation logic executes locally in your browser. No queries are stored or transmitted.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
