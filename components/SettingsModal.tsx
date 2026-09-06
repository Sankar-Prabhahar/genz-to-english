"use client";

import React, { useState } from "react";
import { X, Cpu, HardDrive, ShieldCheck, Sun, Moon, Laptop, Trash2, Check, RefreshCw } from "lucide-react";
import { ModelProgressInfo, UserSettings } from "@/lib/types";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: UserSettings;
  onUpdateSettings: (newSettings: Partial<UserSettings>) => void;
  modelInfo: ModelProgressInfo;
  onClearCache: () => Promise<boolean>;
}

export function SettingsModal({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  modelInfo,
  onClearCache,
}: SettingsModalProps) {
  const [clearing, setClearing] = useState(false);
  const [cleared, setCleared] = useState(false);

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/5 flex items-center justify-between">
          <h3 className="font-semibold text-white text-base">Inference & System Settings</h3>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
            aria-label="Close settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-6 overflow-y-auto max-h-[80vh]">
          {/* Appearance */}
          <div>
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-2.5">
              Appearance
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => onUpdateSettings({ theme: "dark" })}
                className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-medium border transition-all ${
                  settings.theme === "dark"
                    ? "bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-600/20"
                    : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white"
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Dark</span>
              </button>

              <button
                type="button"
                onClick={() => onUpdateSettings({ theme: "light" })}
                className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-medium border transition-all ${
                  settings.theme === "light"
                    ? "bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-600/20"
                    : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white"
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Light</span>
              </button>

              <button
                type="button"
                onClick={() => onUpdateSettings({ theme: "system" })}
                className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-medium border transition-all ${
                  settings.theme === "system"
                    ? "bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-600/20"
                    : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white"
                }`}
              >
                <Laptop className="w-3.5 h-3.5" />
                <span>System</span>
              </button>
            </div>
          </div>

          {/* Inference Backend */}
          <div>
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-2.5">
              Inference Hardware
            </label>
            <div className="space-y-2">
              <label
                onClick={() => onUpdateSettings({ backendPreference: "auto" })}
                className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                  settings.backendPreference === "auto"
                    ? "bg-purple-950/20 border-purple-500/40 text-white"
                    : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Cpu className="w-4 h-4 text-purple-400" />
                  <div>
                    <p className="text-xs font-semibold">Auto (WebGPU Preferred)</p>
                    <p className="text-[11px] text-zinc-500">Fastest hardware acceleration detected</p>
                  </div>
                </div>
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    settings.backendPreference === "auto"
                      ? "border-purple-500 bg-purple-500"
                      : "border-zinc-700"
                  }`}
                >
                  {settings.backendPreference === "auto" && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>
              </label>

              <label
                onClick={() => onUpdateSettings({ backendPreference: "wasm" })}
                className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                  settings.backendPreference === "wasm"
                    ? "bg-purple-950/20 border-purple-500/40 text-white"
                    : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <HardDrive className="w-4 h-4 text-indigo-400" />
                  <div>
                    <p className="text-xs font-semibold">Force WASM (CPU Fallback)</p>
                    <p className="text-[11px] text-zinc-500">Universal compatibility without GPU requirement</p>
                  </div>
                </div>
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    settings.backendPreference === "wasm"
                      ? "border-purple-500 bg-purple-500"
                      : "border-zinc-700"
                  }`}
                >
                  {settings.backendPreference === "wasm" && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>
              </label>
            </div>
          </div>

          {/* Model Information Card */}
          <div className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400">Model Name:</span>
              <span className="font-mono font-medium text-purple-300">
                {modelInfo.modelName}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400">Quantization:</span>
              <span className="font-mono text-zinc-200">Q8_0 (8-bit WebGPU)</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400">Cache Status:</span>
              <span className="text-emerald-400 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {modelInfo.isCached ? "Cached in Browser" : "Ready / Streamed"}
              </span>
            </div>

            <div className="pt-2 border-t border-white/5">
              <button
                type="button"
                onClick={handleClearCache}
                disabled={clearing}
                className="w-full py-2 px-3 rounded-lg text-xs font-medium bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
              >
                {clearing ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : cleared ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Trash2 className="w-3.5 h-3.5" />
                )}
                <span>{cleared ? "Cache Cleared" : "Clear Cached Model Storage"}</span>
              </button>
            </div>
          </div>

          {/* Privacy Guarantee Note */}
          <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 flex items-start gap-2.5 text-xs text-purple-300">
            <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>100% Privacy Guarantee:</strong> Zero text, audio, or metadata ever touches an external server. All AI computation takes place right on your device.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
