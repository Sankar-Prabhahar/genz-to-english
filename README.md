# GenZ Translator

<p align="center">
  <img src="https://img.shields.io/badge/WebGPU-Local%20Inference-6D5DF6?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Offline-After%20First%20Load-22C55E?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Model-26M%20Parameters-blue?style=for-the-badge" />
</p>

<p align="center">
  <b>Translate Gen Z slang into clear, standard English instantly — entirely on your own device.</b>
</p>

<p align="center">
  🌐 <a href="https://genz-to-english.vercel.app/">Live Demo</a> • 🤗 <a href="https://huggingface.co/Sankar-2910/genz-translator">Hugging Face Model</a>
</p>

---

## Overview

GenZ Translator is an AI-powered translator designed specifically for modern internet slang.

Instead of relying on cloud APIs or server-side inference, the website downloads the model once and performs all inference locally inside the user's browser using **WebGPU**. Your text never leaves your device.

### Example

| Input | Output |
|-------|--------|
| `no cap` | *I'm being completely honest.* |
| `she ate and left no crumbs` | *She did it perfectly.* |
| `touch grass` | *Reconnect with reality.* |
| `sigma behavior` | *Confident, independent behavior.* |

---

## Live Website

**Website**

> https://genz-to-english.vercel.app/

### Features

- Local AI inference
- WebGPU acceleration
- Offline after first model download
- Translation history
- Favorites
- Dark & Light mode
- Mobile-friendly
- Zero backend inference

---

# Model

The translator is powered by **genz-translator**, a compact decoder-only language model trained entirely from scratch.

Unlike fine-tuned Llama or Qwen models, this model **does not use any pretrained base model.**

Every parameter was initialized randomly and learned exclusively from a curated Gen Z → English translation dataset.

### Hugging Face

https://huggingface.co/Sankar-2910/genz-translator

---

## Architecture

| Component | Value |
|-----------|--------|
| Architecture | Decoder-only Transformer (LlamaConfig) |
| Parameters | **26M** |
| Layers | 7 |
| Hidden Size | 448 |
| Attention Heads | 7 |
| Vocabulary | 8,000 |
| Context Length | 384 tokens |
| Quantization | Q8 |
| Inference | WebGPU |

The model uses:

- RMSNorm
- RoPE positional embeddings
- SwiGLU feed-forward layers
- Tied input/output embeddings
- Greedy decoding (`temperature=0`)

---

## Training Data

The model was trained on approximately **139,000** cleaned instruction-response pairs.

Dataset characteristics:

- English only
- Gen Z slang → Standard English
- Sentence translation
- Paragraph translation
- 90/5/5 train-validation-test split
- Fixed instruction template

Example training prompt:

```text
<s><|instruction|>Translate the following Gen Z slang sentence into clear, standard English.<|input|>no cap<|response|>
