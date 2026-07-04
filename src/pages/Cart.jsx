import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft, ShieldCheck, Truck, Tag } from 'lucide-react'
import { useCart } from '../context/CartContext'

const PROMO_CODES = {
  'CREX10': { pct: 10, label: '10% off your order' },
  'ELITE20': { pct: 20, label: '20% off for Elite members' },
  'WELCOME': { pct: 5, label: '5% welcome discount' },
}

export default function Cart() {
  const { items, removeItem, updateQty, subtotal } = useCart()
  const [promoCode, setPromoCode] = useState('')
  const [appliedPromo, setAppliedPromo] = useState(null)
  const [promoError, setPromoError] = useState('')
  const navigate = useNavigate()

  const discount = appliedPromo ? Math.round(subtotal * appliedPromo.pct / 100) : 0
  const shipping = subtotal - discount > 300 ? 0 : subtotal === 0 ? 0 : 12
  const total = subtotal - discount + shipping

  const applyPromo = () => {
    const code = promoCode.toUpperCase().trim()
    if (PROMO_CODES[code]) {
      setAppliedPromo({ ...PROMO_CODES[code], code })
      setPromoError('')
    } else {
      setPromoError(`"${promoCode}" is not a valid promo code. Try CREX10`)
      setAppliedPromo(null)
    }
  }

  return (
    <div className="bg-black min-h-screen text-off-white pt-32 pb-24">
      <div className="section-pad max-w-7xl mx-auto">
        {/* Back */}
        <button onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-off-white/40 hover:text-gold transition-colors duration-300 font-sans text-xs tracking-widest uppercase mb-10">
          <ArrowLeft size={14} /> Continue Shopping
        </button>

        {/* Title */}
        <div className="flex items-center gap-4 mb-10 border-b border-white/5 pb-6">
          <ShoppingBag className="text-gold" size={22} />
          <h1 className="font-serif text-4xl font-light text-off-white">
            Your <span className="text-gold italic">Cart</span>
          </h1>
          {items.length > 0 && (
            <span className="font-sans text-xs text-off-white/40 ml-auto tracking-widest uppercase">
              {items.reduce((s, i) => s + i.qty, 0)} item{items.reduce((s, i) => s + i.qty, 0) !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {items.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center py-28">
            <div className="w-20 h-20 border border-white/5 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={28} className="text-white/15" />
            </div>
            <h3 className="font-serif text-3xl text-off-white/40 mb-3">Your cart is empty</h3>
            <p className="font-sans text-sm text-off-white/25 mb-10">Add some world-class cricket equipment to get started.</p>
            <div className="flex items-center justify-center gap-4">
              <Link to="/category/bats" className="btn-primary">Shop Bats</Link>
              <Link to="/category/gear" className="btn-ghost">Shop Gear</Link>
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Items list */}
            <div className="flex-1 min-w-0">
              <AnimatePresence>
                {items.map(item => (
                  <motion.div
                    key={item.key}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.35 }}
                    className="flex gap-5 items-center border-b border-white/5 py-6"
                  >
                    <Link to={`/product/${item.slug}`} className="flex-shrink-0">
                      <div className="w-24 h-24 bg-charcoal/40 border border-white/5 flex items-center justify-center overflow-hidden">
                        <img src={item.image} alt={item.name} className="max-h-[80%] object-contain p-2" />
                      </div>
                    </Link>

                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${item.slug}`}>
                        <h3 className="font-serif text-xl font-light text-off-white hover:text-gold transition-colors duration-300 mb-0.5">{item.name}</h3>
                      </Link>
                      <p className="font-sans text-xs text-off-white/40">{item.subtitle}</p>
                      {item.size && <p className="font-sans text-xs text-gold/60 mt-1">Size: {item.size}</p>}
                      {item.color && <p className="font-sans text-xs text-gold/60 mt-1">Color: {item.color}</p>}
                    </div>

                    <div className="flex items-center border border-white/10 h-10 flex-shrink-0">
                      <button onClick={() => updateQty(item.key, item.qty - 1)} className="w-9 h-full flex items-center justify-center text-off-white/40 hover:text-gold hover:bg-white/5 transition-all">
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center font-sans text-sm">{item.qty}</span>
                      <button onClick={() => updateQty(item.key, item.qty + 1)} className="w-9 h-full flex items-center justify-center text-off-white/40 hover:text-gold hover:bg-white/5 transition-all">
                        <Plus size={12} />
                      </button>
                    </div>

                    <span className="font-serif text-xl text-gold font-light w-20 text-right flex-shrink-0">£{(item.price * item.qty).toLocaleString()}</span>

                    <button onClick={() => removeItem(item.key)} className="text-white/20 hover:text-red-400 transition-colors duration-300 flex-shrink-0" aria-label="Remove">
                      <Trash2 size={15} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <div className="lg:w-96 flex-shrink-0">
              <div className="border border-white/5 bg-charcoal/20 p-8 relative sticky top-28">
                <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-gold/30" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-gold/30" />

                <h2 className="font-serif text-2xl font-light text-off-white mb-8">Order <span className="text-gold italic">Summary</span></h2>

                {/* Line items */}
                <div className="space-y-3 mb-6 pb-6 border-b border-white/5">
                  {items.map(item => (
                    <div key={item.key} className="flex justify-between font-sans text-xs text-off-white/50">
                      <span className="truncate pr-4">
                        {item.name} 
                        {item.size || item.color ? ` (${[item.size, item.color].filter(Boolean).join(', ')})` : ''} × {item.qty}
                      </span>
                      <span className="text-off-white flex-shrink-0">£{(item.price * item.qty).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                {/* Promo Code */}
                <div className="mb-6">
                  {appliedPromo ? (
                    <div className="flex items-center justify-between border border-gold/30 bg-gold/5 px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Tag size={12} className="text-gold" />
                        <span className="font-sans text-xs text-gold">{appliedPromo.code} — {appliedPromo.label}</span>
                      </div>
                      <button onClick={() => setAppliedPromo(null)} className="text-gold/50 hover:text-gold text-xs">✕</button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Promo code (CREX10)"
                        value={promoCode}
                        onChange={e => setPromoCode(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && applyPromo()}
                        className="flex-1 bg-black border border-white/10 text-off-white text-xs font-sans px-4 py-3 focus:outline-none focus:border-gold/50 placeholder-white/20"
                      />
                      <button onClick={applyPromo} className="px-4 border border-white/10 font-sans text-[10px] tracking-widest uppercase text-off-white/50 hover:border-gold/40 hover:text-gold transition-all duration-300">
                        Apply
                      </button>
                    </div>
                  )}
                  {promoError && <p className="text-red-400 text-[10px] mt-2 font-sans">{promoError}</p>}
                </div>

                {/* Totals */}
                <div className="space-y-3 mb-8 font-sans text-sm">
                  <div className="flex justify-between text-off-white/50">
                    <span>Subtotal</span><span className="text-off-white">£{subtotal.toLocaleString()}</span>
                  </div>
                  {appliedPromo && (
                    <div className="flex justify-between text-green-400">
                      <span>Discount ({appliedPromo.pct}%)</span><span>−£{discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-off-white/50">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? 'text-green-400' : 'text-off-white'}>
                      {shipping === 0 ? 'FREE' : `£${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-3">
                    <span className="text-off-white font-medium">Total</span>
                    <span className="font-serif text-2xl text-gold">£{total.toLocaleString()}</span>
                  </div>
                </div>

                <motion.button
                  onClick={() => navigate('/checkout')}
                  className="w-full btn-primary justify-center gold-glow py-4"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Checkout <ArrowRight size={14} />
                </motion.button>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  {[{ icon: ShieldCheck, label: 'Secure Payment' }, { icon: Truck, label: 'Free on £300+' }].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2 text-off-white/25">
                      <Icon size={13} className="text-gold/40 flex-shrink-0" />
                      <span className="font-sans text-[9px] uppercase tracking-widest">{label}</span>
                    </div>
                  ))}
                </div>

                {subtotal - discount < 300 && subtotal > 0 && (
                  <div className="mt-4 bg-gold/5 border border-gold/20 px-4 py-3">
                    <p className="font-sans text-[10px] text-gold/70 text-center">
                      Add £{(300 - (subtotal - discount)).toLocaleString()} more for free shipping
                    </p>
                    <div className="w-full bg-white/5 h-1 mt-2 rounded-full overflow-hidden">
                      <div className="h-full bg-gold transition-all duration-500" style={{ width: `${Math.min(100, ((subtotal - discount) / 300) * 100)}%` }} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
