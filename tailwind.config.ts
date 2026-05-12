import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#050505",
        "bg-2": "#0d0d0d",
        ink: "#ffffff",
        "ink-2": "#aaaaaa",
        "ink-3": "#555555",
        accent: "#ff3c00",
        line: "rgba(255,255,255,0.08)",
      },
      fontFamily: {
        bebas: ["var(--font-bebas)", "sans-serif"],
        fraunces: ["var(--font-fraunces)", "serif"],
        "dm-mono": ["var(--font-dm-mono)", "monospace"],
        outfit: ["var(--font-outfit)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
