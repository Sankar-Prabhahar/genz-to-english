"use client";

import React, { useState } from "react";
import { Copy, Check, Share2, Heart, Volume2, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { TranslationItem } from "@/lib/types";

interface OutputCardProps {
  translation: TranslationItem | null;
  onToggleFavorite: (id: string) => void;
}

export function OutputCard({ translation, onToggleFavorite }: OutputCardProps) {
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [shared, setShared] = useState(false);

  if (!translation || !translation.output) {
    return null;
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(translation.output);
      setCopied(true);
      confetti({
        particleCount: 22,
        spread: 45,
        origin: { y: 0.75 },
        colors: ["#10b981", "#34d399", "#ffffff", "#71717a"],
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "GenZ Translation",
          text: `"${translation.input}" translates to: "${translation.output}" (via GenZ Translator)`,
          url: window.location.href,
        });
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } catch {
        handleCopy();
      }
    } else {
      handleCopy();
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  const handleSpeak = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(translation.output);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);
    window.speechSynthesis.speak(utterance);
  };

  const isFavorite = !!translation.isFavorite;

  return (
    <div className="mt-5 rounded-xl bg-zinc-900/85 border border-zinc-800 p-5 shadow-sm transition-all animate-in fade-in duration-200">
      {/* Header with backend badge and timestamp */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800/70 text-xs text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="font-medium text-zinc-200 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Standard English
          </span>
        </div>

        {/* Backend & Latency Badge */}
        <div className="flex items-center gap-2">
          {translation.latencyMs !== undefined && (
            <span className="text-[11px] font-mono text-zinc-500">
              {translation.latencyMs}ms
            </span>
          )}
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-zinc-800 text-zinc-300 border border-zinc-700/80">
            {translation.backend === "webgpu"
              ? "WebGPU"
              : translation.backend === "wasm"
              ? "WASM CPU"
              : "Hybrid Engine"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="mt-4 space-y-2.5">
        <div className="text-xs font-mono text-zinc-500">
          <span className="text-zinc-400">Slang: </span>
          <span className="italic text-zinc-300">&ldquo;{translation.input}&rdquo;</span>
        </div>

        <div className="text-xl sm:text-2xl font-medium text-white tracking-tight leading-relaxed">
          {translation.output}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 pt-3 border-t border-zinc-800/70 flex items-center justify-between">
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              copied
                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                : "text-zinc-300 hover:text-white hover:bg-zinc-800 border border-transparent"
            }`}
            aria-label="Copy translated text"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-zinc-400" />
                <span>Copy</span>
              </>
            )}
          </button>

          {/* Text-to-Speech Button */}
          <button
            onClick={handleSpeak}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors ${
              isPlayingAudio ? "text-emerald-400 bg-emerald-500/10" : ""
            }`}
            aria-label="Listen to translation"
          >
            <Volume2 className={`w-3.5 h-3.5 ${isPlayingAudio ? "animate-pulse text-emerald-400" : "text-zinc-400"}`} />
            <span className="hidden sm:inline">Listen</span>
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
            aria-label="Share translation"
          >
            <Share2 className="w-3.5 h-3.5 text-zinc-400" />
            <span className="hidden sm:inline">{shared ? "Shared" : "Share"}</span>
          </button>
        </div>

        {/* Favorite Button */}
        <button
          onClick={() => onToggleFavorite(translation.id)}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
            isFavorite
              ? "bg-red-500/15 text-red-400 border border-red-500/30"
              : "text-zinc-400 hover:text-red-400 hover:bg-zinc-800"
          }`}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
          <span className="hidden sm:inline">{isFavorite ? "Saved" : "Save"}</span>
        </button>
      </div>
    </div>
  );
}
