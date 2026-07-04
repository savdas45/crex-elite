import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ShoppingBag, Star, ArrowRight, Heart, Scale } from 'lucide-react'
import { getFeatured } from '../data/products'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useCompare } from '../context/CompareContext'

gsap.registerPlugin(ScrollTrigger)

const featuredProducts = getFeatured()

function ProductCard({ product, index }) {
  const cardRef = useRef()
  const { addItem } = useCart()
  const { toggle, isWishlisted } = useWishlist()
  const { addToCompare, removeFromCompare, compareItems } = useCompare()
  const [added, setAdded] = useState(false)

  const isCompared = compareItems.some(i => i.id === product.id)
  const canCompare = compareItems.length < 2 || isCompared

  const handleAdd = (e) => {
    e.preventDefault()
    addItem(product, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <motion.div
      ref={cardRef}
      className="product-card group flex flex-col justify-between"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        delay: (index % 3) * 0.15,
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -6 }}
    >
      <div>
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-4 left-4 z-10">
            <span className="font-sans text-[10px] tracking-widest uppercase px-3 py-1 border border-gold/60 text-gold bg-black/80 backdrop-blur-sm">
              {product.badge}
            </span>
          </div>
        )}

        {/* Image Area */}
        <Link to={`/product/${product.slug}`}>
          <div className="relative h-64 bg-gradient-to-b from-neutral-900/40 to-black flex items-center justify-center overflow-hidden border-b border-white/5">
            <img 
              src={product.image} 
              alt={product.name} 
              loading="lazy"
              className="h-48 object-contain p-4 group-hover:scale-105 transition-transform duration-700" 
            />
            {/* Subtle radial glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{
                background: `radial-gradient(circle at center, rgba(201, 168, 76, 0.1) 0%, transparent 70%)`
              }}
            />
            {/* Category label */}
            <div className="absolute top-4 right-4">
              <span className="font-sans text-[9px] tracking-widest uppercase text-off-white/30">
                {product.category}
              </span>
            </div>
          </div>
        </Link>

        {/* Info */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <Link to={`/product/${product.slug}`}>
              <h3 className="font-serif text-xl font-light text-off-white group-hover:text-gold transition-colors duration-300">
                {product.name}
              </h3>
            </Link>
            <span className="font-serif text-lg text-gold font-light">£ {product.price}</span>
          </div>
          <p className="font-sans text-xs text-off-white/40 tracking-wide mb-4">{product.subtitle}</p>

          {/* Stars */}
          <div className="flex items-center gap-1 mb-4">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                size={11}
                className={i < product.rating ? 'fill-gold text-gold' : 'text-white/20'}
              />
            ))}
            <span className="text-[10px] text-off-white/30 ml-2">({product.reviews})</span>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 space-y-2">
        <div className="flex gap-2">
          {/* View Details */}
          <Link to={`/product/${product.slug}`} className="flex-1">
            <motion.button
              className="w-full flex items-center justify-center gap-1.5 py-3 border border-white/10 font-sans text-[10px] tracking-widest uppercase text-off-white/60
                         group-hover:border-gold/50 group-hover:text-gold transition-all duration-500"
              whileTap={{ scale: 0.97 }}
            >
              Details <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </Link>

          {/* Add to Cart */}
          {product.inStock && (
            <motion.button
              onClick={handleAdd}
              className={`px-4 py-3 border font-sans text-[10px] tracking-widest uppercase transition-all duration-300 flex-shrink-0 ${
                added ? 'border-gold bg-gold/10 text-gold' : 'border-white/10 text-off-white/50 hover:border-gold hover:bg-gold hover:text-black'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              {added ? '✓' : <ShoppingBag size={12} />}
            </motion.button>
          )}

          {/* Wishlist */}
          <motion.button
            onClick={(e) => { e.preventDefault(); toggle(product) }}
            className={`w-10 py-3 border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
              isWishlisted(product.id) ? 'border-gold bg-gold/10 text-gold' : 'border-white/10 text-white/20 hover:border-gold/40 hover:text-gold'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            <Heart size={12} fill={isWishlisted(product.id) ? 'currentColor' : 'none'} />
          </motion.button>
          {/* Compare */}
          <motion.button
            onClick={(e) => { e.preventDefault(); isCompared ? removeFromCompare(product.id) : addToCompare(product) }}
            className={`w-10 py-3 border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
              isCompared ? 'border-gold bg-gold/10 text-gold' : canCompare ? 'border-white/10 text-white/20 hover:border-gold/40 hover:text-gold' : 'border-white/5 text-white/10 cursor-not-allowed'
            }`}
            whileTap={{ scale: 0.95 }}
            title={isCompared ? 'Remove from compare' : compareItems.length >= 2 ? 'Compare is full (max 2)' : 'Add to compare'}
          >
            <Scale size={12} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default function Products() {
  const titleRef = useRef()
  const lineRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
          }
        }
      )

      gsap.fromTo(lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1, duration: 1.4, ease: 'power3.inOut',
          scrollTrigger: {
            trigger: lineRef.current,
            start: 'top 85%',
          }
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="products" className="relative py-28 bg-black section-pad">
      {/* Header */}
      <div className="text-center mb-20">
        <p className="label-text mb-4">Curated Collection</p>
        <h2
          ref={titleRef}
          className="heading-lg text-off-white mb-6 opacity-0"
        >
          Featured <span className="text-gold italic">Products</span>
        </h2>
        <div
          ref={lineRef}
          className="w-16 h-px bg-gold mx-auto origin-left"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
        {featuredProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>

      {/* View All */}
      <div className="text-center mt-14 flex items-center justify-center gap-4 flex-wrap">
        <Link to="/category/bats">
          <motion.button className="btn-primary" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            Shop All Bats
          </motion.button>
        </Link>
        <Link to="/category/gear">
          <motion.button className="btn-ghost" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            Shop Gear
          </motion.button>
        </Link>
      </div>
    </section>
  )
}
