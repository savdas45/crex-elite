import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, ArrowRight, Heart, Sparkles, Check } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const hotspots = [
  {
    id: 'helmet',
    name: 'Sovereign Helmet',
    price: 145,
    top: '14%',
    left: '52%',
    product: { 
      id: 7, 
      slug: 'sovereign-helmet', 
      name: 'Sovereign Helmet', 
      subtitle: 'Carbon Shell · Titanium Grille', 
      price: 145, 
      originalPrice: 180,
      image: '/cricket_helmet.png', 
      category: 'gear',
      desc: 'Carbon composite shell with a dual-density foam liner and high-tensile titanium grille. Engineered for absolute head safety against the fastest deliveries.',
      features: ['Carbon composite shell', 'Titanium face grille', 'Moisture-wicking liner', 'Adjustable fit dial']
    }
  },
  {
    id: 'jersey',
    name: 'Pro Training Jersey',
    price: 75,
    top: '36%',
    left: '50%',
    product: { 
      id: 9, 
      slug: 'pro-training-jersey', 
      name: 'Pro Training Jersey', 
      subtitle: 'Dri-Weave Tech · Athletic Fit', 
      price: 75, 
      originalPrice: 95,
      image: '/cricket_jersey.png', 
      category: 'apparel',
      desc: 'Engineered for peak performance with Dri-Weave moisture-management fabric. Breathable mesh panels under the arms keep you cool at the crease.',
      features: ['Dri-Weave moisture control', 'UV protection UPF 50+', 'Flatlock anti-chafe seams', 'Athletic stretch design']
    }
  },
  {
    id: 'gloves',
    name: 'Monarch Gloves',
    price: 95,
    top: '55%',
    left: '42%',
    product: { 
      id: 5, 
      slug: 'monarch-batting-gloves', 
      name: 'Monarch Gloves', 
      subtitle: 'Pro Batting Gloves · Full Leather', 
      price: 95, 
      originalPrice: 120,
      image: '/batting_gloves.png', 
      category: 'gear',
      desc: 'Crafted from the finest sheepskin leather palms with dual-density foam finger guards. Offers exceptional flexibility, ventilation, and solid grip cushion.',
      features: ['Premium sheepskin palm', 'Dual-density foam protection', 'Airflow ventilation mesh', 'Velcro secure wrist wrap']
    }
  },
  {
    id: 'pads',
    name: 'Elite Batting Pads',
    price: 110,
    top: '76%',
    left: '48%',
    product: { 
      id: 6, 
      slug: 'elite-batting-pads', 
      name: 'Elite Batting Pads', 
      subtitle: 'Pro Grade · Lightweight Cane', 
      price: 110, 
      originalPrice: 140,
      image: '/cricket_pads.png', 
      category: 'gear',
      desc: 'Lightweight carbon-reinforced shins with traditional cane rods. Ergonomic padded knee cup keeps padding secure during rapid running between wickets.',
      features: ['Carbon-fiber reinforcement', 'Ultra-light high density foam', 'Triple padded straps', 'Classic vertical seam shape']
    }
  },
  {
    id: 'shoes',
    name: 'Apex Spike Shoes',
    price: 135,
    top: '89%',
    left: '55%',
    product: { 
      id: 28, 
      slug: 'apex-spike-shoes', 
      name: 'Apex Spike Shoes', 
      subtitle: 'Pro-Grade Turf Spikes', 
      price: 135, 
      originalPrice: 165,
      image: '/cricket_shoes.png', 
      category: 'gear',
      desc: 'Tough microfiber upper with lateral support cage. Loaded with an 11-metal-spike configuration for maximum acceleration and solid grip on turf.',
      features: ['11 metal turf spikes', 'Microfiber water-resistant upper', 'Dual-density Gel cushioning', 'TPU stability cage']
    }
  }
]

