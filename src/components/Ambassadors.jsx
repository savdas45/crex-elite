import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { getBySlug } from '../data/products'

export default function Ambassadors() {
  const proKit = [
    { slug: 'the-sovereign', top: '55%', left: '42%' },
    { slug: 'monarch-batting-gloves', top: '48%', left: '32%' },
    { slug: 'elite-batting-pads', top: '80%', left: '40%' }
  ]

  return (
    <section className="py-24 bg-black relative border-t border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="section-pad max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="font-sans text-xs tracking-widest uppercase text-gold mb-4"
          >
            Brand Ambassadors
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl font-light text-off-white"
          >
            Shop the Pro's Kit
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Ambassador Image with Hotspots */}
          <div className="relative aspect-[4/5] bg-zinc-900/30 rounded-2xl border border-white/10 overflow-hidden group">
            <img 
              src="/crex_batsman_3d.png" 
              alt="Rohit Sharma" 
              className="w-full h-full object-cover object-center grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
            />
            
            {/* Hotspots */}
            {proKit.map((item, i) => {
              const product = getBySlug(item.slug)
              if (!product) return null
              
              return (
                <div key={i} className="absolute group/hotspot" style={{ top: item.top, left: item.left }}>
                  <div className="relative">
                    <button className="w-8 h-8 bg-gold text-black rounded-full flex items-center justify-center relative z-10 hover:scale-110 transition-transform">
                      <Plus size={16} />
                    </button>
                    {/* Ripple effect */}
                    <span className="absolute inset-0 rounded-full bg-gold/50 animate-ping" />
                    
                    {/* Tooltip */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-12 w-48 bg-black/90 backdrop-blur-md border border-zinc-800 rounded-lg p-3 opacity-0 invisible group-hover/hotspot:opacity-100 group-hover/hotspot:visible transition-all duration-300 translate-x-[-10px] group-hover/hotspot:translate-x-0 z-20 shadow-2xl">
                      <div className="flex gap-3 items-center">
                        <img src={product.image} alt={product.name} className="w-10 h-10 object-contain bg-white/5 rounded" />
                        <div>
                          <p className="text-white font-serif text-sm leading-tight mb-1">{product.name}</p>
                          <p className="text-gold font-sans text-xs">£{product.price}</p>
                        </div>
                      </div>
                      <Link to={`/product/${product.slug}`} className="block mt-2 text-center text-xs uppercase tracking-widest text-off-white/50 hover:text-white pb-1 border-b border-white/10">
                        View Item
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Ambassador Bio & Gear List */}
          <div className="space-y-8">
            <div>
              <h3 className="font-serif text-3xl text-off-white mb-2">Rohit Sharma</h3>
              <p className="font-sans text-sm tracking-widest text-gold uppercase mb-6">Indian International Cricketer</p>
              <p className="text-off-white/60 font-sans leading-relaxed">
                Known for his elegant stroke play and devastating pulls, Rohit relies on the finest English Willow to clear the boundary. 
                His bespoke setup features a low sweet spot tailored for sub-continental tracks, paired with ultra-lightweight protective gear 
                for unhindered movement at the crease.
              </p>
            </div>

            <div className="space-y-4 pt-8 border-t border-white/10">
              <h4 className="font-sans text-xs tracking-widest uppercase text-off-white/40 mb-6">Rohit's Match Day Setup</h4>
              {proKit.map((item, i) => {
                const product = getBySlug(item.slug)
                if (!product) return null
                return (
                  <Link key={i} to={`/product/${product.slug}`} className="flex items-center gap-4 group/item p-3 hover:bg-white/5 rounded-xl transition-colors border border-transparent hover:border-white/10">
                    <div className="w-16 h-16 bg-black rounded-lg border border-white/5 flex items-center justify-center p-2">
                      <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain group-hover/item:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-serif text-lg text-off-white group-hover/item:text-gold transition-colors">{product.name}</h5>
                      <p className="font-sans text-xs text-off-white/50">{product.subtitle}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-off-white/30 group-hover/item:border-gold group-hover/item:text-gold transition-colors">
                      <Plus size={14} />
                    </div>
                  </Link>
                )
              })}
            </div>
            
          </div>

        </div>
      </div>
    </section>
  )
}
