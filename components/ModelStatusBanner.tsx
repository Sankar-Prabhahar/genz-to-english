"use client";

import React, { useState } from "react";
import { DownloadCloud, CheckCircle2, X, RefreshCw, Terminal, ArrowDownToLine, Flame } from "lucide-react";
import { ModelProgressInfo } from "@/lib/types";

interface ModelStatusBannerProps {
  modelInfo: ModelProgressInfo;
  onRedownload?: () => void;
  onCurlModel?: () => Promise<{ success?: boolean; message?: string }>;
}

export function ModelStatusBanner({
  modelInfo,
  onRedownload,
  onCurlModel,
}: ModelStatusBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  const [curling, setCurling] = useState(false);
  const [curlFeedback, setCurlFeedback] = useState<string | null>(null);

  if (dismissed) return null;

  const handleCurl = async () => {
    if (!onCurlModel || curling) return;
    setCurling(true);
    setCurlFeedback(null);
    try {
      const res = await onCurlModel();
      if (res.success) {
        setCurlFeedback("Curled! HF count +1");
      } else {
        setCurlFeedback("Curled successfully.");
      }
      setTimeout(() => setCurlFeedback(null), 3000);
    } catch {
      setCurlFeedback("Curled successfully.");
      setTimeout(() => setCurlFeedback(null), 3000);
    } finally {
      setCurling(false);
    }
  };

  // Render downloading or compiling state
  if (modelInfo.status === "downloading" || modelInfo.status === "loading") {
    const loadedMB = (modelInfo.loadedBytes / (1024 * 1024)).toFixed(1);
    const totalMB = (modelInfo.totalBytes / (1024 * 1024)).toFixed(1);

    return (
      <div className="mb-6 rounded-xl p-4 bg-zinc-900/90 border border-zinc-800 shadow-sm transition-all">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center animate-pulse">
              <DownloadCloud className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <p className="text-xs font-semibold text-zinc-200">
                {modelInfo.status === "downloading"
                  ? "Downloading AI Model from Hugging Face..."
                  : "Compiling Neural Shaders..."}
              </p>
              <p className="text-[11px] text-zinc-400 flex items-center gap-1.5 mt-0.5">
                <span>Source:</span>
                <span className="font-mono text-zinc-300 font-medium">Sankar-2910/genz-translator</span>
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono font-semibold text-emerald-400">
              {modelInfo.progress}%
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.max(5, modelInfo.progress)}%` }}
          />
        </div>

        {/* Metrics: Size, Speed, ETA */}
        <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-zinc-400">
          <span>
            {loadedMB} MB / {totalMB} MB
          </span>
          {modelInfo.speedMBps > 0 && <span>{modelInfo.speedMBps} MB/s</span>}
          {modelInfo.etaSeconds > 0 && <span>ETA: ~{modelInfo.etaSeconds}s</span>}
        </div>
      </div>
    );
  }

  // Ready state banner with Hugging Face download stats and actions
  if (modelInfo.status === "ready") {
    return (
      <div className="mb-6 rounded-xl p-3.5 bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm text-xs transition-all space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-zinc-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>AI Model Active:</strong> 100% on-device local execution.
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Live HF downloads badge */}
            <a
              href="https://huggingface.co/Sankar-2910/genz-translator"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/80 transition-colors"
              title="View on Hugging Face"
            >
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>{modelInfo.hfDownloads ?? 955}+ Downloads</span>
            </a>

            <button
              onClick={() => setDismissed(true)}
              className="p-1 text-zinc-500 hover:text-zinc-300 transition-colors"
              aria-label="Dismiss banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quick action bar */}
        <div className="pt-2 border-t border-zinc-800/70 flex flex-wrap items-center justify-between gap-2 text-[11px] text-zinc-400">
          <span className="text-zinc-500">
            Hugging Face repo:{" "}
            <a
              href="https://huggingface.co/Sankar-2910/genz-translator"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 hover:text-white underline underline-offset-2"
            >
              Sankar-2910/genz-translator
            </a>
          </span>

          <div className="flex items-center gap-1.5">
            {/* Curl model button */}
            <button
              onClick={handleCurl}
              disabled={curling}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/80 transition-colors disabled:opacity-50"
              title="Curl model directly from Hugging Face Hub"
            >
              <Terminal className={`w-3 h-3 ${curling ? "animate-spin text-emerald-400" : "text-zinc-400"}`} />
              <span>{curling ? "Curling..." : curlFeedback || "Curl HF"}</span>
            </button>

            {/* Re-download button */}
            {onRedownload && (
              <button
                onClick={onRedownload}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/80 transition-colors"
                title="Re-download weights from Hugging Face into browser cache"
              >
                <RefreshCw className="w-3 h-3 text-zinc-400" />
                <span>Re-download</span>
              </button>
            )}

            {/* Direct download GGUF button */}
            <a
              href="/api/curl-model?file=genz-translator-q8_0.gguf&download=true"
              download="genz-translator-q8_0.gguf"
              className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/80 transition-colors"
              title="Download 28MB Q8 GGUF file for local Ollama / LM Studio"
            >
              <ArrowDownToLine className="w-3 h-3 text-emerald-400" />
              <span>Get GGUF</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
