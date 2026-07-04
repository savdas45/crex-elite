import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { getBats } from '../data/products'

const bats = getBats()

export default function HorizontalScroll() {
  const containerRef = useRef(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [cardWidth, setCardWidth] = useState(360)

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
      // Calculate responsive card width
      if (window.innerWidth < 640) {
        setCardWidth(280) // mobile
      } else if (window.innerWidth < 768) {
        setCardWidth(320) // tablet
      } else {
        setCardWidth(360) // desktop
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const gap = 24
  // Center active index: offset = half of container width - half of card width - index * (cardWidth + gap)
  const trackOffset = containerWidth / 2 - cardWidth / 2 - activeIndex * (cardWidth + gap)

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1)
    }
  }

  const handleNext = () => {
    if (activeIndex < bats.length - 1) {
      setActiveIndex(activeIndex + 1)
    }
  }

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50
    const swipeVelocity = 500
    const { offset, velocity } = info

    if (offset.x < -swipeThreshold || velocity.x < -swipeVelocity) {
      if (activeIndex < bats.length - 1) {
        setActiveIndex(activeIndex + 1)
      }
    } else if (offset.x > swipeThreshold || velocity.x > swipeVelocity) {
      if (activeIndex > 0) {
        setActiveIndex(activeIndex - 1)
      }
    }
  }

  return (
    <section id="horizontal" className="relative py-28 bg-[#0a0a0a] overflow-hidden border-t border-b border-white/5">
      {/* Background Decorative Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-20 blur-[130px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)' }}
      />

      {/* Header Area */}
      <div className="section-pad max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 relative z-10">
        <div>
          <p className="label-text mb-3">Master Craftsman Range</p>
          <h2 className="heading-lg text-off-white">
            The Bat <span className="text-gold italic">Collection</span>
          </h2>
          <p className="font-sans text-xs text-off-white/40 max-w-md mt-3 leading-relaxed">
            Hand-selected English & Kashmir willow, pressed and finished by hand for the ultimate sweet-spot performance and pickup.
          </p>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center gap-4">
          {/* Index indicator text */}
          <span className="font-sans text-[10px] tracking-widest text-off-white/40">
            <span className="text-gold font-medium">{(activeIndex + 1).toString().padStart(2, '0')}</span>
            {' / '}
            {bats.length.toString().padStart(2, '0')}
          </span>

          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className={`w-10 h-10 border flex items-center justify-center rounded-full transition-all duration-300 ${
                activeIndex > 0 
                  ? 'border-gold text-gold hover:bg-gold hover:text-black cursor-pointer' 
                  : 'border-white/5 text-white/10 cursor-not-allowed'
              }`}
              aria-label="Previous bats"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              disabled={activeIndex === bats.length - 1}
              className={`w-10 h-10 border flex items-center justify-center rounded-full transition-all duration-300 ${
                activeIndex < bats.length - 1 
                  ? 'border-gold text-gold hover:bg-gold hover:text-black cursor-pointer' 
                  : 'border-white/5 text-white/10 cursor-not-allowed'
              }`}
              aria-label="Next bats"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Slider Viewport Container */}
      <div 
        ref={containerRef} 
        className="relative z-10 w-full overflow-hidden cursor-grab active:cursor-grabbing py-6"
      >
        <motion.div
          className="flex gap-6 items-center px-4"
          drag="x"
          dragConstraints={{ left: trackOffset, right: trackOffset }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          animate={{ x: trackOffset }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          style={{ width: 'max-content' }}
        >
          {bats.map((bat, index) => {
            const isActive = index === activeIndex
            const weightVal = bat.specs?.weight || '1.18kg'
            const edgeVal = bat.specs?.edges || '40mm'
            const handleVal = bat.specs?.handle || 'Cane'

            return (
              <motion.div
                key={bat.id}
                onClick={() => {
                  if (!isActive) setActiveIndex(index)
                }}
                className={`flex-shrink-0 relative transition-all duration-700 select-none ${
                  isActive 
                    ? 'z-20 border border-gold/30 bg-neutral-900/90 shadow-[0_0_50px_rgba(201,168,76,0.15)] scale-100 opacity-100' 
                    : 'z-10 border border-white/5 bg-neutral-950/40 opacity-30 scale-90 blur-[0.5px] hover:opacity-50 cursor-pointer'
                }`}
                style={{ width: cardWidth }}
                transition={{ duration: 0.5 }}
              >
                {/* Active Soft Radial Glow Behind Image */}
                {isActive && (
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.08)_0%,transparent_70%)] pointer-events-none animate-pulse" />
                )}

                {/* Top Corner Details */}
                <div className="absolute top-6 left-6 z-10 flex flex-col gap-1.5">
                  <span className={`font-serif text-5xl font-light transition-colors duration-500 ${
                    isActive ? 'text-gold/15' : 'text-white/5'
                  }`}>
                    0{index + 1}
                  </span>
                  {bat.badge && isActive && (
                    <motion.span 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-sans text-[8px] tracking-widest uppercase px-2 py-0.5 border border-gold/40 text-gold bg-black/90"
                    >
                      {bat.badge}
                    </motion.span>
                  )}
                </div>

                <div className="absolute top-6 right-6 z-10">
                  <span className="font-sans text-[9px] tracking-widest uppercase text-off-white/20">
                    {bat.category}
                  </span>
                </div>

                {/* Card Main Body */}
                <div className="p-8 pt-16 flex flex-col h-[520px] justify-between">
                  
                  {/* Bat Image (Unique asset mapped) */}
                  <div className="flex justify-center items-center flex-1 py-4 relative">
                    {/* Shadow underneath */}
                    <div className={`absolute bottom-2 w-16 h-2 bg-black/70 blur-sm rounded-full transition-all duration-500 ${
                      isActive ? 'opacity-80 scale-110' : 'opacity-30 scale-90'
                    }`} />
                    
                    <img 
                      src={bat.image} 
                      alt={bat.name} 
                      draggable="false"
                      className={`h-56 object-contain z-10 drop-shadow-[0_12px_20px_rgba(0,0,0,0.7)] transition-all duration-700 ${
                        isActive ? 'scale-[1.08] -translate-y-3' : 'scale-[0.95]'
                      }`} 
                    />
                  </div>

                  {/* Info & Specs */}
                  <div className={`border-t border-white/10 pt-5 transition-opacity duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-80'
                  }`}>
                    <div className="flex items-end justify-between mb-1">
                      {isActive ? (
                        <Link to={`/product/${bat.slug}`} className="hover:underline">
                          <h3 className="font-serif text-2xl font-light text-off-white hover:text-gold transition-colors duration-300 leading-tight">
                            {bat.name}
                          </h3>
                        </Link>
                      ) : (
                        <h3 className="font-serif text-2xl font-light text-off-white/80 leading-tight">
                          {bat.name}
                        </h3>
                      )}
                      <span className="font-serif text-xl text-gold font-light">£{bat.price}</span>
                    </div>
                    <p className="font-sans text-[10px] tracking-wider text-off-white/40 uppercase mb-4">
                      {bat.subtitle}
                    </p>

                    {/* Micro-specs grid */}
                    <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-3 text-center mb-5">
                      <div>
                        <p className="font-sans text-[9px] text-off-white/30 uppercase tracking-widest">Weight</p>
                        <p className="font-sans text-xs text-off-white/70 mt-0.5">{weightVal}</p>
                      </div>
                      <div>
                        <p className="font-sans text-[9px] text-off-white/30 uppercase tracking-widest">Edges</p>
                        <p className="font-sans text-xs text-off-white/70 mt-0.5">{edgeVal}</p>
                      </div>
                      <div>
                        <p className="font-sans text-[9px] text-off-white/30 uppercase tracking-widest">Handle</p>
                        <p className="font-sans text-xs text-off-white/70 mt-0.5 truncate">{handleVal}</p>
                      </div>
                    </div>

                    {/* CTA link (only active and interactable on active card) */}
                    {isActive ? (
                      <Link to={`/product/${bat.slug}`}>
                        <button className="w-full py-2.5 border border-gold/30 hover:border-gold hover:bg-gold hover:text-black font-sans text-[9px] tracking-widest uppercase text-gold transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer">
                          View Details <ArrowRight size={10} />
                        </button>
                      </Link>
                    ) : (
                      <div className="w-full py-2.5 border border-white/5 font-sans text-[9px] tracking-widest uppercase text-off-white/20 text-center">
                        Select Bat
                      </div>
                    )}
                  </div>

                </div>

                {/* Decorative border glows for active card */}
                {isActive && (
                  <>
                    <div className="absolute inset-0 border border-gold/20 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/60 to-transparent pointer-events-none" />
                  </>
                )}
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Progress and Indicator Lines */}
      <div className="max-w-7xl mx-auto section-pad flex flex-col items-center gap-6 mt-12 relative z-10">
        {/* Sleek Line Progress Bar */}
        <div className="w-64 h-[2px] bg-white/5 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-gold"
            initial={{ width: '12.5%' }}
            animate={{ 
              width: `${((activeIndex + 1) / bats.length) * 100}%`,
              left: '0%'
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          />
        </div>

        {/* Carousel indicators dots */}
        <div className="flex gap-2">
          {bats.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-500 cursor-pointer ${
                i === activeIndex 
                  ? 'bg-gold w-6' 
                  : 'bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
