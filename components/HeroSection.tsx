"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((m) => m.DotLottieReact),
  { ssr: false }
);

const heroLines = [
  { text: "Indie",     italic: false },
  { text: "developer", italic: true  },
  { text: "building",  italic: false },
  { text: "quietly.",  italic: true  },
];

export default function HeroSection() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 2600);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[680px] flex flex-col">

      {/* ── Video — more visible ── */}
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.6, filter: "saturate(0.65) contrast(1.05)" }}
      >
        <source src="/14520076_1920_1080_24fps.mp4" type="video/mp4" />
      </video>

      {/* ── Gradient overlays — lighter touch ── */}
      {/* Top: only enough to keep nav legible */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,8,8,0.7) 0%, rgba(8,8,8,0.05) 30%, transparent 50%, rgba(8,8,8,0.35) 75%, rgba(8,8,8,0.9) 100%)",
        }}
      />

      {/* ── Decorative rule (mid-hero) ── */}
      <motion.div
        className="absolute left-0 right-0 border-t border-[rgba(245,241,232,0.08)]"
        style={{ top: "40%" }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={ready ? { scaleX: 1 } : {}}
        transition={{ duration: 1.6, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* ── Lottie + rings ── */}
      <div
        className="absolute hidden lg:flex items-center justify-center"
        style={{ right: "6%", top: "50%", transform: "translateY(-55%)" }}
      >
        <motion.div
          className="relative float-anim"
          initial={{ opacity: 0, scale: 0.75 }}
          animate={ready ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.7, ease: [0.76, 0, 0.24, 1] }}
          style={{ width: 200, height: 200 }}
        >
          <div
            className="ring-spin absolute rounded-full border border-[rgba(245,241,232,0.1)]"
            style={{ inset: -28 }}
          />
          <div
            className="ring-spin-reverse absolute rounded-full border border-[rgba(255,87,34,0.15)]"
            style={{ inset: -52 }}
          />
          <DotLottieReact
            src="https://lottie.host/de3b5d8d-78a5-49df-9620-d33e56e9fbbd/animation.lottie"
            loop autoplay
            style={{ width: 200, height: 200 }}
          />
        </motion.div>
      </div>

      {/* ── Hero content (pinned to bottom) ── */}
      <div className="relative z-10 mt-auto max-w-[1400px] mx-auto w-full px-6 md:px-14 pb-12 md:pb-20">

        {/* Eyebrow */}
        <motion.div
          className="flex items-center gap-3 mb-8 md:mb-10"
          initial={{ opacity: 0, x: -16 }}
          animate={ready ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="w-6 h-px bg-[#ff5722]" />
          <span className="font-dm-mono text-[11px] uppercase tracking-[0.2em] text-[#ff5722]">
            Full Stack Developer &amp; AI Builder
          </span>
        </motion.div>

        {/* ── Headline ── */}
        <div className="mb-10 md:mb-14">
          {heroLines.map(({ text, italic }, i) => (
            <div key={text} className="overflow-hidden leading-none">
              <motion.h1
                initial={{ y: "105%" }}
                animate={ready ? { y: "0%" } : {}}
                transition={{ duration: 1.05, delay: 0.06 + i * 0.1, ease: [0.76, 0, 0.24, 1] }}
                className="font-fraunces font-light leading-[0.88] tracking-[-0.03em] text-[#f5f1e8]"
                style={{
                  fontSize: "clamp(3.2rem, 6.8vw, 8rem)",
                  fontStyle: italic ? "italic" : "normal",
                  paddingLeft: italic ? "clamp(2rem, 8vw, 8rem)" : "0",
                  color: italic ? "#d4cebd" : "#f5f1e8",
                }}
              >
                {text}
              </motion.h1>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pt-6 border-t border-[rgba(245,241,232,0.08)]"
        >
          {/* Tagline */}
          <p className="font-outfit font-light text-[#8a8478] text-[15px] md:text-base max-w-xs leading-relaxed">
            Making the internet a more beautiful,<br className="hidden md:block" />
            functional place — one project at a time.
          </p>

          <div className="flex items-end gap-10 md:gap-14">
            {/* Meta */}
            <div className="flex flex-col items-start md:items-end gap-1">
              <span className="font-dm-mono text-[10px] uppercase tracking-[0.2em] text-[#4a463e]">
                Available Q2 2026
              </span>
              <span className="font-dm-mono text-[10px] uppercase tracking-[0.2em] text-[#4a463e]">
                India · Remote Worldwide
              </span>
            </div>

            {/* Scroll indicator */}
            <div className="hidden md:flex flex-col items-center gap-2 pb-0.5">
              <span
                className="font-dm-mono text-[9px] uppercase tracking-[0.22em] text-[#4a463e]"
                style={{ writingMode: "vertical-lr", transform: "rotate(180deg)" }}
              >
                Scroll
              </span>
              <div className="relative w-px h-12 bg-[rgba(245,241,232,0.1)] overflow-hidden rounded-full">
                <div className="absolute w-full h-1/2 bg-[#ff5722] rounded-full scroll-drip" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
