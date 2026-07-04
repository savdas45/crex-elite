import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    // Disable scroll during preloader
    document.body.style.overflow = 'hidden'

    // Animate progress percentage smoothly
    const obj = { val: 0 }
    const tl = gsap.timeline({
      onComplete: () => {
        setIsDone(true)
        setTimeout(() => {
          document.body.style.overflow = ''
          if (onComplete) onComplete()
        }, 1000) // matches exit animation duration
      }
    })

    tl.to(obj, {
      val: 100,
      duration: 2.0,
      ease: 'power2.out',
      onUpdate: () => {
        setProgress(Math.floor(obj.val))
      }
    })

    // GSAP animations for logo letters
    gsap.fromTo('.preloader-char', 
      { opacity: 0, y: 30, filter: 'blur(5px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.0, stagger: 0.05, ease: 'power3.out' }
    )

    gsap.fromTo('.preloader-divider',
      { scaleY: 0 },
      { scaleY: 1, duration: 0.8, delay: 0.3, ease: 'power3.out' }
    )

    gsap.fromTo('.preloader-sub',
      { opacity: 0, letterSpacing: '0.1em' },
      { opacity: 0.4, letterSpacing: '0.3em', duration: 1.2, delay: 0.6, ease: 'power2.out' }
    )

    return () => {
      document.body.style.overflow = ''
    }
  }, [onComplete])

  // Framer Motion panel exit transitions
  const panelVariants = {
    exit: {
      y: '-100%',
      transition: {
        duration: 0.85,
        ease: [0.76, 0, 0.24, 1], // premium custom cubic-bezier
        delay: 0.1
      }
    }
  }

  const contentVariants = {
    exit: {
      opacity: 0,
      y: -50,
      filter: 'blur(10px)',
      transition: { duration: 0.5, ease: 'easeIn' }
    }
  }

  const logoText = "CREX".split("")
  const eliteText = "ELITE".split("")

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          variants={panelVariants}
          exit="exit"
          className="fixed inset-0 z-[999] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Subtle gold grid texture background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(212,175,55,0.08),rgba(0,0,0,0))]" />
          
          {/* Animated Background Rays */}
          <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
            <div className="absolute w-[200%] h-[200%] -top-[50%] -left-[50%] bg-[conic-gradient(from_0deg_at_50%_50%,rgba(0,0,0,0)_0%,rgba(212,175,55,0.15)_25%,rgba(0,0,0,0)_50%,rgba(212,175,55,0.15)_75%,rgba(0,0,0,0)_100%)] animate-[spin_40s_linear_infinite]" />
          </div>

          <motion.div 
            variants={contentVariants}
            exit="exit"
            className="flex flex-col items-center z-10"
          >
            {/* Branding Logo */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex">
                {logoText.map((char, i) => (
                  <span 
                    key={i} 
                    className="preloader-char font-serif text-4xl sm:text-6xl font-light tracking-[0.2em] text-gold inline-block"
                  >
                    {char}
                  </span>
                ))}
              </div>
              
              <span className="preloader-divider w-px h-10 sm:h-14 bg-gold/40 origin-center inline-block" />
              
              <div className="flex">
                {eliteText.map((char, i) => (
                  <span 
                    key={i} 
                    className="preloader-char font-serif text-4xl sm:text-6xl font-light tracking-[0.2em] text-off-white inline-block"
                  >
                    {char}
                  </span>
                ))}
              </div>
            </div>

            {/* Tagline */}
            <p className="preloader-sub font-sans text-[9px] sm:text-[11px] tracking-[0.3em] uppercase text-off-white/40 mb-16 font-light">
              Crafting Cricket Excellence
            </p>

            {/* Loading Indicator */}
            <div className="flex flex-col items-center gap-4 w-64">
              {/* Percentage Counter */}
              <div className="font-serif text-3xl sm:text-4xl font-extralight text-gold tracking-widest relative">
                {String(progress).padStart(3, '0')}
                <span className="text-xs text-gold/60 font-sans ml-1 font-light">%</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative border border-white/5">
                <div 
                  className="h-full bg-gradient-to-r from-gold/50 via-gold to-gold/80 transition-all duration-300 ease-out shadow-[0_0_10px_rgba(212,175,55,0.4)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              
              <p className="font-sans text-[8px] tracking-widest uppercase text-off-white/20 mt-1">
                Loading Cleft telemetry
              </p>
            </div>
          </motion.div>
          
          {/* Luxury gold bottom border accent */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
