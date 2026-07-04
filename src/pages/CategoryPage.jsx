import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { products } from '../data/products'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Star, ShoppingBag, Heart, SlidersHorizontal, X, ChevronDown, Scale, ChevronLeft, ChevronRight } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useCompare } from '../context/CompareContext'

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'newest', label: 'Newest' },
]

function ProductCard({ product, index }) {
  const { addItem } = useCart()
  const { toggle, isWishlisted } = useWishlist()
  const { compareItems, addToCompare, removeFromCompare } = useCompare()
  const [added, setAdded] = useState(false)
  const wishlisted = isWishlisted(product.id)
  const inCompare = compareItems.some(i => i.id === product.id)

  const handleAdd = (e) => {
    e.preventDefault()
    addItem(product, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <motion.div
      className="product-card group flex flex-col"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1">
        {product.badge && (
          <span className="font-sans text-[10px] tracking-widest uppercase px-3 py-1 border border-gold/60 text-gold bg-black/80 backdrop-blur-sm">
            {product.badge}
          </span>
        )}
        {!product.inStock && (
          <span className="font-sans text-[10px] tracking-widest uppercase px-3 py-1 border border-red-500/60 text-red-400 bg-black/80">
            Out of Stock
          </span>
        )}
      </div>

      {/* Wishlist & Compare */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button
          onClick={(e) => { e.preventDefault(); toggle(product) }}
          className={`w-8 h-8 flex items-center justify-center border transition-all duration-300 ${
            wishlisted ? 'border-gold bg-gold/10 text-gold' : 'border-white/10 text-white/30 hover:border-gold/40 hover:text-gold bg-black/50'
          }`}
          title="Wishlist"
        >
          <Heart size={13} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            if (inCompare) removeFromCompare(product.id)
            else addToCompare(product)
          }}
          className={`w-8 h-8 flex items-center justify-center border transition-all duration-300 ${
            inCompare ? 'border-gold bg-gold/10 text-gold' : 'border-white/10 text-white/30 hover:border-gold/40 hover:text-gold bg-black/50'
          }`}
          title={inCompare ? "Remove from Compare" : "Compare"}
        >
          <Scale size={13} />
        </button>
      </div>

      {/* Image */}
      <Link to={`/product/${product.slug}`} className="flex-shrink-0">
        <div className="relative h-72 bg-gradient-to-b from-neutral-900/40 to-black flex items-center justify-center overflow-hidden border-b border-white/5">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-56 object-contain p-4 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{ background: 'radial-gradient(circle at center, rgba(201,168,76,0.08) 0%, transparent 70%)' }}
          />
          <span className="absolute bottom-3 right-3 font-sans text-[9px] tracking-widest uppercase text-off-white/20">{product.category}</span>
        </div>
      </Link>

      {/* Info */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-1">
          <Link to={`/product/${product.slug}`}>
            <h3 className="font-serif text-xl font-light text-off-white group-hover:text-gold transition-colors duration-300">
              {product.name}
            </h3>
          </Link>
          <div className="text-right flex-shrink-0 ml-2">
            <span className="font-serif text-lg text-gold font-light block">£{product.price}</span>
            {product.originalPrice && (
              <span className="font-serif text-xs text-off-white/25 line-through">£{product.originalPrice}</span>
            )}
          </div>
        </div>

        <p className="font-sans text-xs text-off-white/40 tracking-wide mb-3">{product.subtitle}</p>

        <div className="flex items-center gap-1 mb-4">
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} size={11} className={i < product.rating ? 'fill-gold text-gold' : 'text-white/20'} />
          ))}
          <span className="text-[10px] text-off-white/30 ml-2">({product.reviews})</span>
        </div>

        <div className="mt-auto flex gap-2">
          <Link to={`/product/${product.slug}`} className="flex-1">
            <button className="w-full py-2.5 border border-white/10 font-sans text-[10px] tracking-widest uppercase text-off-white/50 group-hover:border-gold/40 group-hover:text-gold transition-all duration-500 flex items-center justify-center gap-1.5">
              Details <ArrowRight size={10} />
            </button>
          </Link>
          {product.inStock && (
            <button
              onClick={handleAdd}
              className={`px-4 py-2.5 border font-sans text-[10px] tracking-widest uppercase transition-all duration-300 flex items-center gap-1.5 ${
                added
                  ? 'border-gold bg-gold/10 text-gold'
                  : 'border-white/10 text-off-white/50 hover:border-gold hover:bg-gold hover:text-black'
              }`}
            >
              {added ? '✓' : <ShoppingBag size={12} />}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function CategoryPage() {
  const { categoryName } = useParams()
  const cat = categoryName?.toLowerCase() || ''
  const [sort, setSort] = useState('featured')
  const [maxPrice, setMaxPrice] = useState(1000)
  const [showFilters, setShowFilters] = useState(false)
  const [sortOpen, setSortOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setCurrentPage(1)
  }, [categoryName])

  useEffect(() => {
    setCurrentPage(1)
  }, [maxPrice, sort])

  const handlePageChange = (page) => {
    setCurrentPage(page)
    const gridElement = document.getElementById('products-grid')
    if (gridElement) {
      gridElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const categoryTitles = {
    bats: { title: 'The Bat Collection', label: 'Handcrafted Willow', desc: 'From English Willow Grade 1 to collector\'s editions — every bat is balanced to perfection for elite batsmen.', color: '#C9A84C' },
    gear: { title: 'Elite Protective Gear', label: 'Pro-grade Protection', desc: 'Superior impact resistance meets ergonomic comfort. Stay focused at the crease with the finest protective equipment.', color: '#C9A84C' },
    apparel: { title: 'Premium Apparel', label: 'Modern Performance', desc: 'Luxury athletic tailoring engineered for breathability and dynamic movement. Designed for champions.', color: '#C9A84C' },
    accessories: { title: 'Player Accessories', label: 'The Finishing Touch', desc: 'Every detail matters. From polarised sunglasses to physio-grade kinesiology tape — complete your kit with CREX ELITE accessories.', color: '#C9A84C' },
    coaching: { title: 'Coaching Equipment', label: 'Train Like a Pro', desc: 'Professional-grade coaching tools used at elite academies worldwide. Build champions with the right equipment.', color: '#C9A84C' },
  }

  const meta = categoryTitles[cat] || { title: 'All Products', label: 'CREX ELITE', desc: 'Explore the full range of CREX ELITE cricket equipment.', color: '#C9A84C' }

  let filtered = products.filter(p => cat === '' || p.category === cat)
  filtered = filtered.filter(p => p.price <= maxPrice)

  switch (sort) {
    case 'price-asc': filtered = [...filtered].sort((a, b) => a.price - b.price); break
    case 'price-desc': filtered = [...filtered].sort((a, b) => b.price - a.price); break
    case 'rating': filtered = [...filtered].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews); break
    case 'newest': filtered = [...filtered].reverse(); break
    default: filtered = [...filtered].sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0))
  }

  const maxProductPrice = Math.max(...products.filter(p => !cat || p.category === cat).map(p => p.price))

  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const activePage = Math.min(currentPage, Math.max(1, totalPages))
  const startIndex = (activePage - 1) * itemsPerPage
  const paginatedProducts = filtered.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="bg-black min-h-screen text-off-white pt-32 pb-24">
      {/* Category Hero Banner */}
      <div className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 100% at 50% 0%, rgba(201,168,76,0.06) 0%, transparent 70%)' }} />
        <div className="section-pad max-w-7xl mx-auto py-16 text-center">
          <p className="label-text mb-4">{meta.label}</p>
          <h1 className="heading-lg text-off-white mb-5">
            {meta.title.split(' ')[0]} <span className="text-gold italic">{meta.title.split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="body-text max-w-xl mx-auto mb-6 text-off-white/60">{meta.desc}</p>
          <div className="gold-line w-24 mx-auto" />
          {/* Category nav pills */}
          <div className="flex items-center justify-center gap-4 mt-8 flex-wrap">
            {['bats', 'gear', 'apparel', 'accessories', 'coaching'].map(c => (
              <Link
                key={c}
                to={`/category/${c}`}
                className={`font-sans text-[11px] tracking-widest uppercase px-5 py-2 border transition-all duration-300 ${
                  cat === c ? 'border-gold text-gold bg-gold/5' : 'border-white/10 text-off-white/40 hover:border-gold/40 hover:text-gold'
                }`}
              >
                {c === 'bats' ? 'Cricket Bats' : c === 'gear' ? 'Protective Gear' : c === 'apparel' ? 'Apparel' : c === 'accessories' ? 'Accessories' : 'Coaching'}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Filter/Sort Bar */}
      <div className="section-pad max-w-7xl mx-auto py-6 flex items-center justify-between border-b border-white/5">
        <span className="font-sans text-xs text-off-white/40 tracking-wide">
          {filtered.length} product{filtered.length !== 1 ? 's' : ''}
        </span>
        <div className="flex items-center gap-4">
          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 font-sans text-xs tracking-widest uppercase px-4 py-2.5 border transition-all duration-300 ${
              showFilters ? 'border-gold text-gold bg-gold/5' : 'border-white/10 text-off-white/40 hover:border-gold/40 hover:text-gold'
            }`}
          >
            <SlidersHorizontal size={12} /> Filters
          </button>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 font-sans text-xs tracking-widest uppercase px-4 py-2.5 border border-white/10 text-off-white/40 hover:border-gold/40 hover:text-gold transition-all duration-300"
            >
              Sort: {SORT_OPTIONS.find(s => s.value === sort)?.label} <ChevronDown size={12} />
            </button>
            <AnimatePresence>
              {sortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-2 w-52 bg-[#111] border border-white/10 z-30"
                >
                  {SORT_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => { setSort(opt.value); setSortOpen(false) }}
                      className={`block w-full text-left px-4 py-3 font-sans text-xs tracking-wide transition-colors duration-200 ${
                        sort === opt.value ? 'text-gold bg-gold/5' : 'text-off-white/50 hover:text-off-white hover:bg-white/5'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden border-b border-white/5"
          >
            <div className="section-pad max-w-7xl mx-auto py-6 flex items-center gap-12">
              <div className="flex-1 max-w-xs">
                <div className="flex justify-between mb-3">
                  <label className="font-sans text-[10px] tracking-widest uppercase text-gold/70">Max Price</label>
                  <span className="font-serif text-sm text-gold">£{maxPrice}</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={maxProductPrice}
                  value={maxPrice}
                  onChange={e => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-gold"
                />
                <div className="flex justify-between mt-1">
                  <span className="font-sans text-[10px] text-off-white/30">£20</span>
                  <span className="font-sans text-[10px] text-off-white/30">£{maxProductPrice}</span>
                </div>
              </div>
              <button
                onClick={() => { setMaxPrice(maxProductPrice); setSort('featured') }}
                className="flex items-center gap-1 font-sans text-[10px] tracking-widest uppercase text-off-white/30 hover:text-gold transition-colors duration-300"
              >
                <X size={10} /> Reset filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid */}
      <div id="products-grid" className="section-pad max-w-7xl mx-auto mt-10 scroll-mt-24">
        {filtered.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
            <p className="font-serif text-2xl text-off-white/30 mb-6">No products match your filters</p>
            <button onClick={() => setMaxPrice(maxProductPrice)} className="btn-ghost">Clear Filters</button>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-16 flex-wrap">
                <button
                  onClick={() => handlePageChange(activePage - 1)}
                  disabled={activePage === 1}
                  className="w-10 h-10 flex items-center justify-center border border-white/10 font-sans text-xs tracking-wider text-off-white/40 hover:border-gold hover:text-gold transition-all duration-300 rounded-sm cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed disabled:pointer-events-none"
                  aria-label="Previous Page"
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }).map((_, i) => {
                  const pageNum = i + 1
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-10 h-10 flex items-center justify-center border font-sans text-xs tracking-wider transition-all duration-300 rounded-sm cursor-pointer ${
                        activePage === pageNum
                          ? 'border-gold text-gold bg-gold/5 font-semibold'
                          : 'border-white/10 text-off-white/40 hover:border-gold/40 hover:text-gold'
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                })}

                <button
                  onClick={() => handlePageChange(activePage + 1)}
                  disabled={activePage === totalPages}
                  className="w-10 h-10 flex items-center justify-center border border-white/10 font-sans text-xs tracking-wider text-off-white/40 hover:border-gold hover:text-gold transition-all duration-300 rounded-sm cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed disabled:pointer-events-none"
                  aria-label="Next Page"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
