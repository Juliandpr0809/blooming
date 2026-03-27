"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 280, damping: 28, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 280, damping: 28, mass: 0.35 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;
    setActive(true);
    document.documentElement.classList.add("custom-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };

    const leave = () => setVisible(false);

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const clickable = t.closest(
        "a, button, [data-cursor-hover], input, textarea, select, label[for]"
      );
      setHovering(!!clickable);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    document.addEventListener("mouseover", onOver);

    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseover", onOver);
    };
  }, [x, y]);

  if (!active) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100]"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center gap-3">
        <motion.div
          className="rounded-full border border-ink/25 bg-canvas/80 shadow-sm backdrop-blur-sm"
          animate={{
            width: hovering ? 48 : 12,
            height: hovering ? 48 : 12,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 34 }}
        />
        {hovering ? (
          <span className="whitespace-nowrap font-sans text-[10px] uppercase tracking-[0.28em] text-ink/70">
            Ver más
          </span>
        ) : null}
      </div>
    </motion.div>
  );
}
