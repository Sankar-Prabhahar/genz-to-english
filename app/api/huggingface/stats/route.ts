import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await fetch("https://huggingface.co/api/models/Sankar-2910/genz-translator", {
      headers: {
        "User-Agent": "GenZ-Translator-App/1.0",
        Accept: "application/json",
      },
      next: { revalidate: 30 }, // cache for 30s
    });

    if (!res.ok) {
      return NextResponse.json({
        downloads: 955,
        likes: 1,
        modelId: "Sankar-2910/genz-translator",
        status: "available",
      });
    }

    const data = await res.json();
    return NextResponse.json({
      downloads: data.downloads ?? 955,
      likes: data.likes ?? 1,
      modelId: data.modelId || "Sankar-2910/genz-translator",
      lastModified: data.lastModified,
      sha: data.sha,
      status: "online",
    });
  } catch (error) {
    console.error("Error fetching Hugging Face stats:", error);
    return NextResponse.json({
      downloads: 955,
      likes: 1,
      modelId: "Sankar-2910/genz-translator",
      status: "fallback",
    });
  }
}
