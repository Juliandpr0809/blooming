import type { Config } from "tailwindcss";

/**
 * Tokens usados en layout (py-section, px-gutter, text-display-*, earth, line, canvas, ink).
 * Safelist evita que un escaneo de contenido fallido en CI/preview deje utilidades fuera del CSS.
 */
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "px-gutter",
    "py-section",
    "pt-section",
    "text-display-xl",
    "text-display-lg",
    "text-display-md",
    "text-body",
    "text-small",
    "text-earth-muted",
    "text-balance",
    "border-line",
    "bg-canvas",
    "text-ink",
    "font-serif",
    "font-sans",
    {
      pattern:
        /^(text-ink|text-canvas|bg-canvas|border-line|border-earth-muted|bg-earth-faint)(\/\d{1,3})?$/,
      variants: ["hover", "focus"],
    },
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#F7F3EE",
        ink: "#1C1A18",
        earth: {
          DEFAULT: "#B08B72",
          muted: "#B08B72",
          faint: "#E8DDD3",
        },
        terracotta: "#C4704A",
        "rose-pale": "#D4929A",
        line: "rgba(28,26,24,0.12)",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": [
          "clamp(3rem,7vw,5.5rem)",
          { lineHeight: "1.04", letterSpacing: "-0.02em" },
        ],
        "display-lg": ["clamp(2rem, 5vw, 4rem)", { lineHeight: "1.08" }],
        "display-md": ["clamp(1.5rem, 3.5vw, 2.75rem)", { lineHeight: "1.15" }],
        body: ["clamp(0.9375rem, 1.1vw, 1.0625rem)", { lineHeight: "1.6" }],
        small: ["clamp(0.6875rem, 0.85vw, 0.8125rem)", { lineHeight: "1.5" }],
      },
      spacing: {
        section: "clamp(4rem, 12vw, 10rem)",
        gutter: "clamp(1.25rem, 4vw, 3.5rem)",
      },
      transitionDuration: {
        luxe: "700ms",
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
