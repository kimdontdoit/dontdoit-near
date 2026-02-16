import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      // ─── Fonts ──────────────────────────────────────────────────────────
      // Mirrors dontdoit-again: headline = Mona Sans, body/sans = Geist
      fontFamily: {
        headline: ['"Mona Sans"', "system-ui", "sans-serif"],
        sans: ['"Geist"', "system-ui", "sans-serif"],
        mono: ['"Geist Mono"', "monospace"],
        // alias used in landing components
        display: ['"Mona Sans"', "system-ui", "sans-serif"],
      },

      // ─── Type scale (ported from dontdoit-again) ────────────────────────
      fontSize: {
        "hero-xxl": ["clamp(3.25rem, 10vw, 6rem)", { lineHeight: "1.05", letterSpacing: "-0.035em" }],
        "hero-xl":  ["clamp(2.5rem, 8vw, 5rem)",   { lineHeight: "1.1",  letterSpacing: "-0.025em" }],
        "display-lg": ["clamp(2.25rem, 7vw, 3.5rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.875rem, 5vw, 3rem)",  { lineHeight: "1.2",  letterSpacing: "-0.018em" }],
        "display-sm": ["clamp(1.5rem, 4vw, 2.5rem)",  { lineHeight: "1.25", letterSpacing: "-0.014em" }],
        "headline-lg": ["clamp(1.75rem, 4vw, 2.25rem)", { lineHeight: "1.3",  letterSpacing: "-0.01em" }],
        "headline-md": ["clamp(1.5rem, 3.5vw, 2rem)",   { lineHeight: "1.35", letterSpacing: "-0.008em" }],
        "headline-sm": ["clamp(1.375rem, 3vw, 1.75rem)", { lineHeight: "1.4", letterSpacing: "-0.005em" }],
        "title-lg": ["clamp(1.5rem, 4vw, 2.25rem)",  { lineHeight: "1.3",  letterSpacing: "-0.015em" }],
        "title-md": ["clamp(1.25rem, 3vw, 1.75rem)", { lineHeight: "1.35", letterSpacing: "-0.01em" }],
        "title-sm": ["clamp(1.125rem, 2.5vw, 1.5rem)", { lineHeight: "1.4", letterSpacing: "-0.008em" }],
        lead:       ["clamp(1.25rem, 3vw, 1.875rem)", { lineHeight: "1.7" }],
        "body-lg":   ["1.0625rem", { lineHeight: "1.65" }],
        "body-base": ["1rem",      { lineHeight: "1.6" }],
        "body-sm":   ["0.9375rem", { lineHeight: "1.5" }],
        "body-xs":   ["0.8125rem", { lineHeight: "1.45" }],
        "caption-sm": ["0.75rem",   { lineHeight: "1.4", letterSpacing: "0.04em" }],
        "caption-xs": ["0.6875rem", { lineHeight: "1.35", letterSpacing: "0.08em" }],
      },

      // ─── Spacing ─────────────────────────────────────────────────────────
      spacing: {
        section:    "clamp(4rem, 8vw, 8rem)",
        container:  "clamp(1rem, 5vw, 2rem)",
        "layout-xs":  "0.5rem",
        "layout-sm":  "1rem",
        "layout-md":  "1.5rem",
        "layout-lg":  "2rem",
        "layout-xl":  "3rem",
        "layout-2xl": "4rem",
      },

      // ─── Colors ──────────────────────────────────────────────────────────
      colors: {
        border:     "hsl(var(--border))",
        input:      "hsl(var(--input))",
        ring:       "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT:    "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT:    "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT:    "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT:    "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        // Flashy green — ideal for NEAR verification badge
        "accent-secondary": {
          DEFAULT:    "hsl(var(--accent-secondary))",
          foreground: "hsl(var(--accent-secondary-foreground))",
        },
        popover: {
          DEFAULT:    "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT:    "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Brand palette — profile blocks, landing accents
        "brand-pink":   { DEFAULT: "hsl(var(--brand-pink))",   foreground: "hsl(var(--brand-pink-foreground))" },
        "brand-orange": { DEFAULT: "hsl(var(--brand-orange))", foreground: "hsl(var(--brand-orange-foreground))" },
        "brand-green":  { DEFAULT: "hsl(var(--brand-green))",  foreground: "hsl(var(--brand-green-foreground))" },
        "brand-blue":   { DEFAULT: "hsl(var(--brand-blue))",   foreground: "hsl(var(--brand-blue-foreground))" },
        "brand-yellow": { DEFAULT: "hsl(var(--brand-yellow))", foreground: "hsl(var(--brand-yellow-foreground))" },
        "brand-teal":   { DEFAULT: "hsl(var(--brand-teal))",   foreground: "hsl(var(--brand-teal-foreground))" },
      },

      // ─── Border radius ───────────────────────────────────────────────────
      borderRadius: {
        xs:   "0.125rem",
        sm:   "calc(var(--radius) - 12px)",
        base: "calc(var(--radius) - 8px)",
        md:   "calc(var(--radius) - 7px)",
        lg:   "calc(var(--radius) - 3px)",
        xl:   "calc(var(--radius) - 2px)",
        "2xl": "calc(var(--radius) + 2px)",
        "3xl": "calc(var(--radius) * 1.5)",
        full: "9999px",
        // Semantic aliases
        button: "calc(var(--radius) - 7px)",
        input:  "calc(var(--radius) - 8px)",
        card:   "calc(var(--radius) - 3px)",
        pill:   "9999px",
      },

      // ─── Animations ──────────────────────────────────────────────────────
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
