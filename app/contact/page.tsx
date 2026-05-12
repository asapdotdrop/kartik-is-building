'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

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
  const [error, setError] = useState('')
  const [senderName, setSenderName] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    const form = e.currentTarget
    const data = {
      name:        (form.elements.namedItem('name')        as HTMLInputElement).value,
      email:       (form.elements.namedItem('email')       as HTMLInputElement).value,
      phone:       (form.elements.namedItem('phone')       as HTMLInputElement).value,
      projectType: (form.elements.namedItem('projectType') as HTMLSelectElement).value,
      budget:      (form.elements.namedItem('budget')      as HTMLSelectElement).value,
      message:     (form.elements.namedItem('message')     as HTMLTextAreaElement).value,
    }

    setSenderName(data.name.split(' ')[0])

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error('Failed')

      setSubmitted(true)
      formRef.current?.reset()
    } catch {
      setError('Something went wrong. Please email me directly at asapdotdrop@gmail.com')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#050505] relative overflow-x-hidden">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full min-h-full object-cover"
        style={{ opacity: 0.45, filter: 'saturate(0.6) contrast(1.1) brightness(0.85)', zIndex: 0 }}
      >
        <source src="/14520076_1920_1080_24fps.mp4" type="video/mp4" />
      </video>

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
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-dm-mono text-[#555555] text-[0.7rem] uppercase tracking-[0.2em] hover:text-white transition-colors duration-200 mb-16"
          >
            ← Back
          </Link>

          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="font-bebas text-white leading-none" style={{ fontSize: 'clamp(5rem, 15vw, 12rem)' }}>
              LET&apos;S
            </h1>
            <h1
              className="font-bebas leading-none"
              style={{ fontSize: 'clamp(5rem, 15vw, 12rem)', color: 'transparent', WebkitTextStroke: '3px #ff3c00' }}
            >
              BUILD.
            </h1>
          </motion.div>

          <motion.p
            className="font-fraunces italic text-[#aaaaaa] text-[1.2rem] font-light mt-8 mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Have a project in mind?<br />
            An idea that needs building?<br />
            Let&apos;s talk.
          </motion.p>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <a href="mailto:asapdotdrop@gmail.com" className="flex items-center gap-3 font-dm-mono text-white text-[0.8rem] tracking-[0.1em] hover:text-[#ff3c00] transition-colors duration-200">
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

        {/* Right — Form / Success */}
        <motion.div
          className="w-full lg:w-[480px] xl:w-[520px] flex-shrink-0"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              /* ── Success screen ── */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5 }}
                className="bg-[#0d0d0d] border border-white/[0.07] rounded-2xl p-8 md:p-12 text-center"
              >
                {/* Checkmark */}
                <div className="w-20 h-20 rounded-full bg-[#ff3c00]/10 border border-[#ff3c00]/30 flex items-center justify-center mx-auto mb-8">
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <path d="M8 18L15 25L28 11" stroke="#ff3c00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <h2 className="font-bebas text-white text-[3rem] leading-none tracking-wide mb-3">
                  MESSAGE SENT!
                </h2>
                <p className="font-fraunces italic text-[#aaaaaa] text-[1.1rem] font-light leading-relaxed mb-2">
                  Thanks {senderName}, we&apos;ll get back to you shortly.
                </p>
                <p className="font-dm-mono text-[#555555] text-[0.7rem] uppercase tracking-[0.2em] mb-10">
                  Usually within 24–48 hours
                </p>

                <button
                  onClick={() => setSubmitted(false)}
                  className="font-dm-mono text-[#555555] text-[0.7rem] uppercase tracking-[0.2em] hover:text-white transition-colors duration-200 border border-white/[0.08] rounded-full px-6 py-3"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              /* ── Form ── */
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-[#0d0d0d] border border-white/[0.07] rounded-2xl p-8 md:p-12"
              >
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">

                  {/* Full Name */}
                  <div className="group">
                    <label className="block font-dm-mono text-[#555555] text-[0.65rem] uppercase tracking-[0.2em] mb-2 group-focus-within:text-[#ff3c00] transition-colors duration-200">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full bg-transparent border-b border-white/[0.12] focus:border-[#ff3c00] text-white font-outfit text-[1rem] py-2 outline-none transition-colors duration-200 placeholder:text-[#333]"
                      placeholder="Your name"
                    />
                  </div>

                  {/* Email + Phone side by side */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="group">
                      <label className="block font-dm-mono text-[#555555] text-[0.65rem] uppercase tracking-[0.2em] mb-2 group-focus-within:text-[#ff3c00] transition-colors duration-200">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full bg-transparent border-b border-white/[0.12] focus:border-[#ff3c00] text-white font-outfit text-[1rem] py-2 outline-none transition-colors duration-200 placeholder:text-[#333]"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="group">
                      <label className="block font-dm-mono text-[#555555] text-[0.65rem] uppercase tracking-[0.2em] mb-2 group-focus-within:text-[#ff3c00] transition-colors duration-200">
                        Mobile No.
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        className="w-full bg-transparent border-b border-white/[0.12] focus:border-[#ff3c00] text-white font-outfit text-[1rem] py-2 outline-none transition-colors duration-200 placeholder:text-[#333]"
                        placeholder="+1 234 567 890"
                      />
                    </div>
                  </div>

                  {/* Project Type */}
                  <div className="group">
                    <label className="block font-dm-mono text-[#555555] text-[0.65rem] uppercase tracking-[0.2em] mb-2 group-focus-within:text-[#ff3c00] transition-colors duration-200">
                      Project Type
                    </label>
                    <select
                      name="projectType"
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
                      name="budget"
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
                      name="message"
                      rows={4}
                      required
                      className="w-full bg-transparent border-b border-white/[0.12] focus:border-[#ff3c00] text-white font-outfit text-[1rem] py-2 outline-none transition-colors duration-200 placeholder:text-[#333] resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  {/* Error */}
                  {error && (
                    <p className="font-dm-mono text-red-400 text-[0.7rem] tracking-[0.1em] leading-relaxed">
                      {error}
                    </p>
                  )}

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={submitting}
                    className="w-full font-bebas text-white bg-[#ff3c00] tracking-[0.15em] py-5 rounded-full text-[1.3rem] disabled:opacity-70"
                    whileHover={{ scale: submitting ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {submitting ? 'Sending...' : 'Send Message →'}
                  </motion.button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  )
}
