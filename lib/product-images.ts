import fs from "node:fs";
import path from "node:path";

const IMG_DIR = path.join(process.cwd(), "app", "img");

export function getImageFiles(): string[] {
  if (!fs.existsSync(IMG_DIR)) return [];
  return fs
    .readdirSync(IMG_DIR)
    .filter((f) => /\.(png|jpe?g|webp)$/i.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
}

export function productImageUrl(filename: string): string {
  return `/api/product-images/${encodeURIComponent(filename)}`;
}

export function getFirstTwoProductUrls(): {
  main: string | null;
  secondary: string | null;
} {
  const files = getImageFiles();
  return {
    main: files[0] ? productImageUrl(files[0]) : null,
    secondary: files[1] ? productImageUrl(files[1]) : null,
  };
}
