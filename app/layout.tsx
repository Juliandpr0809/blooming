import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), {
  ssr: false,
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://blooming.com.co"),
  title: {
    default:
      "Blooming — Velas y Arreglos Florales Artesanales | Barranquilla",
    template: "%s | Blooming",
  },
  description:
    "Velas artesanales y arreglos florales personalizados en Barranquilla, Colombia. Diseños únicos para regalo, decoración y momentos especiales. Entregas a domicilio.",
  keywords: [
    "velas artesanales Barranquilla",
    "velas personalizadas Colombia",
    "arreglos florales Barranquilla",
    "velas de cera natural",
    "regalo flores Barranquilla",
    "velas decorativas Colombia",
    "arreglos florales personalizados",
    "velas para regalo",
    "flores preservadas Barranquilla",
    "tienda velas artesanales",
  ],
  authors: [{ name: "Blooming" }],
  creator: "Blooming",
  publisher: "Blooming",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://blooming.com.co",
    siteName: "Blooming",
    title:
      "Blooming — Velas y Arreglos Florales Artesanales | Barranquilla",
    description:
      "Velas artesanales y arreglos florales personalizados en Barranquilla. Diseños únicos para cada momento especial.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Blooming — Velas y Arreglos Florales Artesanales",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blooming — Velas y Arreglos Florales Artesanales",
    description:
      "Velas artesanales y arreglos florales personalizados en Barranquilla, Colombia.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://blooming.com.co",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Blooming",
  description:
    "Velas artesanales y arreglos florales personalizados en Barranquilla, Colombia.",
  url: "https://blooming.com.co",
  telephone: "+573014685340",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Barranquilla",
    addressRegion: "Atlántico",
    addressCountry: "CO",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "10.9685",
    longitude: "-74.7813",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    opens: "09:00",
    closes: "18:00",
  },
  sameAs: ["https://www.instagram.com/blooming_candle.company/"],
  priceRange: "$$",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Velas y Arreglos Florales",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Velas Artesanales Personalizadas",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Arreglos Florales Preservados",
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
