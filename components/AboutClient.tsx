"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  mainSrc: string | null;
  secondarySrc: string | null;
};

export default function AboutClient({ mainSrc, secondarySrc }: Props) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".about-copy > *",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.95,
          stagger: 0.1,
          ease: "power3.out",
        }
      );

      tl.fromTo(
        ".about-img-main",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.95,
          ease: "power3.out",
        },
        "-=0.5"
      );

      if (root.current?.querySelector(".about-img-secondary")) {
        tl.fromTo(
          ".about-img-secondary",
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.95,
            ease: "power3.out",
          },
          "+=0.2"
        );
      }
    },
    { scope: root }
  );

  return (
    <section
      id="about"
      ref={root}
      className="border-t border-line bg-canvas px-gutter py-section"
    >
      <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="about-copy flex flex-col lg:col-span-5">
          <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-ink/45">
            Nuestra esencia
          </p>
          <h2 className="mt-4 font-serif text-[clamp(2.8rem,5vw,4.2rem)] font-light leading-[1.12] text-ink text-balance">
            <span className="font-normal italic">Luz</span> lenta,
            <br />
            fragancia medida.
          </h2>
          <p className="mt-8 max-w-sm font-sans text-body font-light leading-[1.8] text-ink/65">
            Elaboramos velas en pequeños lotes con materiales nobles. La
            fragancia se dosifica con criterio: presente, nunca invasiva.
          </p>
          <Link
            href="#catalog"
            className="group relative mt-10 inline-flex w-fit items-center gap-3 font-sans text-[11px] uppercase tracking-[0.28em] text-ink"
            data-cursor-hover
          >
            <span>CONOCER MÁS</span>
            <span aria-hidden className="text-ink/70">
              →
            </span>
            <motion.span
              className="absolute -bottom-1 left-0 h-[0.5px] w-full origin-left bg-earth-muted"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            />
          </Link>
        </div>

        <div className="relative lg:col-span-7 lg:col-start-7">
          <div className="relative min-h-[min(70vw,420px)] pt-12 lg:min-h-0 lg:pt-16">
            <div className="about-img-main relative z-0 aspect-[3/4] w-[70%] overflow-hidden bg-earth-faint/40">
              {mainSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={mainSrc}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex min-h-[280px] w-full items-center justify-center bg-earth-faint/50 font-sans text-sm text-ink/40">
                  Añade imágenes en app/img
                </div>
              )}
            </div>

            {secondarySrc ? (
              <div className="about-img-secondary absolute right-0 top-10 z-10 aspect-square w-[38%] -translate-x-10 overflow-hidden border-4 border-canvas bg-canvas shadow-[0_12px_40px_-12px_rgba(28,26,24,0.18)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={secondarySrc}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            ) : null}
          </div>
          <p className="mt-3 font-sans text-[10px] uppercase tracking-[0.22em] text-ink/40">
            Taller — edición continua
          </p>
        </div>
      </div>
    </section>
  );
}