export default function MannequinShowcase() {
  const [activeId, setActiveId] = useState('jersey')
  const { addItem } = useCart()
  const { toggle, isWishlisted } = useWishlist()
  const [addedToCart, setAddedToCart] = useState(false)

  const activeSpot = hotspots.find(h => h.id === activeId) || hotspots[0]
  const product = activeSpot.product

  const handleAddToCart = () => {
    addItem(product, 1)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <section className="relative py-28 bg-[#0a0a0a] border-t border-white/5 overflow-hidden">
      {/* Background Decorative Glow */}
      <div 
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none opacity-20 blur-[130px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 75%)' }}
      />

      <div className="max-w-7xl mx-auto section-pad relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20 max-w-2xl mx-auto">
          <p className="label-text mb-3">Shop the Look</p>
          <h2 className="heading-lg text-off-white">
            The Pro <span className="text-gold italic">Armour</span>
          </h2>
          <div className="w-16 h-[1px] bg-gold/40 my-4" />
          <p className="body-text text-center text-xs md:text-sm text-off-white/60">
            Hover or tap the golden hotspot pins on the batsman to inspect and directly add professional-grade protective gear and matchwear to your collection.
          </p>
        </div>

        {/* Main interactive grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Column 1: Batsman Image & Hotspots (7 Cols) */}
          <div className="lg:col-span-7 flex justify-center items-center relative py-6">
            
            {/* Ambient Background Aura */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.06)_0%,transparent_65%)] pointer-events-none rounded-full" />

            {/* Batsman Image Frame */}
            <div className="w-full max-w-[340px] sm:max-w-[400px] md:max-w-[440px] aspect-[2/3] relative mx-auto select-none">
              
              <img 
                src="/crex_batsman_3d.png" 
                alt="CREX ELITE Batsman Showcase" 
                className="w-full h-full object-contain pointer-events-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] filter brightness-[0.95]"
              />

              {/* Hotspot Pins */}
              {hotspots.map(spot => {
                const isActive = spot.id === activeId
                return (
                  <button
                    key={spot.id}
                    onMouseEnter={() => setActiveId(spot.id)}
                    onClick={() => setActiveId(spot.id)}
                    className="absolute z-30 -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none"
                    style={{ top: spot.top, left: spot.left }}
                    aria-label={`Show ${spot.name}`}
                  >
                    {/* Ring Glow */}
                    <span className={`absolute -inset-2.5 rounded-full transition-all duration-500 scale-100 ${
                      isActive 
                        ? 'bg-gold/30 animate-pulse border border-gold/40 scale-125' 
                        : 'bg-gold/15 group-hover:bg-gold/25'
                    }`} />
                    
                    {/* Inner core */}
                    <span className={`relative flex rounded-full h-3 w-3 border border-black transition-all duration-300 ${
                      isActive ? 'bg-gold-light scale-110 shadow-[0_0_10px_#E4C76B]' : 'bg-gold group-hover:bg-gold-light'
                    }`} />
                    
                    {/* Floating mini label (desktop only) */}
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/95 border border-white/10 px-2.5 py-1 text-[8px] tracking-widest text-off-white uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
                      {spot.name} <span className="text-gold">· £{spot.price}</span>
                    </div>
                  </button>
                )
              })}

            </div>
          </div>

          {/* Column 2: Dynamic Detail Panel (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="border border-white/5 bg-neutral-950/40 p-8 md:p-10 relative overflow-hidden">
              {/* Gold accent line top */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col h-full"
                >
                  {/* Category */}
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles size={12} className="text-gold/50" />
                    <span className="font-sans text-[9px] tracking-widest uppercase text-gold">
                      {product.category === 'gear' ? 'Elite Protective Gear' : 'Luxury Matchwear'}
                    </span>
                  </div>

                  {/* Title & Price */}
                  <div className="flex justify-between items-start gap-4 mb-1">
                    <h3 className="font-serif text-3xl font-light text-off-white leading-tight">
                      {product.name}
                    </h3>
                    <div className="text-right flex flex-col">
                      <span className="font-serif text-2xl text-gold font-light">£{product.price}</span>
                      {product.originalPrice && (
                        <span className="font-sans text-[10px] text-off-white/30 line-through">£{product.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  <p className="font-sans text-[10px] tracking-wider text-off-white/40 uppercase mb-6">
                    {product.subtitle}
                  </p>

                  {/* Image Preview inside panel */}
                  <div className="h-40 w-full border border-white/5 bg-black/60 flex items-center justify-center py-4 mb-6 relative">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.04)_0%,transparent_70%)]" />
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="h-full object-contain drop-shadow-[0_8px_15px_rgba(0,0,0,0.5)]"
                    />
                  </div>

                  {/* Description */}
                  <p className="font-sans text-xs leading-relaxed text-off-white/60 mb-6">
                    {product.desc}
                  </p>

                  {/* Key Features */}
                  <div className="border-t border-white/5 pt-5 mb-8">
                    <p className="font-sans text-[9px] tracking-widest text-off-white/40 uppercase mb-3">Specification highlights</p>
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                      {product.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs font-sans text-off-white/70">
                          <span className="w-1 h-1 rounded-full bg-gold/50 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-12 gap-3 mt-auto">
                    {/* Add to Cart */}
                    <button
                      onClick={handleAddToCart}
                      className="col-span-8 py-3.5 bg-gold border border-gold hover:bg-transparent hover:text-gold text-black font-sans text-xs tracking-widest uppercase transition-all duration-500 flex items-center justify-center gap-2 cursor-pointer font-semibold"
                    >
                      {addedToCart ? (
                        <>
                          <Check size={14} /> Added to Cart
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={14} /> Add to Cart
                        </>
                      )}
                    </button>

                    {/* Toggle Wishlist */}
                    <button
                      onClick={() => toggle(product)}
                      className={`col-span-4 border flex items-center justify-center transition-all duration-300 cursor-pointer ${
                        isWishlisted(product.id)
                          ? 'border-gold text-gold bg-gold/5'
                          : 'border-white/10 text-off-white/40 hover:border-gold/40 hover:text-gold'
                      }`}
                      title={isWishlisted(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                      <Heart size={16} fill={isWishlisted(product.id) ? '#C9A84C' : 'transparent'} />
                    </button>

                    {/* View Details Link */}
                    <Link to={`/product/${product.slug}`} className="col-span-12 mt-2">
                      <button className="w-full py-3 border border-white/5 hover:border-gold/20 font-sans text-[9px] tracking-widest uppercase text-off-white/50 hover:text-gold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer bg-neutral-900/10">
                        View Product Specification <ArrowRight size={10} />
                      </button>
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
