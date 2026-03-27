import About from "@/components/About";
import Collections from "@/components/Collections";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Journal from "@/components/Journal";
import Navigation from "@/components/Navigation";
import ProductSlideshow, {
  type SlideProduct,
} from "@/components/ProductSlideshow";
import { getCollectionsData } from "@/lib/collections";
import { getImageFiles, productImageUrl } from "@/lib/product-images";

const PLACEHOLDER_IMG =
  "/api/product-images/Gemini_Generated_Image_1ik7ew1ik7ew1ik7.png";

const SLIDESHOW_BG =
  "/api/product-images/Whisk_7e10bfa53ebcbc38b2b47ed3ef124c5edr";

const SLIDE_PRODUCTS_BASE: Omit<SlideProduct, "image" | "bgImage">[] = [
  {
    index: "01",
    title: "Arreglo Primaveral",
    subtitle: "Colección principal",
    description:
      "Composición artesanal con flores preservadas y velas de cera natural. Cada pieza es única.",
    accent: "Rosa, lila y verde eucalipto",
  },
  {
    index: "02",
    title: "Corazón en Flor",
    subtitle: "Edición especial",
    description:
      "Diseño en forma de corazón con rosas preservadas y toques dorados. Para momentos únicos.",
    accent: "Rosa nude y terracota",
  },
  {
    index: "03",
    title: "Cesta de Campo",
    subtitle: "Colección regalo",
    description:
      "Cesta rústica con arreglo floral preservado. Fragancia suave y presencia duradera.",
    accent: "Lino, rosa y marfil",
  },
  {
    index: "04",
    title: "Velas Personalizadas",
    subtitle: "Línea signature",
    description:
      "Set de velas con mensaje personalizado. Cera natural, mecha de algodón, fragancia equilibrada.",
    accent: "Blanco puro y dorado",
  },
];

function getProductSlides(): SlideProduct[] {
  const files = getImageFiles();
  const url = (i: number) =>
    files[i] ? productImageUrl(files[i]) : PLACEHOLDER_IMG;
  return SLIDE_PRODUCTS_BASE.map((p, i) => ({
    ...p,
    image: url(i),
    bgImage: SLIDESHOW_BG,
  }));
}

export default function Home() {
  const collections = getCollectionsData();
  const productSlides = getProductSlides();

  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <ProductSlideshow products={productSlides} />
      <Collections bgSrc={collections.bgSrc} cards={collections.cards} />
      <Journal />
      <Footer />
    </main>
  );
}
