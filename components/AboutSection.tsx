'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function CountUp({ to, suffix, trigger }: { to: number | null; suffix: string; trigger: boolean }) {
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!trigger || to === null) return
    const duration = 1500
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setVal(Math.floor(eased * to))
      if (t < 1) requestAnimationFrame(tick)
      else setVal(to)
    }
    requestAnimationFrame(tick)
  }, [trigger, to])

  if (to === null) return <>∞</>
  return <>{val}{suffix}</>
}

const statsData = [
  { to: 5, suffix: '+', label: 'Projects' },
  { to: 48, suffix: 'H', label: 'Delivery' },
  { to: null, suffix: '', label: 'Revisions' },
  { to: 100, suffix: '%', label: 'Guarantee' },
]

export default function AboutSection() {
  const statsRef = useRef<HTMLDivElement>(null)
  const inView   = useInView(statsRef, { once: true, amount: 0.25 })

  return (
    <section id="about" className="max-w-[1400px] mx-auto px-6 md:px-14 py-28 md:py-40">
      <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2 }}
        >
          <p className="font-dm-mono text-[#ff3c00] text-[0.75rem] uppercase tracking-[0.3em] mb-6">
            ABOUT
          </p>
          <h2
            className="font-bebas text-white leading-none mb-2"
            style={{ fontSize: 'clamp(3rem, 7vw, 5rem)' }}
          >
            SOLO DEV.
          </h2>
          <p
            className="font-fraunces italic text-white/80 font-light mb-6"
            style={{ fontSize: '2rem' }}
          >
            Studio output.
          </p>
          <p className="font-outfit text-[#aaaaaa] text-[1.05rem] leading-relaxed max-w-md">
            I build digital products that help businesses grow online. From luxury e-commerce
            to AI-powered SaaS platforms — fast delivery, premium quality, real results.
          </p>
        </motion.div>

        {/* Right — Stats */}
        <div ref={statsRef} className="grid grid-cols-2 gap-px bg-white/[0.08]">
          {statsData.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="bg-[#050505] border-t border-white/[0.08] p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <div
                className="font-bebas text-white leading-none mb-2"
                style={{ fontSize: '4.5rem' }}
              >
                <CountUp to={stat.to} suffix={stat.suffix} trigger={inView} />
              </div>
              <p className="font-dm-mono text-[#555555] text-[0.7rem] uppercase tracking-[0.2em]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
