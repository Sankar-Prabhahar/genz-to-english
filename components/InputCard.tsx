"use client";

import React, { useRef, useEffect } from "react";
import { ArrowRight, X, Sparkles } from "lucide-react";

interface InputCardProps {
  input: string;
  onChange: (val: string) => void;
  onTranslate: () => void;
  isTranslating: boolean;
  liveTranslate: boolean;
  onToggleLiveTranslate: (val: boolean) => void;
}

export function InputCard({
  input,
  onChange,
  onTranslate,
  isTranslating,
  liveTranslate,
  onToggleLiveTranslate,
}: InputCardProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.max(96, textareaRef.current.scrollHeight)}px`;
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      onTranslate();
    }
  };

  return (
    <div className="rounded-xl bg-zinc-900/70 border border-zinc-800/80 backdrop-blur-md p-4 sm:p-5 shadow-sm transition-all focus-within:border-zinc-700 focus-within:ring-1 focus-within:ring-zinc-700/40">
      <div className="flex items-center justify-between pb-2.5 border-b border-zinc-800/60 text-xs text-zinc-400">
        <span className="font-medium text-zinc-300 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          Gen Z Slang Input
        </span>

        {/* Live Translation Switch */}
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <span className="text-[11px] text-zinc-400 hover:text-zinc-300 transition-colors">
              Live Mode
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={liveTranslate}
              onClick={() => onToggleLiveTranslate(!liveTranslate)}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                liveTranslate ? "bg-emerald-500" : "bg-zinc-700"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  liveTranslate ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </button>
          </label>
        </div>
      </div>

      {/* Input Area */}
      <div className="relative mt-3">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type or paste slang (e.g. no cap, bro is cooked, she ate)..."
          rows={3}
          maxLength={300}
          className="w-full bg-transparent text-white text-base sm:text-lg placeholder:text-zinc-500 resize-none outline-none leading-relaxed transition-all"
        />

        {/* Clear Button */}
        {input.length > 0 && (
          <button
            onClick={() => onChange("")}
            className="absolute top-0 right-0 p-1 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 rounded-md transition-all"
            aria-label="Clear input"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Footer controls: Character counter + High-Contrast Minimalist Button */}
      <div className="mt-4 pt-3 border-t border-zinc-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
          <span>{input.length}/300 chars</span>
          <span className="hidden sm:inline text-zinc-700">•</span>
          <span className="hidden sm:inline text-zinc-500 font-sans">Ctrl + Enter</span>
        </div>

        <button
          onClick={onTranslate}
          disabled={!input.trim() || isTranslating}
          className="w-full sm:w-auto h-11 px-6 rounded-lg font-medium text-sm minimal-action-btn flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none transition-all cursor-pointer"
        >
          {isTranslating ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin" />
              <span>Translating...</span>
            </>
          ) : (
            <>
              <span>Translate</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
