# GenZ Translator ⚡

<p align="center">
  <img src="https://img.shields.io/badge/WebGPU-Local%20Inference-10B981?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Offline-After%20First%20Load-22C55E?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Model-26M%20Parameters-blue?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/License-Apache%202.0-orange?style=for-the-badge"/>
</p>

<p align="center">
  <strong>Translate Gen Z slang into clear, standard English instantly — entirely on your own device.</strong>
</p>

<p align="center">
  🌐 <a href="https://genz-to-english.vercel.app/">Live Demo</a> • 🤗 <a href="https://huggingface.co/Sankar-2910/genz-translator">Hugging Face Model</a>
</p>

---

## Overview

GenZ Translator is an AI-powered translator designed specifically for modern internet slang.

Unlike cloud-based AI assistants, every translation happens **locally inside the user's browser** using **WebGPU**, meaning your text never leaves your device after the model has been downloaded.

The model itself was trained **entirely from scratch** on a curated Gen Z → English translation dataset, with **random weight initialization** and **no pretrained base model**.

### Example

| Input | Output |
|-------|--------|
| `no cap` | *I am being completely honest and not exaggerating.* |
| `she ate and left no crumbs` | *She performed flawlessly and executed her role to absolute perfection.* |
| `touch grass` | *Disconnect from the internet and experience the real world.* |
| `bro is cooked` | *He is in a disastrous situation with little hope of recovery.* |
| `let him cook` | *Allow him the freedom to pursue the idea without premature interruption.* |

---

## ✨ Features

- ⚡ **Instant Translation**: Real-time slang translation with under 100 ms latency.
- 🖥️ **100% On-Device Neural Inference**: Model weights are streamed directly from Hugging Face Hub and cached locally in browser `CacheStorage`.
- 🚀 **WebGPU Acceleration**: Local GPU execution with automatic WASM CPU fallback for universal device support.
- 🔒 **Zero Server Tracking**: No queries or text ever leave your device. Complete client-side privacy.
- 🎨 **Minimalist Design**: Clean, modern obsidian aesthetic with electric emerald accents and support for Dark, Light, and System themes.
- 🔊 **Audio Feedback**: Subtle, crisp UI audio feedback powered by the Web Audio API.
- 📚 **Expanded Slang Lexicon**: Covers 55+ modern Gen Z slang terms, idioms (*let him cook*, *lock in*, *we are so back*, *aura*, *crash out*), and full contextual sentence parsing.
- 💾 **Favorites & History**: Save your top translations, search alphabetically, or browse recent history with one-click copy.
- 📥 **Direct Model Access**: Integrated Hugging Face Hub live stats, server curl trigger (`/api/curl-model`), and direct GGUF model file download.

---

## 🤖 The Model

The website is powered by **genz-translator**, a compact decoder-only language model built specifically for translating Gen Z slang into standard English.

Unlike fine-tuned Llama, Qwen, or Mistral models, this project intentionally trains **from random initialization**, making every learned representation originate from the custom dataset.

- **Hugging Face Hub**: [`Sankar-2910/genz-translator`](https://huggingface.co/Sankar-2910/genz-translator)

### Model Architecture

| Component | Value |
|-----------|--------|
| Architecture | Decoder-only Transformer (LlamaConfig) |
| Parameters | **26.07M** |
| Layers | 7 |
| Hidden Size | 448 |
| Attention Heads | 7 |
| KV Heads | 7 |
| Intermediate Size | 1792 |
| Vocabulary | 8,000 |
| Context Length | 384 |
| Quantization | Q8 |
| Inference | WebGPU / WASM |

### Transformer Design

The model includes:

- RMSNorm
- RoPE positional embeddings
- SwiGLU feed-forward layers
- Tied input/output embeddings
- Greedy decoding (`temperature=0`)
- Decoder-only autoregressive generation

This architecture keeps inference lightweight enough for real-time browser execution while preserving translation quality.

---

## Training Data

The model was trained on approximately **139,000** cleaned instruction-response pairs.

### Dataset Characteristics

- English only
- Gen Z slang → Standard English
- Single sentence translation
- Paragraph translation
- Fixed instruction template
- 90/5/5 train-validation-test split

Example training prompt:

```text
<s><|instruction|>Translate the following Gen Z slang sentence into clear, standard English.<|input|>no cap<|response|>
```

---

## 🚀 Running Locally

### Requirements

- Node.js 20+
- npm or pnpm
- Modern browser with WebGPU support (Chrome, Edge, Brave, Safari)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Sankar-Prabhahar/genz-to-english.git
cd genz-to-english
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

4. Build for production:
```bash
npm run build
npm start
```

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | Next.js 16 (App Router + Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + Vanilla CSS Design Tokens |
| AI Inference | Web Worker + WebGPU / WASM + Browser Cache API |
| Audio | Web Audio API Synthesizer |
| Model Hub | Hugging Face Hub (`Sankar-2910/genz-translator`) |

---

## 📄 License

This project is released under the **Apache 2.0 License.**

---

## 👤 Author

**Sankar Narayanan**

Built to demonstrate that a compact, from-scratch language model can deliver useful real-time translations directly inside a web browser without requiring cloud inference.
