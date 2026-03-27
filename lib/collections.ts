import { getImageFiles, productImageUrl } from "./product-images";

export type CollectionCardData = {
  number: string;
  title: string;
  imageSrc: string;
};

const COLLECTIONS_META = [
  { number: "01", title: "Arreglos Florales" },
  { number: "02", title: "Velas Personalizadas" },
  { number: "03", title: "Sets de Regalo" },
  { number: "04", title: "Velas Decorativas" },
] as const;

const PLACEHOLDER_IMG =
  "https://images.unsplash.com/photo-1605651930929-73c0ef98f4d3?q=80&w=800&auto=format&fit=crop";

export function getCollectionsData(): {
  bgSrc: string | null;
  cards: CollectionCardData[];
} {
  const files = getImageFiles();
  const bgSrc =
    files.length > 0 ? productImageUrl(files[files.length - 1]!) : null;

  const cards: CollectionCardData[] = COLLECTIONS_META.map((meta, i) => ({
    number: meta.number,
    title: meta.title,
    imageSrc:
      files.length > 0
        ? productImageUrl(files[i % files.length]!)
        : PLACEHOLDER_IMG,
  }));

  return { bgSrc, cards };
}
