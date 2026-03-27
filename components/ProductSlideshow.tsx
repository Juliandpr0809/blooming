"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export type SlideProduct = {
  index: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  accent: string;
  bgImage: string;
};

type Props = {
  products: SlideProduct[];
};

function firstWordItalic(title: string) {
  const parts = title.trim().split(/\s+/);
  const first = parts[0] ?? "";
  const rest = parts.slice(1).join(" ");
  return (
    <>
      <span className="italic">{first}</span>
      {rest ? ` ${rest}` : ""}
    </>
  );
}

export default function ProductSlideshow({ products }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const indexRef = useRef(0);
  const suppressScrollSyncRef = useRef(false);
  const [isDesktop, setIsDesktop] = useState(true);

  const getViewportHeight = () =>
    window.visualViewport?.height ?? window.innerHeight;

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const applySlideInstant = useCallback((idx: number) => {
    slideRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, {
        opacity: i === idx ? 1 : 0,
        y: i === idx ? 0 : 30,
      });
    });
  }, []);

  const goToSlideAnimated = useCallback(
    (raw: number) => {
      const n = products.length;
      const next = ((raw % n) + n) % n;
      const prev = indexRef.current;
      if (next === prev) return;

      suppressScrollSyncRef.current = true;

      const prevEl = slideRefs.current[prev];
      const nextEl = slideRefs.current[next];

      const tl = gsap.timeline({
        onComplete: () => {
          indexRef.current = next;
          setCurrentIndex(next);
          if (sectionRef.current) {
            const section = sectionRef.current;
            const totalScroll = Math.max(
              0,
              section.offsetHeight - getViewportHeight()
            );
            const denom = Math.max(1, n - 1);
            const targetScroll =
              section.offsetTop + (next / denom) * totalScroll;
            window.scrollTo({ top: targetScroll, behavior: "auto" });
            requestAnimationFrame(() => {
              ScrollTrigger.refresh();
              suppressScrollSyncRef.current = false;
            });
          } else {
            suppressScrollSyncRef.current = false;
          }
        },
      });

      if (prevEl && prevEl !== nextEl) {
        tl.to(prevEl, {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: "power2.in",
        });
      }
      if (nextEl) {
        tl.fromTo(
          nextEl,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          prevEl && prevEl !== nextEl ? "+=0.2" : 0
        );
      }
    },
    [products.length]
  );

  useGSAP(
    () => {
      if (!sectionRef.current || !stickyRef.current) return;

      const section = sectionRef.current;
      const sticky = stickyRef.current;
      const n = products.length;
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const st = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: () =>
            `+=${Math.max(1, Math.round(getViewportHeight() * Math.max(1, n - 1)))}`,
          pin: sticky,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          scrub: 1,
          onUpdate: (self) => {
            if (suppressScrollSyncRef.current) return;
            const idx = Math.min(
              n - 1,
              Math.floor(self.progress * n + 0.0001)
            );
            if (idx !== indexRef.current) {
              indexRef.current = idx;
              setCurrentIndex(idx);
              applySlideInstant(idx);
            }
          },
        });

        return () => {
          st.kill();
        };
      });

      return () => {
        mm.revert();
      };
    },
    { scope: sectionRef, dependencies: [products.length, applySlideInstant] }
  );

  useGSAP(
    () => {
      if (!isDesktop) return;
      slideRefs.current.forEach((el, i) => {
        if (!el) return;
        if (i === 0) {
          gsap.set(el, { opacity: 1, y: 0 });
        } else {
          gsap.set(el, { opacity: 0, y: 30 });
        }
      });
      indexRef.current = 0;
    },
    { scope: sectionRef, dependencies: [isDesktop, products] }
  );

  if (!products.length) return null;

  if (!isDesktop) {
    return (
      <section id="catalog" className="bg-canvas">
        <div className="mx-auto max-w-[1400px] px-gutter py-section">
          <p className="mb-10 font-sans text-[10px] uppercase tracking-[0.3em] text-ink/40">
            Catálogo
          </p>
          <div className="flex flex-col gap-16">
            {products.map((product) => (
              <article
                key={product.index}
                className="border-t border-line pt-10 first:border-t-0 first:pt-0"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-earth-faint/30">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    loading="lazy"
                    quality={80}
                    className="object-cover"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </div>
                <h2 className="mt-6 font-serif text-2xl font-light text-ink">
                  {firstWordItalic(product.title)}
                </h2>
                <p className="mt-4 font-sans text-[0.88rem] font-light leading-relaxed text-ink/65">
                  {product.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const total = products.length;

  return (
    <section
      id="catalog"
      ref={sectionRef}
      className="relative"
      style={{ height: `${total * 100}dvh` }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-[100dvh] overflow-hidden bg-[#2C1F17]"
      >
        {products.map((product, i) => (
          <div
            key={product.index}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            className="absolute inset-0 flex items-center"
          >
            <div className="absolute inset-0 z-0">
              <Image
                src={product.bgImage}
                alt=""
                fill
                aria-hidden
                className="scale-105 object-cover object-center"
                quality={85}
                sizes="100vw"
                priority={false}
              />
            </div>
            <div
              className="absolute inset-0 z-10 bg-[#1C1A18]/60"
              aria-hidden
            />

            <div className="relative z-10 mx-auto flex h-full w-full max-w-[1400px] items-center px-gutter">
              <div className="grid h-full w-full grid-cols-1 items-center gap-10 py-16 lg:grid-cols-[55%_45%] lg:gap-0 lg:py-0">
                <div className="flex flex-col justify-center">
                  <p className="mb-12 font-sans text-[11px] tracking-[0.3em] text-white/35">
                    {product.index} / 04
                  </p>
                  <div className="relative aspect-[4/5] w-full max-w-[480px] overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      loading="lazy"
                      quality={80}
                      className="object-cover transition-transform duration-700"
                      sizes="(min-width: 1024px) 25vw, 50vw"
                    />
                  </div>
                </div>

                <div className="flex min-h-0 flex-col justify-center pl-0 lg:pl-12 lg:pl-20">
                  <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.3em] text-white/40">
                    {product.subtitle}
                  </p>
                  <h2 className="font-serif text-[clamp(2.2rem,4vw,3.2rem)] font-light leading-[1.1] text-white">
                    {firstWordItalic(product.title)}
                  </h2>
                  <p className="mt-6 max-w-[320px] font-sans text-[0.88rem] font-light leading-relaxed text-white/60">
                    {product.description}
                  </p>
                  <p className="mt-4 font-sans text-[10px] uppercase tracking-[0.22em] text-white/35">
                    {product.accent}
                  </p>

                  <div className="mt-auto flex justify-end gap-3 pt-12">
                    <button
                      type="button"
                      aria-label="Anterior"
                      className="flex h-10 w-10 items-center justify-center border border-white/20 text-white/50 transition-all duration-300 hover:border-white/60 hover:text-white"
                      data-cursor-hover
                      onClick={() => goToSlideAnimated(indexRef.current - 1)}
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      aria-label="Siguiente"
                      className="flex h-10 w-10 items-center justify-center border border-white/20 text-white/50 transition-all duration-300 hover:border-white/60 hover:text-white"
                      data-cursor-hover
                      onClick={() => goToSlideAnimated(indexRef.current + 1)}
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="pointer-events-none absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {products.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ir a slide ${i + 1}`}
              className={`pointer-events-auto h-[2px] transition-all duration-[400ms] ${
                i === currentIndex
                  ? "w-6 bg-white/80"
                  : "w-2 bg-white/25"
              }`}
              onClick={() => goToSlideAnimated(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
