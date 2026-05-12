'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

function LetterReveal({ text, delay = 0, outlined = false }: { text: string; delay?: number; outlined?: boolean }) {
  return (
    <span
      className="inline-block"
      style={outlined ? { color: 'transparent', WebkitTextStroke: '2px white' } : {}}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 40, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.8,
            delay: delay + i * 0.04,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
        >
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </span>
  )
}

export default function HeroSection() {
  const [ready, setReady] = useState(false)
  const btn1 = useRef<HTMLAnchorElement>(null)
  const btn2 = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 2100)
    return () => clearTimeout(t)
  }, [])

  const applyMagnetic = (ref: React.RefObject<HTMLAnchorElement | null>) => ({
    onMouseMove: (e: React.MouseEvent) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const dx = e.clientX - rect.left - rect.width / 2
      const dy = e.clientY - rect.top - rect.height / 2
      el.style.transform = `translate(${dx * 0.25}px, ${dy * 0.25}px)`
    },
    onMouseLeave: () => {
      const el = ref.current
      if (el) el.style.transform = 'translate(0,0)'
    },
  })

  return (
    <section className="relative w-full h-screen min-h-[680px] flex flex-col overflow-hidden">

      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.55, filter: 'saturate(0.7) contrast(1.1) brightness(0.9)' }}
      >
        <source src="/12442569_1920_1080_30fps.mp4" type="video/mp4" />
      </video>

      {/* Radial + bottom gradient overlays */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 25%, rgba(5,5,5,0.65) 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            'linear-gradient(180deg, rgba(5,5,5,0.5) 0%, transparent 25%, transparent 60%, #050505 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">

        {/* Label */}
        <motion.p
          className="font-dm-mono text-[#ff3c00] text-[0.75rem] tracking-[0.3em] uppercase mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          PORTFOLIO — 2026
        </motion.p>

        {/* Headline */}
        <div
          className="font-bebas leading-[0.85] tracking-[-0.02em] mb-6"
          style={{ fontSize: 'clamp(5rem, 15vw, 16rem)', perspective: '800px' }}
        >
          <div>
            {ready && <LetterReveal text="BUILD WITH" delay={0} />}
          </div>
          <div>
            {ready && <LetterReveal text="KARTIK." delay={0.45} outlined />}
          </div>
        </div>

        {/* Subtitle */}
        <motion.p
          className="font-fraunces italic text-[#aaaaaa] text-[1.3rem] font-light mb-12 max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          Indie developer. Studio output.
          <br />
          Available for serious projects.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <a
            ref={btn1}
            href="/contact"
            {...applyMagnetic(btn1)}
            className="font-dm-mono text-white bg-[#ff3c00] px-10 py-5 rounded-full text-[0.8rem] tracking-[0.15em] uppercase"
            style={{ transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)' }}
          >
            Start a Project →
          </a>
          <a
            ref={btn2}
            href="/contact"
            {...applyMagnetic(btn2)}
            className="font-dm-mono text-white border border-white/40 px-10 py-5 rounded-full text-[0.8rem] tracking-[0.15em] uppercase hover:border-white"
            style={{ transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.3s' }}
          >
            Say Hi ↗
          </a>
        </motion.div>
      </div>

      {/* Bottom corners */}
      <div className="relative z-10 flex items-end justify-between px-6 md:px-12 pb-8">
        <motion.span
          className="font-dm-mono text-[#555555] text-[0.7rem] uppercase tracking-[0.2em]"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          Scroll ↓
        </motion.span>
        <motion.span
          className="font-dm-mono text-[#555555] text-[0.7rem] uppercase tracking-[0.2em]"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          India · Remote · Worldwide
        </motion.span>
      </div>
    </section>
  )
}
