import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

const IMG_DIR = path.resolve(process.cwd(), "app", "img");

function mime(ext: string): string {
  const e = ext.toLowerCase();
  if (e === ".png") return "image/png";
  if (e === ".jpg" || e === ".jpeg") return "image/jpeg";
  if (e === ".webp") return "image/webp";
  return "application/octet-stream";
}

export async function GET(
  _request: Request,
  { params }: { params: { file: string } }
) {
  const raw = decodeURIComponent(params.file);
  const basename = path.basename(raw);
  if (!/\.(png|jpe?g|webp)$/i.test(basename)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const full = path.resolve(IMG_DIR, basename);
  if (!full.startsWith(IMG_DIR) || !fs.existsSync(full)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const buf = fs.readFileSync(full);
  return new NextResponse(buf, {
    headers: {
      "Content-Type": mime(path.extname(basename)),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
