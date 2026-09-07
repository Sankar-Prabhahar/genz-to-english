"use client";

import React from "react";
import { Cpu, ShieldCheck, WifiOff, Zap } from "lucide-react";

export function Hero() {
  return (
    <div className="pt-8 pb-5 sm:pt-11 sm:pb-7 text-center">
      {/* Privacy Tag */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full text-xs font-medium bg-zinc-900/90 text-zinc-300 border border-zinc-800 shadow-sm">
        <Zap className="w-3.5 h-3.5 text-emerald-400" />
        <span>100% On-Device Neural Translation</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-xl mx-auto leading-[1.15]">
        Translate Gen Z slang{" "}
        <span className="text-emerald-400">
          instantly.
        </span>
      </h1>

      {/* Subtext */}
      <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-md mx-auto leading-relaxed">
        Runs on your local GPU. Zero server latency. Complete privacy with client-side inference.
      </p>

      {/* Badges Grid */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/60 border border-zinc-800/80 text-zinc-300">
          <Cpu className="w-3.5 h-3.5 text-zinc-400" />
          <span>WebGPU Native</span>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/60 border border-zinc-800/80 text-zinc-300">
          <WifiOff className="w-3.5 h-3.5 text-emerald-400" />
          <span>Offline Ready</span>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/60 border border-zinc-800/80 text-zinc-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Q8 Quantized</span>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/60 border border-zinc-800/80 text-zinc-300">
          <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
          <span>Zero Server Storage</span>
        </div>
      </div>
    </div>
  );
}
