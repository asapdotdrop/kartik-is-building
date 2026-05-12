'use client'

const items = [
  'FULL STACK DEV',
  'AI CHATBOTS',
  'VOICE AGENTS',
  'E-COMMERCE',
  'SAAS PLATFORMS',
  'LANDING PAGES',
]

const doubled = [...items, ...items]

export default function MarqueeSection() {
  return (
    <div className="border-y border-white/[0.08] py-5 overflow-hidden bg-[#0d0d0d]">
      <div className="flex whitespace-nowrap group">
        {[0, 1].map((key) => (
          <div
            key={key}
            aria-hidden={key === 1}
            className="marquee-track flex shrink-0 group-hover:[animation-play-state:paused]"
          >
            {doubled.map((item, i) => (
              <span key={i} className="flex items-center">
                <span
                  className="font-bebas text-white hover:text-[#ff3c00] transition-colors duration-300 cursor-default tracking-wider"
                  style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
                >
                  {item}
                </span>
                <span
                  className="mx-6 md:mx-10 text-[#ff3c00]"
                  style={{ fontSize: 'clamp(1.2rem, 2.5vw, 2.5rem)' }}
                >
                  ✦
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
