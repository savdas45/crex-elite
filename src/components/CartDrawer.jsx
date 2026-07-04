import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CartDrawer() {
  const { isCartOpen, closeCart, items, removeItem, updateQty, totalItems, subtotal } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden'
      if (window.__lenis) window.__lenis.stop()
    } else {
      document.body.style.overflow = ''
      if (window.__lenis) window.__lenis.start()
    }
    return () => {
      document.body.style.overflow = ''
      if (window.__lenis) window.__lenis.start()
    }
  }, [isCartOpen])

  const handleCheckout = () => {
    closeCart()
    navigate('/checkout')
  }

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-zinc-950 border-l border-zinc-800 z-[70] flex flex-col shadow-2xl"
            data-lenis-prevent
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-gold" />
                <h2 className="font-serif text-2xl font-light text-off-white">Your Cart</h2>
                <span className="bg-gold/20 text-gold text-xs px-2 py-0.5 rounded-full ml-2">{totalItems}</span>
              </div>
              <button onClick={closeCart} className="text-off-white/50 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                  <ShoppingBag size={48} className="mb-4" />
                  <p className="font-sans text-sm mb-4">Your cart is currently empty.</p>
                  <button onClick={closeCart} className="btn-ghost text-xs">Continue Shopping</button>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.key} className="flex gap-4 bg-zinc-900/40 p-4 rounded-xl border border-zinc-800/50">
                    <div className="w-20 h-24 bg-black rounded-lg border border-white/5 flex items-center justify-center p-2 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-serif text-lg text-off-white leading-tight">{item.name}</h3>
                          <button onClick={() => removeItem(item.key)} className="text-off-white/30 hover:text-red-400 transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                        {item.size && <p className="text-xs text-off-white/50 mb-1">Size: {item.size}</p>}
                        {item.color && <p className="text-xs text-off-white/50 mb-1">Color: {item.color}</p>}
                        {item.modifier && (
                          <p className="text-xs text-gold/80 flex items-center gap-1 mb-1">
                            + {item.modifier.name} (£{item.modifier.price})
                          </p>
                        )}
                        <p className="text-gold font-sans text-sm">£{item.price + (item.modifier?.price || 0)}</p>
                      </div>

                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center border border-white/10 rounded-md">
                          <button onClick={() => updateQty(item.key, item.qty - 1)} className="w-8 h-7 flex items-center justify-center text-off-white/50 hover:bg-white/5 hover:text-white transition-colors">−</button>
                          <span className="w-8 text-center text-xs text-off-white">{item.qty}</span>
                          <button onClick={() => updateQty(item.key, item.qty + 1)} className="w-8 h-7 flex items-center justify-center text-off-white/50 hover:bg-white/5 hover:text-white transition-colors">+</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-white/5 p-6 bg-black">
                <div className="flex justify-between mb-2">
                  <span className="text-off-white/60 text-sm">Subtotal</span>
                  <span className="text-off-white font-sans">£{subtotal}</span>
                </div>
                <div className="flex justify-between mb-6">
                  <span className="text-off-white/60 text-sm">Shipping</span>
                  <span className="text-gold text-sm font-sans tracking-wide">Calculated at checkout</span>
                </div>
                <button onClick={handleCheckout} className="w-full btn-primary flex justify-center items-center gap-2 py-4">
                  Proceed to Checkout <ArrowRight size={16} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
