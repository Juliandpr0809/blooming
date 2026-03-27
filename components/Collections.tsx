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
        { y: 24, opacity: 0, filter: "blur(3px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.75,
          stagger: 0.1,
          ease: "cubic-bezier(0.25, 1, 0.5, 1)",
          scrollTrigger: {
            trigger: root.current,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".collections-card-image",
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.1,
          stagger: 0.12,
          ease: "cubic-bezier(0.25, 1, 0.5, 1)",
          delay: 0.2,
          scrollTrigger: {
            trigger: root.current,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.to(".collections-bg", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: root }
  );

  return (
    <section
      id="collections"
      ref={root}
      className="relative overflow-hidden px-gutter py-[120px] lg:py-[160px]"
    >
      {bgSrc ? (
        <div className="collections-bg absolute inset-0 z-0">
          <Image
            src={bgSrc}
            alt=""
            fill
            loading="lazy"
            quality={80}
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      ) : (
        <div className="collections-bg absolute inset-0 z-0 bg-ink" aria-hidden />
      )}

      <div
        className="absolute inset-0 z-10 bg-[#2C1F17]/88"
        aria-hidden
      />
      <div className="absolute inset-0 z-[15] bg-gradient-to-r from-[#2C1F17]/60 to-transparent pointer-events-none" />

      <div className="relative z-20 mx-auto max-w-[1400px]">
        <div className="collections-block grid items-stretch gap-20 lg:grid-cols-12 lg:gap-28">
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
              <p className="mt-10 max-w-[280px] font-sans text-[0.85rem] font-light leading-relaxed text-white/55">
                Cada pieza lleva fragancia, intención y presencia. Diseñadas para
                acompañar los momentos que importan.
              </p>
            </div>
            <div className="mt-auto pt-12">
              <Link
                href="#catalog"
                className="group relative inline-flex w-fit items-center gap-3 overflow-hidden font-sans text-[11px] uppercase tracking-[0.28em] text-white/80 transition-colors duration-300 hover:text-white"
                data-cursor-hover
              >
                <span className="relative inline-flex h-[1.2em] flex-col overflow-hidden">
                  <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-full">
                    VER CATÁLOGO
                  </span>
                  <span className="absolute inline-block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-y-0">
                    VER CATÁLOGO
                  </span>
                </span>
                <span
                  aria-hidden
                  className="inline-block text-white/60 transition-transform duration-300 group-hover:translate-x-2"
                >
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
            <div className="grid grid-cols-2 gap-4 lg:gap-5">
              {cards.map((card, i) => {
                const wrapClass =
                  i === 0
                    ? "relative"
                    : i === 1
                      ? "relative mt-12"
                      : i === 2
                        ? "relative -mt-4 translate-x-[-16px]"
                        : "relative mt-8 translate-x-[16px]";
                const aspectClass =
                  i === 1 || i === 2 ? "aspect-[3/4]" : "aspect-[4/3]";
                return (
                <div
                  key={card.number}
                  className={wrapClass}
                >
                  <article
                    className="flex flex-col overflow-hidden rounded-none bg-[#FAF7F2] pb-5"
                    data-cursor-hover
                  >
                    <span className="block px-4 pb-3 pt-4 font-sans text-[10px] tracking-[0.25em] text-ink/35">
                      {card.number}
                    </span>
                    <div
                      className={`collections-card-image relative w-full overflow-hidden ${aspectClass}`}
                    >
                      <Image
                        src={card.imageSrc}
                        alt={card.title}
                        fill
                        loading="lazy"
                        quality={80}
                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                        sizes="(min-width: 1024px) 25vw, 50vw"
                      />
                    </div>
                    <p className="mb-1 mt-5 px-4 font-serif text-[1.1rem] font-light text-ink">
                      {card.title}
                    </p>
                    <p className="px-4 font-sans text-[10px] uppercase tracking-[0.15em] text-ink/40">
                      {card.subtitle}
                    </p>
                  </article>
                </div>
                );
              })}
            </div>
            <p className="ml-auto mt-6 max-w-[180px] text-right font-sans text-[10px] text-white/35">
              Piezas artesanales para espacios con calma e intención.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
