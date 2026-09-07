import { TranslationItem, UserSettings } from "./types";

const HISTORY_KEY = "genz_translator_history_v1";
const SETTINGS_KEY = "genz_translator_settings_v1";

const DEFAULT_SETTINGS: UserSettings = {
  theme: "dark",
  backendPreference: "auto",
  liveTranslate: false,
  soundEffects: true,
};

export const storage = {
  getHistory(): TranslationItem[] {
    if (typeof window === "undefined") return [];
    try {
      const data = localStorage.getItem(HISTORY_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveHistory(items: TranslationItem[]): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(items.slice(0, 100)));
    } catch (e) {
      console.error("Failed to save history to localStorage", e);
    }
  },

  addHistoryItem(item: TranslationItem): TranslationItem[] {
    const history = this.getHistory();
    // avoid exact duplicate at top
    const filtered = history.filter(
      (h) => h.input.trim().toLowerCase() !== item.input.trim().toLowerCase()
    );
    const updated = [item, ...filtered].slice(0, 100);
    this.saveHistory(updated);
    return updated;
  },

  toggleFavorite(id: string): TranslationItem[] {
    const history = this.getHistory();
    const updated = history.map((item) =>
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    );
    this.saveHistory(updated);
    return updated;
  },

  deleteHistoryItem(id: string): TranslationItem[] {
    const history = this.getHistory();
    const updated = history.filter((item) => item.id !== id);
    this.saveHistory(updated);
    return updated;
  },

  clearHistory(): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(HISTORY_KEY);
    } catch {}
  },

  getSettings(): UserSettings {
    if (typeof window === "undefined") return DEFAULT_SETTINGS;
    try {
      const data = localStorage.getItem(SETTINGS_KEY);
      return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  },

  saveSettings(settings: Partial<UserSettings>): UserSettings {
    const current = this.getSettings();
    const updated = { ...current, ...settings };
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save settings", e);
      }
    }
    return updated;
  },

  async clearModelCache(): Promise<boolean> {
    if (typeof window === "undefined") return false;
    try {
      if ("caches" in window) {
        const cacheNames = await caches.keys();
        for (const name of cacheNames) {
          if (
            name.includes("transformers") ||
            name.includes("onnx") ||
            name.includes("huggingface") ||
            name.includes("genz-model-cache")
          ) {
            await caches.delete(name);
          }
        }
      }
      return true;
    } catch (e) {
      console.error("Error clearing model cache", e);
      return false;
    }
  },
};
