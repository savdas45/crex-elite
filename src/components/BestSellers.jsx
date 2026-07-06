import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingBag, Star, ArrowRight } from 'lucide-react'
import { products } from '../data/products'
import { useReviews } from '../context/ReviewsContext'
import { useCart } from '../context/CartContext'

// ─── Curated Best Sellers: one from each category for diversity ───────────────
// #1 stays as the highest-rated bat (The Sovereign)
// #2 best gear item — Monarch Batting Gloves (5★, 156 reviews)
// #3 best apparel item — Pro Training Set (5★, 183 reviews)
// #4 top overall gear by rating — Sovereign Helmet (5★, Pro Choice)
const CURATED_SLUGS = [
  'the-sovereign',          // #1 — Bats
  'monarch-batting-gloves', // #2 — Gear
  'pro-training-jersey',    // #3 — Apparel
  'sovereign-helmet',       // #4 — Gear (protective)
]

const RANK_CONFIG = [
  { color: '#C9A84C', label: '✦ #1 Best Seller' },
  { color: '#A8A8A8', label: '✦ #2 Top Rated' },
  { color: '#CD7F32', label: '✦ #3 Popular' },
  { color: '#7B8FA1', label: '✦ #4 Fan Favourite' },
]

function StarRow({ rating, size = 11 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <Star
          key={s}
          size={size}
          className={s <= Math.round(rating) ? 'fill-gold text-gold' : 'text-white/15'}
        />
      ))}
    </div>
  )
}

function BestSellerCard({ product, rank, avgRating, reviewCount }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const cfg = RANK_CONFIG[rank]

  const handleAdd = (e) => {
    e.preventDefault()
    addItem(product, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const savings = product.originalPrice ? product.originalPrice - product.price : 0
  const savingsPct = product.originalPrice ? Math.round((savings / product.originalPrice) * 100) : 0

  return (
    <motion.div
      className="group relative flex flex-col bg-[#0a0a0a] border border-white/5 hover:border-white/12 transition-all duration-500 overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: rank * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
    >
      {/* Rank badge — top left */}
      <div
        className="absolute top-3 left-3 z-20 flex items-center gap-1 px-2 py-1 font-sans text-[9px] uppercase tracking-widest font-semibold"
        style={{
          backgroundColor: `${cfg.color}15`,
          border: `1px solid ${cfg.color}35`,
          color: cfg.color,
        }}
      >
        {cfg.label}
      </div>

      {/* Discount badge — top right */}
      {savingsPct > 0 && (
        <div className="absolute top-3 right-3 z-20 bg-red-500/80 text-white font-sans text-[9px] uppercase tracking-widest px-2 py-1">
          -{savingsPct}%
        </div>
      )}

      {/* Image */}
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative h-48 sm:h-52 md:h-56 bg-gradient-to-b from-zinc-900/40 to-black flex items-center justify-center overflow-hidden border-b border-white/5">
          <motion.img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-36 sm:h-40 md:h-44 w-auto object-contain drop-shadow-2xl mix-blend-lighten transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col gap-2.5 flex-1">
        {/* Category pill */}
        <span className="font-sans text-[9px] uppercase tracking-widest text-gold/60 border border-gold/20 px-2 py-0.5 w-fit">
          {product.category}
        </span>

        <Link to={`/product/${product.slug}`}>
          <h3 className="font-serif text-base sm:text-lg font-light text-off-white group-hover:text-gold transition-colors duration-300 leading-tight">
            {product.name}
          </h3>
        </Link>
        <p className="font-sans text-[10px] text-off-white/40 leading-snug line-clamp-2">
          {product.subtitle}
        </p>

        {/* Stars */}
        <div className="flex items-center gap-2 flex-wrap">
          <StarRow rating={avgRating} size={11} />
          <span className="font-sans text-[10px] text-off-white/50">{avgRating.toFixed(1)}</span>
          <span className="font-sans text-[9px] text-off-white/25">({reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto pt-1">
          <span className="font-serif text-lg sm:text-xl text-off-white">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="font-sans text-xs text-off-white/30 line-through">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>

        {/* CTA */}
        <button
          onClick={handleAdd}
          disabled={!product.inStock}
          className={`w-full py-2.5 font-sans text-[10px] uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all duration-300 mt-1 ${
            !product.inStock
              ? 'border border-white/10 text-off-white/20 cursor-not-allowed'
              : added
                ? 'bg-green-500/10 border border-green-500/30 text-green-400 cursor-pointer'
                : 'bg-gold border border-gold text-black hover:bg-transparent hover:text-gold cursor-pointer'
          }`}
        >
          <ShoppingBag size={12} />
          {!product.inStock ? 'Out of Stock' : added ? 'Added to Cart!' : 'Add to Cart'}
        </button>
      </div>
    </motion.div>
  )
}

export default function BestSellers() {
  const { getAverageRating, getReviews } = useReviews()

  // Build curated list from slugs — guaranteed category diversity
  const topProducts = CURATED_SLUGS
    .map(slug => products.find(p => p.slug === slug))
    .filter(Boolean)

  return (
    <section className="bg-[#050505] py-16 md:py-24 lg:py-28">
      <div className="section-pad max-w-7xl mx-auto">

        {/* ── Section Header ───────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-sans text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-gold mb-2 sm:mb-3">
              Customer Favourites
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-off-white leading-tight">
              Best Sellers
            </h2>
            <p className="font-sans text-xs sm:text-sm text-off-white/40 mt-2 sm:mt-3 max-w-md leading-relaxed">
              Our most loved products across all categories — rated by verified customers.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex-shrink-0"
          >
            <Link
              to="/category/bats"
              className="inline-flex items-center gap-2 font-sans text-[10px] sm:text-xs tracking-widest uppercase text-gold hover:text-gold/70 transition-colors duration-300 group"
            >
              View All Products
              <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* ── Cards Grid — 2 col on mobile, 4 col on desktop ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {topProducts.map((product, i) => {
            const reviews = getReviews(product.slug)
            const avg = getAverageRating(product.slug) || product.rating
            const count = reviews.length + product.reviews
            return (
              <BestSellerCard
                key={product.id}
                product={product}
                rank={i}
                avgRating={avg}
                reviewCount={count}
              />
            )
          })}
        </div>

        {/* ── Stats Bar ───────────────────────────────────── */}
        <motion.div
          className="mt-10 md:mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-16 border-t border-white/5 pt-8 md:pt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {[
            { value: '4.8★', label: 'Average Rating' },
            { value: '500+', label: 'Verified Reviews' },
            { value: '98%', label: 'Recommend Us' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="font-serif text-xl sm:text-2xl text-gold font-light">{stat.value}</div>
              <div className="font-sans text-[8px] sm:text-[9px] uppercase tracking-widest text-off-white/30 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
