"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const lines = ["Have an idea?", "Let's build —", "something great."];

export default function ContactSection() {
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);
  const [copied, setCopied]  = useState(false);

  // Magnetic: use Framer Motion values so transforms compose correctly
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 280, damping: 22, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 280, damping: 22, mass: 0.5 });

  const handleMagMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - rect.left - rect.width  / 2) * 0.3);
    rawY.set((e.clientY - rect.top  - rect.height / 2) * 0.3);
  };

  const handleMagLeave = () => { rawX.set(0); rawY.set(0); };

  const handleRipple = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setTimeout(() => setRipple(null), 700);
  };

  const copyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText("asapdotdrop@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = "mailto:asapdotdrop@gmail.com";
    }
  };

  return (
    <section id="contact" className="overflow-hidden">
      <div className="h-px bg-[rgba(245,241,232,0.07)] w-full" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-28 md:py-44">

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="font-dm-mono text-[10px] uppercase tracking-[0.18em] text-[#ff5722] mb-12 md:mb-16 flex items-center gap-3"
        >
          <span className="w-5 h-px bg-[#ff5722]" />
          Get in touch
        </motion.p>

        {/* Headline lines */}
        <div className="mb-16 md:mb-20">
          {lines.map((line, i) => (
            <div key={line} className="overflow-hidden">
              <motion.div
                initial={{ y: "100%", opacity: 0 }}
                whileInView={{ y: "0%", opacity: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 1.0, delay: 0.1 * i, ease: [0.76, 0, 0.24, 1] }}
              >
                {i === 2 ? (
                  <a
                    href="mailto:asapdotdrop@gmail.com"
                    className="font-fraunces font-light leading-[0.88] tracking-[-0.03em] text-[#f5f1e8] hover:text-[#ff5722] transition-colors duration-500 relative inline-block group cursor-pointer italic"
                    style={{ fontSize: "clamp(2.8rem, 7.5vw, 8rem)" }}
                    data-hover="Email"
                  >
                    {line}
                    <span className="absolute bottom-1 left-0 right-0 h-[2px] bg-[#ff5722] origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-500" />
                    <span className="absolute bottom-1 left-0 right-0 h-[2px] bg-[rgba(255,87,34,0.25)] origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </a>
                ) : (
                  <h2
                    className="font-fraunces font-light leading-[0.88] tracking-[-0.03em] text-[#f5f1e8]"
                    style={{
                      fontSize: "clamp(2.8rem, 7.5vw, 8rem)",
                      fontStyle: i === 1 ? "italic" : "normal",
                      color: i === 1 ? "#8a8478" : "#f5f1e8",
                    }}
                  >
                    {line}
                  </h2>
                )}
              </motion.div>
            </div>
          ))}
        </div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 flex-wrap"
        >
          {/* ── Primary CTA — magnetic pill ── */}
          <motion.a
            href="mailto:asapdotdrop@gmail.com?subject=Let's build something great"
            className="relative inline-flex items-center gap-3 font-dm-mono text-[11px] uppercase tracking-[0.18em] text-[#080808] bg-[#f5f1e8] px-9 py-4 rounded-full overflow-hidden cursor-pointer"
            style={{ x, y }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onMouseMove={handleMagMove}
            onMouseLeave={handleMagLeave}
            onClick={handleRipple}
            data-hover="Start"
          >
            {/* Ripple */}
            {ripple && (
              <motion.span
                className="absolute rounded-full bg-[#ff5722] pointer-events-none"
                initial={{ width: 0, height: 0, opacity: 0.35, x: ripple.x, y: ripple.y }}
                animate={{ width: 200, height: 200, opacity: 0, x: ripple.x - 100, y: ripple.y - 100 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            )}
            <span>Start a project</span>
            <span>→</span>
          </motion.a>

          {/* ── "Say hello" link ── */}
          <a
            href="mailto:asapdotdrop@gmail.com"
            className="group inline-flex items-center gap-2 cursor-pointer"
            data-hover="Email"
          >
            <span className="font-outfit text-[#8a8478] text-sm group-hover:text-[#f5f1e8] transition-colors duration-300">
              Or just say hello
            </span>
            <span className="font-outfit text-[#ff5722] text-sm group-hover:translate-x-1 transition-transform duration-200 inline-block">
              →
            </span>
          </a>

          {/* ── Copy email fallback ── */}
          <button
            onClick={copyEmail}
            className="group inline-flex items-center gap-2 cursor-pointer"
            data-hover="Copy"
          >
            <span className="font-dm-mono text-[9px] uppercase tracking-[0.18em] border border-[rgba(245,241,232,0.12)] rounded-full px-4 py-2 text-[#4a463e] group-hover:text-[#f5f1e8] group-hover:border-[rgba(245,241,232,0.3)] transition-all duration-300">
              {copied ? "✓ Copied!" : "Copy email"}
            </span>
          </button>
        </motion.div>

        {/* Email address displayed */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="font-dm-mono text-[10px] uppercase tracking-[0.14em] text-[#4a463e] mt-8"
        >
          asapdotdrop@gmail.com
        </motion.p>
      </div>
    </section>
  );
}
