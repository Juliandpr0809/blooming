"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Image from "next/image";
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
      gsap.fromTo(
        ".about-copy .mask-wrapper > *",
        {
          y: "100%",
          opacity: 0,
          filter: "blur(4px)",
        },
        {
          y: "0%",
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.12,
          ease: "cubic-bezier(0.25, 1, 0.5, 1)",
          scrollTrigger: {
            trigger: root.current,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".about-img-main",
        {
          clipPath: "inset(0 100% 0 0)",
        },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.2,
          ease: "cubic-bezier(0.25, 1, 0.5, 1)",
          scrollTrigger: {
            trigger: root.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      if (root.current?.querySelector(".about-img-secondary")) {
        gsap.fromTo(
          ".about-img-secondary",
          {
            clipPath: "inset(100% 0 0 0)",
          },
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.0,
            delay: 0.3,
            ease: "cubic-bezier(0.25, 1, 0.5, 1)",
            scrollTrigger: {
              trigger: root.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      gsap.to(".about-img-main img", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-img-main",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      if (root.current?.querySelector(".about-img-secondary")) {
        gsap.to(".about-img-secondary img", {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: ".about-img-secondary",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
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
          <span className="mask-wrapper">
            <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-ink/45">
              Nuestra esencia
            </p>
          </span>
          <span className="mask-wrapper">
            <h2
              className="mt-4 font-serif text-[clamp(2.8rem,5vw,4.2rem)] font-light leading-[1.12] tracking-[-0.02em] text-ink text-balance"
              style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}
            >
              <span className="font-normal italic">Luz</span> lenta,
              <br />
              fragancia medida.
            </h2>
          </span>
          <span className="mask-wrapper">
            <p className="mt-8 max-w-sm font-sans text-body font-light leading-[1.8] text-ink/65">
              Elaboramos velas en pequeños lotes con materiales nobles. La
              fragancia se dosifica con criterio: presente, nunca invasiva.
            </p>
          </span>
          <span className="mask-wrapper">
            <Link
              href="#catalog"
              className="group relative mt-10 inline-flex w-fit items-center gap-3 overflow-hidden font-sans text-[11px] uppercase tracking-[0.28em] text-ink"
              data-cursor-hover
            >
              <span className="relative inline-flex h-[1.2em] flex-col overflow-hidden">
                <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-full">
                  CONOCER MÁS
                </span>
                <span className="absolute inline-block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-y-0">
                  CONOCER MÁS
                </span>
              </span>
              <span
                aria-hidden
                className="inline-block text-ink/70 transition-transform duration-300 group-hover:translate-x-2"
              >
                →
              </span>
              <motion.span
                className="absolute -bottom-1 left-0 h-[0.5px] w-full origin-left bg-earth-muted"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              />
            </Link>
          </span>
        </div>

        <div className="relative lg:col-span-7 lg:col-start-7">
          <div className="relative min-h-[min(70vw,420px)] pt-12 lg:min-h-0 lg:pt-16">
            <div className="about-img-main overflow-hidden relative z-0 aspect-[3/4] w-[70%] bg-earth-faint/40">
              {mainSrc ? (
                <Image
                  src={mainSrc}
                  alt=""
                  fill
                  loading="lazy"
                  quality={80}
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="h-full w-full object-cover scale-110"
                />
              ) : (
                <div className="flex min-h-[280px] w-full items-center justify-center bg-earth-faint/50 font-sans text-sm text-ink/40">
                  Añade imágenes en app/img
                </div>
              )}
            </div>

            {secondarySrc ? (
              <div className="about-img-secondary overflow-hidden absolute right-0 top-10 z-10 aspect-square w-[38%] -translate-x-10 border-4 border-canvas bg-canvas shadow-[0_12px_40px_-12px_rgba(28,26,24,0.18)]">
                <Image
                  src={secondarySrc}
                  alt=""
                  fill
                  loading="lazy"
                  quality={80}
                  sizes="(min-width: 1024px) 20vw, 40vw"
                  className="h-full w-full object-cover scale-110"
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
