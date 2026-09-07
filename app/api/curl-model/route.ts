import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const HF_BASE = "https://huggingface.co/Sankar-2910/genz-translator/resolve/main";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const file = searchParams.get("file") || "genz-translator-q8_0.gguf";
  const download = searchParams.get("download") === "true";

  const targetUrl = `${HF_BASE}/${encodeURIComponent(file)}`;

  try {
    const startTime = Date.now();
    const hfRes = await fetch(targetUrl, {
      method: "GET",
      headers: {
        "User-Agent": "curl/8.4.0",
        Accept: "*/*",
      },
      // Redirect manual or follow
      redirect: "follow",
    });

    if (!hfRes.ok) {
      return NextResponse.json(
        {
          success: false,
          error: `Hugging Face responded with status ${hfRes.status}`,
          targetUrl,
        },
        { status: hfRes.status }
      );
    }

    // If client requested direct file download stream
    if (download && hfRes.body) {
      const headers = new Headers();
      headers.set("Content-Type", hfRes.headers.get("content-type") || "application/octet-stream");
      headers.set(
        "Content-Disposition",
        `attachment; filename="${file}"`
      );
      if (hfRes.headers.get("content-length")) {
        headers.set("Content-Length", hfRes.headers.get("content-length")!);
      }

      return new NextResponse(hfRes.body as BodyInit, {
        status: 200,
        headers,
      });
    }

    // Otherwise consume the stream to register download count on Hugging Face CDN
    const reader = hfRes.body?.getReader();
    let totalBytes = 0;

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) {
          totalBytes += value.length;
        }
      }
    }

    const elapsedMs = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      file,
      url: targetUrl,
      bytesCurled: totalBytes,
      timeMs: elapsedMs,
      message: `Successfully curled ${file} (${(totalBytes / (1024 * 1024)).toFixed(2)} MB) from Hugging Face CDN with User-Agent: curl/8.4.0. Hugging Face download count registered.`,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error during curl";
    console.error("Failed to curl model from Hugging Face:", message);
    return NextResponse.json(
      {
        success: false,
        error: message,
        targetUrl,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  return GET(req);
}
