"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 768) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      dot.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;

      const target = e.target as HTMLElement;
      const hoverEl = target.closest("[data-hover]") as HTMLElement | null;
      if (hoverEl) {
        setHovered(true);
        setLabel(hoverEl.dataset.hover || "");
      } else {
        setHovered(false);
        setLabel("");
      }
    };

    let raf: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      ringPos.current.x = lerp(ringPos.current.x, pos.current.x, 0.16);
      ringPos.current.y = lerp(ringPos.current.y, pos.current.y, 0.16);

      const size = hovered ? 90 : 36;
      ring.style.transform = `translate(${ringPos.current.x - size / 2}px, ${ringPos.current.y - size / 2}px)`;
      ring.style.width = `${size}px`;
      ring.style.height = `${size}px`;

      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);
    };
  }, [hovered, visible]);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] w-[6px] h-[6px] rounded-full bg-[#f5f1e8] pointer-events-none mix-blend-difference transition-opacity duration-300 hidden md:block"
        style={{ opacity: visible ? 1 : 0 }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9999] rounded-full border border-[#f5f1e8] pointer-events-none transition-[width,height] duration-200 ease-out hidden md:flex items-center justify-center"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {hovered && label && (
          <span
            ref={labelRef}
            className="text-[#f5f1e8] font-dm-mono text-[9px] uppercase tracking-widest text-center leading-tight px-1"
          >
            {label}
          </span>
        )}
      </div>
    </>
  );
}
