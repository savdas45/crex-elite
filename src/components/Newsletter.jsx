import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// Simple canvas particle effect
function ParticleCanvas() {
  const canvasRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.4 + 0.1,
    }))

    let animFrame
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201, 168, 76, ${p.opacity})`
        ctx.fill()
      })
      animFrame = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animFrame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="particle-bg w-full h-full"
      style={{ position: 'absolute', inset: 0 }}
    />
  )
}

export default function Newsletter() {
  const sectionRef = useRef()
  const titleRef = useRef()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current?.children,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0,
          stagger: 0.2,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Particle bg */}
      <ParticleCanvas />

      {/* Gold radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.05) 0%, transparent 60%)'
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center section-pad max-w-3xl mx-auto">
        <div ref={titleRef}>
          <p className="label-text mb-6 opacity-0">Join The Elite</p>

          <h2 className="heading-xl text-off-white mb-4 leading-tight opacity-0">
            Gear Up For
          </h2>
          <h2 className="heading-xl text-gold mb-6 leading-tight opacity-0">
            Greatness
          </h2>

          <div className="gold-line w-24 mx-auto mb-8 opacity-0" />

          <p className="body-text max-w-md mx-auto mb-12 opacity-0">
            Subscribe for exclusive product launches, pro tips, and early access to our limited editions. No spam. Ever.
          </p>
        </div>

        {/* Form */}
        {!submitted ? (
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="flex-1 relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="newsletter-input"
                required
                id="newsletter-email"
              />
            </div>
            <motion.button
              type="submit"
              className="btn-primary flex-shrink-0 gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Subscribe
              <Send size={12} />
            </motion.button>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-12 h-12 border border-gold rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-gold text-xl">✓</span>
            </div>
            <p className="font-serif text-xl text-gold">Welcome to the elite.</p>
            <p className="font-sans text-sm text-off-white/50 mt-2">You'll hear from us soon.</p>
          </motion.div>
        )}

        {/* Privacy note */}
        {!submitted && (
          <p className="font-sans text-xs text-off-white/25 mt-6 tracking-wide">
            By subscribing you agree to our Privacy Policy. Unsubscribe anytime.
          </p>
        )}
      </div>
    </section>
  )
}
