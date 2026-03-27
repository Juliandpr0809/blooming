import { getImageFiles, productImageUrl } from "@/lib/product-images";
import CatalogGrid from "./CatalogGrid";

function humanizeFilename(file: string): string {
  const base = file.replace(/\.[^/.]+$/, "");
  return base
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function Portfolio() {
  const files = getImageFiles();
  const items = files.map((file) => ({
    src: productImageUrl(file),
    label: humanizeFilename(file),
  }));

  return (
    <section
      id="catalog"
      className="border-t border-line px-gutter py-section"
    >
      <div className="mx-auto max-w-[1400px]">
        <p className="font-sans text-small uppercase tracking-[0.26em] text-earth-muted">
          Catálogo
        </p>
        <h2 className="mt-5 font-serif text-display-lg font-light leading-[1.05] text-ink text-balance">
          Colección sensorial
        </h2>
      </div>

      <CatalogGrid items={items} />
    </section>
  );
}
