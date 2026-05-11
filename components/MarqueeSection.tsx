"use client";

import { motion } from "framer-motion";

const items = [
  "Full Stack Development",
  "AI Agents",
  "Voice Automation",
  "Modern Web",
  "Available for Hire",
];

const doubled = [...items, ...items];

export default function MarqueeSection() {
  return (
    <motion.div
      className="border-y border-[rgba(245,241,232,0.07)] py-5 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex whitespace-nowrap group">
        {[0, 1].map((key) => (
          <div
            key={key}
            aria-hidden={key === 1}
            className="marquee-track flex shrink-0 group-hover:[animation-play-state:paused]"
          >
            {doubled.map((item, i) => (
              <span key={i} className="flex items-center">
                <span
                  className="font-fraunces italic font-light text-[#d4cebd] hover:text-[#f5f1e8] transition-colors duration-300 cursor-default"
                  style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.8rem)" }}
                >
                  {item}
                </span>
                <span
                  className="mx-8 md:mx-12 text-[#ff5722] opacity-80"
                  style={{ fontSize: "clamp(1rem, 1.8vw, 1.8rem)" }}
                >
                  ✦
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
