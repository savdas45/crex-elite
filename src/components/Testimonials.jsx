import { useRef, useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'

const testimonials = [
  {
    id: 1,
    quote: 'The Sovereign bat gave me the edge I needed at the highest level. The balance and feel is unlike anything I have played with before. Pure craftsmanship.',
    name: 'Rahul Sharma',
    role: 'International Batsman · India A',
    rating: 5,
  },
  {
    id: 2,
    quote: 'CREX ELITE understands what professional cricketers demand. From the moment you pick up the bat, you know it is built for champions. My go-to brand.',
    name: 'James Whitmore',
    role: 'County Cricket Professional · Surrey',
    rating: 5,
  },
  {
    id: 3,
    quote: 'Their batting gloves have transformed my grip. The full-grain leather moulds to your hand perfectly. I would not trust any other brand at the crease.',
    name: 'Aiden Clarke',
    role: 'ICC Ranked Top 50 · ODI Specialist',
    rating: 5,
  },
]

function QuoteIcon() {
  return (
    <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
      <path
        d="M0 24V14.4C0 10.08 1.12 6.56 3.36 3.84C5.6 1.12 8.48 0 12 0v4.8C9.92 4.8 8.32 5.6 7.2 7.2C6.08 8.8 5.52 10.72 5.52 13.04H10V24H0ZM18 24V14.4C18 10.08 19.12 6.56 21.36 3.84C23.6 1.12 26.48 0 30 0v4.8C27.92 4.8 26.32 5.6 25.2 7.2C24.08 8.8 23.52 10.72 23.52 13.04H28V24H18Z"
        fill="#C9A84C"
        opacity="0.4"
      />
    </svg>
  )
}

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const carouselRef = useRef(null)
  const dragX = useMotionValue(0)
  const startX = useRef(0)
  const startScroll = useRef(0)

  const handleDragStart = (e) => {
    startX.current = e.clientX || (e.touches?.[0]?.clientX ?? 0)
    startScroll.current = active
  }

  const handleDragEnd = (e, info) => {
    const offset = info.offset.x
    if (offset < -60 && active < testimonials.length - 1) {
      setActive(active + 1)
    } else if (offset > 60 && active > 0) {
      setActive(active - 1)
    }
  }

  return (
    <section className="relative py-28 bg-black overflow-hidden section-pad">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[25vw] text-white/[0.015] font-light leading-none select-none">
          "
        </span>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="label-text mb-4">Testimonials</p>
          <h2 className="heading-lg text-off-white">
            Words From <span className="text-gold italic">Champions</span>
          </h2>
        </div>

        {/* Carousel */}
        <div ref={carouselRef} className="testimonial-carousel overflow-hidden">
          <motion.div
            className="flex"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            animate={{ x: `-${active * 100}%` }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="w-full flex-shrink-0 px-4 md:px-16"
              >
                <div className="border border-white/8 p-8 md:p-12 bg-charcoal/50 relative">
                  {/* Gold quote marks */}
                  <div className="mb-6">
                    <QuoteIcon />
                  </div>

                  {/* Quote */}
                  <blockquote className="font-serif text-xl md:text-2xl lg:text-3xl font-light italic text-off-white/80 leading-relaxed mb-10">
                    "{t.quote}"
                  </blockquote>

                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }, (_, i) => (
                      <span key={i} className="text-gold text-sm">★</span>
                    ))}
                  </div>

                  {/* Name */}
                  <div className="flex items-center gap-4">
                    {/* Avatar placeholder */}
                    <div className="w-10 h-10 rounded-full border border-gold/30 bg-black flex items-center justify-center">
                      <span className="font-serif text-gold text-sm font-light">
                        {t.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-sans text-sm font-medium text-off-white tracking-wide">
                        {t.name}
                      </p>
                      <p className="font-sans text-xs text-off-white/40 tracking-wide">
                        {t.role}
                      </p>
                    </div>
                  </div>

                  {/* Gold accent corner */}
                  <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-gold/20" />
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`transition-all duration-500 ${
                i === active
                  ? 'w-8 h-1 bg-gold'
                  : 'w-2 h-1 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        {/* Navigation arrows */}
        <div className="flex justify-center gap-4 mt-8">
          <motion.button
            onClick={() => setActive(Math.max(0, active - 1))}
            disabled={active === 0}
            className="w-10 h-10 border border-white/15 flex items-center justify-center text-off-white/50
                       hover:border-gold/50 hover:text-gold disabled:opacity-20 transition-all duration-300"
            whileTap={{ scale: 0.9 }}
          >
            ←
          </motion.button>
          <motion.button
            onClick={() => setActive(Math.min(testimonials.length - 1, active + 1))}
            disabled={active === testimonials.length - 1}
            className="w-10 h-10 border border-white/15 flex items-center justify-center text-off-white/50
                       hover:border-gold/50 hover:text-gold disabled:opacity-20 transition-all duration-300"
            whileTap={{ scale: 0.9 }}
          >
            →
          </motion.button>
        </div>
      </div>
    </section>
  )
}
