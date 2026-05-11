"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const services = [
  {
    num: "01",
    name: "Full Stack Web Apps",
    desc: "End-to-end — concept, design, deployment.",
    tag: "Development",
  },
  {
    num: "02",
    name: "AI Chatbots",
    desc: "Intelligent conversational interfaces for your product.",
    tag: "AI",
  },
  {
    num: "03",
    name: "AI Voice Agents",
    desc: "Automated voice flows that handle customer calls 24/7.",
    tag: "AI",
  },
  {
    num: "04",
    name: "E-commerce Stores",
    desc: "High-converting storefronts built to scale.",
    tag: "Commerce",
  },
  {
    num: "05",
    name: "Landing Pages",
    desc: "Conversion-focused pages that leave an impression.",
    tag: "Design",
  },
];

export default function ServicesSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="services" className="max-w-[1400px] mx-auto px-6 md:px-12 py-28 md:py-44">

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="font-dm-mono text-[10px] uppercase tracking-[0.2em] text-[#4a463e] mb-4"
      >
        — Services
      </motion.p>
      <div className="overflow-hidden mb-14 md:mb-20">
        <motion.h2
          initial={{ y: "100%" }}
          whileInView={{ y: "0%" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="font-fraunces font-light text-[#f5f1e8] leading-[1.0] tracking-[-0.025em]"
          style={{ fontSize: "clamp(2.4rem, 5.5vw, 5.5rem)" }}
        >
          What I <span className="italic text-[#8a8478]">build.</span>
        </motion.h2>
      </div>

      <div className="border-t border-[rgba(245,241,232,0.07)]">
        {services.map((service, i) => (
          <motion.div
            key={service.num}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.07 * i, ease: [0.76, 0, 0.24, 1] }}
          >
            <a
              href={`mailto:asapdotdrop@gmail.com?subject=[${service.name}] Inquiry`}
              className="group relative block border-b border-[rgba(245,241,232,0.07)] overflow-hidden"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              data-hover="Inquire"
            >
              {/* BG fill */}
              <motion.div
                className="absolute inset-0 bg-[#0f0e0d]"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: hovered === i ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                style={{ transformOrigin: "bottom" }}
              />

              <div
                className="relative flex items-center justify-between py-7 md:py-9 transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)]"
                style={{ paddingLeft: hovered === i ? "1.5rem" : "0" }}
              >
                {/* Left: num + name */}
                <div className="flex items-center gap-6 md:gap-10 flex-1 min-w-0">
                  <span className="font-dm-mono text-[10px] tracking-[0.18em] text-[#4a463e] shrink-0">
                    /{service.num}
                  </span>
                  <span
                    className="font-fraunces font-light text-[#f5f1e8] truncate leading-none tracking-[-0.02em]"
                    style={{ fontSize: "clamp(1.15rem, 2.4vw, 2.2rem)" }}
                  >
                    {service.name}
                  </span>
                </div>

                {/* Right: tag + desc + arrow */}
                <div className="flex items-center gap-6 md:gap-10 shrink-0 ml-4">
                  <span
                    className="hidden lg:block font-dm-mono text-[9px] uppercase tracking-[0.16em] border border-[rgba(245,241,232,0.15)] rounded-full px-3 py-1 transition-all duration-300"
                    style={{
                      color: hovered === i ? "#ff5722" : "#4a463e",
                      borderColor: hovered === i ? "rgba(255,87,34,0.3)" : "rgba(245,241,232,0.1)",
                    }}
                  >
                    {service.tag}
                  </span>
                  <span className="hidden md:block font-outfit font-light text-[13px] text-[#4a463e] max-w-[240px] text-right leading-relaxed">
                    {service.desc}
                  </span>
                  <span
                    className="text-base transition-all duration-300 font-fraunces"
                    style={{
                      transform: hovered === i ? "rotate(-45deg)" : "rotate(0deg)",
                      color: hovered === i ? "#ff5722" : "#4a463e",
                    }}
                  >
                    ↗
                  </span>
                </div>
              </div>
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
