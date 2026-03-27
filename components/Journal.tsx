"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const entries = [
  {
    title: "Lentitud y espacio doméstico",
    issue: "Vol. 04",
    href: "#",
    thumb:
      "/api/product-images/Gemini_Generated_Image_k6yvdgk6yvdgk6yv.png",
  },
  {
    title: "Notas para luz costera",
    issue: "Vol. 03",
    href: "#",
    thumb:
      "/api/product-images/Gemini_Generated_Image_nahuk7nahuk7nahu.png",
  },
  {
    title: "Habitaciones que guardan silencio",
    issue: "Vol. 02",
    href: "#",
    thumb:
      "/api/product-images/Gemini_Generated_Image_u3ltjbu3ltjbu3lt.png",
  },
];

export default function Journal() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".journal-row",
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.14,
          ease: "power3.out",
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

        <div className="mt-16 border-t border-[0.5px] border-line">
          {entries.map((e) => (
            <motion.div
              key={e.title}
              className="journal-row border-b border-[0.5px] border-line"
              whileHover={{ backgroundColor: "rgba(196, 184, 165, 0.1)" }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href={e.href}
                className="flex flex-col gap-5 py-10 sm:flex-row sm:items-center sm:gap-10"
                data-cursor-hover
              >
                <div className="relative h-20 w-28 shrink-0 overflow-hidden bg-canvas sm:h-24 sm:w-32">
                  <Image
                    src={e.thumb}
                    alt=""
                    fill
                    loading="lazy"
                    quality={80}
                    className="object-cover"
                    sizes="(min-width: 1024px) 20vw, 40vw"
                  />
                </div>
                <span className="flex-1 font-serif text-[clamp(1.15rem,2vw,1.55rem)] font-light text-ink">
                  {e.title}
                </span>
                <span className="font-sans text-small uppercase tracking-[0.22em] text-ink/45">
                  {e.issue}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
