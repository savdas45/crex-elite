import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { products } from '../data/products'

// Extract specific items from data
const apparelItems = [
  {
    ...products.find(p => p.slug === 'pro-training-jersey'),
    imageDir: 'right',
    tag: 'APPAREL · SS26',
  },
  {
    ...products.find(p => p.slug === 'monarch-batting-gloves'),
    imageDir: 'left',
    tag: 'GEAR · SIGNATURE',
  },
  {
    ...products.find(p => p.slug === 'sovereign-helmet'),
    imageDir: 'right',
    tag: 'PROTECTION · ELITE',
  },
].filter(p => p.id !== undefined) // safety check

export default function Apparel() {
  return (
    <section id="apparel" className="relative py-28 bg-charcoal overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/0 pointer-events-none" />

      <div className="section-pad max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-24">
          <p className="label-text mb-4">The Wardrobe</p>
          <h2 className="heading-lg text-off-white mb-6">
            Wear the <span className="text-gold italic">Legacy</span>
          </h2>
          <div className="gold-line w-16 mx-auto" />
        </div>

        {/* Alternating layout */}
        <div className="flex flex-col gap-32">
          {apparelItems.map((item, index) => (
            <div
              key={item.id}
              className={`flex flex-col ${item.imageDir === 'left' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-16 md:gap-24`}
            >
              {/* Image Panel */}
              <motion.div
                className="flex-1 relative"
                initial={{ opacity: 0, x: item.imageDir === 'right' ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="relative aspect-square max-w-md mx-auto border border-gold/10 bg-black flex items-center justify-center overflow-hidden">
                  {/* Real Photo */}
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="h-72 object-contain p-4 hover:scale-105 transition-transform duration-500" 
                  />

                  {/* Radial glow */}
                  <div className="absolute inset-0 bg-radial-gold pointer-events-none"
                    style={{
                      background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.06) 0%, transparent 70%)'
                    }}
                  />

                  {/* Tag */}
                  <div className="absolute top-4 left-4">
                    <span className="font-sans text-[9px] tracking-widest text-gold/50 uppercase">{item.tag}</span>
                  </div>

                  {/* Number */}
                  <div className="absolute bottom-4 right-4">
                    <span className="font-serif text-5xl text-white/5 font-light">0{index + 1}</span>
                  </div>
                </div>
              </motion.div>

              {/* Text Panel */}
              <motion.div
                className="flex-1 max-w-md"
                initial={{ opacity: 0, x: item.imageDir === 'right' ? 60 : -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              >
                <p className="label-text mb-4">{item.subtitle}</p>
                <h3 className="heading-md text-off-white mb-6">
                  {item.name}
                </h3>
                <div className="w-10 h-px bg-gold mb-6" />
                <p className="body-text mb-8 leading-loose">
                  {item.desc}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {item.features.slice(0, 4).map((f, i) => (
                    <li key={i} className="flex items-center gap-3 font-sans text-sm text-off-white/60">
                      <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Price + CTA */}
                <div className="flex items-center gap-6">
                  <span className="font-serif text-3xl text-gold font-light">£ {item.price}</span>
                  <Link to={`/product/${item.slug}`}>
                    <motion.button
                      className="btn-primary group animate-none"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Shop Now
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
