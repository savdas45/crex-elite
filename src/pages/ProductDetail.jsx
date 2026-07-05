import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { products, getBySlug } from '../data/products'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ShoppingBag, ShieldCheck, Truck, RotateCcw, Check, Star, Heart, Share2, Ruler, Scale, Bell } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useCompare } from '../context/CompareContext'
import { useReviews } from '../context/ReviewsContext'

const TABS = ['Description', 'Specifications', 'Reviews', 'Delivery']

function StarRating({ rating, size = 14 }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={size} className={i < Math.floor(rating) ? 'fill-gold text-gold' : i < rating ? 'fill-gold/50 text-gold' : 'text-white/15'} />
      ))}
    </div>
  )
}

// Stock counts — low-stock threshold triggers urgency badge
const STOCK_COUNTS = {
  'the-sovereign': 4,
  'the-legacy': 2,
  'the-heritage': 1,
  'the-commander': 3,
  'the-dynasty': 8,
  'the-prestige': 12,
  'the-apex': 15,
  'the-junior-pro': 20,
}

export default function ProductDetail() {
  const { slug } = useParams()
  const product = getBySlug(slug)
  const [selectedImage, setSelectedImage] = useState(product?.image || '')
  const [addedToCart, setAddedToCart] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || null)
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || null)
  const [activeTab, setActiveTab] = useState('Description')
  const [copied, setCopied] = useState(false)
  const [addKnockingIn, setAddKnockingIn] = useState(false)
  const [notifyEmail, setNotifyEmail] = useState('')
  const [notifySubmitted, setNotifySubmitted] = useState(false)

  const handleNotifyMe = (e) => {
    e.preventDefault()
    if (!notifyEmail.trim()) return
    const key = `crex_notify_${product.slug}`
    const existing = JSON.parse(localStorage.getItem(key) || '[]')
    if (!existing.includes(notifyEmail)) {
      localStorage.setItem(key, JSON.stringify([...existing, notifyEmail]))
    }
    setNotifySubmitted(true)
  }
  // Review form state
  const [reviewName, setReviewName] = useState('')
  const [reviewText, setReviewText] = useState('')
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewHover, setReviewHover] = useState(0)
  const [reviewSubmitted, setReviewSubmitted] = useState(false)

  const { addItem } = useCart()
  const { toggle, isWishlisted } = useWishlist()
  const { compareItems, addToCompare, removeFromCompare } = useCompare()
  const { getReviews, addReview, getAverageRating } = useReviews()
  const wishlisted = product ? isWishlisted(product.id) : false
  const inCompare = product ? compareItems.some(i => i.id === product.id) : false
  const stockCount = product ? (STOCK_COUNTS[product.slug] ?? 99) : 99
  const isLowStock = stockCount > 0 && stockCount <= 5
  const reviews = product ? getReviews(product.slug) : []
  const avgRating = product ? (getAverageRating(product.slug) || product.rating) : 0

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image)
      setSelectedSize(product.sizes?.[0] || null)
      setSelectedColor(product.colors?.[0] || null)
    }
  }, [slug, product])

  if (!product) {
    return (
      <div className="bg-black min-h-screen text-off-white flex flex-col items-center justify-center pt-32 gap-6">
        <p className="font-sans text-xs tracking-widest uppercase text-gold mb-2">404 — Not Found</p>
        <h2 className="font-serif text-4xl text-off-white">Product Not Found</h2>
        <p className="font-sans text-sm text-off-white/40">This product may have been removed or the URL is incorrect.</p>
        <div className="flex gap-4 mt-4">
          <Link to="/" className="btn-ghost text-xs">Return Home</Link>
          <Link to="/category/bats" className="btn-primary text-xs">Shop All</Link>
        </div>
      </div>
    )
  }

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    const modifier = addKnockingIn ? { name: 'Pro Knocking-In & Oiling', price: 35 } : null
    const productToCart = {
      ...product,
      image: selectedImage
    }
    addItem(productToCart, quantity, selectedSize, modifier, selectedColor)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2500)
  }

  const handleCompareToggle = () => {
    if (inCompare) {
      removeFromCompare(product.id)
    } else {
      addToCompare(product)
    }
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const savings = product.originalPrice ? product.originalPrice - product.price : 0
  const savingsPct = product.originalPrice ? Math.round((savings / product.originalPrice) * 100) : 0

  return (
    <div className="bg-black min-h-screen text-off-white pt-24 md:pt-32 pb-24">
      {/* Breadcrumb */}
      <div className="section-pad max-w-7xl mx-auto mb-6 md:mb-8">
        <div className="flex items-center gap-2 font-sans text-[10px] md:text-xs text-off-white/30 tracking-wide overflow-x-auto whitespace-nowrap scrollbar-hide pb-2">
          <Link to="/" className="hover:text-gold transition-colors duration-300">Home</Link>
          <span>/</span>
          <Link to={`/category/${product.category}`} className="hover:text-gold transition-colors duration-300 capitalize">{product.category}</Link>
          <span>/</span>
          <span className="text-off-white/60">{product.name}</span>
        </div>
      </div>

      <div className="section-pad max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24">

        {/* ── Images Gallery ── */}
        <div className="space-y-4">
          <div className="aspect-square bg-gradient-to-b from-neutral-900/40 to-black border border-white/5 flex items-center justify-center overflow-hidden relative group">
            <motion.img
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45 }}
              src={selectedImage}
              alt={product.name}
              className="max-h-[78%] object-contain p-8 group-hover:scale-105 transition-transform duration-700"
            />
            {product.badge && (
              <span className="absolute top-6 left-6 font-sans text-[10px] tracking-widest uppercase px-3 py-1 border border-gold/60 text-gold bg-black/80">
                {product.badge}
              </span>
            )}
            {savings > 0 && (
              <span className="absolute top-6 right-6 font-sans text-[10px] tracking-widest uppercase px-3 py-1 bg-gold text-black font-semibold">
                Save {savingsPct}%
              </span>
            )}
            {/* Action icons overlay */}
            <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={handleCompareToggle}
                className={`w-9 h-9 flex items-center justify-center border transition-all duration-300 ${inCompare ? 'border-gold bg-gold/10 text-gold' : 'border-white/20 text-white/40 hover:border-gold hover:text-gold bg-black/70'}`}
                title={inCompare ? "Remove from Compare" : "Compare"}
              >
                <Scale size={14} />
              </button>
              <button
                onClick={() => toggle(product)}
                className={`w-9 h-9 flex items-center justify-center border transition-all duration-300 ${wishlisted ? 'border-gold bg-gold/10 text-gold' : 'border-white/20 text-white/40 hover:border-gold hover:text-gold bg-black/70'}`}
              >
                <Heart size={14} fill={wishlisted ? 'currentColor' : 'none'} />
              </button>
              <button
                onClick={handleShare}
                className="w-9 h-9 flex items-center justify-center border border-white/20 text-white/40 hover:border-gold hover:text-gold bg-black/70 transition-all duration-300"
              >
                <Share2 size={14} />
              </button>
            </div>
          </div>

          {/* Thumbnails */}
          {product.images?.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 bg-neutral-900/50 border flex items-center justify-center p-2 transition-all duration-300 ${selectedImage === img ? 'border-gold' : 'border-white/5 hover:border-white/20'}`}
                >
                  <img src={img} alt={`view ${idx}`} className="max-h-[85%] object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Product Info ── */}
        <div className="flex flex-col">
          <div>
            <p className="label-text mb-3">{product.category}</p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-off-white mb-2 leading-none">{product.name}</h1>
            <p className="font-sans text-xs md:text-sm text-off-white/40 tracking-wider mb-6">{product.subtitle}</p>

            {/* Rating & Price + Stock Badge */}
            <div className="flex items-center gap-6 mb-8 border-b border-white/5 pb-6 flex-wrap">
              <div className="flex items-center gap-2">
                <StarRating rating={avgRating} />
                <span className="text-xs text-off-white/40 ml-1">({reviews.length + product.reviews} reviews)</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl text-gold font-light">£{product.price}</span>
                {product.originalPrice && (
                  <span className="font-serif text-xl text-off-white/30 line-through">£{product.originalPrice}</span>
                )}
                {savings > 0 && (
                  <span className="font-sans text-xs text-green-400 bg-green-400/10 px-2 py-0.5">Save £{savings}</span>
                )}
              </div>
              {/* Stock Urgency Badge */}
              {isLowStock && (
                <motion.div
                  animate={{ opacity: [1, 0.6, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-full px-3 py-1"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                  <span className="font-sans text-[11px] text-red-400 tracking-wide">Only {stockCount} left in stock</span>
                </motion.div>
              )}
            </div>

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-sans text-[10px] tracking-widest uppercase text-off-white/50">Size</span>
                  <Link to="/size-guide" className="flex items-center gap-1 font-sans text-[10px] tracking-widest uppercase text-gold/60 hover:text-gold transition-colors duration-300">
                    <Ruler size={10} /> Size Guide
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 font-sans text-xs tracking-wide border transition-all duration-300 ${
                        selectedSize === size ? 'border-gold text-gold bg-gold/5' : 'border-white/10 text-off-white/50 hover:border-gold/40 hover:text-gold'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-sans text-[10px] tracking-widest uppercase text-off-white/50">Color</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color, idx) => {
                    const dotColor = color.toLowerCase() === 'white' ? '#ffffff' :
                                     color.toLowerCase() === 'black' ? '#18181b' :
                                     color.toLowerCase() === 'cream' ? '#f5f5dc' : '#d4af37';
                    return (
                      <button
                        key={color}
                        onClick={() => {
                          setSelectedColor(color);
                          if (product.images?.[idx]) {
                            setSelectedImage(product.images[idx]);
                          }
                        }}
                        className={`px-4 py-2.5 font-sans text-xs tracking-wide border flex items-center gap-2 transition-all duration-300 ${
                          selectedColor === color ? 'border-gold text-gold bg-gold/5' : 'border-white/10 text-off-white/50 hover:border-gold/40 hover:text-gold'
                        }`}
                      >
                        <span 
                          className="w-3.5 h-3.5 rounded-full border border-white/20" 
                          style={{ backgroundColor: dotColor }} 
                        />
                        {color}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Description short */}
            <p className="body-text mb-8 leading-loose text-off-white/70 line-clamp-3">{product.desc}</p>

            {/* Key features */}
            <div className="mb-8 grid grid-cols-2 gap-2">
              {product.features.slice(0, 4).map((feat, i) => (
                <div key={i} className="flex items-center gap-2 font-sans text-xs text-off-white/60">
                  <Check size={12} className="text-gold flex-shrink-0" /> {feat}
                </div>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <div className="border-t border-white/5 pt-8 space-y-5 mt-auto">
            {product.category === 'bats' && product.inStock && (
              <div className="flex items-center justify-between p-4 border border-zinc-800 rounded-xl bg-zinc-900/30">
                <div className="flex items-center gap-3">
                  <div 
                    onClick={() => setAddKnockingIn(!addKnockingIn)}
                    className={`w-5 h-5 rounded flex items-center justify-center cursor-pointer transition-colors ${addKnockingIn ? 'bg-gold text-black' : 'border border-zinc-600 text-transparent'}`}
                  >
                    <Check size={14} />
                  </div>
                  <div>
                    <span className="block font-sans text-sm text-white">Add Pro Knocking-In & Oiling</span>
                    <span className="block font-sans text-xs text-off-white/50">Ready to play service by our master makers</span>
                  </div>
                </div>
                <span className="font-sans text-sm text-gold">+£35</span>
              </div>
            )}
            <div className="flex items-center gap-4">
              {/* Quantity */}
              {product.inStock && (
                <div className="flex items-center border border-white/10 h-14 flex-shrink-0">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-full flex items-center justify-center text-off-white/50 hover:text-off-white hover:bg-white/5 transition-colors text-lg">−</button>
                  <span className="w-10 text-center font-sans text-sm">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-full flex items-center justify-center text-off-white/50 hover:text-off-white hover:bg-white/5 transition-colors text-lg">+</button>
                </div>
              )}

              {/* Add to Cart / Out of Stock */}
              {product.inStock ? (
                <motion.button
                  onClick={handleAddToCart}
                  className="flex-1 btn-primary h-14 justify-center gold-glow"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <AnimatePresence mode="wait">
                    {addedToCart ? (
                      <motion.span key="added" initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -16, opacity: 0 }}
                        className="flex items-center gap-2 text-green-400">
                        <Check size={14} /> Added to Cart!
                      </motion.span>
                    ) : (
                      <motion.span key="add" initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -16, opacity: 0 }}
                        className="flex items-center gap-2">
                        <ShoppingBag size={14} /> Add to Cart
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              ) : (
                <div className="flex-1 flex flex-col gap-3">
                  {/* Out of stock badge */}
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 text-red-400 font-sans text-[10px] uppercase tracking-widest px-3 py-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" />
                      Out of Stock
                    </span>
                    <span className="font-sans text-xs text-off-white/30">Back soon — be the first to know</span>
                  </div>
                  {/* Notify Me form */}
                  <AnimatePresence mode="wait">
                    {notifySubmitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 border border-green-500/20 bg-green-500/5 px-4 py-3"
                      >
                        <Check size={14} className="text-green-400 flex-shrink-0" />
                        <p className="font-sans text-xs text-green-300 leading-snug">
                          Got it! We'll email <span className="font-semibold">{notifyEmail}</span> the moment this is back in stock.
                        </p>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        onSubmit={handleNotifyMe}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-2"
                      >
                        <div className="flex-1 relative">
                          <Bell size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-off-white/30" />
                          <input
                            type="email"
                            required
                            value={notifyEmail}
                            onChange={e => setNotifyEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full h-11 bg-white/5 border border-white/10 text-off-white font-sans text-xs pl-8 pr-3 placeholder-white/20 focus:outline-none focus:border-gold/40 transition-colors"
                          />
                        </div>
                        <button
                          type="submit"
                          className="h-11 px-4 bg-gold text-black font-sans text-[10px] uppercase tracking-widest font-semibold hover:bg-gold/80 transition-colors flex-shrink-0 cursor-pointer"
                        >
                          Notify Me
                        </button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Wishlist */}
              <button
                onClick={() => toggle(product)}
                className={`w-14 h-14 border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  wishlisted ? 'border-gold bg-gold/10 text-gold' : 'border-white/10 text-off-white/30 hover:border-gold hover:text-gold'
                }`}
              >
                <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Copy link notice */}
            <AnimatePresence>
              {copied && (
                <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="font-sans text-xs text-gold text-center">
                  ✓ Link copied to clipboard
                </motion.p>
              )}
            </AnimatePresence>

            {/* Badges */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5 text-center">
              {[
                { icon: ShieldCheck, label: 'Lifetime Warranty' },
                { icon: Truck, label: 'Global Shipping' },
                { icon: RotateCcw, label: '30-Day Returns' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <Icon size={18} className="text-gold/60" />
                  <span className="font-sans text-[9px] text-off-white/30 uppercase tracking-widest">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Tabbed Content ── */}
      <div className="section-pad max-w-7xl mx-auto border-t border-white/5 pt-12 md:pt-16 mb-20">
        {/* Tab Bar */}
        <div className="flex gap-0 border-b border-white/10 mb-8 md:mb-10 overflow-x-auto whitespace-nowrap scrollbar-hide">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 md:px-7 py-4 font-sans text-[10px] md:text-xs tracking-widest uppercase transition-all duration-300 border-b-2 -mb-px flex-shrink-0 ${
                activeTab === tab ? 'border-gold text-gold' : 'border-transparent text-off-white/40 hover:text-off-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'Description' && (
            <motion.div key="desc" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
              className="max-w-3xl">
              <p className="body-text leading-loose mb-8 text-off-white/70">{product.desc}</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 font-sans text-sm text-off-white/60">
                    <Check size={14} className="text-gold flex-shrink-0" /> {feat}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {activeTab === 'Specifications' && (
            <motion.div key="specs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
              className="max-w-xl border border-white/5 bg-charcoal/20">
              {Object.entries(product.specs).map(([key, val]) => (
                <div key={key} className="flex justify-between px-6 py-4 border-b border-white/5 last:border-0">
                  <span className="font-sans text-xs uppercase tracking-widest text-off-white/40">{key}</span>
                  <span className="font-sans text-xs text-off-white/80 font-medium">{val}</span>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'Reviews' && (
            <motion.div key="reviews" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              {/* Rating Summary */}
              <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-8 mb-10 border border-white/5 bg-charcoal/20 p-6 max-w-md">
                <div className="text-center">
                  <div className="font-serif text-5xl md:text-6xl text-gold font-light">{avgRating.toFixed(1)}</div>
                  <StarRating rating={avgRating} />
                  <p className="font-sans text-[10px] text-off-white/30 mt-1">{reviews.length + product.reviews} reviews</p>
                </div>
                <div className="flex-1 w-full space-y-2">
                  {[5, 4, 3, 2, 1].map(n => (
                    <div key={n} className="flex items-center gap-3">
                      <span className="font-sans text-[10px] text-off-white/40 w-2">{n}</span>
                      <div className="flex-1 h-1 bg-white/5 overflow-hidden">
                        <div className="h-full bg-gold transition-all duration-700"
                          style={{ width: n === Math.round(avgRating) ? '70%' : n === Math.round(avgRating) - 1 ? '20%' : '3%' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review Cards */}
              <div className="space-y-6 max-w-2xl mb-12">
                {reviews.map((rev, i) => (
                  <motion.div
                    key={rev.id || i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="border border-white/5 bg-charcoal/10 p-6"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center font-serif text-sm text-gold">
                            {rev.name.charAt(0)}
                          </div>
                          <span className="font-serif text-lg text-off-white">{rev.name}</span>
                          {rev.verified && <span className="font-sans text-[9px] text-green-400 border border-green-400/30 px-2 py-0.5 tracking-widest uppercase">Verified</span>}
                        </div>
                        <StarRating rating={rev.rating} size={11} />
                      </div>
                      <span className="font-sans text-xs text-off-white/30">{rev.date}</span>
                    </div>
                    <p className="font-sans text-sm text-off-white/60 leading-relaxed">{rev.text}</p>
                  </motion.div>
                ))}
                {reviews.length === 0 && (
                  <p className="font-sans text-sm text-off-white/30 italic">No reviews yet. Be the first to write one below!</p>
                )}
              </div>

              {/* Write a Review Form */}
              <div className="max-w-2xl border border-white/10 bg-zinc-900/40 p-8 rounded-xl">
                <h3 className="font-serif text-2xl font-light text-off-white mb-6">Write a Review</h3>
                {reviewSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="text-4xl mb-3">⭐</div>
                    <p className="font-serif text-xl text-gold mb-1">Thank you for your review!</p>
                    <p className="font-sans text-sm text-off-white/50">Your review has been published.</p>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      if (!reviewName.trim() || !reviewText.trim()) return
                      addReview(product.slug, { name: reviewName, rating: reviewRating, text: reviewText, verified: false })
                      setReviewSubmitted(true)
                      setReviewName('')
                      setReviewText('')
                      setReviewRating(5)
                    }}
                    className="space-y-5"
                  >
                    {/* Star Picker */}
                    <div>
                      <label className="font-sans text-[10px] tracking-widest uppercase text-off-white/50 block mb-3">Your Rating</label>
                      <div className="flex items-center gap-2">
                        {[1,2,3,4,5].map(star => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setReviewRating(star)}
                            onMouseEnter={() => setReviewHover(star)}
                            onMouseLeave={() => setReviewHover(0)}
                            className="transition-transform hover:scale-110"
                          >
                            <Star
                              size={28}
                              className={star <= (reviewHover || reviewRating) ? 'fill-gold text-gold' : 'text-white/20'}
                            />
                          </button>
                        ))}
                        <span className="font-sans text-sm text-off-white/40 ml-2">
                          {['','Poor','Fair','Good','Great','Excellent'][reviewHover || reviewRating]}
                        </span>
                      </div>
                    </div>

                    {/* Name */}
                    <div>
                      <label className="font-sans text-[10px] tracking-widest uppercase text-off-white/50 block mb-2">Your Name</label>
                      <input
                        type="text"
                        value={reviewName}
                        onChange={e => setReviewName(e.target.value)}
                        placeholder="e.g. James H."
                        required
                        className="w-full bg-transparent border border-white/10 px-4 py-3 font-sans text-sm text-off-white placeholder-white/20 focus:outline-none focus:border-gold/50 transition-colors"
                      />
                    </div>

                    {/* Review Text */}
                    <div>
                      <label className="font-sans text-[10px] tracking-widest uppercase text-off-white/50 block mb-2">Your Review</label>
                      <textarea
                        value={reviewText}
                        onChange={e => setReviewText(e.target.value)}
                        placeholder="Share your experience with this product…"
                        required
                        rows={4}
                        className="w-full bg-transparent border border-white/10 px-4 py-3 font-sans text-sm text-off-white placeholder-white/20 focus:outline-none focus:border-gold/50 transition-colors resize-none"
                      />
                    </div>

                    <button type="submit" className="btn-primary px-8 py-4">
                      Submit Review
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'Delivery' && (
            <motion.div key="delivery" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
              className="max-w-2xl space-y-4">
              {[
                { title: 'Standard Shipping (UK)', time: '3–5 business days', price: 'Free on orders over £150 / £6.99', icon: '🇬🇧' },
                { title: 'Express Shipping (UK)', time: 'Next business day (order before 2pm)', price: '£12.99', icon: '⚡' },
                { title: 'International Shipping', time: '7–14 business days', price: 'From £18.99 (calculated at checkout)', icon: '🌍' },
                { title: 'Click & Collect', time: 'Available from our Suffolk workshop', price: 'Free — Book via Contact page', icon: '📦' },
              ].map(option => (
                <div key={option.title} className="flex gap-5 p-5 border border-white/5 bg-charcoal/10">
                  <span className="text-2xl flex-shrink-0">{option.icon}</span>
                  <div>
                    <h4 className="font-serif text-lg text-off-white mb-1">{option.title}</h4>
                    <p className="font-sans text-xs text-gold/70 mb-1">{option.time}</p>
                    <p className="font-sans text-xs text-off-white/40">{option.price}</p>
                  </div>
                </div>
              ))}
              <p className="font-sans text-xs text-off-white/30 leading-relaxed pt-2">
                All orders are carefully packaged and dispatched from our Suffolk workshop within 24 hours of payment. 
                Tracking information will be sent to your email upon dispatch. Returns accepted within 30 days.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="section-pad max-w-7xl mx-auto border-t border-white/5 pt-16">
          <div className="text-center mb-12">
            <p className="label-text mb-4">Complete the Kit</p>
            <h2 className="heading-md text-off-white">
              You May Also <span className="text-gold italic">Like</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <div key={rel.id} className="product-card group">
                <Link to={`/product/${rel.slug}`}>
                  <div className="relative h-52 bg-gradient-to-b from-neutral-900/40 to-black flex items-center justify-center overflow-hidden border-b border-white/5">
                    <img src={rel.image} alt={rel.name} className="h-36 object-contain p-3 group-hover:scale-105 transition-transform duration-700" />
                  </div>
                </Link>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-1">
                    <Link to={`/product/${rel.slug}`}>
                      <h3 className="font-serif text-lg font-light text-off-white hover:text-gold transition-colors duration-300">{rel.name}</h3>
                    </Link>
                    <span className="font-serif text-base text-gold">£{rel.price}</span>
                  </div>
                  <p className="font-sans text-[10px] text-off-white/40 mb-4">{rel.subtitle}</p>
                  <Link to={`/product/${rel.slug}`}>
                    <button className="w-full py-2 border border-white/5 font-sans text-[10px] tracking-widest uppercase text-off-white/30 group-hover:border-gold/30 group-hover:text-gold transition-all duration-300">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
