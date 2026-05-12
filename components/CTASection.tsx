'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'

export default function CTASection() {
  const btn1 = useRef<HTMLAnchorElement>(null)
  const btn2 = useRef<HTMLAnchorElement>(null)

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
    <section id="contact" className="py-28 md:py-44 text-center px-6 overflow-hidden">
      <motion.p
        className="font-bebas text-[#555555] leading-none"
        style={{ fontSize: '8vw' }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        READY TO
      </motion.p>
      <motion.p
        className="font-bebas text-[#ff3c00] leading-none"
        style={{ fontSize: '20vw' }}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        BUILD?
      </motion.p>
      <motion.p
        className="font-fraunces italic text-[#aaaaaa] text-[1.5rem] font-light mt-6 mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Let&apos;s make something extraordinary.
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <a
          ref={btn1}
          href="/contact"
          {...applyMagnetic(btn1)}
          className="font-dm-mono text-white bg-[#ff3c00] px-10 py-5 rounded-full text-[0.8rem] tracking-[0.15em] uppercase hover:scale-105"
          style={{ transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)' }}
          data-cursor="Start"
        >
          Start a Project →
        </a>
        <a
          ref={btn2}
          href="/contact"
          {...applyMagnetic(btn2)}
          className="font-dm-mono text-white border border-white/40 px-10 py-5 rounded-full text-[0.8rem] tracking-[0.15em] uppercase hover:border-white"
          style={{ transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.3s' }}
          data-cursor="Hi"
        >
          Say Hi ↗
        </a>
      </motion.div>
    </section>
  )
}
