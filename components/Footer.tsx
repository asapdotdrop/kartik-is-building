"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const connect = [
  { label: "Email",     href: "mailto:asapdotdrop@gmail.com" },
  { label: "LinkedIn",  href: "#" },
  { label: "GitHub",    href: "#" },
  { label: "Instagram", href: "#" },
];

const hire = [
  { label: "Fiverr",  href: "#" },
  { label: "Upwork",  href: "#" },
  { label: "Direct",  href: "mailto:asapdotdrop@gmail.com" },
];

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }) + " IST";
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="border-t border-[rgba(245,241,232,0.07)]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-16 md:pt-20 pb-10">

        {/* Top: big brand line */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="pb-14 border-b border-[rgba(245,241,232,0.07)] mb-14"
        >
          <p
            className="font-fraunces font-light italic text-[#f5f1e8] leading-[1.0] tracking-[-0.025em]"
            style={{ fontSize: "clamp(2.2rem, 5vw, 5rem)" }}
          >
            Build with Kartik
          </p>
          <p className="font-outfit font-light text-[#4a463e] text-[15px] mt-5 max-w-[320px] leading-relaxed">
            Indie developer building digital products that help businesses grow — one project at a time.
          </p>
        </motion.div>

        {/* 4 cols */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-14 border-b border-[rgba(245,241,232,0.07)]">

          {/* Col 1 */}
          <div>
            <p className="font-dm-mono text-[9px] uppercase tracking-[0.18em] text-[#4a463e] mb-5">
              Connect
            </p>
            <ul className="space-y-3">
              {connect.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="font-outfit text-[#8a8478] text-sm hover:text-[#f5f1e8] transition-colors duration-200 group flex items-center gap-2"
                    data-hover={item.label}
                  >
                    <span className="w-3 h-px bg-[#4a463e] group-hover:bg-[#ff5722] group-hover:w-5 transition-all duration-200" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <p className="font-dm-mono text-[9px] uppercase tracking-[0.18em] text-[#4a463e] mb-5">
              Hire
            </p>
            <ul className="space-y-3">
              {hire.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="font-outfit text-[#8a8478] text-sm hover:text-[#f5f1e8] transition-colors duration-200 group flex items-center gap-2"
                    data-hover={item.label}
                  >
                    <span className="w-3 h-px bg-[#4a463e] group-hover:bg-[#ff5722] group-hover:w-5 transition-all duration-200" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <p className="font-dm-mono text-[9px] uppercase tracking-[0.18em] text-[#4a463e] mb-5">
              Status
            </p>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-outfit text-[#d4cebd] text-sm">Available Q2 2026</span>
            </div>
            <p className="font-dm-mono text-[9px] uppercase tracking-[0.14em] text-[#4a463e]">
              Open to new projects
            </p>
          </div>

          {/* Col 4 */}
          <div>
            <p className="font-dm-mono text-[9px] uppercase tracking-[0.18em] text-[#4a463e] mb-5">
              Based in
            </p>
            <p className="font-outfit text-[#8a8478] text-sm leading-relaxed">
              India
              <br />
              Remote worldwide
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex items-center justify-between">
          <p className="font-dm-mono text-[9px] uppercase tracking-[0.14em] text-[#4a463e]">
            © 2026 Build with Kartik
          </p>
          <p className="font-dm-mono text-[9px] uppercase tracking-[0.14em] text-[#4a463e]">
            {time}
          </p>
        </div>
      </div>
    </footer>
  );
}
