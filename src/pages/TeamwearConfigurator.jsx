import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Shield, Palette, Layers, Shirt, UserPlus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'

const COLORS = [
  { name: 'Classic White', value: '#ffffff', border: '#e5e7eb' },
  { name: 'Midnight Navy', value: '#1e1b4b', border: '#312e81' },
  { name: 'Royal Blue', value: '#1d4ed8', border: '#2563eb' },
  { name: 'Crimson Red', value: '#991b1b', border: '#dc2626' },
  { name: 'Forest Green', value: '#166534', border: '#15803d' },
  { name: 'Onyx Black', value: '#171717', border: '#404040' },
  { name: 'Gold', value: '#ca8a04', border: '#eab308' },
]

export default function TeamwearConfigurator() {
  const [baseColor, setBaseColor] = useState(COLORS[0])
  const [trimColor, setTrimColor] = useState(COLORS[1])
  const [teamName, setTeamName] = useState('')
  const [hasLogo, setHasLogo] = useState(false)
  const [quantity, setQuantity] = useState(11)
  const [added, setAdded] = useState(false)
  
  const { addItem } = useCart()

  const handleAddToCart = () => {
    const product = {
      id: `teamwear-custom-${Date.now()}`,
      name: `Custom Team Kit - ${teamName || 'Your Team'}`,
      price: 45, // Base price per kit
      image: '/practice_jersey.png', // Fallback to practice jersey image
      desc: `Customized teamwear. Base: ${baseColor.name}, Trim: ${trimColor.name}, Logo: ${hasLogo ? 'Yes' : 'No'}`,
      category: 'apparel'
    }
    
    // Add multiple quantities
    addItem(product, quantity, 'Assorted (Contacted Post-Purchase)')
    
    setAdded(true)
    setTimeout(() => setAdded(false), 3000)
  }

  const totalPrice = 45 * quantity + (hasLogo ? 50 : 0) // $50 flat fee for logo setup

  return (
    <div className="min-h-screen bg-black text-off-white pt-24 pb-12">
      <div className="section-pad max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-sans text-xs tracking-widest uppercase text-gold mb-4">
            Bespoke Solutions
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-serif text-4xl md:text-5xl font-light text-off-white">
            Teamwear Configurator
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-4 text-off-white/50 max-w-2xl mx-auto">
            Outfit your club in CREX ELITE standard apparel. Select your colors, add your crest, and dominate the pitch in style.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Left Column: Preview */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-32">
              <div className="bg-zinc-900/40 rounded-3xl border border-white/5 p-8 flex flex-col items-center justify-center min-h-[500px] overflow-hidden relative">
                
                {/* Photo-Realistic Masked Image Mockup */}
                <div className="relative w-full max-w-[280px] aspect-[3/4] flex items-center justify-center">
                  
                  {/* Container that crops everything to the shape of the jersey */}
                  <div 
                    className="absolute inset-0 z-10"
                    style={{
                      WebkitMaskImage: `url(/practice_jersey.png)`,
                      WebkitMaskSize: 'contain',
                      WebkitMaskRepeat: 'no-repeat',
                      WebkitMaskPosition: 'center',
                      maskImage: `url(/practice_jersey.png)`,
                      maskSize: 'contain',
                      maskRepeat: 'no-repeat',
                      maskPosition: 'center',
                    }}
                  >
                    {/* The Real Image Base for Shadows and Highlights */}
                    <img 
                      src="/practice_jersey.png" 
                      alt="Base Jersey"
                      className="absolute inset-0 w-full h-full object-contain brightness-125 contrast-125 grayscale"
                    />

                    {/* Base Color Layer */}
                    <div 
                      className="absolute inset-0 transition-colors duration-500 mix-blend-multiply opacity-90"
                      style={{ backgroundColor: baseColor.value }}
                    />

                    {/* Trim Elements (Sleeves, Collars) */}
                    {/* Left Sleeve Trim */}
                    <div 
                      className="absolute top-0 left-0 w-[40%] h-[40%] rounded-full blur-xl transition-colors duration-500 mix-blend-multiply opacity-90 -translate-x-1/4 -translate-y-1/4"
                      style={{ backgroundColor: trimColor.value }}
                    />
                    
                    {/* Right Sleeve Trim */}
                    <div 
                      className="absolute top-0 right-0 w-[40%] h-[40%] rounded-full blur-xl transition-colors duration-500 mix-blend-multiply opacity-90 translate-x-1/4 -translate-y-1/4"
                      style={{ backgroundColor: trimColor.value }}
                    />

                    {/* Collar / Shoulder Trim */}
                    <div 
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] h-[20%] rounded-b-full blur-lg transition-colors duration-500 mix-blend-multiply opacity-90 -translate-y-1/2"
                      style={{ backgroundColor: trimColor.value }}
                    />
                  </div>

                  {/* Team Name Overlay */}
                  {teamName && (
                    <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[60%] text-center pointer-events-none z-20">
                      <span 
                        className="font-sans text-2xl font-black uppercase tracking-widest block transform -skew-x-12 opacity-90" 
                        style={{ color: trimColor.value, textShadow: '2px 2px 0px rgba(255,255,255,0.2), -1px -1px 0px rgba(0,0,0,0.5)' }}
                      >
                        {teamName}
                      </span>
                    </div>
                  )}

                  {/* Logo Overlay */}
                  {hasLogo && (
                    <div className="absolute top-[28%] right-[32%] w-10 h-10 rounded-full border-2 border-white/60 flex items-center justify-center bg-black/40 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.5)] pointer-events-none z-20">
                      <Shield size={16} className="text-white" />
                    </div>
                  )}
                </div>

                <div className="absolute bottom-6 flex gap-4 text-off-white/40 font-sans text-xs uppercase tracking-widest">
                  <span className="flex items-center gap-2"><Check size={14} className="text-gold" /> Pro-grade fabrics</span>
                  <span className="flex items-center gap-2"><Check size={14} className="text-gold" /> Moisture wicking</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Controls */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Step 1: Colors */}
            <div className="glass-panel p-8 rounded-2xl border border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <Palette className="text-gold" size={24} />
                <h3 className="font-serif text-2xl">1. Club Colors</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block font-sans text-sm tracking-wide text-off-white/60 mb-3">Base Color</label>
                  <div className="flex flex-wrap gap-3">
                    {COLORS.map(c => (
                      <button 
                        key={c.name}
                        onClick={() => setBaseColor(c)}
                        className={`w-12 h-12 rounded-full border-2 transition-transform ${baseColor.name === c.name ? 'scale-110 border-gold' : 'border-transparent hover:scale-105'}`}
                        style={{ backgroundColor: c.value, boxShadow: `inset 0 0 0 1px ${c.border}` }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-sans text-sm tracking-wide text-off-white/60 mb-3">Trim Color</label>
                  <div className="flex flex-wrap gap-3">
                    {COLORS.map(c => (
                      <button 
                        key={c.name}
                        onClick={() => setTrimColor(c)}
                        className={`w-10 h-10 rounded-full border-2 transition-transform ${trimColor.name === c.name ? 'scale-110 border-gold' : 'border-transparent hover:scale-105'}`}
                        style={{ backgroundColor: c.value, boxShadow: `inset 0 0 0 1px ${c.border}` }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Branding */}
            <div className="glass-panel p-8 rounded-2xl border border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="text-gold" size={24} />
                <h3 className="font-serif text-2xl">2. Branding</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block font-sans text-sm tracking-wide text-off-white/60 mb-3">Team Name (Front Print)</label>
                  <input 
                    type="text" 
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Enter team name"
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-off-white font-sans focus:border-gold focus:outline-none transition-colors"
                  />
                </div>

                <label className="flex items-start gap-4 p-4 border border-white/10 rounded-xl cursor-pointer hover:bg-white/5 transition-colors">
                  <div className={`mt-1 w-5 h-5 rounded border flex items-center justify-center transition-colors ${hasLogo ? 'bg-gold border-gold text-black' : 'border-zinc-600 text-transparent'}`}>
                    <Check size={14} />
                  </div>
                  <input type="checkbox" className="hidden" checked={hasLogo} onChange={() => setHasLogo(!hasLogo)} />
                  <div>
                    <span className="block font-sans text-white mb-1">Add Club Crest / Logo</span>
                    <span className="block font-sans text-sm text-off-white/50">High-definition silicon badge heat-pressed on the left chest. (+£50 one-time setup fee)</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Step 3: Squad Size & Checkout */}
            <div className="glass-panel p-8 rounded-2xl border border-gold/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-[50px] pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-6">
                <UserPlus className="text-gold" size={24} />
                <h3 className="font-serif text-2xl">3. Squad Order</h3>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center justify-between mb-8">
                <div>
                  <label className="block font-sans text-sm tracking-wide text-off-white/60 mb-3">Total Kits Needed</label>
                  <div className="flex items-center border border-white/20 rounded-lg overflow-hidden w-32">
                    <button onClick={() => setQuantity(Math.max(11, quantity - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-white/10 transition-colors">−</button>
                    <input 
                      type="number" 
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(11, parseInt(e.target.value) || 11))}
                      className="w-12 h-10 text-center bg-transparent border-none focus:outline-none font-sans"
                      min="11"
                    />
                    <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-white/10 transition-colors">+</button>
                  </div>
                  <p className="text-xs text-gold mt-2 font-sans">Minimum order: 11 kits</p>
                </div>

                <div className="text-right">
                  <p className="font-sans text-sm text-off-white/60 mb-1">Estimated Total</p>
                  <p className="font-serif text-4xl text-off-white">£{totalPrice}</p>
                  <p className="font-sans text-xs text-off-white/40 mt-1">Sizes will be collected via email post-purchase</p>
                </div>
              </div>

              <motion.button 
                onClick={handleAddToCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-primary py-4 justify-center text-sm tracking-widest"
              >
                <AnimatePresence mode="wait">
                  {added ? (
                    <motion.span key="added" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <Check size={18} /> Order Added to Cart
                    </motion.span>
                  ) : (
                    <motion.span key="add" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <Shirt size={18} /> Finalize Team Kit
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
