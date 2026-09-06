"use client";

import React, { useState, useMemo } from "react";
import { X, Search, Bookmark, Copy, Check, Heart, Trash2 } from "lucide-react";
import { TranslationItem } from "@/lib/types";

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: TranslationItem[];
  onSelectFavorite: (item: TranslationItem) => void;
  onToggleFavorite: (id: string) => void;
}

export function FavoritesModal({
  isOpen,
  onClose,
  favorites,
  onSelectFavorite,
  onToggleFavorite,
}: FavoritesModalProps) {
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filter and alphabetize favorites
  const groupedFavorites = useMemo(() => {
    const filtered = favorites.filter(
      (item) =>
        item.input.toLowerCase().includes(search.toLowerCase()) ||
        item.output.toLowerCase().includes(search.toLowerCase())
    );

    // Group by first letter of input
    const groups: { [letter: string]: TranslationItem[] } = {};
    const sorted = [...filtered].sort((a, b) =>
      a.input.localeCompare(b.input, undefined, { sensitivity: "base" })
    );

    for (const item of sorted) {
      const letter = item.input.trim()[0]?.toUpperCase() || "#";
      const key = /[A-Z]/.test(letter) ? letter : "#";
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
    }

    return groups;
  }, [favorites, search]);

  if (!isOpen) return null;

  const handleCopy = async (e: React.MouseEvent, text: string, id: string) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
    } catch {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-purple-400" />
            <h3 className="font-semibold text-white text-base">Favorite Translations</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono">
              {favorites.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-white/5 bg-zinc-900/40">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search saved slang or definitions..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-white placeholder:text-zinc-500 outline-none focus:border-purple-500/40"
            />
          </div>
        </div>

        {/* Grouped List */}
        <div className="p-4 overflow-y-auto flex-1 space-y-5">
          {Object.keys(groupedFavorites).length === 0 ? (
            <div className="py-12 text-center text-zinc-500 text-sm">
              <Bookmark className="w-8 h-8 mx-auto mb-2 text-zinc-600 opacity-50" />
              <p>No saved favorites found</p>
              <p className="text-xs text-zinc-600 mt-1">Tap the heart icon on any translation to save it here</p>
            </div>
          ) : (
            Object.entries(groupedFavorites).map(([letter, items]) => (
              <div key={letter} className="space-y-2">
                <div className="sticky top-0 bg-zinc-950/90 backdrop-blur-xs py-1 text-xs font-bold text-purple-400 border-b border-white/5">
                  {letter}
                </div>
                <div className="space-y-2">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        onSelectFavorite(item);
                        onClose();
                      }}
                      className="p-3 rounded-xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 hover:border-purple-500/30 transition-all cursor-pointer flex items-start justify-between gap-3"
                    >
                      <div className="space-y-1 min-w-0">
                        <p className="text-xs font-semibold text-purple-300">
                          {item.input}
                        </p>
                        <p className="text-xs text-zinc-300 line-clamp-2">
                          {item.output}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={(e) => handleCopy(e, item.output, item.id)}
                          className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
                          title="Copy"
                        >
                          {copiedId === item.id ? (
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
                          className="p-1.5 text-pink-500 hover:bg-zinc-800 rounded-lg"
                          title="Remove from favorites"
                        >
                          <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
