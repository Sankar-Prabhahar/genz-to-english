"use client";

import React from "react";
import { Cpu, ShieldCheck, WifiOff, Zap } from "lucide-react";

export function Hero() {
  return (
    <div className="pt-8 pb-6 sm:pt-12 sm:pb-8 text-center">
      {/* Privacy Tag */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-5 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 backdrop-blur-md shadow-sm">
        <Zap className="w-3.5 h-3.5 text-purple-400" />
        <span>100% Client-Side Neural Translation</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-xl mx-auto leading-[1.15]">
        Translate Gen Z slang{" "}
        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
          instantly.
        </span>
      </h1>

      {/* Subtext */}
      <p className="mt-3.5 text-sm sm:text-base text-zinc-400 max-w-md mx-auto leading-relaxed">
        Runs entirely on your device. No servers. No tracking. Real-time translation powered by your GPU.
      </p>

      {/* Badges Grid */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-300">
          <Cpu className="w-3.5 h-3.5 text-purple-400" />
          <span>WebGPU Native</span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-300">
          <WifiOff className="w-3.5 h-3.5 text-emerald-400" />
          <span>Offline Ready</span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-300">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <span>Q8 Quantized AI</span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-300">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
          <span>Zero Server Storage</span>
        </div>
      </div>
    </div>
  );
}
