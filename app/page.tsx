import About from "@/components/About";
import Collections from "@/components/Collections";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Journal from "@/components/Journal";
import Navigation from "@/components/Navigation";
import Portfolio from "@/components/Portfolio";
import { getCollectionsData } from "@/lib/collections";

export default function Home() {
  const collections = getCollectionsData();

  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Portfolio />
      <Collections bgSrc={collections.bgSrc} cards={collections.cards} />
      <Journal />
      <Footer />
    </main>
  );
}
