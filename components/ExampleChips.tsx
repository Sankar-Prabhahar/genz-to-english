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
  { label: "let him cook", text: "let him cook" },
  { label: "lock in", text: "we need to lock in" },
  { label: "touch grass", text: "touch grass" },
  { label: "fanum tax", text: "fanum tax" },
  { label: "rizz", text: "unspoken rizz" },
  { label: "main character", text: "main character energy" },
];

export function ExampleChips({ onSelectChip, selectedText }: ExampleChipsProps) {
  return (
    <div className="mt-3.5">
      <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-2">
        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
        <span>Quick examples:</span>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 pt-0.5 no-scrollbar">
        {EXAMPLES.map((item) => {
          const isActive = selectedText?.toLowerCase() === item.text.toLowerCase();
          return (
            <button
              key={item.label}
              onClick={() => onSelectChip(item.text)}
              className={`shrink-0 text-xs px-2.5 py-1 rounded-md border transition-all duration-150 active:scale-95 ${
                isActive
                  ? "bg-zinc-800 text-white border-zinc-600 font-medium"
                  : "bg-zinc-900/80 hover:bg-zinc-850 text-zinc-400 hover:text-zinc-200 border-zinc-800 hover:border-zinc-700"
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
