import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingBag, Star, ArrowRight } from 'lucide-react'
import { products } from '../data/products'
import { useReviews } from '../context/ReviewsContext'
import { useCart } from '../context/CartContext'
import { useState } from 'react'

const RANK_COLORS = ['#C9A84C', '#A8A8A8', '#CD7F32', '#8B9BB4']
const RANK_LABELS = ['#1 Best Seller', '#2 Top Rated', '#3 Popular', '#4 Fan Favourite']

function BestSellerCard({ product, rank, avgRating, reviewCount }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

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
      className="group relative flex flex-col bg-[#0a0a0a] border border-white/5 hover:border-white/10 transition-all duration-500 overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: rank * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
    >
      {/* Rank badge */}
      <div
        className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1.5 text-[9px] font-sans uppercase tracking-widest font-bold"
        style={{ backgroundColor: `${RANK_COLORS[rank]}20`, border: `1px solid ${RANK_COLORS[rank]}40`, color: RANK_COLORS[rank] }}
      >
        <span style={{ color: RANK_COLORS[rank] }}>★</span>
        {RANK_LABELS[rank]}
      </div>

      {/* Sale badge */}
      {savingsPct > 0 && (
        <div className="absolute top-3 right-3 z-20 bg-red-500/80 text-white font-sans text-[9px] uppercase tracking-widest px-2 py-1">
          -{savingsPct}%
        </div>
      )}

      {/* Product image */}
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative h-56 bg-gradient-to-b from-zinc-900/40 to-black flex items-center justify-center overflow-hidden border-b border-white/5">
          <motion.img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-44 w-auto object-contain drop-shadow-2xl mix-blend-lighten transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Info */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div>
          <p className="font-sans text-[9px] uppercase tracking-widest text-gold/70 mb-1">{product.subtitle}</p>
          <Link to={`/product/${product.slug}`}>
            <h3 className="font-serif text-lg font-light text-off-white group-hover:text-gold transition-colors duration-300 leading-tight">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Stars */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[1,2,3,4,5].map(s => (
              <Star
                key={s}
                size={11}
                className={s <= Math.round(avgRating) ? 'fill-gold text-gold' : 'text-white/15'}
              />
            ))}
          </div>
          <span className="font-sans text-[10px] text-off-white/40">{avgRating.toFixed(1)}</span>
          <span className="font-sans text-[9px] text-off-white/25">({reviewCount} reviews)</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto">
          <span className="font-serif text-xl text-off-white">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="font-sans text-xs text-off-white/30 line-through">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>

        {/* CTA */}
        <button
          onClick={handleAdd}
          disabled={!product.inStock}
          className={`w-full py-2.5 font-sans text-[10px] uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
            !product.inStock
              ? 'border border-white/10 text-off-white/20 cursor-not-allowed'
              : added
                ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                : 'bg-gold border border-gold text-black hover:bg-transparent hover:text-gold'
          }`}
        >
          <ShoppingBag size={12} />
          {!product.inStock ? 'Out of Stock' : added ? 'Added!' : 'Add to Cart'}
        </button>
      </div>
    </motion.div>
  )
}

export default function BestSellers() {
  const { getAverageRating, getReviews, getTopRated } = useReviews()

  // Get top 4 slugs from reviews, then map to full product objects
  const topSlugs = getTopRated(4).map(t => t.slug)

  const topProducts = topSlugs
    .map(slug => products.find(p => p.slug === slug))
    .filter(Boolean)
    .slice(0, 4)

  // Pad to 4 if we got fewer from reviews — fall back to highest static rating
  if (topProducts.length < 4) {
    const fallback = [...products]
      .filter(p => !topProducts.some(tp => tp.id === p.id))
      .sort((a, b) => b.rating - a.rating)
    while (topProducts.length < 4 && fallback.length) topProducts.push(fallback.shift())
  }

  return (
    <section className="bg-[#050505] py-20 md:py-28">
      <div className="section-pad max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold mb-3">
              Customer Favourites
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-off-white leading-tight">
              Best Sellers
            </h2>
            <p className="font-sans text-sm text-off-white/40 mt-3 max-w-md">
              Our most loved products — ranked by verified customer ratings and reviews.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Link
              to="/category/bats"
              className="inline-flex items-center gap-2 font-sans text-xs tracking-widest uppercase text-gold hover:text-gold/70 transition-colors duration-300 group"
            >
              View All Products
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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

        {/* Bottom bar */}
        <motion.div
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 border-t border-white/5 pt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {[
            { value: '4.8★', label: 'Average Rating' },
            { value: '500+', label: 'Verified Reviews' },
            { value: '98%', label: 'Recommend to a Friend' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="font-serif text-2xl text-gold font-light">{stat.value}</div>
              <div className="font-sans text-[9px] uppercase tracking-widest text-off-white/30 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
