# GenZ Translator

<p align="center">
  <img src="https://img.shields.io/badge/WebGPU-Local%20Inference-6D5DF6?style=for-the-badge"/>
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
| `no cap` | *I'm being completely honest.* |
| `she ate and left no crumbs` | *She did it perfectly.* |
| `touch grass` | *Reconnect with reality.* |
| `sigma behavior` | *Confident, independent behavior.* |

---

# Live Website

### Website

https://genz-to-english.vercel.app/

### Features

- ⚡ Instant translation
- 🖥️ Runs entirely on your own device
- 🚀 WebGPU acceleration
- 📦 Offline after first model download
- 🌙 Dark & Light mode
- 📱 Mobile responsive
- ⭐ Translation history
- ❤️ Favorites
- 🔒 No server-side inference

---

# The Model

The website is powered by **genz-translator**, a compact decoder-only language model built specifically for translating Gen Z slang into standard English.

Unlike fine-tuned Llama, Qwen, or Mistral models, this project intentionally trains **from random initialization**, making every learned representation originate from the custom dataset.

### Hugging Face

https://huggingface.co/Sankar-2910/genz-translator

---

## Model Architecture

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
| Inference | WebGPU |

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

# Training Data

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

# Why a Small Model?

The objective was never to build another general-purpose chatbot.

Instead, the goal was creating a translator that:

- downloads quickly,
- works offline,
- runs on phones,
- runs on laptops,
- responds almost instantly,
- and requires zero cloud inference.

A **26M parameter** model strikes a practical balance between accuracy, latency, and portability.

---

# How Local AI Works

One of the core goals of this project is that **every user's own device performs the AI inference.**

No prompts are sent to a backend.

No text is processed on my computer.

Everything happens locally.

## Inference Pipeline

```text
Browser
    │
    ▼
Transformers.js
    │
    ▼
ONNX Runtime Web
    │
    ▼
WebGPU
    │
    ▼
Local Translation
```

The first visit downloads the model.

Future visits reuse the cached copy.

---

# Model Conversion Pipeline

The original model is stored as a **Q8 GGUF** model.

Since browsers cannot execute GGUF directly, the deployment pipeline is:

```text
GGUF (Q8)
      │
      ▼
Hugging Face Format
      │
      ▼
ONNX
      │
      ▼
Transformers.js
      │
      ▼
WebGPU
```

This preserves local execution while enabling browser compatibility.

---

# Running Locally

## Requirements

- Node.js 20+
- npm or pnpm
- Modern browser with WebGPU support

Recommended browsers:

- Chrome
- Edge
- Brave
- Safari (latest)

---

## Installation

Clone the repository.

```bash
git clone https://github.com/YOUR_USERNAME/genz-translator-web.git
cd genz-translator-web
```

Install dependencies.

```bash
npm install
```

Run the development server.

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# Project Structure

```text
genz-translator-web/

├── app/
├── components/
│   ├── InputCard.tsx
│   ├── OutputCard.tsx
│   ├── ExampleChips.tsx
│   ├── HistoryCard.tsx
│   └── FavoriteCard.tsx
│
├── lib/
│   ├── inference.ts
│   ├── model.ts
│   └── storage.ts
│
├── public/
├── styles/
├── package.json
└── next.config.js
```

---

# Browser Support

| Browser | Support |
|----------|----------|
| Chrome | ✅ |
| Edge | ✅ |
| Brave | ✅ |
| Safari | ✅ |
| Firefox | Experimental |

If WebGPU is unavailable, the application falls back to WebAssembly where supported.

---

# Performance

| Metric | Typical |
|---------|---------|
| First model download | One-time |
| Cached startup | Under 1 second |
| Translation latency | Under 500 ms |
| Internet required | Only for first download |

---

# Limitations

This model was trained entirely from scratch on a specialized dataset.

Because of that:

- It is **not** intended as a chatbot.
- General reasoning is limited.
- Some rare slang may translate imperfectly.
- Very long conversations are outside its intended use.

The model is optimized specifically for **Gen Z → Standard English translation.**

---

# Roadmap

- [x] Local WebGPU inference
- [x] Offline caching
- [x] Mobile responsive UI
- [x] Translation history
- [x] Favorites
- [ ] Browser extension
- [ ] Clipboard translation
- [ ] Keyboard integration
- [ ] Progressive Web App (PWA)

---

# Tech Stack

| Component | Technology |
|------------|------------|
| Frontend | Next.js 15 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI | shadcn/ui |
| AI | Transformers.js |
| Runtime | ONNX Runtime Web |
| GPU | WebGPU |
| Deployment | Vercel |

---

# Repository

| Resource | Link |
|----------|------|
| Live Website | https://genz-to-english.vercel.app/ |
| Hugging Face Model | https://huggingface.co/Sankar-2910/genz-translator |

---

# License

This project is released under the **Apache 2.0 License.**

---

# Author

**Sankar Narayanan**

Built to demonstrate that a compact, from-scratch language model can deliver useful real-time translations directly inside a web browser without requiring cloud inference.

If you found this project useful, consider starring the repository ⭐.
