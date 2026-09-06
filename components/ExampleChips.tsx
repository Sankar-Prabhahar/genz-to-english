"use client";

import React from "react";
import { Sparkles } from "lucide-react";

interface ExampleChipsProps {
  onSelectChip: (text: string) => void;
  selectedText?: string;
}

const EXAMPLES = [
  { label: "no cap", text: "no cap" },
  { label: "fr", text: "fr" },
  { label: "sigma", text: "sigma" },
  { label: "delulu", text: "delulu" },
  { label: "cooked", text: "bro is cooked" },
  { label: "ate", text: "she ate and left no crumbs" },
  { label: "skibidi", text: "skibidi" },
  { label: "touch grass", text: "touch grass" },
  { label: "fanum tax", text: "fanum tax" },
  { label: "rizz", text: "unspoken rizz" },
  { label: "main character", text: "main character energy" },
  { label: "bussin", text: "this food is bussin" },
];

export function ExampleChips({ onSelectChip, selectedText }: ExampleChipsProps) {
  return (
    <div className="mt-3.5">
      <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-2">
        <Sparkles className="w-3.5 h-3.5 text-purple-400" />
        <span>Try these popular slang phrases:</span>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 pt-0.5 no-scrollbar">
        {EXAMPLES.map((item) => {
          const isActive = selectedText?.toLowerCase() === item.text.toLowerCase();
          return (
            <button
              key={item.label}
              onClick={() => onSelectChip(item.text)}
              className={`shrink-0 text-xs px-3 py-1.5 rounded-full border transition-all duration-150 active:scale-95 ${
                isActive
                  ? "bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-sm shadow-purple-500/10 font-medium"
                  : "bg-zinc-900/70 hover:bg-zinc-800 text-zinc-300 border-zinc-800/80 hover:border-zinc-700"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
