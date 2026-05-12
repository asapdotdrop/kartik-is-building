'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const services = [
  {
    num: '/01',
    name: 'FULL STACK WEB APPS',
    desc: 'Custom web applications from MVPs to SaaS',
  },
  {
    num: '/02',
    name: 'AI CHATBOTS',
    desc: 'Custom AI assistants for support & sales',
  },
  {
    num: '/03',
    name: 'AI VOICE AGENTS',
    desc: '24/7 voice automation using Vapi',
  },
  {
    num: '/04',
    name: 'E-COMMERCE STORES',
    desc: 'Shopify, custom builds, conversion-focused',
  },
  {
    num: '/05',
    name: 'LANDING PAGES',
    desc: 'High-converting pages in 24-72 hours',
  },
]

export default function ServicesSection() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section id="services" className="max-w-[1400px] mx-auto px-6 md:px-12 py-28 md:py-44">
      {/* Header */}
      <motion.p
        className="font-dm-mono text-[#ff3c00] text-[0.75rem] uppercase tracking-[0.3em] mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        WHAT I
      </motion.p>
      <div className="overflow-hidden mb-16">
        <motion.div
          initial={{ y: '100%' }}
          whileInView={{ y: '0%' }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <span
            className="font-bebas leading-none block"
            style={{
              fontSize: 'clamp(4rem, 12vw, 10rem)',
              color: 'transparent',
              WebkitTextStroke: '2px white',
            }}
          >
            BUILD.
          </span>
        </motion.div>
      </div>

      {/* Rows */}
      <div className="border-t border-white/[0.08]">
        {services.map((service, i) => (
          <motion.div
            key={service.num}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.07 * i }}
          >
            <div
              className="relative group border-b border-white/[0.08] overflow-hidden cursor-pointer"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              data-cursor="Inquire"
            >
              {/* BG fill */}
              <motion.div
                className="absolute inset-0 bg-[#0d0d0d]"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: hovered === i ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                style={{ transformOrigin: 'bottom' }}
              />

              <div
                className="relative grid py-8 md:py-10 transition-all duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
                style={{
                  gridTemplateColumns: '80px 1fr 1fr 60px',
                  paddingLeft: hovered === i ? '2rem' : '0',
                }}
              >
                {/* Number */}
                <span className="font-dm-mono text-[#555555] text-[0.7rem] tracking-[0.2em] self-center">
                  {service.num}
                </span>

                {/* Name */}
                <span
                  className="font-bebas self-center transition-colors duration-300"
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                    color: hovered === i ? '#ff3c00' : 'white',
                  }}
                >
                  {service.name}
                </span>

                {/* Description */}
                <span className="hidden md:flex font-outfit text-[#555555] text-[0.9rem] items-center leading-relaxed">
                  {service.desc}
                </span>

                {/* Arrow */}
                <span
                  className="font-outfit text-2xl self-center text-right transition-all duration-300"
                  style={{ color: hovered === i ? '#ff3c00' : '#555555' }}
                >
                  {hovered === i ? '↗' : '→'}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
