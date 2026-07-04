import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Hero() {
  const sectionRef = useRef()
  const { scrollY } = useScroll()

  // Parallax on scroll
  const yBg = useTransform(scrollY, [0, 1000], [0, 200])

  // Mouse parallax state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e
    const { innerWidth, innerHeight } = window
    // Normalize coordinates from -1 to 1
    const x = (clientX / innerWidth) * 2 - 1
    const y = (clientY / innerHeight) * 2 - 1
    setMousePosition({ x, y })
  }

  // GSAP intro animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 })

      tl.fromTo('.hero-text-block',
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: 'power3.out' }
      )

      tl.fromTo('.floating-item-1',
        { opacity: 0, x: 50, y: -50 },
        { opacity: 1, x: 0, y: 0, duration: 1.2, ease: 'power3.out' },
        '-=1'
      )

      tl.fromTo('.floating-item-2',
        { opacity: 0, x: -50, y: 30 },
        { opacity: 1, x: 0, y: 0, duration: 1.2, ease: 'power3.out' },
        '-=1'
      )

      tl.fromTo('.floating-item-3',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' },
        '-=0.8'
      )

      tl.fromTo('.hero-fade',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 1, ease: 'power3.out' },
        '-=0.5'
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const scrollToProducts = () => {
    document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-[110vh] flex items-center justify-center overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic Glow Background */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.1)_0%,transparent_50%)] pointer-events-none"
      />

      {/* Floating Elements (Layered Parallax) */}

      {/* 1. The Sovereign Bat (Deep Layer - Moves less) */}
      <motion.div
        className="floating-item-1 absolute z-10 top-[2%] md:top-[10%] right-[-20%] md:right-[5%] h-[60vh] md:h-[90vh] pointer-events-none opacity-90"
        animate={{
          x: mousePosition.x * -20,
          y: mousePosition.y * -20,
          rotate: mousePosition.x * 5 + 15,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 30 }}
      >
        <img
          src="/bat_eclipse.png?v=3"
          alt="Premium Bat"
          className="h-full w-auto object-contain drop-shadow-2xl mix-blend-lighten"
        />
      </motion.div>

      {/* 2. Cricket Helmet (Mid Layer - Moves more) */}
      <motion.div
        className="floating-item-2 absolute z-10 top-[15%] left-[-15%] md:left-[2%] w-[40vw] md:w-[20vw] pointer-events-none opacity-60 md:opacity-80"
        animate={{
          x: mousePosition.x * 40,
          y: mousePosition.y * 40,
          rotate: mousePosition.x * -10 - 15,
        }}
        transition={{ type: 'spring', stiffness: 40, damping: 25 }}
      >
        <img
          src="/cricket_helmet.png?v=2"
          alt="Premium Helmet"
          className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] mix-blend-lighten"
        />
      </motion.div>

      {/* 3. Batting Gloves (Foreground Layer - Moves most) */}
      <motion.div
        className="floating-item-3 absolute z-10 bottom-[-5%] left-[0%] md:left-[15%] w-[40vw] md:w-[18vw] pointer-events-none opacity-70 md:opacity-90"
        animate={{
          x: mousePosition.x * -60,
          y: mousePosition.y * -60,
          rotate: mousePosition.x * 15 + 10,
        }}
        transition={{ type: 'spring', stiffness: 30, damping: 20 }}
      >
        <img
          src="/batting_gloves.png?v=2"
          alt="Premium Gloves"
          className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] scale-x-[-1] mix-blend-lighten"
        />
      </motion.div>

      {/* Central Typography - Highest Layer */}
      <div className="relative z-50 w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center pointer-events-none mt-16 md:mt-0">

        <div className="hero-text-block text-center flex flex-col items-center">
          <p className="font-sans text-[10px] md:text-sm text-gold tracking-[0.4em] uppercase mb-6 drop-shadow-lg">
            The Art of Cricket
          </p>
          <h1 className="font-serif text-[clamp(3.5rem,10vw,10rem)] font-light leading-[0.95] tracking-tighter text-off-white text-center mb-6" style={{ textShadow: '0 10px 40px rgba(0,0,0,0.8)' }}>
            PURE<br />
            <span className="italic text-gold block mt-2">PRECISION</span>
          </h1>
        </div>

        {/* Call to Action */}
        <div className="hero-fade mt-10 flex flex-col sm:flex-row gap-4 pointer-events-auto">
          <button onClick={scrollToProducts} className="btn-primary gold-glow flex items-center justify-center gap-3 px-10 py-5 text-sm">
            Explore Collection <ArrowRight size={16} />
          </button>
          <Link to="/bat-fitter" className="btn-ghost flex items-center justify-center px-10 py-5 text-sm backdrop-blur-sm bg-black/20">
            Bat Fitter Guide
          </Link>
        </div>
      </div>

    </section>
  )
}
