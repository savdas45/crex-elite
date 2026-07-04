import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import { Star } from 'lucide-react'

export default function Wishlist() {
  const { items, toggle } = useWishlist()
  const { addItem } = useCart()
  const [movedIds, setMovedIds] = useState([])

  const moveToCart = (product) => {
    addItem(product, 1)
    setMovedIds(prev => [...prev, product.id])
    setTimeout(() => setMovedIds(prev => prev.filter(id => id !== product.id)), 2500)
  }

  return (
    <div className="bg-black min-h-screen text-off-white pt-32 pb-24">
      <div className="section-pad max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10 border-b border-white/5 pb-6">
          <Heart className="text-gold" size={22} />
          <h1 className="font-serif text-4xl font-light text-off-white">
            My <span className="text-gold italic">Wishlist</span>
          </h1>
          {items.length > 0 && (
            <span className="font-sans text-xs text-off-white/40 ml-auto tracking-widest uppercase">
              {items.length} item{items.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {items.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center py-28">
            <div className="w-20 h-20 border border-white/5 flex items-center justify-center mx-auto mb-6">
              <Heart size={28} className="text-white/15" />
            </div>
            <h3 className="font-serif text-3xl text-off-white/40 mb-3">Your wishlist is empty</h3>
            <p className="font-sans text-sm text-off-white/25 mb-10">Save products you love and come back to them anytime.</p>
            <div className="flex items-center justify-center gap-4">
              <Link to="/category/bats" className="btn-primary">Explore Bats</Link>
              <Link to="/category/gear" className="btn-ghost">Explore Gear</Link>
            </div>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {items.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.06, duration: 0.5 }}
                    className="product-card group flex flex-col"
                  >
                    {/* Remove */}
                    <button
                      onClick={() => toggle(product)}
                      className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center border border-white/10 text-white/30 hover:border-red-400/50 hover:text-red-400 transition-all duration-300"
                    >
                      <Trash2 size={12} />
                    </button>

                    {product.badge && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="font-sans text-[10px] tracking-widest uppercase px-3 py-1 border border-gold/60 text-gold bg-black/80">{product.badge}</span>
                      </div>
                    )}

                    <Link to={`/product/${product.slug}`} className="flex-shrink-0">
                      <div className="relative h-60 bg-gradient-to-b from-neutral-900/40 to-black flex items-center justify-center overflow-hidden border-b border-white/5">
                        <img src={product.image} alt={product.name}
                          className="h-44 object-contain p-4 group-hover:scale-105 transition-transform duration-700" />
                      </div>
                    </Link>

                    <div className="p-5 flex flex-col flex-1">
                      <Link to={`/product/${product.slug}`}>
                        <h3 className="font-serif text-lg font-light text-off-white group-hover:text-gold transition-colors duration-300 mb-1">{product.name}</h3>
                      </Link>
                      <p className="font-sans text-[10px] text-off-white/40 tracking-wide mb-2">{product.subtitle}</p>
                      <div className="flex items-center gap-1 mb-3">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star key={i} size={10} className={i < product.rating ? 'fill-gold text-gold' : 'text-white/15'} />
                        ))}
                        <span className="font-sans text-[9px] text-off-white/25 ml-1">({product.reviews})</span>
                      </div>
                      <div className="flex items-baseline gap-2 mb-4 mt-auto">
                        <span className="font-serif text-xl text-gold">£{product.price}</span>
                        {product.originalPrice && (
                          <span className="font-serif text-sm text-off-white/25 line-through">£{product.originalPrice}</span>
                        )}
                      </div>

                      <button
                        onClick={() => moveToCart(product)}
                        disabled={movedIds.includes(product.id)}
                        className={`w-full py-3 font-sans text-[10px] tracking-widest uppercase border transition-all duration-300 flex items-center justify-center gap-2 ${
                          movedIds.includes(product.id)
                            ? 'border-gold/40 bg-gold/5 text-gold'
                            : 'border-white/10 text-off-white/50 hover:border-gold hover:bg-gold hover:text-black'
                        }`}
                      >
                        {movedIds.includes(product.id) ? '✓ Added to Cart' : <><ShoppingBag size={11} /> Add to Cart</>}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Move all to cart */}
            <div className="text-center mt-12">
              <button
                onClick={() => items.forEach(p => addItem(p, 1))}
                className="btn-ghost text-xs"
              >
                <ShoppingBag size={13} /> Add All to Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
