"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const root = useRef<HTMLElement>(null);

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
            Contact
          </p>
          <h2 className="mt-6 font-serif text-display-lg font-light leading-[1.08] text-ink text-balance">
            Let&apos;s begin a conversation
          </h2>
          <p className="mt-6 max-w-md font-sans text-body font-light leading-relaxed text-ink/60">
            Share a few lines about your project, timeline, and the atmosphere
            you are seeking. We reply within a few days.
          </p>
        </div>

        <form
          className="flex flex-col gap-8 lg:col-span-5 lg:col-start-8"
          onSubmit={(e) => e.preventDefault()}
        >
          <label className="group block">
            <span className="font-sans text-small uppercase tracking-[0.2em] text-ink/45">
              Name
            </span>
            <input
              name="name"
              type="text"
              autoComplete="name"
              className="mt-3 w-full border-b border-line bg-transparent py-2 font-sans text-body text-ink outline-none transition-colors duration-500 focus:border-earth-muted"
            />
          </label>
          <label className="block">
            <span className="font-sans text-small uppercase tracking-[0.2em] text-ink/45">
              Email
            </span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              className="mt-3 w-full border-b border-line bg-transparent py-2 font-sans text-body text-ink outline-none transition-colors duration-500 focus:border-earth-muted"
            />
          </label>
          <label className="block">
            <span className="font-sans text-small uppercase tracking-[0.2em] text-ink/45">
              Message
            </span>
            <textarea
              name="message"
              rows={4}
              className="mt-3 w-full resize-none border-b border-line bg-transparent py-2 font-sans text-body text-ink outline-none transition-colors duration-500 focus:border-earth-muted"
            />
          </label>
          <motion.button
            type="submit"
            data-cursor-hover
            className="self-start border border-ink/20 px-10 py-3 font-sans text-small uppercase tracking-[0.24em] text-ink transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-canvas"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            Send
          </motion.button>
        </form>
      </div>

      <div className="mx-auto mt-24 flex max-w-[1400px] flex-col gap-4 border-t border-[0.5px] border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-sans text-small text-ink/45">
          © {new Date().getFullYear()} Blooming
        </p>
        <div className="flex gap-8 font-sans text-small uppercase tracking-[0.18em] text-ink/45">
          <a href="#" data-cursor-hover className="hover:text-ink">
            Instagram
          </a>
          <a href="#" data-cursor-hover className="hover:text-ink">
            Pinterest
          </a>
        </div>
      </div>
    </footer>
  );
}
