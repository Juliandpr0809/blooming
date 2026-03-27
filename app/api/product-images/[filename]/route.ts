import { readFileSync } from "fs";
import path from "path";
import { NextResponse } from "next/server";

const IMG_DIR = path.resolve(process.cwd(), "app", "img");

export async function GET(
  _request: Request,
  { params }: { params: { filename: string } }
) {
  const basename = path.basename(decodeURIComponent(params.filename));
  if (!/\.(png|jpe?g|webp)$/i.test(basename)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const filePath = path.join(IMG_DIR, basename);
  if (!filePath.startsWith(IMG_DIR)) {
    return new NextResponse("Not found", { status: 404 });
  }

  try {
    const file = readFileSync(filePath);
    const ext = basename.split(".").pop()?.toLowerCase();
    const mimeTypes: Record<string, string> = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      webp: "image/webp",
    };
    return new NextResponse(file, {
      headers: {
        "Content-Type": mimeTypes[ext ?? "jpg"] ?? "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
