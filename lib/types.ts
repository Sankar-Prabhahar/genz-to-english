export interface TranslationItem {
  id: string;
  input: string;
  output: string;
  timestamp: number;
  isFavorite?: boolean;
  backend?: "webgpu" | "wasm" | "hybrid-offline";
  latencyMs?: number;
}

export type DeviceBackend = "webgpu" | "wasm";

export interface ModelProgressInfo {
  status: "idle" | "checking" | "downloading" | "loading" | "ready" | "translating" | "error";
  progress: number; // 0 to 100
  loadedBytes: number;
  totalBytes: number;
  speedMBps: number;
  etaSeconds: number;
  device: DeviceBackend;
  deviceSupported: boolean;
  modelName: string;
  isCached: boolean;
  error?: string;
  hfDownloads?: number;
  hfLikes?: number;
}

export interface UserSettings {
  theme: "system" | "dark" | "light";
  backendPreference: "auto" | "webgpu" | "wasm";
  liveTranslate: boolean;
  soundEffects: boolean;
}

export interface SlangDefinition {
  term: string;
  meaning: string;
  formalExample: string;
  category: "affirmation" | "criticism" | "reaction" | "vibe" | "behavior";
}
