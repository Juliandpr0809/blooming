"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const entries = [
  {
    title: "Luz lenta y espacio doméstico",
    issue: "Vol. 04",
    href: "#",
    thumb:
      "/api/product-images/Gemini_Generated_Image_1ik7ew1ik7ew1ik7.png",
  },
  {
    title: "Notas para las soneras",
    issue: "Vol. 03",
    href: "#",
    thumb:
      "/api/product-images/Gemini_Generated_Image_1kp0y31kp0y31kp0.png",
  },
  {
    title: "Habitaciones que guardan silencio",
    issue: "Vol. 02",
    href: "#",
    thumb:
      "/api/product-images/Gemini_Generated_Image_k6yvdgk6yvdgk6yv.png",
  },
];

const rowVariants = {
  rest: {},
  hover: {},
} as const;

const rowBgVariants = {
  rest: { scaleX: 0 },
  hover: { scaleX: 1 },
} as const;

export default function Journal() {
  const root = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeRow, setActiveRow] = useState<number | null>(null);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  useGSAP(
    () => {
      gsap.fromTo(
        ".journal-row",
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
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: root }
  );

  return (
    <section
      id="journal"
      ref={root}
      className="border-t border-line px-gutter py-section"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="font-sans text-small uppercase tracking-[0.26em] text-earth-muted">
              Journal
            </p>
            <h2 className="mt-4 font-serif text-display-md font-light text-ink">
              Desde el taller
            </h2>
          </div>
          <p className="max-w-sm font-sans text-body font-light leading-relaxed text-ink/60">
            Materiales, ritmo y decisiones que definen una vela que perdura.
          </p>
        </div>

        <div className="mt-16 border-t border-[#e5e5e5]">
          {entries.map((e, index) => (
            <motion.div
              key={e.title}
              className="journal-row relative border-b border-[#e5e5e5]"
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={rowVariants}
              onMouseEnter={() => setActiveRow(index)}
              onMouseLeave={() => setActiveRow(null)}
            >
              <Link
                href={e.href}
                className="group relative z-10 flex items-center justify-between gap-4 overflow-hidden py-6"
                data-cursor-hover
              >
                <span className="w-16 shrink-0 font-sans text-[11px] uppercase tracking-[0.28em] text-ink/30">
                  {e.issue}
                </span>

                <span className="flex-1 font-serif text-[clamp(1.1rem,2vw,1.5rem)] font-light text-ink">
                  {e.title}
                </span>

                <span
                  className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-2 group-hover:scale-110"
                  aria-hidden
                >
                  →
                </span>
              </Link>

              <motion.div
                className="pointer-events-none absolute inset-0 -z-10 bg-earth-faint/30"
                style={{ transformOrigin: "0% 50%" }}
                variants={rowBgVariants}
                transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <div
        className="pointer-events-none fixed z-50 overflow-hidden transition-opacity duration-300"
        style={{
          left: mousePos.x + 20,
          top: mousePos.y - 60,
          width: "140px",
          height: "100px",
          opacity: activeRow !== null ? 1 : 0,
          transform: "translate(0, 0)",
        }}
      >
        {activeRow !== null && (
          <Image
            src={entries[activeRow].thumb}
            alt=""
            fill
            className="object-cover"
            sizes="140px"
          />
        )}
      </div>
    </section>
  );
}
