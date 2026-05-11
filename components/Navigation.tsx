"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Work",     href: "#work"     },
  { label: "About",   href: "#about"   },
  { label: "Services",href: "#services" },
  { label: "Contact", href: "#contact"  },
];

export default function Navigation() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [navReady,  setNavReady]  = useState(false);
  const [progress,  setProgress]  = useState(0);

  useEffect(() => {
    // Appear after loader (~2700ms)
    const t = setTimeout(() => setNavReady(true), 2700);

    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const doc = document.documentElement;
      const scrolled = doc.scrollTop;
      const total = doc.scrollHeight - doc.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };

    window.addEventListener("scroll", onScroll);
    return () => { clearTimeout(t); window.removeEventListener("scroll", onScroll); };
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div
        id="scroll-progress"
        style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
      />

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={navReady ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-500 ${
          scrolled
            ? "py-3 bg-[rgba(8,8,8,0.88)] backdrop-blur-md border-b border-[rgba(245,241,232,0.06)]"
            : "py-6 bg-transparent"
        }`}
      >
        <nav className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-fraunces text-[#f5f1e8] text-base md:text-lg flex items-center gap-1.5 group"
            data-hover="Home"
          >
            <span className="font-normal">Build</span>
            <span className="italic font-light text-[#d4cebd] group-hover:text-[#f5f1e8] transition-colors duration-300">
              with Kartik
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5722] inline-block glow-pulse ml-1 shrink-0" />
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="font-dm-mono text-[10px] uppercase tracking-[0.15em] text-[#8a8478] hover:text-[#f5f1e8] transition-colors duration-300 nav-underline"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
              <span className="font-dm-mono text-[10px] uppercase tracking-[0.15em] text-[#8a8478]">
                Available
              </span>
            </div>

            {/* Hamburger */}
            <button
              className="md:hidden flex flex-col gap-[5px] p-1 z-10"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {[0,1,2].map((i) => (
                <span
                  key={i}
                  className="block w-5 h-px bg-[#f5f1e8] transition-all duration-300 origin-center"
                  style={{
                    transform: menuOpen
                      ? i === 0 ? "translateY(6px) rotate(45deg)"
                      : i === 1 ? "scaleX(0)"
                      : "translateY(-6px) rotate(-45deg)"
                      : "none",
                    opacity: menuOpen && i === 1 ? 0 : 1,
                  }}
                />
              ))}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
            menuOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="flex flex-col px-6 pt-4 pb-6 gap-1 border-t border-[rgba(245,241,232,0.06)] mt-3">
            {navLinks.map((link, i) => (
              <li key={link.label}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="font-fraunces font-light text-2xl text-[#f5f1e8] w-full text-left py-3 border-b border-[rgba(245,241,232,0.06)] hover:text-[#ff5722] transition-colors duration-200"
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </motion.header>
    </>
  );
}
