# GenZ Translator — ONNX & WebGPU Pipeline Guide

This guide details how to export `Sankar-2910/genz-translator` (or its GGUF checkpoint) into ONNX format for zero-server WebGPU in-browser inference.

---

## 1. Prerequisites

Run in Python 3.10+ virtual environment:

```bash
pip install "transformers>=4.40.0" "optimum[onnxruntime]>=1.18.0" onnx onnxruntime huggingface_hub
```

---

## 2. One-Command Automated Conversion

Run the included automated conversion pipeline:

```bash
python scripts/convert_to_onnx.py
```

This will:
1. Download or load the model (`Sankar-2910/genz-translator`).
2. Export the causal LM architecture to browser-compatible ONNX format with past-key-values attention support.
3. Quantize the weights to 8-bit integers (`model_quantized.onnx`), yielding a fast, compact footprint (~30MB to 50MB) ideal for instant browser download.

---

## 3. Uploading to Hugging Face

To enable Transformers.js to load the model directly from the Hugging Face hub, upload the output files into an `onnx/` folder in your Hugging Face repository:

```bash
huggingface-cli login
huggingface-cli upload Sankar-2910/genz-translator onnx_export/ onnx/
```

After upload, the repository structure will look like:
```text
Sankar-2910/genz-translator
├── onnx/
│   ├── model.onnx
│   ├── model_quantized.onnx
│   └── model.onnx_data (if >2GB, otherwise embedded)
├── config.json
├── tokenizer.json
├── tokenizer_config.json
└── special_tokens_map.json
```

---

## 4. Local Deployment Alternative

If you prefer to bundle the ONNX weights directly with the website without calling Hugging Face at runtime:
1. Copy the contents of `onnx_export/` to `public/models/genz-translator/`.
2. The web worker will automatically discover and load the weights directly from `/models/genz-translator/`.

---

## 5. WebGPU Inference Details

- **Framework**: Transformers.js v3
- **Device**: `device: "webgpu"` with automatic fallback to `device: "wasm"`
- **Prompt Format**:
  ```text
  <s><|instruction|>Translate the following Gen Z slang sentence into clear, standard English.<|input|>{text}<|response|>
  ```
- **Inference Config**:
  - `temperature: 0` (deterministic)
  - `top_p: 1`
  - `max_new_tokens: 128`
  - `repetition_penalty: 1.0`
