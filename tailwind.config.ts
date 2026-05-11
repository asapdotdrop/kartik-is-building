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
        bg: "#080808",
        "bg-2": "#0f0e0d",
        ink: "#f5f1e8",
        "ink-2": "#d4cebd",
        "ink-3": "#8a8478",
        "ink-4": "#4a463e",
        accent: "#ff5722",
      },
      fontFamily: {
        fraunces: ["var(--font-fraunces)", "serif"],
        "dm-mono": ["var(--font-dm-mono)", "monospace"],
        outfit: ["var(--font-outfit)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
