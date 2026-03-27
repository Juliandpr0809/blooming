"use client";

import type { CollectionCardData } from "@/lib/collections";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  bgSrc: string | null;
  cards: CollectionCardData[];
};

export default function Collections({ bgSrc, cards }: Props) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".collections-block > *",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: root }
  );

  return (
    <section
      id="collections"
      ref={root}
      className="relative overflow-hidden px-gutter py-section"
    >
      {bgSrc ? (
        <div className="absolute inset-0 z-0">
          <Image
            src={bgSrc}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority={false}
          />
        </div>
      ) : (
        <div className="absolute inset-0 z-0 bg-ink" aria-hidden />
      )}

      <div
        className="absolute inset-0 z-10 bg-[#1C1A18]/85"
        aria-hidden
      />

      <div className="relative z-20 mx-auto max-w-[1400px]">
        <div className="collections-block grid items-stretch gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="flex min-h-[min(100%,520px)] flex-col justify-between lg:col-span-4">
            <div>
              <p className="mb-6 font-sans text-[10px] uppercase tracking-[0.3em] text-white/40">
                COLECCIONES
              </p>
              <h2 className="font-serif text-[clamp(2.6rem,4.5vw,4rem)] font-light leading-[1.06] text-white text-balance">
                <span className="italic">Velas</span> que
                <br />
                hablan solos.
              </h2>
              <p className="mt-6 max-w-[280px] font-sans text-[0.85rem] font-light leading-relaxed text-white/55">
                Cada pieza lleva fragancia, intención y presencia. Diseñadas para
                acompañar los momentos que importan.
              </p>
            </div>
            <div className="mt-auto pt-12">
              <Link
                href="#catalog"
                className="group relative inline-flex w-fit items-center gap-3 font-sans text-[11px] uppercase tracking-[0.28em] text-white/80 transition-colors duration-300 hover:text-white"
                data-cursor-hover
              >
                <span>VER CATÁLOGO</span>
                <span aria-hidden className="text-white/60">
                  →
                </span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-[0.5px] w-full origin-left bg-white/70"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                />
              </Link>
            </div>
          </div>

          <div className="flex flex-col lg:col-span-7 lg:col-start-6">
            <div className="grid grid-cols-2 gap-4">
              {cards.map((card) => (
                <article
                  key={card.number}
                  className="bg-canvas p-4 pb-5"
                  data-cursor-hover
                >
                  <p className="mb-3 font-sans text-[10px] tracking-[0.2em] text-ink/35">
                    {card.number}
                  </p>
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={card.imageSrc}
                      alt={card.title}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      sizes="(min-width: 1024px) 20vw, 45vw"
                    />
                  </div>
                  <h3 className="mt-4 font-serif text-[1.05rem] font-light text-ink">
                    {card.title}
                  </h3>
                </article>
              ))}
            </div>
            <p className="ml-auto mt-4 max-w-[200px] text-right font-sans text-[10px] font-light leading-snug text-white/40">
              Piezas artesanales para espacios con calma e intención.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
