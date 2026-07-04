import { useState, useEffect, useRef } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, Clipboard, Sparkles, Clock, ShoppingBag, 
  ShieldCheck, Check, Award, Settings, Search, ArrowRight
} from 'lucide-react'

// Junagadh Workshop Tracking Stages definition
const trackerPhases = [
  { id: 1, name: 'Cleft Selection', desc: 'Selecting raw Grade 1+ English Willow cleft matching weight specs.' },
  { id: 2, name: 'Pressing & Shaping', desc: 'Blade compressed at 2,000 psi and hand-carved by our master shaper.' },
  { id: 3, name: 'Splice Splicing', desc: 'Splicing the multi-piece Singapore cane handle into the blade.' },
  { id: 4, name: 'Linseed Oil Curing', desc: 'Coating linseed oil and drying in humidity-controlled rooms.' },
  { id: 5, name: 'Mallet Knocking-In', desc: '10,000 mechanical mallet blows on the face and edges.' },
  { id: 6, name: 'Embossing & Gripping', desc: 'Adding 3D gold-embossed decals and custom grip wrap.' },
  { id: 7, name: 'Junagadh Dispatch', desc: 'Handed to courier for delivery. Active tracking: UKM-829140.' }
]

export default function MemberLocker() {
  const location = useLocation()
  
  // Navigation Tabs state
  const [activeTab, setActiveTab] = useState('tracker') // tracker, history
  
  // Orders and Profile state
  const [orders, setOrders] = useState([])
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    height: '',
    style: '',
    playLevel: '',
    gripColor: 'Gold',
    stance: 'Right Handed'
  })
  
  // Active Tracking states
  const [searchOrderId, setSearchOrderId] = useState('')
  const [activeTrackOrder, setActiveTrackOrder] = useState(null)
  const [trackError, setTrackError] = useState('')
  
  // Toast notifications state
  const [toastMessage, setToastMessage] = useState('')

  // Seed default data if localStorage is empty
  useEffect(() => {
    // 1. Seed Profile
    const savedProfile = localStorage.getItem('crex_player_profile')
    if (!savedProfile) {
      const defaultProfile = {
        name: 'Alexander Sterling',
        email: 'alex@sterlingcricket.com',
        height: '5_7_to_6',
        style: 'touch',
        playLevel: 'pro',
        gripColor: 'Gold',
        stance: 'Right Handed'
      }
      localStorage.setItem('crex_player_profile', JSON.stringify(defaultProfile))
      setProfile(defaultProfile)
    } else {
      setProfile(JSON.parse(savedProfile))
    }

    // 2. Seed Orders
    const savedOrders = localStorage.getItem('crex_orders')
    let currentOrders = []
    if (!savedOrders) {
      const defaultOrders = [
        {
          orderId: 'CX582914',
          date: '30 Jun 2026',
          items: [
            { id: 1, name: 'The Sovereign Bat', price: 450, qty: 1, image: '/bat_sovereign.png', size: 'Short Handle (SH)', color: '' },
            { id: 64, name: 'Sovereign Elite Gloves', price: 125, qty: 1, image: '/batting_gloves_sovereign.png', size: 'M', color: '' }
          ],
          subtotal: 575,
          shipping: { shipping: 'standard', firstName: 'Alexander', lastName: 'Sterling', address: '12 Kingsway Road', city: 'London', zip: 'SW1A 1AA' },
          status: 'Linseed Oil Curing',
          timestamp: 1782835200000
        },
        {
          orderId: 'CX891043',
          date: '15 May 2026',
          items: [
            { id: 62, name: 'Monarch Pro Helmet', price: 160, qty: 1, image: '/elite_helmet.png', size: 'L', color: '' }
          ],
          subtotal: 160,
          shipping: { shipping: 'standard', firstName: 'Alexander', lastName: 'Sterling', address: '12 Kingsway Road', city: 'London', zip: 'SW1A 1AA' },
          status: 'Delivered',
          timestamp: 1778928000000
        }
      ]
      localStorage.setItem('crex_orders', JSON.stringify(defaultOrders))
      setOrders(defaultOrders)
      currentOrders = defaultOrders
    } else {
      let parsedOrders = JSON.parse(savedOrders)
      let migrated = false
      parsedOrders = parsedOrders.map(order => {
        const updatedItems = order.items.map(item => {
          if (item.image === '/new_bat_sovereign.png') {
            migrated = true
            return { ...item, image: '/bat_sovereign.png' }
          }
          return item
        })
        return { ...order, items: updatedItems }
      })
      if (migrated) {
        localStorage.setItem('crex_orders', JSON.stringify(parsedOrders))
      }
      setOrders(parsedOrders)
      currentOrders = parsedOrders
    }

    // 3. Handle incoming URL parameters (e.g. from checkout redirect)
    const params = new URLSearchParams(location.search)
    const trackId = params.get('track')
    if (trackId) {
      setSearchOrderId(trackId)
      const found = currentOrders.find(o => o.orderId.toLowerCase() === trackId.toLowerCase())
      if (found) {
        setActiveTrackOrder(found)
        setActiveTab('tracker')
      } else {
        setTrackError(`Order ${trackId} not found in database.`)
      }
    } else if (currentOrders.length > 0) {
      // Preload the first active order if available
      const activeOrder = currentOrders.find(o => o.status !== 'Delivered') || currentOrders[0]
      setActiveTrackOrder(activeOrder)
      setSearchOrderId(activeOrder.orderId)
    }
  }, [location.search])

  // Save Player Profile handler
  const handleSaveProfile = (e) => {
    e.preventDefault()
    localStorage.setItem('crex_player_profile', JSON.stringify(profile))
    showToast('DNA Specs updated successfully.')
  }

  // Toast helper
  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3000)
  }

  // Search Order tracker handler
  const handleTrackSearch = (e) => {
    e.preventDefault()
    setTrackError('')
    if (!searchOrderId.trim()) return

    const found = orders.find(o => o.orderId.toLowerCase() === searchOrderId.trim().toLowerCase())
    if (found) {
      setActiveTrackOrder(found)
    } else {
      setActiveTrackOrder(null)
      setTrackError(`Order "${searchOrderId}" was not found. Please verify your order number.`)
    }
  }

  // Simulate Next Stage handler (forces active order forward in workshop progress)
  const handleSimulateNextStage = () => {
    if (!activeTrackOrder) return
    const currentStatus = activeTrackOrder.status

    if (currentStatus === 'Delivered') {
      showToast('Order is already delivered!')
      return
    }

    // Find current phase index
    const phaseIdx = trackerPhases.findIndex(p => p.name === currentStatus)
    let nextStatus = 'Delivered'
    if (phaseIdx !== -1 && phaseIdx < trackerPhases.length - 1) {
      nextStatus = trackerPhases[phaseIdx + 1].name
    } else if (phaseIdx === trackerPhases.length - 1) {
      nextStatus = 'Delivered'
    }

    // Update active track order and save back to localStorage
    const updatedOrder = { ...activeTrackOrder, status: nextStatus }
    setActiveTrackOrder(updatedOrder)

    const updatedOrders = orders.map(o => o.orderId === activeTrackOrder.orderId ? updatedOrder : o)
    setOrders(updatedOrders)
    localStorage.setItem('crex_orders', JSON.stringify(updatedOrders))

    showToast(`Simulation: Order advanced to "${nextStatus}"`)
  }

  // Calculate current membership metrics
  const totalSpend = orders.reduce((acc, o) => acc + o.subtotal, 0)
  let membershipTier = 'Bronze Cleft'
  let textTierStyle = 'text-amber-500'
  let nextTier = 'Silver Cleft'
  let nextTierDiff = 150 - totalSpend

  if (totalSpend >= 500) {
    membershipTier = 'Elite Gold Cleft'
    textTierStyle = 'text-gold'
    nextTier = 'Maximum Tier'
    nextTierDiff = 0
  } else if (totalSpend >= 150) {
    membershipTier = 'Silver Cleft'
    textTierStyle = 'text-zinc-400'
    nextTier = 'Elite Gold Cleft'
    nextTierDiff = 500 - totalSpend
  }

  // Calculate matching stage index on tracker
  const getActivePhaseId = () => {
    if (!activeTrackOrder) return 1
    if (activeTrackOrder.status === 'Delivered') return 8
    const phase = trackerPhases.find(p => p.name === activeTrackOrder.status)
    return phase ? phase.id : 1
  }
  const activePhaseId = getActivePhaseId()

  return (
    <div className="min-h-screen bg-black text-off-white pt-24 pb-20 font-sans">
      
      {/* Toast popup */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-28 left-1/2 transform -translate-x-1/2 bg-zinc-900 border border-white/10 text-off-white px-6 py-3 z-[100] shadow-lg font-sans text-xs tracking-wider uppercase font-medium"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="section-pad max-w-7xl mx-auto py-8">
        
        {/* Title */}
        <div className="mb-10 text-left border-b border-white/5 pb-6">
          <h1 className="font-serif text-3xl font-light text-off-white">Member Locker</h1>
          <p className="font-sans text-xs text-off-white/40 mt-1">
            Manage your custom workshop orders, active builds, and player DNA profiles.
          </p>
        </div>

        {/* 3-COLUMN STATS ROW (Clean SaaS Style) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          
          {/* Card 1: Membership */}
          <div className="border border-white/5 bg-[#0e0e0e] p-6 flex flex-col justify-between h-[120px]">
            <span className="font-sans text-[10px] uppercase tracking-widest text-off-white/40">Membership Status</span>
            <div className="flex justify-between items-end">
              <span className={`font-serif text-xl font-light ${textTierStyle}`}>{membershipTier}</span>
              <span className="font-sans text-[10px] text-off-white/30 uppercase tracking-widest">Spend: £{totalSpend}</span>
            </div>
          </div>

          {/* Card 2: Active Builds */}
          <div className="border border-white/5 bg-[#0e0e0e] p-6 flex flex-col justify-between h-[120px]">
            <span className="font-sans text-[10px] uppercase tracking-widest text-off-white/40">Active Build</span>
            <div className="flex justify-between items-end">
              <span className="font-serif text-xl font-light text-off-white">
                {orders.find(o => o.status !== 'Delivered')?.orderId || 'No Active Build'}
              </span>
              <span className="font-sans text-[10px] text-gold uppercase tracking-widest">
                {orders.find(o => o.status !== 'Delivered')?.status || 'N/A'}
              </span>
            </div>
          </div>

          {/* Card 3: Player Profile DNA */}
          <div className="border border-white/5 bg-[#0e0e0e] p-6 flex flex-col justify-between h-[120px]">
            <span className="font-sans text-[10px] uppercase tracking-widest text-off-white/40">Scouting DNA Status</span>
            <div className="flex justify-between items-end">
              <span className="font-serif text-xl font-light text-off-white">
                {profile.stance ? `${profile.stance.split(' ')[0]} Hand` : 'Unconfigured'}
              </span>
              <span className="font-sans text-[10px] text-off-white/30 uppercase tracking-widest">
                {profile.style ? `${profile.style.toUpperCase()}` : 'No Playstyle'}
              </span>
            </div>
          </div>

        </div>

        {/* 2-COLUMN MAIN PANEL (8 Cols Left, 4 Cols Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT COLUMN: Active Tracker & History (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Header Tabs with Underline */}
            <div className="flex border-b border-white/5 bg-transparent overflow-x-auto scrollbar-none">
              <button 
                onClick={() => setActiveTab('tracker')}
                className={`py-3 px-4 md:px-5 font-sans text-[10px] md:text-xs uppercase tracking-widest transition-all duration-300 relative cursor-pointer font-medium whitespace-nowrap ${
                  activeTab === 'tracker' ? 'text-gold' : 'text-off-white/30 hover:text-off-white'
                }`}
              >
                Workshop Tracker
                {activeTab === 'tracker' && (
                  <motion.div layoutId="lockerTabLine" className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold" />
                )}
              </button>
              <button 
                onClick={() => setActiveTab('history')}
                className={`py-3 px-4 md:px-5 font-sans text-[10px] md:text-xs uppercase tracking-widest transition-all duration-300 relative cursor-pointer font-medium whitespace-nowrap ${
                  activeTab === 'history' ? 'text-gold' : 'text-off-white/30 hover:text-off-white'
                }`}
              >
                Purchase History ({orders.length})
                {activeTab === 'history' && (
                  <motion.div layoutId="lockerTabLine" className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold" />
                )}
              </button>
            </div>

            {/* TAB CONTENT PANEL */}
            <div className="relative">
              
              {/* Tracker Panel */}
              {activeTab === 'tracker' && (
                <div className="flex flex-col gap-6">
                  
                  {/* Search Input */}
                  <div className="border border-white/5 bg-[#0e0e0e] p-6">
                    <h3 className="font-serif text-lg mb-1 font-light">Track Junagadh Workshop Status</h3>
                    <p className="font-sans text-xs text-off-white/50 mb-4 leading-relaxed">
                      Enter your order number to view real-time hand-crafting stages in our Junagadh workshop.
                    </p>
                    <form onSubmit={handleTrackSearch} className="flex gap-4">
                      <input 
                        type="text" 
                        value={searchOrderId}
                        onChange={(e) => setSearchOrderId(e.target.value)}
                        placeholder="e.g. CX582914" 
                        className="flex-1 bg-black border border-white/10 p-3 font-sans text-xs text-off-white outline-none focus:border-gold/50"
                      />
                      <button type="submit" className="btn-primary text-xs py-3 px-6">
                        Track Build
                      </button>
                    </form>
                    {trackError && <p className="font-sans text-xs text-red-500 mt-2">{trackError}</p>}
                    
                    {/* Quick Demo Pre-load Links */}
                    <div className="flex items-center gap-3 mt-4 text-[9px] font-sans text-off-white/30 uppercase tracking-widest">
                      <span>Database Orders:</span>
                      {orders.map(o => (
                        <button
                          key={o.orderId}
                          onClick={() => {
                            setSearchOrderId(o.orderId)
                            setActiveTrackOrder(o)
                            setTrackError('')
                          }}
                          className="text-gold hover:underline cursor-pointer"
                        >
                          #{o.orderId} ({o.status === 'Delivered' ? 'Completed' : 'Active'})
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Active Tracker Dashboard */}
                  {activeTrackOrder ? (
                    <div className="border border-white/5 bg-[#0e0e0e] p-6 md:p-8 flex flex-col gap-8">
                      
                      {/* Tracker Header */}
                      <div className="flex justify-between items-center border-b border-white/5 pb-4">
                        <div>
                          <span className="font-serif text-xl text-off-white">Order #{activeTrackOrder.orderId}</span>
                          <span className="font-sans text-[10px] text-off-white/40 ml-4">Placed: {activeTrackOrder.date}</span>
                        </div>
                        
                        {activeTrackOrder.status !== 'Delivered' && (
                          <button
                            onClick={handleSimulateNextStage}
                            className="py-2 px-4 border border-gold text-black bg-gold font-sans text-[9px] uppercase tracking-widest font-semibold flex items-center gap-1 transition-all duration-300 hover:bg-transparent hover:text-gold cursor-pointer"
                          >
                            <Sparkles size={11} /> Advance Stage
                          </button>
                        )}
                      </div>

                      {/* Mobile Stepper Progress Bar */}
                      <div className="block md:hidden border border-white/5 bg-black p-4 w-full">
                        <div className="flex justify-between items-center text-[9px] font-sans uppercase tracking-widest text-off-white/40 mb-2">
                          <span>Build Progress</span>
                          <span className="text-gold">Phase {activePhaseId} of 7</span>
                        </div>
                        <div className="w-full h-1 bg-white/5 relative mb-2">
                          <div 
                            className="absolute top-0 left-0 h-full bg-gold transition-all duration-750" 
                            style={{ width: `${Math.min(100, (activePhaseId / 7) * 100)}%` }}
                          />
                        </div>
                        <p className="font-sans text-[10px] text-gold font-medium uppercase tracking-wider">
                          Active stage: {activeTrackOrder.status === 'Delivered' ? 'Delivered' : activeTrackOrder.status}
                        </p>
                      </div>

                      {/* Clean Horizontal Stepper (Desktop/Tablet) */}
                      <div className="hidden md:flex relative py-4 justify-between items-center w-full">
                        {/* Stepper background line */}
                        <div className="absolute left-[5%] right-[5%] top-1/2 h-[1px] bg-zinc-800 -translate-y-1/2 z-0" />
                        
                        {/* Stepper active progress line fill */}
                        {activePhaseId > 1 && (
                          <div 
                            className="absolute left-[5%] top-1/2 h-[1px] bg-gold -translate-y-1/2 z-0 transition-all duration-700"
                            style={{ width: `${((activePhaseId - 1) / 6) * 90}%` }}
                          />
                        )}

                        {trackerPhases.map(phase => {
                          const isCompleted = activePhaseId > phase.id
                          const isActive = activePhaseId === phase.id
                          
                          return (
                            <div key={phase.id} className="relative z-10 flex flex-col items-center">
                              {/* Step circle */}
                              <div className={`w-5 h-5 rounded-full border flex items-center justify-center font-sans text-[8px] font-semibold transition-all duration-500 ${
                                isCompleted 
                                  ? 'bg-gold border-gold text-black'
                                  : isActive
                                    ? 'bg-black border-gold text-gold ring-2 ring-gold/10'
                                    : 'bg-black border-zinc-800 text-off-white/30'
                              }`}>
                                {isCompleted ? <Check size={8} /> : phase.id}
                              </div>
                              {/* Small vertical label */}
                              <span className="font-sans text-[8px] uppercase tracking-wider mt-2.5 whitespace-nowrap font-medium text-off-white/20">
                                {phase.name.split(' ')[0]}
                              </span>
                            </div>
                          )
                        })}
                      </div>

                      {/* Phase details columns */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/5 pt-6 mt-2">
                        
                        {/* Column 1: Shaper Notes */}
                        <div className="flex flex-col gap-2">
                          <span className="font-sans text-[8px] uppercase tracking-widest text-gold font-medium">Workshop Status Report</span>
                          <h4 className="font-serif text-lg text-off-white mt-1">{activeTrackOrder.status}</h4>
                          <p className="font-sans text-xs text-off-white/50 leading-relaxed mt-2">
                            {activeTrackOrder.status === 'Delivered' 
                              ? 'Your gear has passed final inspections, been packaged in sustainable custom sleeves, and handed over to courier transport. Tracking Ref: UKM-829140.' 
                              : trackerPhases[activePhaseId - 1]?.desc
                            }
                          </p>
                        </div>

                        {/* Column 2: Build Metadata */}
                        <div className="flex flex-col gap-4 border-l border-white/5 md:pl-6">
                          <span className="font-sans text-[8px] uppercase tracking-widest text-off-white/30 font-medium">Build Metadata</span>
                          <div className="grid grid-cols-2 gap-y-4 gap-x-2 mt-2 text-[10px] font-sans text-off-white/60">
                            <div>
                              <p className="text-off-white/30 uppercase tracking-widest text-[8px]">Supervisor</p>
                              <p className="mt-0.5 font-medium">Krunal Champanera (Master Shaper)</p>
                            </div>
                            <div>
                              <p className="text-off-white/30 uppercase tracking-widest text-[8px]">Facility</p>
                              <p className="mt-0.5 font-medium">Junagadh Workshop, IN</p>
                            </div>
                            <div>
                              <p className="text-off-white/30 uppercase tracking-widest text-[8px]">Est. Completion</p>
                              <p className="mt-0.5 font-medium text-gold">48 Hours</p>
                            </div>
                            <div>
                              <p className="text-off-white/30 uppercase tracking-widest text-[8px]">QC Status</p>
                              <p className="mt-0.5 font-medium text-green-400">Passed Phase {activePhaseId - 1 || 1}</p>
                            </div>
                          </div>
                        </div>

                      </div>

                      {/* Full Width, Scrollable Product Grid */}
                      <div className="border-t border-white/5 pt-6 mt-2">
                        <h5 className="font-sans text-[10px] uppercase tracking-widest text-off-white/30 mb-4 font-medium">Build Specifications</h5>
                        <div className="max-h-[300px] overflow-y-auto pr-2 scrollbar-thin" data-lenis-prevent>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {activeTrackOrder.items.map(item => (
                              <div key={item.id} className="flex gap-4 items-center border border-white/5 bg-black p-3.5 hover:border-gold/30 transition-all duration-300">
                                <div className="w-12 h-12 bg-[#0e0e0e] border border-white/5 flex items-center justify-center flex-shrink-0">
                                  <img src={item.image} alt={item.name} className="max-h-[85%] object-contain" />
                                </div>
                                <div className="min-w-0">
                                  <p className="font-sans text-xs text-off-white font-medium truncate">{item.name}</p>
                                  <p className="font-sans text-[10px] text-off-white/40 mt-0.5">Qty: {item.qty}</p>
                                  {item.size && <p className="font-sans text-[9px] text-gold uppercase tracking-wider mt-0.5">Size: {item.size}</p>}
                                  {item.color && <p className="font-sans text-[9px] text-zinc-400 uppercase tracking-wider mt-0.5">Color: {item.color}</p>}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                    </div>
                  ) : (
                    <div className="border border-white/5 bg-[#0e0e0e] py-16 flex flex-col items-center justify-center text-center">
                      <ShoppingBag size={24} className="text-off-white/20 mb-3" />
                      <p className="font-serif text-lg text-off-white/60">No Active Tracking</p>
                      <p className="font-sans text-xs text-off-white/30 max-w-xs leading-relaxed mt-1">
                        Please enter an order number above to view its live preparation stages.
                      </p>
                    </div>
                  )}

                </div>
              )}

              {/* History Panel */}
              {activeTab === 'history' && (
                <div className="flex flex-col gap-6">
                  {orders.length === 0 ? (
                    <div className="border border-white/5 bg-[#0e0e0e] py-16 flex flex-col items-center justify-center text-center">
                      <Clipboard size={24} className="text-off-white/20 mb-3" />
                      <p className="font-serif text-lg text-off-white/60">No Order History Found</p>
                      <p className="font-sans text-xs text-off-white/30 max-w-xs leading-relaxed mt-1">
                        Once you complete checkout, your order history will appear here.
                      </p>
                    </div>
                  ) : (
                    orders.map(order => (
                      <div key={order.orderId} className="border border-white/5 bg-[#0e0e0e] p-6 flex flex-col gap-4">
                        <div className="flex justify-between items-center border-b border-white/5 pb-3">
                          <div>
                            <span className="font-serif text-md text-off-white">Order #{order.orderId}</span>
                            <span className="font-sans text-[10px] text-off-white/40 ml-3">{order.date}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`text-[8px] font-sans px-2 py-0.5 border uppercase tracking-widest ${
                              order.status === 'Delivered' 
                                ? 'border-green-800 bg-green-950/20 text-green-400' 
                                : 'border-gold/30 bg-gold/5 text-gold'
                            }`}>
                              {order.status === 'Delivered' ? 'Delivered' : `Workshop: ${order.status}`}
                            </span>
                            <button
                              onClick={() => {
                                setSearchOrderId(order.orderId)
                                setActiveTrackOrder(order)
                                setTrackError('')
                                setActiveTab('tracker')
                              }}
                              className="font-sans text-[9px] text-gold uppercase tracking-widest hover:underline cursor-pointer"
                            >
                              Track →
                            </button>
                          </div>
                        </div>

                        <div className="space-y-3 py-2">
                          {order.items.map(item => (
                            <div key={item.id} className="flex justify-between items-center text-xs font-sans">
                              <div className="flex gap-3 items-center">
                                <div className="w-10 h-10 bg-black border border-white/5 flex items-center justify-center flex-shrink-0">
                                  <img src={item.image} alt={item.name} className="max-h-[85%] object-contain" />
                                </div>
                                <div>
                                  <p className="font-medium text-off-white">{item.name}</p>
                                  <p className="text-off-white/40 mt-0.5">
                                    Qty: {item.qty} {item.size && `· Size: ${item.size}`} {item.color && `· Color: ${item.color}`}
                                  </p>
                                </div>
                              </div>
                              <span className="font-serif text-gold">£{(item.price * item.qty).toLocaleString()}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-between items-end border-t border-white/5 pt-3 text-[10px] font-sans text-off-white/40">
                          <div>
                            <p>Shipping Address: <span className="text-off-white">{order.shipping.firstName} {order.shipping.lastName} ({order.shipping.city})</span></p>
                          </div>
                          <div className="text-right">
                            <span className="uppercase tracking-widest text-[8px] text-off-white/30 mr-1.5">Paid:</span>
                            <span className="font-serif text-sm text-gold font-light">£{order.subtotal.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

            </div>

          </div>

          {/* RIGHT COLUMN: Player DNA Profile Settings (4 Cols) */}
          <div className="lg:col-span-4">
            
            <div className="border border-white/5 bg-[#0e0e0e] p-6 md:p-8">
              <h3 className="font-serif text-xl text-off-white mb-1 font-light">Player DNA Profile</h3>
              <p className="font-sans text-xs text-off-white/40 mb-6 leading-relaxed">
                Update your personal sizing specifications used by the Bat Match quiz.
              </p>

              <form onSubmit={handleSaveProfile} className="flex flex-col gap-4">
                
                <div>
                  <label className="block font-sans text-[9px] uppercase tracking-widest text-off-white/40 mb-1.5">Player Name</label>
                  <input 
                    type="text" 
                    required 
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-black border border-white/15 p-3 font-sans text-xs text-off-white outline-none focus:border-gold/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-sans text-[9px] uppercase tracking-widest text-off-white/40 mb-1.5">Email Address</label>
                  <input 
                    type="email" 
                    required 
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-black border border-white/15 p-3 font-sans text-xs text-off-white outline-none focus:border-gold/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-sans text-[9px] uppercase tracking-widest text-off-white/40 mb-1.5">Stance</label>
                  <select 
                    value={profile.stance}
                    onChange={(e) => setProfile(prev => ({ ...prev, stance: e.target.value }))}
                    className="w-full bg-black border border-white/15 p-3 font-sans text-xs text-off-white outline-none focus:border-gold/50 transition-colors"
                  >
                    <option value="Right Handed">Right Handed</option>
                    <option value="Left Handed">Left Handed</option>
                  </select>
                </div>

                <div>
                  <label className="block font-sans text-[9px] uppercase tracking-widest text-off-white/40 mb-1.5">Grip Wrap</label>
                  <select 
                    value={profile.gripColor}
                    onChange={(e) => setProfile(prev => ({ ...prev, gripColor: e.target.value }))}
                    className="w-full bg-black border border-white/15 p-3 font-sans text-xs text-off-white outline-none focus:border-gold/50 transition-colors"
                  >
                    <option value="Gold">Gold Scale</option>
                    <option value="Black">Matte Black</option>
                    <option value="White">Chalk White</option>
                  </select>
                </div>

                <div>
                  <label className="block font-sans text-[9px] uppercase tracking-widest text-off-white/40 mb-1.5">Height Range</label>
                  <select 
                    value={profile.height}
                    onChange={(e) => setProfile(prev => ({ ...prev, height: e.target.value }))}
                    className="w-full bg-black border border-white/15 p-3 font-sans text-xs text-off-white outline-none focus:border-gold/50 transition-colors"
                  >
                    <option value="">Select Height...</option>
                    <option value="under_5">Under 5'0" (Junior)</option>
                    <option value="5_to_5_6">5'0" - 5'6" (Academy)</option>
                    <option value="5_7_to_6">5'7" - 6'0" (Standard)</option>
                    <option value="over_6">Over 6'0" (Tall)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-sans text-[9px] uppercase tracking-widest text-off-white/40 mb-1.5">Batting Playstyle</label>
                  <select 
                    value={profile.style}
                    onChange={(e) => setProfile(prev => ({ ...prev, style: e.target.value }))}
                    className="w-full bg-black border border-white/15 p-3 font-sans text-xs text-off-white outline-none focus:border-gold/50 transition-colors"
                  >
                    <option value="">Select Playstyle...</option>
                    <option value="aggressive">Aggressive / Power Hitter</option>
                    <option value="touch">Touch / Timing Specialist</option>
                    <option value="balanced">Balanced All-Rounder</option>
                  </select>
                </div>

                <div>
                  <label className="block font-sans text-[9px] uppercase tracking-widest text-off-white/40 mb-1.5">Level</label>
                  <select 
                    value={profile.playLevel}
                    onChange={(e) => setProfile(prev => ({ ...prev, playLevel: e.target.value }))}
                    className="w-full bg-black border border-white/15 p-3 font-sans text-xs text-off-white outline-none focus:border-gold/50 transition-colors"
                  >
                    <option value="">Select Level...</option>
                    <option value="casual">Casual / Net Sessions</option>
                    <option value="club">Club Cricket</option>
                    <option value="pro">Professional / Premier Grade</option>
                  </select>
                </div>

                <button 
                  type="submit" 
                  className="w-full mt-2 py-3 bg-gold border border-gold text-black font-sans text-xs tracking-widest uppercase font-semibold hover:bg-transparent hover:text-gold transition-all duration-300 cursor-pointer"
                >
                  Save DNA Specs
                </button>
              </form>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}
