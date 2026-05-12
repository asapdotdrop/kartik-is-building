'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const projectTypes = [
  'Web App',
  'E-commerce',
  'AI Chatbot',
  'Voice Agent',
  'Landing Page',
  'Other',
]

const budgets = ['Under $500', '$500–2000', '$2000–5000', '$5000+']

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 800))
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      formRef.current?.reset()
    }, 3000)
    setSubmitting(false)
  }

  return (
    <main className="min-h-screen bg-[#050505] relative overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.45, filter: 'saturate(0.6) contrast(1.1) brightness(0.85)', zIndex: 0 }}
      >
        <source src="/14520076_1920_1080_24fps.mp4" type="video/mp4" />
      </video>

      {/* Overlay — heavy left fade so form stays readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(105deg, #050505 35%, rgba(5,5,5,0.75) 60%, rgba(5,5,5,0.35) 100%)',
          zIndex: 1,
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pt-10 pb-20 min-h-screen flex flex-col lg:flex-row gap-16 items-start lg:items-center">
        {/* Left */}
        <div className="flex-1 max-w-xl">
          {/* Back */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-dm-mono text-[#555555] text-[0.7rem] uppercase tracking-[0.2em] hover:text-white transition-colors duration-200 mb-16"
          >
            ← Back
          </Link>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1
              className="font-bebas text-white leading-none"
              style={{ fontSize: 'clamp(5rem, 15vw, 12rem)' }}
            >
              LET&apos;S
            </h1>
            <h1
              className="font-bebas leading-none"
              style={{
                fontSize: 'clamp(5rem, 15vw, 12rem)',
                color: 'transparent',
                WebkitTextStroke: '3px #ff3c00',
              }}
            >
              BUILD.
            </h1>
          </motion.div>

          {/* Subtext */}
          <motion.p
            className="font-fraunces italic text-[#aaaaaa] text-[1.2rem] font-light mt-8 mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Have a project in mind?
            <br />
            An idea that needs building?
            <br />
            Let&apos;s talk.
          </motion.p>

          {/* Contact info */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <a
              href="mailto:asapdotdrop@gmail.com"
              className="flex items-center gap-3 font-dm-mono text-white text-[0.8rem] tracking-[0.1em] hover:text-[#ff3c00] transition-colors duration-200"
            >
              <span className="w-6 h-px bg-[#ff3c00]" />
              asapdotdrop@gmail.com
            </a>
            <div className="flex items-center gap-3 font-dm-mono text-[#555555] text-[0.8rem] tracking-[0.1em]">
              <span className="w-6 h-px bg-[#555555]" />
              India · Remote Worldwide
            </div>
            <div className="flex items-center gap-3 font-dm-mono text-[0.8rem] tracking-[0.1em]">
              <span className="w-6 h-px bg-[#555555]" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[#aaaaaa]">Available for projects</span>
            </div>
          </motion.div>
        </div>

        {/* Right — Form */}
        <motion.div
          className="w-full lg:w-[480px] xl:w-[520px] flex-shrink-0"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-[#0d0d0d] border border-white/[0.07] rounded-2xl p-8 md:p-12">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div className="group">
                <label className="block font-dm-mono text-[#555555] text-[0.65rem] uppercase tracking-[0.2em] mb-2 group-focus-within:text-[#ff3c00] transition-colors duration-200">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-transparent border-b border-white/[0.12] focus:border-[#ff3c00] text-white font-outfit text-[1rem] py-2 outline-none transition-colors duration-200 placeholder:text-[#333]"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div className="group">
                <label className="block font-dm-mono text-[#555555] text-[0.65rem] uppercase tracking-[0.2em] mb-2 group-focus-within:text-[#ff3c00] transition-colors duration-200">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  className="w-full bg-transparent border-b border-white/[0.12] focus:border-[#ff3c00] text-white font-outfit text-[1rem] py-2 outline-none transition-colors duration-200 placeholder:text-[#333]"
                  placeholder="your@email.com"
                />
              </div>

              {/* Project Type */}
              <div className="group">
                <label className="block font-dm-mono text-[#555555] text-[0.65rem] uppercase tracking-[0.2em] mb-2 group-focus-within:text-[#ff3c00] transition-colors duration-200">
                  Project Type
                </label>
                <select
                  required
                  className="w-full bg-[#0d0d0d] border-b border-white/[0.12] focus:border-[#ff3c00] text-white font-outfit text-[1rem] py-2 outline-none transition-colors duration-200 appearance-none"
                >
                  <option value="" className="bg-[#0d0d0d]">Select type</option>
                  {projectTypes.map((t) => (
                    <option key={t} value={t} className="bg-[#0d0d0d]">{t}</option>
                  ))}
                </select>
              </div>

              {/* Budget */}
              <div className="group">
                <label className="block font-dm-mono text-[#555555] text-[0.65rem] uppercase tracking-[0.2em] mb-2 group-focus-within:text-[#ff3c00] transition-colors duration-200">
                  Budget
                </label>
                <select
                  required
                  className="w-full bg-[#0d0d0d] border-b border-white/[0.12] focus:border-[#ff3c00] text-white font-outfit text-[1rem] py-2 outline-none transition-colors duration-200 appearance-none"
                >
                  <option value="" className="bg-[#0d0d0d]">Select budget</option>
                  {budgets.map((b) => (
                    <option key={b} value={b} className="bg-[#0d0d0d]">{b}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="group">
                <label className="block font-dm-mono text-[#555555] text-[0.65rem] uppercase tracking-[0.2em] mb-2 group-focus-within:text-[#ff3c00] transition-colors duration-200">
                  Message
                </label>
                <textarea
                  rows={5}
                  required
                  className="w-full bg-transparent border-b border-white/[0.12] focus:border-[#ff3c00] text-white font-outfit text-[1rem] py-2 outline-none transition-colors duration-200 placeholder:text-[#333] resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={submitting}
                className="w-full font-bebas text-white tracking-[0.15em] py-5 rounded-full text-[1.3rem] transition-all duration-300"
                style={{
                  background: submitted ? '#22c55e' : '#ff3c00',
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {submitted ? '✓ Message Sent!' : submitting ? 'Sending...' : 'Send Message →'}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
