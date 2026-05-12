'use client'

import { useEffect, useState } from 'react'

export default function PageLoader() {
  const [progress, setProgress] = useState(0)
  const [done,     setDone]     = useState(false)
  const [hidden,   setHidden]   = useState(false)

  useEffect(() => {
    const duration = 1800
    let start: number | null = null

    const step = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      setProgress(Math.floor(p * 100))
      if (p < 1) {
        requestAnimationFrame(step)
      } else {
        setProgress(100)
        setTimeout(() => {
          setDone(true)
          setTimeout(() => setHidden(true), 1200)
        }, 100)
      }
    }

    requestAnimationFrame(step)
  }, [])

  if (hidden) return null

  return (
    <div
      className="fixed inset-0 z-[9990] bg-[#050505] flex flex-col items-center justify-center"
      style={{
        clipPath: done ? 'inset(0 0 100% 0)' : 'inset(0 0 0% 0)',
        transition: done ? 'clip-path 1.2s cubic-bezier(0.76, 0, 0.24, 1)' : 'none',
        pointerEvents: done ? 'none' : 'all',
      }}
    >
      {/* BwK lettering */}
      <span
        className="font-bebas text-white select-none leading-none mb-8"
        style={{ fontSize: 'clamp(8rem, 22vw, 22rem)' }}
      >
        BwK
      </span>

      {/* Progress bar */}
      <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#ff3c00] rounded-full transition-none"
          style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
        />
      </div>
    </div>
  )
}
