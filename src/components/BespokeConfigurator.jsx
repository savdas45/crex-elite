import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Sparkles, Clipboard, Check, X } from 'lucide-react'

export default function BespokeConfigurator() {
  const [willow, setWillow] = useState('pro-reserve')
  const [sweetSpot, setSweetSpot] = useState('mid')
  const [weight, setWeight] = useState('medium')
  const [handle, setHandle] = useState('oval')
  
  // Inquiry Modal State
  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)

  // Configurations mapping
  const willowConfig = {
    'pro-reserve': { name: 'Pro Reserve English Willow', desc: 'Grade 1+ pristine willow, 8-12 straight grains, zero blemishes.', priceOffset: 150, grains: 10 },
    'grade-1': { name: 'Grade 1 English Willow', desc: 'Elite professional willow, 6-8 straight grains, exceptional responsiveness.', priceOffset: 50, grains: 7 },
    'grade-2': { name: 'Grade 2 English Willow', desc: 'High club performance willow, 5-7 grains, slight cosmetic variations.', priceOffset: 0, grains: 5 }
  }

  const sweetSpotConfig = {
    'low': { name: 'Low Sweet Spot', desc: 'Swell positioned lower down the blade. Maximises power for front-foot drives on low-bouncing wickets.', yPos: 310 },
    'mid': { name: 'Mid Sweet Spot', desc: 'The classic balanced swell. Highly versatile for all types of strokes and pitch bounce.', yPos: 250 },
    'high': { name: 'High Sweet Spot', desc: 'Swell positioned near the shoulders. Lightest feather-like pickup, perfect for cuts, pulls, and back-foot play.', yPos: 190 }
  }

  const weightConfig = {
    'light': { name: 'Light (2lb 7oz - 2lb 8oz)', desc: 'Ultra-fast blade speeds. Perfect for touch play and late placement.' },
    'medium': { name: 'Medium (2lb 9oz - 2lb 10oz)', desc: 'Optimised power-to-pickup ratio. The professional standard.' },
    'heavy': { name: 'Heavy (2lb 11oz - 2lb 12oz)', desc: 'Maximum mass behind the ball. Built for clear-the-rope boundary hitters.' }
  }

  const handleConfig = {
    'oval': { name: 'Oval Handle', desc: 'Provides directional alignment, prompting a dominant top hand and superior control.' },
    'round': { name: 'Round Handle', desc: 'Encourages wristy flicking play and bottom hand power leverage.' }
  }

  // Real-time calculated values
  const basePrice = 350
  const totalPrice = basePrice + willowConfig[willow].priceOffset

  // Performance calculations
  const calculatePower = () => {
    let score = 80
    if (weight === 'heavy') score += 12
    if (weight === 'medium') score += 6
    if (sweetSpot === 'low') score += 4
    if (willow === 'pro-reserve') score += 4
    return score
  }

  const calculatePickup = () => {
    let score = 75
    if (weight === 'light') score += 18
    if (weight === 'medium') score += 10
    if (sweetSpot === 'high') score += 7
    return score
  }

  const calculateControl = () => {
    let score = 78
    if (handle === 'oval') score += 12
    if (willow === 'pro-reserve') score += 5
    if (weight === 'medium') score += 3
    return score
  }

  const power = calculatePower()
  const pickup = calculatePickup()
  const control = calculateControl()

  const handleCopySpecs = () => {
    const specSheet = `CREX ELITE Bespoke Bat Build Spec:
- Willow: ${willowConfig[willow].name}
- Sweet Spot: ${sweetSpotConfig[sweetSpot].name}
- Weight: ${weightConfig[weight].name}
- Handle: ${handleConfig[handle].name}
- Calculated Price: £${totalPrice}`

    navigator.clipboard.writeText(specSheet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleInquirySubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setName('')
      setEmail('')
      setPhone('')
      setNotes('')
      setSubmitted(false)
      setShowModal(false)
    }, 3000)
  }

  return (
    <section className="relative py-28 bg-[#0a0a0a] border-t border-white/5 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none opacity-[0.03] blur-[100px] rounded-full bg-gold" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] pointer-events-none opacity-[0.02] blur-[120px] rounded-full bg-gold-light" />

      <div className="max-w-7xl mx-auto section-pad relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 max-w-2xl mx-auto">
          <p className="label-text mb-3">Custom Workshop</p>
          <h2 className="heading-lg text-off-white">
            The Bespoke <span className="text-gold italic">Builder</span>
          </h2>
          <div className="w-16 h-[1px] bg-gold/40 my-4" />
          <p className="body-text text-center text-xs md:text-sm text-off-white/60">
            No two batsmen play alike. Configure your bespoke willow to match your exact grip, sweet spot, and weight preferences. Hand-carved and balanced by our master shaper.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Column 1: Configurator Options (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            
            {/* Step 1: Willow Selection */}
            <div className="border border-white/5 bg-neutral-950/40 p-6 md:p-8 rounded-none">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-serif text-gold text-lg border-r border-white/10 pr-3 font-medium">01</span>
                <h3 className="font-serif text-xl text-off-white tracking-wide">Willow Quality</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {Object.entries(willowConfig).map(([key, data]) => (
                  <button
                    key={key}
                    onClick={() => setWillow(key)}
                    className={`flex flex-col text-left p-4 border transition-all duration-300 relative group cursor-pointer ${
                      willow === key 
                        ? 'border-gold/40 bg-neutral-900/80' 
                        : 'border-white/5 bg-black/40 hover:border-white/20'
                    }`}
                  >
                    <span className={`font-sans text-[10px] tracking-wider uppercase mb-1 font-medium ${
                      willow === key ? 'text-gold' : 'text-off-white/60'
                    }`}>
                      {key === 'pro-reserve' ? 'Pro Reserve' : key === 'grade-1' ? 'Grade 1' : 'Grade 2'}
                    </span>
                    <span className="font-serif text-md text-off-white mb-2">{data.name.split(' ')[0]}</span>
                    <span className="font-sans text-[10px] leading-relaxed text-off-white/40 mb-4">{data.desc}</span>
                    <span className="font-sans text-xs text-gold mt-auto font-light">
                      {data.priceOffset > 0 ? `+£${data.priceOffset}` : 'Base Price'}
                    </span>
                    {willow === key && (
                      <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-gold" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Sweet Spot Position */}
            <div className="border border-white/5 bg-neutral-950/40 p-6 md:p-8 rounded-none">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-serif text-gold text-lg border-r border-white/10 pr-3 font-medium">02</span>
                <h3 className="font-serif text-xl text-off-white tracking-wide">Sweet Spot Position</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {Object.entries(sweetSpotConfig).map(([key, data]) => (
                  <button
                    key={key}
                    onClick={() => setSweetSpot(key)}
                    className={`flex flex-col text-left p-4 border transition-all duration-300 relative group cursor-pointer ${
                      sweetSpot === key 
                        ? 'border-gold/40 bg-neutral-900/80' 
                        : 'border-white/5 bg-black/40 hover:border-white/20'
                    }`}
                  >
                    <span className={`font-sans text-[10px] tracking-wider uppercase mb-1 font-medium ${
                      sweetSpot === key ? 'text-gold' : 'text-off-white/60'
                    }`}>
                      {key.toUpperCase()}
                    </span>
                    <span className="font-serif text-md text-off-white mb-2">{data.name}</span>
                    <span className="font-sans text-[10px] leading-relaxed text-off-white/40">{data.desc}</span>
                    {sweetSpot === key && (
                      <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-gold" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Weight Profile */}
            <div className="border border-white/5 bg-neutral-950/40 p-6 md:p-8 rounded-none">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-serif text-gold text-lg border-r border-white/10 pr-3 font-medium">03</span>
                <h3 className="font-serif text-xl text-off-white tracking-wide">Weight Profile</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {Object.entries(weightConfig).map(([key, data]) => (
                  <button
                    key={key}
                    onClick={() => setWeight(key)}
                    className={`flex flex-col text-left p-4 border transition-all duration-300 relative group cursor-pointer ${
                      weight === key 
                        ? 'border-gold/40 bg-neutral-900/80' 
                        : 'border-white/5 bg-black/40 hover:border-white/20'
                    }`}
                  >
                    <span className={`font-sans text-[10px] tracking-wider uppercase mb-1 font-medium ${
                      weight === key ? 'text-gold' : 'text-off-white/60'
                    }`}>
                      {key.toUpperCase()}
                    </span>
                    <span className="font-serif text-md text-off-white mb-2">{data.name.split(' ')[0]}</span>
                    <span className="font-sans text-[10px] leading-relaxed text-off-white/40">{data.desc}</span>
                    {weight === key && (
                      <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-gold" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Handle Type */}
            <div className="border border-white/5 bg-neutral-950/40 p-6 md:p-8 rounded-none">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-serif text-gold text-lg border-r border-white/10 pr-3 font-medium">04</span>
                <h3 className="font-serif text-xl text-off-white tracking-wide">Handle Shape</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(handleConfig).map(([key, data]) => (
                  <button
                    key={key}
                    onClick={() => setHandle(key)}
                    className={`flex flex-col text-left p-4 border transition-all duration-300 relative group cursor-pointer ${
                      handle === key 
                        ? 'border-gold/40 bg-neutral-900/80' 
                        : 'border-white/5 bg-black/40 hover:border-white/20'
                    }`}
                  >
                    <span className={`font-sans text-[10px] tracking-wider uppercase mb-1 font-medium ${
                      handle === key ? 'text-gold' : 'text-off-white/60'
                    }`}>
                      {key.toUpperCase()} PROFILE
                    </span>
                    <span className="font-serif text-md text-off-white mb-2">{data.name}</span>
                    <span className="font-sans text-[10px] leading-relaxed text-off-white/40">{data.desc}</span>
                    {handle === key && (
                      <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-gold" />
                    )}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Column 2: Bat SVG Visualisation & Spec Summary (5 Cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col gap-8">
            
            {/* Visualizer card */}
            <div className="border border-white/5 bg-neutral-950/60 p-8 flex flex-col items-center relative overflow-hidden">
              
              {/* Radial glow corresponding to sweet spot position */}
              <div 
                className="absolute w-44 h-44 rounded-full pointer-events-none opacity-20 blur-2xl bg-gold-light transition-all duration-500" 
                style={{ 
                  top: `${sweetSpot === 'low' ? 310 - 88 : sweetSpot === 'mid' ? 250 - 88 : 190 - 88}px`, 
                  left: 'calc(50% - 88px)'
                }}
              />

              {/* Dynamic SVG Bat Drawing */}
              <svg width="220" height="420" viewBox="0 0 220 420" fill="none" className="relative z-10 select-none">
                <defs>
                  {/* Sweet spot glow radial gradient */}
                  <radialGradient id="sweetGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#E4C76B" stopOpacity="0.8" />
                    <stop offset="30%" stopColor="#C9A84C" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Grid guidelines to look techy */}
                <line x1="110" y1="10" x2="110" y2="410" stroke="rgba(255,255,255,0.03)" strokeDasharray="3,3" />
                <line x1="10" y1="250" x2="210" y2="250" stroke="rgba(255,255,255,0.03)" strokeDasharray="3,3" />

                {/* Handle (Rubber ring sections) */}
                <rect x="104" y="20" width="12" height="110" fill="#111111" rx="2" />
                <line x1="104" y1="35" x2="116" y2="35" stroke="rgba(255,255,255,0.2)" />
                <line x1="104" y1="50" x2="116" y2="50" stroke="rgba(255,255,255,0.2)" />
                <line x1="104" y1="65" x2="116" y2="65" stroke="rgba(255,255,255,0.2)" />
                <line x1="104" y1="80" x2="116" y2="80" stroke="rgba(255,255,255,0.2)" />
                <line x1="104" y1="95" x2="116" y2="95" stroke="rgba(255,255,255,0.2)" />
                <line x1="104" y1="110" x2="116" y2="110" stroke="rgba(255,255,255,0.2)" />

                {/* Handle Top Cap */}
                <ellipse cx="110" cy="20" rx="6" ry="3" fill="#C9A84C" />

                {/* Shoulders */}
                <path d="M104 130 C104 140, 80 142, 76 155 L76 170" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                <path d="M116 130 C116 140, 140 142, 144 155 L144 170" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />

                {/* Bat Blade Main Body */}
                <path 
                  d="M 76 155 
                     L 74 380 
                     C 74 395, 110 405, 110 405 
                     C 110 405, 146 395, 146 380 
                     L 144 155 
                     Z" 
                  fill="#151515" 
                  stroke="rgba(201,168,76,0.2)" 
                  strokeWidth="1.5"
                />

                {/* Dynamic Wood Grains */}
                {Array.from({ length: willowConfig[willow].grains }).map((_, i) => {
                  const startX = 76 + 5 + i * (58 / (willowConfig[willow].grains - 1 || 1))
                  return (
                    <path
                      key={i}
                      d={`M ${startX} 157 Q ${startX + (i % 2 === 0 ? 1 : -1) * 1.2} 280, ${startX} 385`}
                      stroke="rgba(201,168,76,0.1)"
                      strokeWidth="1"
                      fill="none"
                    />
                  )
                })}

                {/* Dynamic Sweet Spot Indicator Glow */}
                <motion.circle 
                  cx="110" 
                  cy={sweetSpotConfig[sweetSpot].yPos} 
                  r="38" 
                  fill="url(#sweetGlow)"
                  animate={{ cy: sweetSpotConfig[sweetSpot].yPos }}
                  transition={{ type: 'spring', stiffness: 180, damping: 20 }}
                />

                {/* Sweet Spot Spec text marker */}
                <motion.g
                  animate={{ y: sweetSpotConfig[sweetSpot].yPos - 250 }}
                  transition={{ type: 'spring', stiffness: 180, damping: 20 }}
                >
                  <line x1="110" y1="250" x2="165" y2="235" stroke="#C9A84C" strokeWidth="1" strokeDasharray="2,2" opacity="0.6" />
                  <circle cx="110" cy="250" r="3" fill="#C9A84C" />
                  <rect x="145" y="220" width="65" height="15" fill="#C9A84C" rx="2" />
                  <text x="177" y="231" fill="#000000" fontSize="7" fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.1em" fontWeight="bold">
                    SWEET SPOT
                  </text>
                </motion.g>

                {/* Brand label engraved on bat face */}
                <text x="110" y="195" fill="rgba(255,255,255,0.06)" fontSize="18" fontFamily="serif" letterSpacing="0.2em" textAnchor="middle">
                  CREX
                </text>
                <text x="110" y="210" fill="#C9A84C" opacity="0.3" fontSize="6" fontFamily="sans-serif" letterSpacing="0.3em" textAnchor="middle">
                  ELITE
                </text>
              </svg>

              {/* Specs Label Info Overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex justify-between text-[10px] font-sans tracking-widest text-off-white/30 uppercase">
                <span>Engraved No. {willow === 'pro-reserve' ? '#C01-PR' : willow === 'grade-1' ? '#C01-G1' : '#C01-G2'}</span>
                <span>London, UK</span>
              </div>
            </div>

            {/* Specs Summary and Metrics */}
            <div className="border border-white/5 bg-neutral-950/40 p-6 md:p-8 flex flex-col gap-6">
              <div className="flex justify-between items-end">
                <div>
                  <h4 className="font-serif text-2xl text-off-white font-light">Custom Build Summary</h4>
                  <p className="font-sans text-[10px] text-off-white/40 tracking-wider uppercase mt-1">Bespoke Cleft Configuration</p>
                </div>
                <div className="text-right">
                  <span className="font-serif text-3xl text-gold font-light">£{totalPrice}</span>
                  <p className="font-sans text-[9px] text-off-white/30 uppercase tracking-widest mt-0.5">Est. Price</p>
                </div>
              </div>

              {/* Dynamic Performance Metrics */}
              <div className="border-t border-b border-white/5 py-5 flex flex-col gap-4">
                {/* Power Metric */}
                <div>
                  <div className="flex justify-between text-[10px] font-sans tracking-widest uppercase mb-2">
                    <span className="text-off-white/60">Power Index</span>
                    <span className="text-gold font-medium">{power}%</span>
                  </div>
                  <div className="w-full h-[3px] bg-white/5 relative">
                    <motion.div 
                      className="absolute top-0 left-0 h-full bg-gold"
                      initial={{ width: 0 }}
                      animate={{ width: `${power}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                {/* Pickup Metric */}
                <div>
                  <div className="flex justify-between text-[10px] font-sans tracking-widest uppercase mb-2">
                    <span className="text-off-white/60">Pickup Balance</span>
                    <span className="text-gold font-medium">{pickup}%</span>
                  </div>
                  <div className="w-full h-[3px] bg-white/5 relative">
                    <motion.div 
                      className="absolute top-0 left-0 h-full bg-gold"
                      initial={{ width: 0 }}
                      animate={{ width: `${pickup}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                {/* Control Metric */}
                <div>
                  <div className="flex justify-between text-[10px] font-sans tracking-widest uppercase mb-2">
                    <span className="text-off-white/60">Control Index</span>
                    <span className="text-gold font-medium">{control}%</span>
                  </div>
                  <div className="w-full h-[3px] bg-white/5 relative">
                    <motion.div 
                      className="absolute top-0 left-0 h-full bg-gold"
                      initial={{ width: 0 }}
                      animate={{ width: `${control}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleCopySpecs}
                  className="py-3.5 border border-white/10 hover:border-gold/40 hover:text-gold font-sans text-xs tracking-widest uppercase text-off-white/50 flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-gold" /> Copied!
                    </>
                  ) : (
                    <>
                      <Clipboard size={14} /> Copy Specs
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => setShowModal(true)}
                  className="py-3.5 bg-gold border border-gold hover:bg-transparent hover:text-gold text-black font-sans text-xs tracking-widest uppercase transition-all duration-500 flex items-center justify-center gap-2 cursor-pointer font-semibold"
                >
                  <Sparkles size={14} /> Order Bespoke
                </button>
              </div>
              
              <div className="flex items-center gap-3 justify-center text-[10px] font-sans text-off-white/30 tracking-wider">
                <ShieldCheck size={12} className="text-gold/40" />
                <span>INCLUDES 1 YEAR STRUCTURAL BLADE WARRANTY</span>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Inquiry Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg border border-white/10 bg-neutral-950 p-8 md:p-10 shadow-[0_0_80px_rgba(201,168,76,0.15)] text-left"
            >
              {/* Close Button */}
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 text-off-white/40 hover:text-gold transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <p className="label-text mb-2">Bespoke Inquiry</p>
              <h3 className="font-serif text-3xl text-off-white mb-6">Workshop Specification Sheet</h3>

              {/* Selected Spec Overview */}
              <div className="grid grid-cols-2 gap-4 border border-white/5 bg-black/40 p-4 mb-6 text-xs font-sans text-off-white/60">
                <div>
                  <p className="text-off-white/30 uppercase tracking-widest text-[8px] mb-1">Willow Grade</p>
                  <p className="font-medium text-off-white">{willowConfig[willow].name}</p>
                </div>
                <div>
                  <p className="text-off-white/30 uppercase tracking-widest text-[8px] mb-1">Sweet Spot</p>
                  <p className="font-medium text-off-white">{sweetSpotConfig[sweetSpot].name}</p>
                </div>
                <div>
                  <p className="text-off-white/30 uppercase tracking-widest text-[8px] mb-1">Weight Profile</p>
                  <p className="font-medium text-off-white">{weightConfig[weight].name.split(' ')[0]}</p>
                </div>
                <div>
                  <p className="text-off-white/30 uppercase tracking-widest text-[8px] mb-1">Handle Shape</p>
                  <p className="font-medium text-off-white">{handleConfig[handle].name}</p>
                </div>
                <div className="col-span-2 border-t border-white/5 pt-3 flex justify-between items-center mt-1">
                  <span className="text-off-white/30 uppercase tracking-widest text-[8px]">Estimated Valuation</span>
                  <span className="font-serif text-lg text-gold font-light">£{totalPrice}</span>
                </div>
              </div>

              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-10"
                >
                  <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center mb-4 text-gold animate-bounce">
                    <Check size={24} />
                  </div>
                  <h4 className="font-serif text-2xl text-gold mb-2">Inquiry Submitted</h4>
                  <p className="font-sans text-xs text-off-white/60 leading-relaxed max-w-sm">
                    Your bespoke bat specification is successfully compiled. Our master shaper will contact you within 24 hours to schedule your consultation.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block font-sans text-[9px] uppercase tracking-widest text-off-white/40 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      required 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alexander Sterling" 
                      className="w-full bg-[#111] border border-white/10 p-3 font-sans text-xs text-off-white outline-none focus:border-gold/50"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-[9px] uppercase tracking-widest text-off-white/40 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. alex@sterlingcricket.com" 
                      className="w-full bg-[#111] border border-white/10 p-3 font-sans text-xs text-off-white outline-none focus:border-gold/50"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-[9px] uppercase tracking-widest text-off-white/40 mb-2">Phone Number (Optional)</label>
                    <input 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +44 7700 900077" 
                      className="w-full bg-[#111] border border-white/10 p-3 font-sans text-xs text-off-white outline-none focus:border-gold/50"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-[9px] uppercase tracking-widest text-off-white/40 mb-2">Custom Workshop Notes / Special Requests</label>
                    <textarea 
                      rows="3"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Prefer an ultra-thick toe, or need a slightly longer handle..."
                      className="w-full bg-[#111] border border-white/10 p-3 font-sans text-xs text-off-white outline-none focus:border-gold/50 resize-none"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full mt-2 py-4 bg-gold text-black font-sans text-xs tracking-widest uppercase font-semibold hover:bg-transparent hover:text-gold border border-gold transition-all duration-300 cursor-pointer"
                  >
                    Submit Cleft Request
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
