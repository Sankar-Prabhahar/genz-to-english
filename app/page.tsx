"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Cpu, ShieldCheck, WifiOff, Zap, ArrowRight, Repeat2, History, Heart, Globe } from "lucide-react";

const SLANG_EXAMPLES = [
  { slang: "no cap", english: "I'm being completely honest" },
  { slang: "she ate", english: "She performed flawlessly" },
  { slang: "delulu", english: "Delusionally optimistic" },
  { slang: "rizz", english: "Natural romantic charisma" },
  { slang: "cooked", english: "In serious trouble" },
  { slang: "touch grass", english: "Go spend time outside" },
];

const FEATURES = [
  {
    icon: <Cpu className="w-5 h-5 text-purple-400" />,
    title: "WebGPU Acceleration",
    desc: "Runs on your own GPU — no cloud compute, no waiting for servers.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
    title: "100% Private",
    desc: "Your text never leaves your device. Zero logging, zero tracking.",
  },
  {
    icon: <WifiOff className="w-5 h-5 text-sky-400" />,
    title: "Offline Ready",
    desc: "Model downloads once and is cached for instant future sessions.",
  },
  {
    icon: <Zap className="w-5 h-5 text-yellow-400" />,
    title: "Instant Results",
    desc: "Live translation mode gives you output in under 500 ms.",
  },
  {
    icon: <History className="w-5 h-5 text-indigo-400" />,
    title: "Translation History",
    desc: "Every translation saved locally. Review and re-use anytime.",
  },
  {
    icon: <Heart className="w-5 h-5 text-pink-400" />,
    title: "Save Favorites",
    desc: "Bookmark your best translations and search them alphabetically.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col relative overflow-hidden">
      {/* === Ambient Glows === */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-purple-900/25 via-indigo-950/10 to-transparent blur-[130px] -z-10" />
      <div className="pointer-events-none absolute top-[50%] right-[-5%] w-[450px] h-[450px] bg-pink-950/10 blur-[110px] -z-10" />
      <div className="pointer-events-none absolute bottom-0 left-[5%] w-[350px] h-[350px] bg-indigo-950/15 blur-[100px] -z-10" />

      {/* === Navbar === */}
      <header className="w-full border-b border-white/5 bg-zinc-950/70 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20 ring-1 ring-white/10">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-white text-lg tracking-tight">
              GenZ<span className="text-purple-400">Translator</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://huggingface.co/Sankar-2910/genz-translator"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Hugging Face</span>
            </a>
            <Link
              href="/translate"
              className="px-4 py-2 rounded-xl text-sm font-semibold text-white purple-gradient-btn shadow-lg shadow-purple-600/20"
            >
              Start Translating
            </Link>
          </div>
        </div>
      </header>

      {/* === Hero Section === */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-20 pb-16">
        {/* Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-6 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 backdrop-blur-md">
          <Zap className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
          <span>100% Client-Side · Powered by WebGPU · Q8 Quantized</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-3xl leading-[1.1] mb-6">
          Decode Gen Z{" "}
          <span className="relative">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
              instantly.
            </span>
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-full opacity-50" />
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-xl text-zinc-400 max-w-xl mx-auto leading-relaxed mb-10">
          An AI model running inside your browser with WebGPU. No servers, no
          tracking — just blazing-fast slang-to-English translation.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/translate"
            id="start-translating-btn"
            className="group flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white text-base purple-gradient-btn shadow-2xl shadow-purple-600/30 transition-all"
          >
            <Sparkles className="w-5 h-5" />
            <span>Start Translating</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <a
            href="https://huggingface.co/Sankar-2910/genz-translator"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-4 rounded-2xl font-medium text-zinc-300 text-sm border border-zinc-800 hover:border-zinc-700 hover:text-white hover:bg-white/5 transition-all"
          >
            <span>View AI Model</span>
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
            <Cpu className="w-3.5 h-3.5 text-purple-500" />
            WebGPU native
          </span>
          <span className="text-zinc-700">·</span>
          <span className="flex items-center gap-1.5">
            <WifiOff className="w-3.5 h-3.5 text-sky-500" />
            Works offline
          </span>
        </div>
      </section>

      {/* === Live Slang Preview Carousel === */}
      <section className="py-10 overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-zinc-950 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-zinc-950 to-transparent z-10" />

        {/* Scrolling marquee */}
        <div className="flex gap-4 animate-marquee w-max">
          {[...SLANG_EXAMPLES, ...SLANG_EXAMPLES].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-zinc-900/70 border border-zinc-800/80 shrink-0 min-w-max backdrop-blur-sm"
            >
              <span className="text-sm font-bold text-purple-300">{item.slang}</span>
              <Repeat2 className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              <span className="text-sm text-zinc-300">{item.english}</span>
            </div>
          ))}
        </div>
      </section>

      {/* === Features Grid === */}
      <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto w-full">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Built different.{" "}
            <span className="text-purple-400">Runs on your machine.</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-lg mx-auto">
            Unlike every other AI tool, GenZ Translator uses your own GPU. Your words never leave your browser.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-purple-500/30 hover:-translate-y-0.5 transition-all duration-150 backdrop-blur-sm"
            >
              <div className="w-9 h-9 rounded-xl bg-zinc-800 flex items-center justify-center mb-3.5">
                {f.icon}
              </div>
              <h3 className="text-sm font-semibold text-white mb-1.5">{f.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* === Bottom CTA === */}
      <section className="py-16 px-4 text-center border-t border-white/5">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Ready to speak fluent Gen Z?
        </h2>
        <p className="text-zinc-400 text-sm mb-8 max-w-sm mx-auto">
          No signup. No API key. No server. Just click, download once, and translate forever.
        </p>
        <Link
          href="/translate"
          className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-white purple-gradient-btn shadow-2xl shadow-purple-600/25"
        >
          <Sparkles className="w-5 h-5" />
          <span>Open Translator</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </section>

      {/* === Footer === */}
      <footer className="border-t border-white/5 py-6 text-center text-xs text-zinc-600">
        <p>
          Model:{" "}
          <a
            href="https://huggingface.co/Sankar-2910/genz-translator"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-500 hover:text-purple-300 transition-colors"
          >
            Sankar-2910/genz-translator
          </a>{" "}
          · Built with Next.js 15 + Transformers.js · WebGPU Q8
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
