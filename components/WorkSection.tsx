'use client'

import { useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const projects = [
  {
    num: '/01',
    name: 'IRON HOUSE',
    type: 'Boutique Gym',
    desc: '3D immersive gym website with illustrated equipment scene.',
    tech: ['Next.js', 'Three.js', 'Framer Motion'],
    url: 'https://iron-house-dusky.vercel.app/',
    year: '2026',
  },
  {
    num: '/02',
    name: 'NEXUS AI',
    type: 'SaaS Platform',
    desc: 'AI workflow automation platform with 3D geometric hero.',
    tech: ['Next.js', 'Three.js', 'AI'],
    url: 'https://nexus-saas-mu-coral.vercel.app/',
    year: '2026',
  },
  {
    num: '/03',
    name: 'MAISON STORE',
    type: 'Luxury E-commerce',
    desc: 'Premium fashion store with immersive 3D product experience.',
    tech: ['Next.js', 'Three.js', 'Zustand'],
    url: 'https://maison-store-gamma.vercel.app/',
    year: '2026',
  },
  {
    num: '/04',
    name: 'CASA MILANO',
    type: 'Restaurant',
    desc: 'Italian fine dining website with editorial luxury aesthetic.',
    tech: ['HTML', 'CSS', 'JS'],
    url: 'https://casa-milano.vercel.app/',
    year: '2026',
  },
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [previewPos, setPreviewPos] = useState({ x: 0, y: 0 })
  const [showPreview, setShowPreview] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)

    card.style.transform = `perspective(1000px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateZ(10px)`
    setPreviewPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }, [])

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (card) card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
    setShowPreview(false)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, delay: index * 0.08 }}
      className="flex-shrink-0 relative"
      style={{ width: '65vw', minWidth: '320px', maxWidth: '640px' }}
    >
      <div
        ref={cardRef}
        className="relative bg-[#0d0d0d] border border-white/[0.07] rounded-2xl overflow-hidden p-10 h-[70vh] min-h-[400px] flex flex-col justify-between cursor-pointer transition-all duration-300 hover:border-[#ff3c00]/60 hover:shadow-[0_0_40px_rgba(255,60,0,0.15)]"
        style={{ transition: 'transform 0.1s ease-out, box-shadow 0.3s ease, border-color 0.3s ease' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setShowPreview(true)}
        onMouseLeave={handleMouseLeave}
        data-cursor="View"
      >
        {/* Top row */}
        <div className="flex items-center justify-between">
          <span className="font-dm-mono text-[#555555] text-[0.7rem] tracking-[0.2em]">
            {project.num}
          </span>
          <span className="font-dm-mono text-[#555555] text-[0.7rem] tracking-[0.2em]">
            {project.year}
          </span>
        </div>

        {/* Middle */}
        <div className="flex-1 flex flex-col justify-center">
          <h3
            className="font-bebas text-white leading-none mb-4"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            {project.name}
          </h3>
          <span className="inline-flex items-center font-dm-mono text-[#ff3c00] text-[0.65rem] uppercase tracking-[0.2em] border border-[#ff3c00]/50 rounded-full px-3 py-1 mb-4 w-fit">
            {project.type}
          </span>
          <p className="font-outfit text-[#aaaaaa] text-[0.95rem] leading-relaxed max-w-sm line-clamp-2">
            {project.desc}
          </p>
        </div>

        {/* Bottom row */}
        <div className="flex items-end justify-between">
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="font-dm-mono text-[#555555] text-[0.65rem] uppercase tracking-wider"
              >
                {t}
              </span>
            ))}
          </div>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-dm-mono text-white text-[0.7rem] tracking-[0.15em] hover:text-[#ff3c00] transition-colors duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            View ↗
          </a>
        </div>

        {/* Iframe preview on hover */}
        <AnimatePresence>
          {showPreview && (
            <motion.div
              className="absolute pointer-events-none z-20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              style={{
                left: Math.min(previewPos.x + 16, 300),
                top: Math.max(previewPos.y - 110, 10),
                width: 240,
                height: 160,
              }}
            >
              <div className="w-full h-full rounded-lg overflow-hidden border border-white/10 bg-[#0d0d0d] shadow-2xl">
                <div className="h-6 bg-[#1a1a1a] flex items-center px-2 gap-1">
                  {['#ff5f57','#ffbd2e','#28c840'].map((c) => (
                    <span key={c} className="w-2 h-2 rounded-full" style={{ background: c }} />
                  ))}
                </div>
                <div className="relative" style={{ height: 'calc(100% - 24px)', overflow: 'hidden' }}>
                  <iframe
                    src={project.url}
                    style={{ width: '200%', height: '200%', transform: 'scale(0.5)', transformOrigin: 'top left', border: 'none', pointerEvents: 'none' }}
                    loading="lazy"
                    title={project.name}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function WorkSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef({ x: 0, scrollLeft: 0 })

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    dragStart.current = { x: e.clientX, scrollLeft: scrollRef.current?.scrollLeft ?? 0 }
  }
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return
    const dx = e.clientX - dragStart.current.x
    scrollRef.current.scrollLeft = dragStart.current.scrollLeft - dx
  }
  const onMouseUp = () => setIsDragging(false)

  return (
    <section id="work" className="py-28 md:py-44">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-16">
        <motion.p
          className="font-dm-mono text-[#ff3c00] text-[0.75rem] uppercase tracking-[0.3em] mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          SELECTED
        </motion.p>
        <div className="overflow-hidden">
          <motion.div
            initial={{ y: '100%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          >
            <span
              className="font-bebas text-white leading-none block"
              style={{ fontSize: 'clamp(4rem, 12vw, 10rem)' }}
            >
              WORK.
            </span>
          </motion.div>
        </div>
        <p className="font-fraunces italic text-[#555555] text-xl mt-2">(2026)</p>
      </div>

      {/* Horizontal scroll */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-scroll no-scrollbar px-6 md:px-12 scroll-smooth"
        style={{
          scrollSnapType: 'x mandatory',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {projects.map((project, i) => (
          <div key={project.num} style={{ scrollSnapAlign: 'start' }}>
            <ProjectCard project={project} index={i} />
          </div>
        ))}
        {/* Trailing spacer */}
        <div className="flex-shrink-0 w-6 md:w-12" />
      </div>
    </section>
  )
}
