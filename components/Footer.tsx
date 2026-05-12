'use client'

import { useEffect, useState } from 'react'

const socials = [
  { label: 'GitHub',    href: '#' },
  { label: 'LinkedIn',  href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'Fiverr',    href: '#' },
]

export default function Footer() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }) + ' IST'
    setTime(fmt())
    const id = setInterval(() => setTime(fmt()), 60000)
    return () => clearInterval(id)
  }, [])

  return (
    <footer className="border-t border-white/[0.08] py-6">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left */}
        <span className="font-dm-mono text-[#555555] text-[0.7rem] uppercase tracking-[0.15em]">
          © 2026 Build with Kartik
        </span>

        {/* Center — Socials */}
        <div className="flex items-center gap-8">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="font-dm-mono text-[#555555] text-[0.7rem] uppercase tracking-[0.15em] hover:text-white transition-colors duration-200"
              data-cursor={s.label}
            >
              {s.label}
            </a>
          ))}
        </div>

        {/* Right — clock */}
        <span className="font-dm-mono text-[#555555] text-[0.7rem] uppercase tracking-[0.15em]">
          {time}
        </span>
      </div>
    </footer>
  )
}
