"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Cpu, Settings, Bookmark, History, Flame } from "lucide-react";
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
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-md transition-colors">
      <div className="max-w-[720px] mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-400 shadow-sm group-hover:border-zinc-700 transition-colors">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold tracking-tight text-white text-base">
              GenZ<span className="text-zinc-400 font-normal">Translator</span>
            </span>
            <span className="px-1.5 py-0.5 text-[10px] font-mono font-medium bg-zinc-900 text-zinc-400 border border-zinc-800 rounded">
              Q8
            </span>
          </div>
        </Link>

        {/* Status Pill & Navigation Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Hugging Face live stats badge */}
          <a
            href="https://huggingface.co/Sankar-2910/genz-translator"
            target="_blank"
            rel="noopener noreferrer"
            title="View Sankar-2910/genz-translator on Hugging Face"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 hover:border-zinc-700 transition-colors"
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono text-[11px]">{modelInfo.hfDownloads ?? 955}</span>
            <span className="text-zinc-500 text-[10px]">downloads</span>
          </a>

          {/* Device Backend Badge */}
          <div
            title={
              isWebGPU
                ? "Running on your physical GPU via WebGPU"
                : "Running in-browser via CPU WebAssembly"
            }
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-300"
          >
            <span className="relative flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isWebGPU ? "bg-emerald-400" : "bg-zinc-400"
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  isWebGPU ? "bg-emerald-500" : "bg-zinc-500"
                }`}
              />
            </span>
            <Cpu className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-[11px] font-mono">{isWebGPU ? "WebGPU" : "WASM"}</span>
          </div>

          {/* Favorites Button */}
          <button
            onClick={onOpenFavorites}
            aria-label="View Favorites"
            className="relative p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 rounded-lg transition-colors border border-transparent hover:border-zinc-800"
          >
            <Bookmark className="w-4 h-4" />
            {favoritesCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-500 text-zinc-950 text-[10px] font-bold flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* History Button (mobile view helper) */}
          <button
            onClick={onOpenHistory}
            aria-label="View History"
            className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 rounded-lg transition-colors sm:hidden border border-transparent hover:border-zinc-800"
          >
            <History className="w-4 h-4" />
          </button>

          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            aria-label="Settings"
            className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 rounded-lg transition-colors border border-transparent hover:border-zinc-800"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
