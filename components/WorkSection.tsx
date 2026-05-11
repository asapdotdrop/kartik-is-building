"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    num: "01",
    title: "Iron House",
    type: "Boutique Gym",
    tech: "Next.js · Three.js",
    year: "2025",
    url: "https://iron-house-dusky.vercel.app/",
    accent: "#ff5722",
  },
  {
    num: "02",
    title: "Nexus AI",
    type: "SaaS Platform",
    tech: "Next.js · AI Workflows",
    year: "2025",
    url: "https://nexus-saas-mu-coral.vercel.app/",
    accent: "#ff5722",
  },
  {
    num: "03",
    title: "Maison Store",
    type: "Luxury E-commerce",
    tech: "Next.js · Fashion",
    year: "2025",
    url: "https://maison-store-gamma.vercel.app/",
    accent: "#ff5722",
  },
  {
    num: "04",
    title: "Casa Milano",
    type: "Restaurant",
    tech: "HTML · CSS · Editorial",
    year: "2025",
    url: "https://casa-milano.vercel.app/",
    accent: "#ff5722",
  },
];

export default function WorkSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [cursor,  setCursor]  = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="max-w-[1400px] mx-auto px-6 md:px-12 py-28 md:py-44 relative"
      onMouseMove={handleMouseMove}
    >
      {/* Header */}
      <div className="flex items-end justify-between mb-12 md:mb-20">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="font-dm-mono text-[10px] uppercase tracking-[0.2em] text-[#4a463e] mb-4"
          >
            — Work
          </motion.p>
          <div className="overflow-hidden">
          <motion.h2
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="font-fraunces font-light text-[#f5f1e8] leading-[1.0] tracking-[-0.025em]"
            style={{ fontSize: "clamp(2.4rem, 5.5vw, 5.5rem)" }}
          >
            Selected <span className="italic text-[#8a8478]">work.</span>
          </motion.h2>
          </div>
        </div>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden md:block font-dm-mono text-[10px] tracking-[0.18em] text-[#4a463e] uppercase"
        >
          {projects.length} projects
        </motion.span>
      </div>

      {/* Project rows */}
      <div className="border-t border-[rgba(245,241,232,0.07)]">
        {projects.map((project, i) => (
          <motion.div
            key={project.num}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.55, delay: 0.07 * i, ease: [0.76, 0, 0.24, 1] }}
          >
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center border-b border-[rgba(245,241,232,0.07)] relative overflow-hidden"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              data-hover="View"
            >
              {/* Background fill on hover */}
              <motion.div
                className="absolute inset-0 bg-[#0f0e0d]"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: hovered === i ? 1 : 0 }}
                transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
                style={{ transformOrigin: "bottom" }}
              />

              <div
                className="relative w-full py-7 md:py-9 flex items-center gap-6 md:gap-0 transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)]"
                style={{ paddingLeft: hovered === i ? "1.5rem" : "0" }}
              >
                {/* Number */}
                <span className="font-dm-mono text-[10px] tracking-[0.18em] text-[#4a463e] w-[50px] shrink-0">
                  /{project.num}
                </span>

                {/* Title */}
                <span
                  className="font-fraunces font-light text-[#f5f1e8] flex-1 min-w-0 leading-none tracking-[-0.02em]"
                  style={{ fontSize: "clamp(1.4rem, 3vw, 2.8rem)" }}
                >
                  {project.title}
                </span>

                {/* Type */}
                <span className="hidden lg:block font-dm-mono text-[10px] uppercase tracking-[0.14em] text-[#8a8478] w-[170px] shrink-0">
                  {project.type}
                </span>

                {/* Tech */}
                <span className="hidden xl:block font-dm-mono text-[10px] tracking-[0.12em] text-[#4a463e] w-[220px] shrink-0">
                  {project.tech}
                </span>

                {/* Year */}
                <span className="hidden md:block font-dm-mono text-[10px] tracking-[0.14em] text-[#4a463e] w-[60px] shrink-0 text-right">
                  {project.year}
                </span>

                {/* Arrow */}
                <span
                  className="text-lg ml-4 md:ml-8 shrink-0 transition-all duration-300"
                  style={{
                    transform: hovered === i ? "rotate(-45deg) scale(1.1)" : "rotate(0deg) scale(1)",
                    color: hovered === i ? "#ff5722" : "#4a463e",
                  }}
                >
                  ↗
                </span>
              </div>
            </a>
          </motion.div>
        ))}
      </div>

      {/* Floating preview window */}
      <AnimatePresence>
        {hovered !== null && (
          <motion.div
            key={hovered}
            className="absolute pointer-events-none z-50 hidden lg:block"
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            transition={{ duration: 0.25, ease: [0.76, 0, 0.24, 1] }}
            style={{
              left: Math.min(cursor.x + 24, (sectionRef.current?.offsetWidth ?? 800) - 400),
              top: cursor.y - 120,
              width: 380,
              height: 240,
            }}
          >
            <div className="w-full h-full rounded-lg overflow-hidden border border-[rgba(245,241,232,0.08)] bg-[#0f0e0d] shadow-2xl relative">
              {/* Browser chrome */}
              <div className="h-8 bg-[#1a1917] flex items-center px-3 gap-1.5 border-b border-[rgba(245,241,232,0.05)]">
                {["#ff5f57","#ffbd2e","#28c840"].map((c) => (
                  <span key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                ))}
                <span className="ml-3 font-dm-mono text-[9px] text-[#4a463e] truncate">
                  {projects[hovered].url}
                </span>
              </div>
              <div className="relative" style={{ height: "calc(100% - 32px)" }}>
                <iframe
                  src={projects[hovered].url}
                  className="absolute inset-0"
                  style={{
                    width: "200%",
                    height: "200%",
                    transform: "scale(0.5)",
                    transformOrigin: "top left",
                    border: "none",
                    pointerEvents: "none",
                  }}
                  title={projects[hovered].title}
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
