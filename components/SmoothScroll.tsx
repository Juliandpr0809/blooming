"use client";

import ReactLenis, { useLenis } from "@studio-freight/react-lenis";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function GsapLenisSync() {
  useLenis(() => {
    ScrollTrigger.update();
  });
  return null;
}

function ScrollToTopOnRoute() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    lenis.scrollTo(0, { immediate: true });
    ScrollTrigger.refresh();
  }, [pathname, lenis]);

  return null;
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => {
      setIsDesktop(mq.matches);
      ScrollTrigger.refresh();
    };

    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (isDesktop) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    ScrollTrigger.refresh();
  }, [pathname, isDesktop]);

  if (!isDesktop) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        smoothWheel: true,
        smoothTouch: false,
        wheelMultiplier: 0.85,
        touchMultiplier: 1.2,
        infinite: false,
      }}
      autoRaf
    >
      <GsapLenisSync />
      <ScrollToTopOnRoute />
      {children}
    </ReactLenis>
  );
}
