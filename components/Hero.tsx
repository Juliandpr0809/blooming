"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";

// TODO: replace VIDEO_ID with your YouTube video ID
const VIDEO_ID = "d-kREO_o0F8";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".hero-line-inner",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.2,
          stagger: 0.18,
          ease: "power4.out",
          delay: 0.35,
        }
      );
      gsap.fromTo(
        ".hero-sub",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: 1.05,
        }
      );
    },
    { scope: root }
  );

  const embedSrc = `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1`;

  return (
    <section
      id="hero"
      ref={root}
      className="relative min-h-[100svh] w-full overflow-hidden"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover"
        />
        <iframe
          title="Hero background"
          className="pointer-events-none z-[1] opacity-[0.72]"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "177.78vh",
            height: "56.25vw",
            minWidth: "100%",
            minHeight: "100%",
          }}
          src={embedSrc}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-ink/50 via-ink/25 to-ink/65" />

      <div className="relative z-[2] flex h-full min-h-[100svh] flex-col justify-end px-gutter pb-24 md:pb-32">
        <div className="relative z-20 -mx-4 max-w-4xl lg:-mx-8">
          <h1
            className="hero-title font-serif leading-[0.88] tracking-[-0.03em] text-white text-balance"
            style={{ fontSize: "clamp(4.8rem, 13vw, 11rem)" }}
          >
            <span className="hero-line block overflow-hidden py-[0.06em]">
              <span className="hero-line-inner block font-serif font-normal uppercase tracking-[-0.03em] text-white">
                FRAGANCIA.
              </span>
            </span>
            <span className="hero-line block overflow-hidden py-[0.06em]">
              <span className="hero-line-inner block font-serif font-light italic normal-case tracking-[-0.01em] text-white/90">
                Intención.
              </span>
            </span>
            <span className="hero-line block overflow-hidden py-[0.06em]">
              <span className="hero-line-inner block font-serif font-normal uppercase tracking-[-0.03em] text-white">
                CALMA.
              </span>
            </span>
          </h1>
          <p className="hero-sub mt-8 max-w-sm font-sans text-body font-light leading-relaxed text-white/75">
            Velas artesanales, hechas para verse tan bien como huelen.
          </p>
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-8 left-1/2 z-[2] flex -translate-x-1/2 flex-col items-center gap-3"
        aria-hidden
      >
        <span className="h-10 w-px bg-white/50" />
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">
          scroll
        </span>
      </div>
    </section>
  );
}
