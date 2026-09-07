"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Cpu,
  ShieldCheck,
  WifiOff,
  Zap,
  ArrowRight,
  Repeat2,
  History,
  Heart,
  Globe,
  Flame,
} from "lucide-react";

const SLANG_EXAMPLES = [
  { slang: "no cap", english: "I'm being completely honest" },
  { slang: "she ate", english: "She performed flawlessly" },
  { slang: "delulu", english: "Delusionally optimistic" },
  { slang: "rizz", english: "Natural romantic charisma" },
  { slang: "cooked", english: "In serious trouble" },
  { slang: "touch grass", english: "Go spend time outside" },
  { slang: "fanum tax", english: "Taking food from a friend" },
  { slang: "let him cook", english: "Give him space to execute" },
  { slang: "we are so back", english: "Circumstances have reversed positively" },
  { slang: "lock in", english: "Focus with intense dedication" },
];

const FEATURES = [
  {
    icon: <Cpu className="w-5 h-5 text-zinc-300" />,
    title: "WebGPU Acceleration",
    desc: "Executes on your own GPU. Fast client computation, zero server inference fees.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
    title: "100% Private",
    desc: "Your text never leaves your device. Zero logging, zero surveillance.",
  },
  {
    icon: <WifiOff className="w-5 h-5 text-sky-400" />,
    title: "Offline Ready",
    desc: "Downloads weights from Hugging Face once and permanently caches in your browser.",
  },
  {
    icon: <Zap className="w-5 h-5 text-amber-400" />,
    title: "Instant Results",
    desc: "Live translation mode delivers standard English in under 100 ms.",
  },
  {
    icon: <History className="w-5 h-5 text-zinc-300" />,
    title: "Local History",
    desc: "Every translation saved locally. Review, copy, and re-use anytime.",
  },
  {
    icon: <Heart className="w-5 h-5 text-red-400" />,
    title: "Saved Favorites",
    desc: "Bookmark your top translations and organize them alphabetically.",
  },
];

export default function LandingPage() {
  const [hfDownloads, setHfDownloads] = useState<number>(955);

  useEffect(() => {
    fetch("/api/huggingface/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.downloads !== undefined) {
          setHfDownloads(data.downloads);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col relative overflow-hidden selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* === Subtle Ambient Vignette === */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-zinc-800/15 via-zinc-900/5 to-transparent blur-[120px] -z-10" />

      {/* === Navbar === */}
      <header className="w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-400 shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-semibold text-white text-base tracking-tight">
              GenZ<span className="text-zinc-400 font-normal">Translator</span>
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="https://huggingface.co/Sankar-2910/genz-translator"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 transition-colors px-2.5 py-1.5 rounded-lg"
            >
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-mono text-[11px]">{hfDownloads}</span>
              <span className="hidden sm:inline text-zinc-500 text-[10px]">downloads</span>
            </a>
            <Link
              href="/translate"
              className="px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium minimal-action-btn"
            >
              Start Translating
            </Link>
          </div>
        </div>
      </header>

      {/* === Hero Section === */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-16 pb-14">
        {/* Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-6 rounded-full text-xs font-medium bg-zinc-900/90 text-zinc-300 border border-zinc-800">
          <Zap className="w-3.5 h-3.5 text-emerald-400" />
          <span>100% On-Device · WebGPU · Quantized Q8</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-3xl leading-[1.1] mb-5">
          Decode Gen Z{" "}
          <span className="text-emerald-400">
            instantly.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed mb-8">
          A minimalist AI translator running directly inside your browser. No servers, no tracking — fast slang-to-English translation.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/translate"
            id="start-translating-btn"
            className="group flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm minimal-action-btn"
          >
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span>Open Translator</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <a
            href="https://huggingface.co/Sankar-2910/genz-translator"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl font-medium text-zinc-300 text-sm bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 hover:text-white transition-all"
          >
            <Globe className="w-4 h-4 text-zinc-400" />
            <span>Hugging Face Hub</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-60" />
          </a>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs text-zinc-500">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            Zero server inference
          </span>
          <span className="text-zinc-700">·</span>
          <span className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-zinc-400" />
            WebGPU acceleration
          </span>
          <span className="text-zinc-700">·</span>
          <span className="flex items-center gap-1.5">
            <WifiOff className="w-3.5 h-3.5 text-sky-400" />
            Works offline
          </span>
        </div>
      </section>

      {/* === Live Slang Preview Carousel === */}
      <section className="py-8 overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

        {/* Scrolling marquee */}
        <div className="flex gap-3 animate-marquee w-max">
          {[...SLANG_EXAMPLES, ...SLANG_EXAMPLES].map((item, i) => (
            <Link
              key={i}
              href={`/translate?text=${encodeURIComponent(item.slang)}`}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-zinc-900/60 border border-zinc-850 hover:border-zinc-700 shrink-0 min-w-max backdrop-blur-xs transition-all cursor-pointer group"
            >
              <span className="text-xs font-medium text-emerald-400">{item.slang}</span>
              <Repeat2 className="w-3 h-3 text-zinc-600 shrink-0" />
              <span className="text-xs text-zinc-300 group-hover:text-white transition-colors">{item.english}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* === Features Grid === */}
      <section className="py-14 px-4 sm:px-6 max-w-5xl mx-auto w-full">
        <div className="text-center mb-9">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Minimal architecture.{" "}
            <span className="text-zinc-400 font-normal">Runs on your machine.</span>
          </h2>
          <p className="text-zinc-400 text-sm max-w-lg mx-auto">
            Unlike cloud-based AI tools, GenZ Translator downloads the model weights directly from Hugging Face into your browser for local execution.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {FEATURES.map((f, i) => (
            <Link
              key={i}
              href="/translate"
              className="p-4 sm:p-5 rounded-xl bg-zinc-900/40 border border-zinc-850 hover:border-zinc-700 transition-all duration-150 group cursor-pointer block"
            >
              <div className="w-8 h-8 rounded-lg bg-zinc-850 border border-zinc-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-sm font-medium text-white mb-1">{f.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{f.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* === Bottom CTA === */}
      <section className="py-14 px-4 text-center border-t border-zinc-850">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Speak fluent Gen Z.
        </h2>
        <p className="text-zinc-400 text-sm mb-6 max-w-sm mx-auto">
          No signups. No API keys. Cached locally in browser for lifetime offline access.
        </p>
        <Link
          href="/translate"
          className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-medium text-sm minimal-action-btn"
        >
          <Sparkles className="w-4 h-4 text-emerald-500" />
          <span>Open Translator</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </section>

      {/* === Footer === */}
      <footer className="border-t border-zinc-850 py-6 text-center text-xs text-zinc-600 font-mono">
        <p>
          Model:{" "}
          <a
            href="https://huggingface.co/Sankar-2910/genz-translator"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors underline underline-offset-2"
          >
            Sankar-2910/genz-translator
          </a>{" "}
          · WebGPU Q8
        </p>
      </footer>

      {/* Marquee animation */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
        }
      `}</style>
    </div>
  );
}
