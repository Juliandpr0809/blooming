"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "#catalog", label: "Catálogo" },
  { href: "#about", label: "Nosotros" },
  { href: "#journal", label: "Journal" },
  { href: "#contact", label: "Contacto" },
];

export default function Navigation() {
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const update = () => {
      const hero = document.getElementById("hero");
      const threshold = hero?.offsetHeight ?? window.innerHeight;
      setIsTop(window.scrollY < threshold - 2);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        isTop
          ? "border-b border-white/10 bg-transparent"
          : "border-b border-line/60 bg-canvas/65 backdrop-blur-md"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-[1600px] items-center justify-between px-gutter py-7 text-small font-sans uppercase tracking-[0.22em] transition-colors duration-500 ${
          isTop ? "text-white/90" : "text-ink/85"
        }`}
      >
        <Link
          href="/"
          className={`font-serif text-[1.05rem] normal-case tracking-[0.06em] transition-colors duration-500 ${
            isTop ? "text-white/90" : "text-ink"
          }`}
          data-cursor-hover
        >
          Blooming
        </Link>
        <ul className="hidden items-center gap-10 sm:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`group relative inline-block transition-colors duration-500 ${
                  isTop
                    ? "text-white/90 hover:text-white"
                    : "text-ink/80 hover:text-ink"
                }`}
                data-cursor-hover
              >
                <span>{l.label}</span>
                <motion.span
                  className={`absolute -bottom-1 left-0 h-[0.5px] w-full origin-left ${
                    isTop ? "bg-white/70" : "bg-earth-muted"
                  }`}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                />
              </Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className={`font-sans text-small uppercase tracking-[0.22em] transition-colors duration-500 sm:hidden ${
            isTop ? "text-white/90" : "text-ink"
          }`}
          data-cursor-hover
          aria-label="Menú"
        >
          Menu
        </button>
      </nav>
    </header>
  );
}
