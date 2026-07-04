import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 10000, suffix: '+', label: 'Bats Crafted', prefix: '' },
  { value: 50, suffix: '+', label: 'Countries Served', prefix: '' },
  { value: 15, suffix: '', label: 'Years Experience', prefix: '' },
  { value: 500, suffix: '+', label: 'Pro Players', prefix: '' },
]

function StatItem({ stat, index }) {
  const numRef = useRef()
  const itemRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal animation
      gsap.fromTo(itemRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 1.2,
          delay: index * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: itemRef.current,
            start: 'top 85%',
          }
        }
      )

      // Counter animation
      const counter = { val: 0 }
      gsap.to(counter, {
        val: stat.value,
        duration: 2.5,
        ease: 'power2.out',
        delay: index * 0.15,
        scrollTrigger: {
          trigger: itemRef.current,
          start: 'top 85%',
          once: true,
        },
        onUpdate: () => {
          if (numRef.current) {
            numRef.current.textContent =
              stat.prefix +
              Math.round(counter.val).toLocaleString() +
              stat.suffix
          }
        },
      })
    })

    return () => ctx.revert()
  }, [stat, index])

  return (
    <div
      ref={itemRef}
      className="flex flex-col items-center text-center opacity-0 group px-6"
    >
      {/* Number */}
      <div className="stat-number mb-3" ref={numRef}>
        0{stat.suffix}
      </div>

      {/* Thin line */}
      <div className="w-8 h-px bg-gold/40 mb-3 group-hover:w-16 transition-all duration-500" />

      {/* Label */}
      <p className="font-sans text-xs tracking-widest uppercase text-off-white/50">
        {stat.label}
      </p>
    </div>
  )
}

export default function Stats() {
  const sectionRef = useRef()
  const titleRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="stats" className="relative py-28 bg-black section-pad overflow-hidden">
      {/* Background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="font-serif text-[20vw] font-light text-white/[0.015] leading-none select-none whitespace-nowrap">
          LEGACY
        </span>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <p className="label-text mb-4">By The Numbers</p>
        <h2 ref={titleRef} className="heading-lg text-off-white mb-4 opacity-0">
          Trusted By <span className="text-gold italic">Champions</span>
        </h2>

        <div className="gold-line w-16 mx-auto mb-20" />

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <div key={stat.label} className="relative">
              {index < stats.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-gold/15" />
              )}
              <StatItem stat={stat} index={index} />
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="mt-24 max-w-2xl mx-auto">
          <p className="font-serif text-2xl md:text-3xl font-light italic text-off-white/60 leading-relaxed">
            "Craftsmanship is not just what we do. It is who we are."
          </p>
          <p className="font-sans text-xs tracking-widest uppercase text-gold/60 mt-4">
            — Savdas Mer, Founder
          </p>
        </div>
      </div>
    </section>
  )
}
