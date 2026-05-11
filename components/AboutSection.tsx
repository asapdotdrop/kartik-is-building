"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { label: "Projects shipped",        countTo: 5,   suffix: "+" },
  { label: "Average delivery",        countTo: 48,  suffix: "h" },
  { label: "Revisions until perfect", countTo: null, suffix: "" },
  { label: "Money-back guarantee",    countTo: 100, suffix: "%" },
];

function CountUp({ to, suffix, trigger }: { to: number | null; suffix: string; trigger: boolean }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!trigger || to === null) return;
    const duration = 1500;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.floor(eased * to));
      if (t < 1) requestAnimationFrame(tick);
      else setVal(to);
    };
    requestAnimationFrame(tick);
  }, [trigger, to]);

  if (to === null) return <>∞</>;
  return <>{val}{suffix}</>;
}

export default function AboutSection() {
  const statsRef   = useRef<HTMLDivElement>(null);
  const inView     = useInView(statsRef, { once: true, amount: 0.25 });

  return (
    <section id="about" className="max-w-[1400px] mx-auto px-6 md:px-14 py-28 md:py-40">

      {/* Eyebrow */}
      <motion.p
        className="font-dm-mono text-[10px] uppercase tracking-[0.2em] text-[#4a463e] mb-5"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        — About
      </motion.p>

      {/* Section heading */}
      <div className="overflow-hidden mb-20 md:mb-28">
        <motion.h2
          className="font-fraunces font-light text-[#f5f1e8] leading-[1.0] tracking-[-0.025em]"
          style={{ fontSize: "clamp(2.4rem, 5.5vw, 5.5rem)" }}
          initial={{ y: "100%" }}
          whileInView={{ y: "0%" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          Solo developer.{" "}
          <span className="italic text-[#8a8478]">Studio output.</span>
        </motion.h2>
      </div>

      {/* Two-col body */}
      <div className="grid md:grid-cols-[1fr_400px] gap-14 md:gap-20 items-start">

        {/* Left — body copy in Outfit */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <p className="font-outfit font-light text-[#d4cebd] text-[17px] md:text-[19px] leading-[1.7] mb-5">
            I build digital products that help businesses grow — from{" "}
            <em className="not-italic font-normal text-[#f5f1e8]">e-commerce stores</em>{" "}
            to <em className="not-italic font-normal text-[#f5f1e8]">SaaS platforms</em>.
          </p>
          <p className="font-outfit font-light text-[#8a8478] text-base md:text-[17px] leading-[1.7]">
            Working solo means every decision goes through one person who genuinely cares
            about the outcome. Based in India — working with clients worldwide.
            Fast delivery, honest communication, products that convert.
          </p>

          <a
            href="mailto:asapdotdrop@gmail.com"
            className="inline-flex items-center gap-3 mt-10 font-dm-mono text-[10px] uppercase tracking-[0.2em] text-[#ff5722] group cursor-pointer"
            data-hover="Email"
          >
            <span className="border-b border-[rgba(255,87,34,0.35)] pb-0.5 group-hover:border-[#ff5722] transition-colors duration-300">
              Let&apos;s work together
            </span>
            <span className="group-hover:translate-x-1.5 transition-transform duration-200">→</span>
          </a>
        </motion.div>

        {/* Right — stats counter */}
        <div ref={statsRef}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: 0.08 * i }}
              className="flex items-center justify-between border-t border-[rgba(245,241,232,0.08)] py-6 group cursor-default"
            >
              <span
                className="font-fraunces font-light text-[#f5f1e8] tabular-nums leading-none group-hover:text-[#ff5722] transition-colors duration-300"
                style={{ fontSize: "clamp(2rem, 3.8vw, 3.5rem)" }}
              >
                <CountUp to={stat.countTo} suffix={stat.suffix} trigger={inView} />
              </span>
              <span className="font-outfit text-[13px] text-[#4a463e] text-right max-w-[150px] leading-snug">
                {stat.label}
              </span>
            </motion.div>
          ))}
          <div className="border-t border-[rgba(245,241,232,0.08)]" />
        </div>
      </div>
    </section>
  );
}
