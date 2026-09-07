"use client";

import React, { useState } from "react";
import { History, Copy, Check, Heart, Trash2 } from "lucide-react";
import { TranslationItem } from "@/lib/types";

interface HistorySectionProps {
  history: TranslationItem[];
  onSelectTranslation: (item: TranslationItem) => void;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

function formatTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function HistorySection({
  history,
  onSelectTranslation,
  onToggleFavorite,
  onDelete,
  onClearAll,
}: HistorySectionProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!history || history.length === 0) {
    return null;
  }

  const handleCopy = async (e: React.MouseEvent, item: TranslationItem) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(item.output);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 1800);
    } catch {}
  };

  return (
    <section className="mt-10 pt-8 border-t border-zinc-800/70">
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-zinc-400" />
          <h2 className="text-sm font-medium text-zinc-200">Recent Translations</h2>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-zinc-850 text-zinc-400 border border-zinc-800">
            {history.length}
          </span>
        </div>

        <button
          onClick={onClearAll}
          className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          Clear all
        </button>
      </div>

      <div className="space-y-2">
        {history.slice(0, 10).map((item) => {
          const isCopied = copiedId === item.id;
          return (
            <div
              key={item.id}
              onClick={() => onSelectTranslation(item)}
              className="group relative rounded-lg p-3 bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-850 hover:border-zinc-700/80 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-zinc-200 truncate">
                      {item.input}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono shrink-0">
                      {formatTimeAgo(item.timestamp)}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {item.output}
                  </p>
                </div>

                {/* Card Actions */}
                <div className="flex items-center gap-0.5 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => handleCopy(e, item)}
                    className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 transition-colors"
                    title="Copy translation"
                  >
                    {isCopied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(item.id);
                    }}
                    className="p-1.5 text-zinc-400 hover:text-red-400 rounded hover:bg-zinc-800 transition-colors"
                    title="Favorite"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        item.isFavorite ? "fill-red-500 text-red-500" : ""
                      }`}
                    />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(item.id);
                    }}
                    className="p-1.5 text-zinc-400 hover:text-red-400 rounded hover:bg-zinc-800 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
