"use client";

import React from "react";
import { Sparkles, Cpu, Settings, Bookmark, History, ShieldCheck } from "lucide-react";
import { ModelProgressInfo } from "@/lib/types";

interface NavbarProps {
  modelInfo: ModelProgressInfo;
  favoritesCount: number;
  historyCount: number;
  onOpenFavorites: () => void;
  onOpenHistory: () => void;
  onOpenSettings: () => void;
}

export function Navbar({
  modelInfo,
  favoritesCount,
  historyCount,
  onOpenFavorites,
  onOpenHistory,
  onOpenSettings,
}: NavbarProps) {
  const isWebGPU = modelInfo.device === "webgpu" && modelInfo.deviceSupported;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl">
      <div className="max-w-[720px] mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20 ring-1 ring-white/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold tracking-tight text-white text-base sm:text-lg">
                GenZ<span className="text-purple-400">Translator</span>
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-purple-500/15 text-purple-300 border border-purple-500/30 rounded-full">
                AI Q8
              </span>
            </div>
          </div>
        </div>

        {/* Status Pill & Navigation Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Device Backend Badge */}
          <div
            title={
              isWebGPU
                ? "Running on your physical GPU via WebGPU"
                : "Running in-browser via CPU WebAssembly"
            }
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
              isWebGPU
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                : "bg-indigo-500/10 text-indigo-300 border-indigo-500/20"
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isWebGPU ? "bg-emerald-400" : "bg-indigo-400"
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  isWebGPU ? "bg-emerald-500" : "bg-indigo-500"
                }`}
              />
            </span>
            <Cpu className="w-3.5 h-3.5" />
            <span>{isWebGPU ? "WebGPU Active" : "WASM Engine"}</span>
          </div>

          {/* Favorites Button */}
          <button
            onClick={onOpenFavorites}
            aria-label="View Favorites"
            className="relative p-2 text-zinc-400 hover:text-zinc-100 hover:bg-white/5 rounded-xl transition-colors"
          >
            <Bookmark className="w-4 h-4" />
            {favoritesCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-purple-600 text-white text-[10px] font-bold flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* History Button (mobile view helper) */}
          <button
            onClick={onOpenHistory}
            aria-label="View History"
            className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-white/5 rounded-xl transition-colors sm:hidden"
          >
            <History className="w-4 h-4" />
          </button>

          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            aria-label="Settings"
            className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-white/5 rounded-xl transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
