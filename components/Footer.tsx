"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { useRef, useState, type FormEvent } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const root = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);

  const handleWhatsAppSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const nombre =
      (form.elements.namedItem("name") as HTMLInputElement)?.value || "";
    const email =
      (form.elements.namedItem("email") as HTMLInputElement)?.value || "";
    const mensaje =
      (form.elements.namedItem("message") as HTMLTextAreaElement)?.value ||
      "";

    const texto = `Hola Blooming! 🌸

Me llamo *${nombre}*
Correo: ${email}

${mensaje}

Espero su respuesta. ¡Gracias!`;

    const numeroWhatsApp = "573014685340";
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;

    window.open(url, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  useGSAP(
    () => {
      gsap.fromTo(
        ".footer-block > *",
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: root }
  );

  return (
    <footer
      id="contact"
      ref={root}
      className="border-t border-line px-gutter py-section"
    >
      <div className="footer-block mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="font-sans text-small uppercase tracking-[0.26em] text-earth-muted">
            CONTACTO
          </p>
          <h2
            className="mt-6 font-serif font-light leading-[1.08] text-ink text-balance"
            style={{ fontSize: "clamp(2.8rem, 5vw, 4.5rem)" }}
          >
            Hablemos de tu pedido
          </h2>
          <p className="mt-6 max-w-md font-sans text-body font-light leading-relaxed text-ink/60">
            Cuéntanos qué tienes en mente — un arreglo, una vela especial o un
            regalo. Te respondemos en menos de 24 horas.
          </p>
          <div className="mt-8 flex flex-col gap-2">
            <p className="font-sans text-[11px] uppercase tracking-[0.24em] text-ink/35">
              Barranquilla, Colombia
            </p>
            <a
              href="https://wa.me/573014685340"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-[11px] uppercase tracking-[0.24em] text-earth-muted transition-colors duration-300 hover:text-ink"
              data-cursor-hover
            >
              También por WhatsApp →
            </a>
          </div>
        </div>

        <form
          className="flex flex-col gap-8 lg:col-span-5 lg:col-start-8"
          onSubmit={handleWhatsAppSubmit}
        >
          <label className="group block">
            <span className="font-sans text-small uppercase tracking-[0.2em] text-ink/45">
              Nombre
            </span>
            <input
              name="name"
              type="text"
              autoComplete="name"
              placeholder="¿Cómo te llamas?"
              className="mt-3 w-full border-b border-line bg-transparent py-2 font-sans text-body text-ink outline-none transition-colors duration-500 placeholder:text-ink/35 focus:border-earth-muted"
            />
          </label>
          <label className="block">
            <span className="font-sans text-small uppercase tracking-[0.2em] text-ink/45">
              Correo electrónico
            </span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="tu@correo.com"
              className="mt-3 w-full border-b border-line bg-transparent py-2 font-sans text-body text-ink outline-none transition-colors duration-500 placeholder:text-ink/35 focus:border-earth-muted"
            />
          </label>
          <label className="block">
            <span className="font-sans text-small uppercase tracking-[0.2em] text-ink/45">
              Mensaje
            </span>
            <textarea
              name="message"
              rows={4}
              placeholder="Cuéntanos sobre tu pedido, ocasión o idea..."
              className="mt-3 w-full resize-none border-b border-line bg-transparent py-2 font-sans text-body text-ink outline-none transition-colors duration-500 placeholder:text-ink/35 focus:border-earth-muted"
            />
          </label>
          <motion.button
            type="submit"
            data-cursor-hover
            disabled={sent}
            className="group overflow-hidden self-start border border-ink/20 px-10 py-3 font-sans text-small uppercase tracking-[0.24em] text-ink transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-canvas disabled:pointer-events-none disabled:opacity-80"
            whileHover={sent ? undefined : { y: -1 }}
            whileTap={sent ? undefined : { scale: 0.98 }}
          >
            {sent ? (
              <span className="text-earth-muted tracking-[0.24em]">
                ABRIENDO WHATSAPP...
              </span>
            ) : (
              <span className="relative inline-flex h-[1.1em] flex-col overflow-hidden">
                <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-full">
                  ENVIAR
                </span>
                <span className="absolute inline-block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-y-0">
                  ENVIAR
                </span>
              </span>
            )}
          </motion.button>
        </form>
      </div>

      <div className="mx-auto mt-24 flex max-w-[1400px] flex-col gap-6 border-t border-[0.5px] border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-sans text-small text-ink/45">
          © 2026 blooming_candle.company — Barranquilla, Colombia
        </p>
        <p className="hidden font-sans text-[10px] tracking-[0.15em] text-ink/25 sm:block">
          Velas · Arreglos florales · Entregas locales
        </p>
        <div className="flex gap-8 font-sans text-small uppercase tracking-[0.18em] text-ink/35">
          <a
            href="https://www.instagram.com/blooming_candle.company/"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="transition-colors duration-300 hover:text-ink"
          >
            Instagram
          </a>
          <a
            href="https://wa.me/573014685340"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="transition-colors duration-300 hover:text-ink"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
