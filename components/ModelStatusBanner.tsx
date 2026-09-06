"use client";

import React, { useState } from "react";
import { DownloadCloud, CheckCircle2, AlertCircle, X, ChevronRight } from "lucide-react";
import { ModelProgressInfo } from "@/lib/types";

interface ModelStatusBannerProps {
  modelInfo: ModelProgressInfo;
}

export function ModelStatusBanner({ modelInfo }: ModelStatusBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  // Render downloading or compiling state
  if (modelInfo.status === "downloading" || modelInfo.status === "loading") {
    const loadedMB = (modelInfo.loadedBytes / (1024 * 1024)).toFixed(1);
    const totalMB = (modelInfo.totalBytes / (1024 * 1024)).toFixed(1);

    return (
      <div className="mb-6 rounded-2xl p-4 bg-purple-950/30 border border-purple-500/20 backdrop-blur-md shadow-lg shadow-purple-900/10 transition-all">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-purple-500/20 flex items-center justify-center animate-pulse">
              <DownloadCloud className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <p className="text-xs font-semibold text-purple-200">
                {modelInfo.status === "downloading" ? "Downloading AI Model to Device..." : "Compiling WebGPU Shaders..."}
              </p>
              <p className="text-[11px] text-purple-400/80">
                Downloaded once and permanently cached in browser
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono font-medium text-purple-300">
              {modelInfo.progress}%
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-zinc-800/80 rounded-full h-2 overflow-hidden p-0.5">
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.max(5, modelInfo.progress)}%` }}
          />
        </div>

        {/* Metrics: Size, Speed, ETA */}
        <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-zinc-400">
          <span>
            {loadedMB} MB / {totalMB} MB
          </span>
          {modelInfo.speedMBps > 0 && (
            <span>
              {modelInfo.speedMBps} MB/s
            </span>
          )}
          {modelInfo.etaSeconds > 0 && (
            <span>
              ETA: ~{modelInfo.etaSeconds}s
            </span>
          )}
        </div>
      </div>
    );
  }

  // Ready and cached state - subtle confirmation
  if (modelInfo.status === "ready" && modelInfo.isCached) {
    return (
      <div className="mb-6 rounded-xl px-3.5 py-2.5 bg-emerald-950/20 border border-emerald-500/20 flex items-center justify-between text-xs text-emerald-300">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Model cached & ready. Everything runs 100% locally on your GPU.</span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="p-1 text-emerald-400/60 hover:text-emerald-300 transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return null;
}
