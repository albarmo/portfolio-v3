import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Big Shoulders Display"', "sans-serif"],
        sans: ['"Manrope"', "sans-serif"],
        mono: ['"Manrope"', "sans-serif"],
      },
      colors: {
        // semantic tokens: CSS variables from app/app.css that switch with the light/dark theme
        background: "var(--bg)",
        foreground: "var(--text)",
        muted: "var(--muted)",
        border: "var(--line)",
        surface: {
          DEFAULT: "var(--surface)",
          muted: "var(--surface-muted)",
          solid: "var(--surface-solid)",
        },
        "nav-line": "var(--nav-line)",
        "nav-hover": "var(--nav-hover)",
        "terminal-green": "var(--terminal-green)",
        // fixed brand palette, mirrors :root in app/app.css
        accent: "#F04A2D",
        ink: "#111827",
        cloud: "#FDFDFE",
        paper: "#F5F2E9",
        soft: "#E8EDF2",
        primary: {
          DEFAULT: "#0099FF",
          dark: "#0077C7",
          light: "#66C2FF",
        },
        "gradient-start": "#0099FF",
        "gradient-end": "#66C2FF",
      },
      boxShadow: {
        // flat offset "sticker" shadow; follows the theme text color
        hard: "6px 6px 0 var(--text)",
        "hard-sm": "3px 3px 0 var(--ink)",
      },
      keyframes: {
        shine: {
          "0%": { "background-position": "100%" },
          "100%": { "background-position": "-100%" },
        },
        "star-movement-bottom": {
          "0%": { transform: "translate(0%, 0%)", opacity: "1" },
          "100%": { transform: "translate(-100%, 0%)", opacity: "0" },
        },
        "star-movement-top": {
          "0%": { transform: "translate(0%, 0%)", opacity: "1" },
          "100%": { transform: "translate(100%, 0%)", opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "sky-drift": {
          "0%": { transform: "scale(1.08) translate3d(-1.5%, 0, 0)" },
          "100%": { transform: "scale(1.16) translate3d(1.5%, -1%, 0)" },
        },
        "ray-sway": {
          "0%": { transform: "rotate(-4deg)", opacity: "0.55" },
          "50%": { opacity: "1" },
          "100%": { transform: "rotate(4deg)", opacity: "0.7" },
        },
        "sun-breathe": {
          "0%": { transform: "scale(0.92)", opacity: "0.8" },
          "100%": { transform: "scale(1.08)", opacity: "1" },
        },
        "shooting-star": {
          "0%": { transform: "rotate(-30deg) translateX(0)", opacity: "0" },
          "2%": { opacity: "1" },
          "10%": { transform: "rotate(-30deg) translateX(-55vw)", opacity: "0" },
          "100%": { transform: "rotate(-30deg) translateX(-55vw)", opacity: "0" },
        },
      },
      animation: {
        shine: "shine 5s linear infinite",
        "star-movement-bottom":
          "star-movement-bottom linear infinite alternate",
        "star-movement-top": "star-movement-top linear infinite alternate",
      },
    },
  },
  darkMode: "class",
  plugins: [],
} satisfies Config;
