"use client";

import { useEffect, useRef, useState } from "react";

export default function PageLoader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let start: number | null = null;
    const duration = 2200;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * 100));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(100);
        setTimeout(() => {
          setDone(true);
          setTimeout(() => setHidden(true), 900);
        }, 300);
      }
    };

    requestAnimationFrame(step);
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9990] bg-[#080808] flex flex-col justify-between p-8 md:p-16 transition-all duration-700"
      style={{
        clipPath: done ? "inset(0 0 100% 0)" : "inset(0 0 0% 0)",
        transition: "clip-path 0.8s cubic-bezier(0.76, 0, 0.24, 1)",
        pointerEvents: done ? "none" : "all",
      }}
    >
      {/* Count */}
      <div className="flex-1 flex items-center justify-center">
        <span
          className="font-fraunces font-light text-[#f5f1e8] select-none leading-none"
          style={{ fontSize: "clamp(6rem, 20vw, 16rem)" }}
        >
          {String(count).padStart(2, "0")}
        </span>
      </div>

      {/* Bottom bar */}
      <div className="flex items-end justify-between border-t border-[rgba(245,241,232,0.07)] pt-6">
        <span className="font-fraunces italic font-light text-[#f5f1e8] text-xl">
          Build with Kartik
        </span>
        <span className="font-dm-mono text-[10px] uppercase tracking-widest text-[#8a8478]">
          Loading experience...
        </span>
      </div>
    </div>
  );
}
