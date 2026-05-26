import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        brand: {
          50: "#F5F3FF",
          100: "#EDE9FE",
          200: "#DDD6FE",
          300: "#C4B5FD",
          400: "#A78BFA",
          500: "#8B5CF6",
          600: "#7C3AED",
          700: "#6D28D9",
          800: "#5B21B6",
          900: "#4C1D95",
          950: "#2E1065",
          DEFAULT: "#7C3AED",
        },
        surface: {
          DEFAULT: "hsl(var(--surface))",
          raised: "hsl(var(--surface-raised))",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
        mono: ["var(--font-mono)", ...fontFamily.mono],
        display: ["var(--font-display)", ...fontFamily.sans],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "brand-gradient": "linear-gradient(135deg, #7C3AED 0%, #4F46E5 50%, #2563EB 100%)",
        "brand-gradient-subtle": "linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(79,70,229,0.1) 100%)",
        "mesh-gradient": "radial-gradient(at 40% 20%, hsla(258,100%,70%,0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(226,100%,66%,0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(255,100%,60%,0.1) 0px, transparent 50%)",
        "mesh-gradient-light": "radial-gradient(at 40% 20%, hsla(258,100%,80%,0.08) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(226,100%,70%,0.06) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(255,100%,70%,0.06) 0px, transparent 50%)",
      },
      boxShadow: {
        "glow-sm": "0 0 20px rgba(124, 58, 237, 0.15)",
        "glow-md": "0 0 40px rgba(124, 58, 237, 0.2)",
        "glow-lg": "0 0 80px rgba(124, 58, 237, 0.25)",
        "card-dark": "0 1px 1px rgba(0,0,0,0.3), 0 4px 8px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.05)",
        "card-light": "0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(32px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(32px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(124, 58, 237, 0.15)" },
          "50%": { boxShadow: "0 0 40px rgba(124, 58, 237, 0.35)" },
        },
        "marquee": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "border-beam": {
          "100%": { "offset-distance": "100%" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "fade-in-up": "fade-in-up 0.8s ease-out",
        "slide-in-right": "slide-in-right 0.6s ease-out",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "marquee": "marquee 25s linear infinite",
        shimmer: "shimmer 2s linear infinite",
        "spin-slow": "spin-slow 20s linear infinite",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
