import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronRight, CreditCard, Truck, ShieldCheck, Lock } from 'lucide-react'
import { useCart } from '../context/CartContext'

const STEPS = ['Shipping', 'Payment', 'Confirm']

function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-16">
      {STEPS.map((step, i) => (
        <div key={step} className="flex items-center">
          <div className={`flex items-center gap-2 ${i <= current ? 'text-gold' : 'text-off-white/20'}`}>
            <div className={`w-7 h-7 border flex items-center justify-center font-sans text-xs transition-all duration-500 ${
              i < current ? 'border-gold bg-gold text-black' : i === current ? 'border-gold text-gold' : 'border-white/10 text-off-white/20'
            }`}>
              {i < current ? <Check size={12} /> : i + 1}
            </div>
            <span className="font-sans text-xs tracking-widest uppercase hidden sm:block">{step}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`w-16 sm:w-24 h-px mx-4 transition-all duration-500 ${i < current ? 'bg-gold' : 'bg-white/10'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

function ShippingForm({ onNext, data, setData }) {
  const handleChange = e => setData(d => ({ ...d, [e.target.name]: e.target.value }))

  const fields = [
    { name: 'firstName', label: 'First Name', type: 'text', half: true },
    { name: 'lastName', label: 'Last Name', type: 'text', half: true },
    { name: 'email', label: 'Email Address', type: 'email', half: false },
    { name: 'phone', label: 'Phone Number', type: 'tel', half: false },
    { name: 'address', label: 'Street Address', type: 'text', half: false },
    { name: 'city', label: 'City', type: 'text', half: true },
    { name: 'postcode', label: 'Postcode / ZIP', type: 'text', half: true },
    { name: 'country', label: 'Country', type: 'text', half: false },
  ]

  return (
    <motion.form initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
      onSubmit={e => { e.preventDefault(); onNext() }} className="space-y-0">
      <h2 className="font-serif text-3xl font-light text-off-white mb-8">
        Shipping <span className="text-gold italic">Details</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
        {fields.map(f => (
          <div key={f.name} className={f.half ? '' : 'sm:col-span-2'}>
            <label className="block font-sans text-[10px] tracking-widest uppercase text-off-white/40 mb-2">{f.label}</label>
            <input
              type={f.type}
              name={f.name}
              required
              value={data[f.name] || ''}
              onChange={handleChange}
              className="w-full bg-black border border-white/10 text-off-white text-sm font-sans px-4 py-3.5 focus:outline-none focus:border-gold/50 placeholder-white/15 transition-colors duration-300"
            />
          </div>
        ))}
      </div>

      {/* Shipping method */}
      <div className="mb-8">
        <label className="block font-sans text-[10px] tracking-widest uppercase text-off-white/40 mb-3">Shipping Method</label>
        <div className="space-y-3">
          {[
            { id: 'standard', label: 'Standard (3–5 days)', price: 'Free on orders over £150' },
            { id: 'express', label: 'Express (Next day)', price: '£12.99' },
          ].map(opt => (
            <label key={opt.id} className={`flex items-center justify-between p-4 border cursor-pointer transition-all duration-300 ${
              data.shipping === opt.id ? 'border-gold bg-gold/5' : 'border-white/10 hover:border-gold/30'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 border flex items-center justify-center ${data.shipping === opt.id ? 'border-gold' : 'border-white/20'}`}>
                  {data.shipping === opt.id && <div className="w-2 h-2 bg-gold" />}
                </div>
                <span className="font-sans text-sm text-off-white">{opt.label}</span>
              </div>
              <span className="font-sans text-xs text-gold">{opt.price}</span>
              <input type="radio" name="shipping" value={opt.id} className="sr-only" onChange={() => setData(d => ({ ...d, shipping: opt.id }))} />
            </label>
          ))}
        </div>
      </div>

      <button type="submit" className="btn-primary gold-glow w-full justify-center py-4">
        Continue to Payment <ChevronRight size={14} />
      </button>
    </motion.form>
  )
}

function PaymentForm({ onNext, onBack }) {
  const [cardNum, setCardNum] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('credit_card')

  const formatCard = v => v.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19)

  return (
    <motion.form initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
      onSubmit={e => { e.preventDefault(); onNext() }} className="space-y-6">
      <h2 className="font-serif text-3xl font-light text-off-white mb-8">
        Payment <span className="text-gold italic">Details</span>
      </h2>

      <div className="border border-gold/20 bg-gold/5 flex items-center gap-3 px-4 py-3 mb-6">
        <Lock size={14} className="text-gold flex-shrink-0" />
        <span className="font-sans text-xs text-gold/80">Your payment is secured with 256-bit SSL encryption</span>
      </div>

      {/* Payment Method Selector */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <label className={`flex-1 flex items-center gap-3 p-4 border cursor-pointer transition-colors duration-300 ${paymentMethod === 'credit_card' ? 'border-gold bg-gold/5' : 'border-white/10 hover:border-gold/30'}`}>
          <div className={`w-4 h-4 border flex items-center justify-center ${paymentMethod === 'credit_card' ? 'border-gold' : 'border-white/20'}`}>
            {paymentMethod === 'credit_card' && <div className="w-2 h-2 bg-gold" />}
          </div>
          <span className="font-sans text-sm text-off-white">Credit Card</span>
          <input type="radio" className="sr-only" checked={paymentMethod === 'credit_card'} onChange={() => setPaymentMethod('credit_card')} />
        </label>
        
        <label className={`flex-1 flex items-center gap-3 p-4 border cursor-pointer transition-colors duration-300 ${paymentMethod === 'upi' ? 'border-gold bg-gold/5' : 'border-white/10 hover:border-gold/30'}`}>
          <div className={`w-4 h-4 border flex items-center justify-center ${paymentMethod === 'upi' ? 'border-gold' : 'border-white/20'}`}>
            {paymentMethod === 'upi' && <div className="w-2 h-2 bg-gold" />}
          </div>
          <span className="font-sans text-sm text-off-white">UPI / Scanner</span>
          <input type="radio" className="sr-only" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} />
        </label>
      </div>

      {paymentMethod === 'credit_card' ? (
        <div className="space-y-6">
          <div>
            <label className="block font-sans text-[10px] tracking-widest uppercase text-off-white/40 mb-2">Card Number</label>
            <div className="relative">
              <input type="text" value={cardNum} onChange={e => setCardNum(formatCard(e.target.value))} required
                placeholder="4242 4242 4242 4242" maxLength={19}
                className="w-full bg-black border border-white/10 text-off-white text-sm font-sans px-4 py-3.5 pr-12 focus:outline-none focus:border-gold/50 placeholder-white/15 transition-colors duration-300" />
              <CreditCard size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-off-white/20" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block font-sans text-[10px] tracking-widest uppercase text-off-white/40 mb-2">Expiry Date</label>
              <input type="text" required placeholder="MM / YY"
                className="w-full bg-black border border-white/10 text-off-white text-sm font-sans px-4 py-3.5 focus:outline-none focus:border-gold/50 placeholder-white/15 transition-colors duration-300" />
            </div>
            <div>
              <label className="block font-sans text-[10px] tracking-widest uppercase text-off-white/40 mb-2">CVV / CVC</label>
              <input type="text" required placeholder="•••" maxLength={4}
                className="w-full bg-black border border-white/10 text-off-white text-sm font-sans px-4 py-3.5 focus:outline-none focus:border-gold/50 placeholder-white/15 transition-colors duration-300" />
            </div>
          </div>

          <div>
            <label className="block font-sans text-[10px] tracking-widest uppercase text-off-white/40 mb-2">Name on Card</label>
            <input type="text" required placeholder="Full Name"
              className="w-full bg-black border border-white/10 text-off-white text-sm font-sans px-4 py-3.5 focus:outline-none focus:border-gold/50 placeholder-white/15 transition-colors duration-300" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 border border-white/5 bg-zinc-900/30 space-y-6 text-center rounded-xl">
          <div className="w-40 h-40 bg-white p-2 rounded-xl flex items-center justify-center relative overflow-hidden">
             {/* Mock QR Code */}
             <div className="w-full h-full bg-black/90 flex flex-wrap gap-1 p-1">
               {Array.from({ length: 144 }).map((_, i) => (
                 <div key={i} className={`w-[8%] h-[8%] ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`} />
               ))}
               <div className="absolute top-2 left-2 w-8 h-8 border-4 border-black bg-white flex items-center justify-center">
                 <div className="w-3 h-3 bg-black" />
               </div>
               <div className="absolute top-2 right-2 w-8 h-8 border-4 border-black bg-white flex items-center justify-center">
                 <div className="w-3 h-3 bg-black" />
               </div>
               <div className="absolute bottom-2 left-2 w-8 h-8 border-4 border-black bg-white flex items-center justify-center">
                 <div className="w-3 h-3 bg-black" />
               </div>
             </div>
             
             {/* Scanner line animation */}
             <motion.div 
               animate={{ y: [-75, 75] }} 
               transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
               className="absolute left-0 right-0 h-0.5 bg-green-500 shadow-[0_0_12px_rgba(34,197,94,1)] z-10" 
             />
          </div>
          <div>
            <p className="font-serif text-lg text-off-white mb-2">Scan to Pay</p>
            <p className="font-sans text-xs text-off-white/50 max-w-[250px] mx-auto leading-relaxed">
              Open any UPI app (GPay, PhonePe, Paytm) and scan this QR code to complete your secure payment.
            </p>
          </div>
        </div>
      )}

      <div className="flex gap-4 mt-8">
        <button type="button" onClick={onBack} className="btn-ghost py-4 px-6 text-xs">← Back</button>
        <button type="submit" className="btn-primary gold-glow flex-1 justify-center py-4 text-xs">
          <Lock size={12} /> Place Order Securely
        </button>
      </div>
    </motion.form>
  )
}

function ConfirmScreen({ items, subtotal, shippingData }) {
  const { clearCart } = useCart()
  const orderNumRef = useRef(null)
  if (!orderNumRef.current) {
    orderNumRef.current = `CX${Math.floor(100000 + Math.random() * 900000)}`
  }
  const orderNum = orderNumRef.current

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('crex_orders') || '[]')
    const exists = savedOrders.some(o => o.orderId === orderNum)
    if (!exists && items && items.length > 0) {
      const newOrder = {
        orderId: orderNum,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        items: items.map(i => ({
          id: i.id,
          name: i.name,
          price: i.price,
          qty: i.qty,
          image: i.image,
          size: i.size || '',
          color: i.color || ''
        })),
        subtotal: subtotal,
        shipping: shippingData,
        status: 'Cleft Allocation',
        timestamp: Date.now()
      }
      localStorage.setItem('crex_orders', JSON.stringify([newOrder, ...savedOrders]))
    }
    clearCart()
  }, [])

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
      className="text-center py-12">
      <div className="w-20 h-20 border border-gold flex items-center justify-center mx-auto mb-8">
        <Check size={28} className="text-gold" />
      </div>
      <p className="label-text mb-3">Order Confirmed</p>
      <h2 className="font-serif text-4xl font-light text-off-white mb-4">
        Thank <span className="text-gold italic">You!</span>
      </h2>
      <p className="font-sans text-sm text-off-white/50 mb-2">Your order has been placed successfully.</p>
      <p className="font-sans text-sm text-gold mb-10">
        Order <Link to={`/locker?track=${orderNum}`} className="underline hover:text-gold/80 transition-colors">#{orderNum}</Link>
      </p>
      <p className="font-sans text-sm text-off-white/40 max-w-sm mx-auto mb-10 leading-relaxed">
        A confirmation email has been sent to your email address. Click your order number above to track its live workshop progress.
      </p>
      <div className="flex items-center justify-center gap-4 flex-wrap">
        <Link to="/" className="btn-ghost text-xs">Return Home</Link>
        <Link to="/category/bats" className="btn-primary text-xs">Continue Shopping</Link>
      </div>
    </motion.div>
  )
}

export default function Checkout() {
  const { items, subtotal } = useCart()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [shippingData, setShippingData] = useState({ shipping: 'standard' })

  if (items.length === 0 && step < 2) {
    return (
      <div className="bg-black min-h-screen text-off-white flex flex-col items-center justify-center pt-32 gap-6">
        <h2 className="font-serif text-3xl text-off-white">Your cart is empty</h2>
        <Link to="/category/bats" className="btn-primary">Shop Now</Link>
      </div>
    )
  }

  return (
    <div className="bg-black min-h-screen text-off-white pt-32 pb-24">
      <div className="section-pad max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="label-text mb-3">Secure Checkout</p>
          <h1 className="font-serif text-4xl font-light text-off-white">
            Complete Your <span className="text-gold italic">Order</span>
          </h1>
        </div>

        <StepIndicator current={step} />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form area */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {step === 0 && <ShippingForm key="shipping" onNext={() => setStep(1)} data={shippingData} setData={setShippingData} />}
              {step === 1 && <PaymentForm key="payment" onNext={() => setStep(2)} onBack={() => setStep(0)} />}
              {step === 2 && <ConfirmScreen key="confirm" items={items} subtotal={subtotal} shippingData={shippingData} />}
            </AnimatePresence>
          </div>

          {/* Order Summary sidebar */}
          {step < 2 && (
            <div className="lg:col-span-2">
              <div className="border border-white/5 bg-charcoal/20 p-6 sticky top-28">
                <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-gold/30" />
                <h3 className="font-serif text-xl font-light text-off-white mb-6">Order Summary</h3>
                <div className="space-y-4 mb-6 pb-6 border-b border-white/5">
                  {items.map(item => (
                    <div key={item.key} className="flex gap-3 items-center">
                      <div className="w-12 h-12 bg-black border border-white/5 flex items-center justify-center flex-shrink-0">
                        <img src={item.image} alt={item.name} className="max-h-[80%] object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-sans text-xs text-off-white/70 truncate">{item.name}</p>
                        {item.size && <p className="font-sans text-[10px] text-off-white/30">Size: {item.size}</p>}
                        {item.color && <p className="font-sans text-[10px] text-off-white/30">Color: {item.color}</p>}
                        <p className="font-sans text-[10px] text-off-white/30">Qty: {item.qty}</p>
                      </div>
                      <span className="font-serif text-sm text-gold flex-shrink-0">£{(item.price * item.qty)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between font-sans text-sm mb-2">
                  <span className="text-off-white/50">Subtotal</span>
                  <span className="text-off-white">£{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t border-white/5 pt-3 mt-3">
                  <span className="font-sans text-sm text-off-white">Total</span>
                  <span className="font-serif text-xl text-gold">£{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 mt-5 border-t border-white/5 pt-4">
                  <ShieldCheck size={13} className="text-gold/50" />
                  <span className="font-sans text-[10px] text-off-white/30 uppercase tracking-widest">SSL Secure Checkout</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
