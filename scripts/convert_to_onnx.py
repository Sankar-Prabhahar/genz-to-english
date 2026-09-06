"""
GenZ Translator: GGUF -> HuggingFace -> ONNX WebGPU Export Pipeline
Model: Sankar-2910/genz-translator
Target: WebGPU (ONNX Runtime Web / Transformers.js v3)

Usage:
  1. pip install transformers optimum onnx onnxruntime
  2. python scripts/convert_to_onnx.py
"""

import os
import sys
import argparse
import subprocess
from pathlib import Path

MODEL_ID = "Sankar-2910/genz-translator"
GGUF_FILE = "genz-translator-q8_0.gguf"
OUTPUT_DIR = "onnx_export"

def check_requirements():
    print("Checking dependencies...")
    try:
        import transformers
        import optimum
        print(f"✓ transformers: {transformers.__version__}")
        print(f"✓ optimum: {optimum.__version__}")
    except ImportError as e:
        print(f"Missing dependency: {e.name}")
        print("Please run: pip install transformers optimum[onnxruntime] onnx")
        sys.exit(1)

def export_to_onnx(model_id: str, output_path: str, quantize_q8: bool = True):
    print(f"\n==================================================")
    print(f"Exporting '{model_id}' to ONNX format...")
    print(f"Output directory: {output_path}")
    print(f"==================================================\n")

    os.makedirs(output_path, exist_ok=True)

    # Step 1: Export using Optimum CLI
    # This automatically produces WebGPU-compatible text-generation ONNX models
    cmd = [
        sys.executable, "-m", "optimum.exporters.onnx",
        "--model", model_id,
        "--task", "text-generation-with-past",
        "--trust-remote-code",
        output_path
    ]

    print(f"Running command:\n{' '.join(cmd)}\n")
    result = subprocess.run(cmd)

    if result.returncode != 0:
        print("\nPrimary export failed. Trying fallback without past key-values...")
        cmd_fallback = [
            sys.executable, "-m", "optimum.exporters.onnx",
            "--model", model_id,
            "--task", "text-generation",
            "--trust-remote-code",
            output_path
        ]
        res_fallback = subprocess.run(cmd_fallback)
        if res_fallback.returncode != 0:
            print("\n❌ ONNX export failed. Please check the model files and PyTorch environment.")
            sys.exit(1)

    # Step 2: Quantize to 8-bit if requested
    if quantize_q8:
        print("\nApplying 8-bit dynamic quantization for WebGPU...")
        try:
            from onnxruntime.quantization import quantize_dynamic, QuantType
            onnx_files = list(Path(output_path).glob("*.onnx"))
            for model_file in onnx_files:
                if "quantized" in model_file.name:
                    continue
                quantized_file = model_file.parent / f"{model_file.stem}_quantized.onnx"
                print(f"Quantizing {model_file.name} -> {quantized_file.name}...")
                quantize_dynamic(
                    model_input=str(model_file),
                    model_output=str(quantized_file),
                    weight_type=QuantType.QUInt8
                )
            print("✓ 8-bit quantization completed.")
        except Exception as e:
            print(f"Warning during quantization: {e}. You can still use the FP16/FP32 model.")

    print("\n==================================================")
    print("Export Complete!")
    print(f"Directory structure in '{output_path}':")
    for item in os.listdir(output_path):
        size_mb = os.path.getsize(os.path.join(output_path, item)) / (1024 * 1024)
        print(f" - {item} ({size_mb:.2f} MB)")
    print("\nNext Steps:")
    print(f"1. Push files in '{output_path}/' to your Hugging Face repo '{model_id}' under an 'onnx/' subfolder, OR")
    print(f"2. Copy them into your website's 'public/models/genz-translator/' folder.")
    print("==================================================")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Convert GenZ Translator GGUF/HF to ONNX for WebGPU")
    parser.add_argument("--model", default=MODEL_ID, help="Hugging Face Model ID or local directory")
    parser.add_argument("--output", default=OUTPUT_DIR, help="Destination directory")
    parser.add_argument("--no-quantize", action="store_true", help="Skip 8-bit quantization")

    args = parser.parse_args()
    check_requirements()
    export_to_onnx(args.model, args.output, quantize_q8=not args.no_quantize)
