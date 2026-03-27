import { getImageFiles, productImageUrl } from "./product-images";

export type CollectionCardData = {
  number: string;
  title: string;
  subtitle: string;
  imageSrc: string;
};

const COLLECTIONS_META = [
  {
    number: "01",
    title: "Arreglo Primaveral",
    subtitle: "Colección principal",
  },
  {
    number: "02",
    title: "Corazón en Flor",
    subtitle: "Edición especial",
  },
  {
    number: "03",
    title: "Cesta de Campo",
    subtitle: "Colección regalo",
  },
  {
    number: "04",
    title: "Velas Signature",
    subtitle: "Línea personalizada",
  },
] as const;

const PLACEHOLDER_IMG =
  "/api/product-images/Gemini_Generated_Image_1kp0y31kp0y31kp0.png";

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
    subtitle: meta.subtitle,
    imageSrc:
      files[i] != null ? productImageUrl(files[i]!) : PLACEHOLDER_IMG,
  }));

  return { bgSrc, cards };
}
