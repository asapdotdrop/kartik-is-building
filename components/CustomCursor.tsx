'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef   = useRef<HTMLDivElement>(null)
  const ringRef  = useRef<HTMLDivElement>(null)
  const glowRef  = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  const pos      = useRef({ x: 0, y: 0 })
  const ringPos  = useRef({ x: 0, y: 0 })
  const glowPos  = useRef({ x: 0, y: 0 })

  const [hovered, setHovered] = useState(false)
  const [label,   setLabel]   = useState('')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (window.innerWidth <= 768) return

    const dot  = dotRef.current
    const ring = ringRef.current
    const glow = glowRef.current
    if (!dot || !ring || !glow) return

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (!visible) setVisible(true)
      dot.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`

      const target  = e.target as HTMLElement
      const hoverEl = target.closest('[data-cursor]') as HTMLElement | null
      if (hoverEl) {
        setHovered(true)
        setLabel(hoverEl.dataset.cursor || '')
      } else {
        setHovered(false)
        setLabel('')
      }
    }

    let raf: number
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const animate = () => {
      ringPos.current.x = lerp(ringPos.current.x, pos.current.x, 0.14)
      ringPos.current.y = lerp(ringPos.current.y, pos.current.y, 0.14)
      glowPos.current.x = lerp(glowPos.current.x, pos.current.x, 0.06)
      glowPos.current.y = lerp(glowPos.current.y, pos.current.y, 0.06)

      const size = hovered ? 100 : 40
      ring.style.transform = `translate(${ringPos.current.x - size / 2}px, ${ringPos.current.y - size / 2}px)`
      ring.style.width  = `${size}px`
      ring.style.height = `${size}px`

      glow.style.transform = `translate(${glowPos.current.x - 75}px, ${glowPos.current.y - 75}px)`

      raf = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [hovered, visible])

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] w-[6px] h-[6px] rounded-full bg-white pointer-events-none mix-blend-difference hidden md:block"
        style={{ opacity: visible ? 1 : 0 }}
      />

      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9999] rounded-full border border-white pointer-events-none hidden md:flex items-center justify-center transition-[width,height] duration-200 ease-out"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {hovered && label && (
          <span
            ref={labelRef}
            className="text-white font-dm-mono text-[9px] uppercase tracking-widest text-center px-1"
          >
            {label}
          </span>
        )}
      </div>

      {/* Glow */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 z-[9998] w-[150px] h-[150px] rounded-full pointer-events-none hidden md:block"
        style={{
          opacity: visible ? 0.03 : 0,
          background: 'radial-gradient(circle, white 0%, transparent 70%)',
        }}
      />
    </>
  )
}
