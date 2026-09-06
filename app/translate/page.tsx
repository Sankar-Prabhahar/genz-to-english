"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ModelStatusBanner } from "@/components/ModelStatusBanner";
import { InputCard } from "@/components/InputCard";
import { ExampleChips } from "@/components/ExampleChips";
import { OutputCard } from "@/components/OutputCard";
import { HistorySection } from "@/components/HistorySection";
import { FavoritesModal } from "@/components/FavoritesModal";
import { SettingsModal } from "@/components/SettingsModal";
import { useTranslator } from "@/lib/useTranslator";
import { TranslationItem } from "@/lib/types";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function TranslatePage() {
  const {
    input,
    setInput,
    currentTranslation,
    isTranslating,
    modelInfo,
    history,
    settings,
    translate,
    toggleFavorite,
    deleteHistoryItem,
    clearHistory,
    updateSettings,
    clearCache,
  } = useTranslator();

  const [favoritesModalOpen, setFavoritesModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  const favorites = useMemo(
    () => history.filter((item) => item.isFavorite),
    [history]
  );

  const handleSelectExample = (text: string) => {
    setInput(text);
    translate(text);
  };

  const handleSelectHistoryItem = (item: TranslationItem) => {
    setInput(item.input);
    translate(item.input);
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 selection:bg-purple-600 selection:text-white relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-purple-900/20 via-indigo-950/15 to-transparent blur-[120px] -z-10" />
      <div className="pointer-events-none absolute top-[30%] right-[-10%] w-[400px] h-[400px] bg-purple-950/15 blur-[100px] -z-10" />

      {/* Sticky Header */}
      <Navbar
        modelInfo={modelInfo}
        favoritesCount={favorites.length}
        historyCount={history.length}
        onOpenFavorites={() => setFavoritesModalOpen(true)}
        onOpenHistory={() => {
          const el = document.getElementById("history-section");
          el?.scrollIntoView({ behavior: "smooth" });
        }}
        onOpenSettings={() => setSettingsModalOpen(true)}
      />

      {/* Main Content Container */}
      <main className="flex-1 w-full max-w-[720px] mx-auto px-4 pb-16 flex flex-col">
        {/* Back to Home */}
        <div className="pt-5">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to home</span>
          </Link>
        </div>

        {/* Hero Section */}
        <Hero />

        {/* Model Download & Progress Banner */}
        <ModelStatusBanner modelInfo={modelInfo} />

        {/* Primary Input Card */}
        <InputCard
          input={input}
          onChange={setInput}
          onTranslate={() => translate()}
          isTranslating={isTranslating}
          liveTranslate={settings.liveTranslate}
          onToggleLiveTranslate={(val) => updateSettings({ liveTranslate: val })}
        />

        {/* Example Slang Chips */}
        <ExampleChips
          onSelectChip={handleSelectExample}
          selectedText={input}
        />

        {/* Output Translation Card */}
        <OutputCard
          translation={currentTranslation}
          onToggleFavorite={toggleFavorite}
        />

        {/* Translation History */}
        <div id="history-section">
          <HistorySection
            history={history}
            onSelectTranslation={handleSelectHistoryItem}
            onToggleFavorite={toggleFavorite}
            onDelete={deleteHistoryItem}
            onClearAll={clearHistory}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 py-8 bg-zinc-950/80 backdrop-blur-md text-xs text-zinc-500">
        <div className="max-w-[720px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>Zero server inference • 100% On-Device Privacy</span>
          </div>
          <div className="flex items-center gap-3">
            <span>Model: Sankar-2910/genz-translator</span>
            <span>•</span>
            <span>WebGPU + Next.js 15</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <FavoritesModal
        isOpen={favoritesModalOpen}
        onClose={() => setFavoritesModalOpen(false)}
        favorites={favorites}
        onSelectFavorite={(item) => {
          setInput(item.input);
          translate(item.input);
        }}
        onToggleFavorite={toggleFavorite}
      />

      <SettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        settings={settings}
        onUpdateSettings={updateSettings}
        modelInfo={modelInfo}
        onClearCache={clearCache}
      />
    </div>
  );
}
