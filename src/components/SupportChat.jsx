import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, RotateCcw } from 'lucide-react'
import { Link } from 'react-router-dom'

// ─── Intent Detection Engine ───────────────────────────────────────────
const intents = [
  {
    patterns: ['track', 'where is my order', 'order status', 'shipping status', 'dispatched', 'delivery status'],
    response: () => ({
      text: "You can track your order in real-time from your **Member Locker** dashboard under the Workshop Tracker tab. You'll also receive email updates at each build stage.",
      link: { to: '/locker', label: 'Open Member Locker' },
    }),
  },
  {
    patterns: ['return', 'refund', 'send back', 'not happy', 'wrong item', 'damaged', 'cancel order'],
    response: () => ({
      text: "We offer a **14-day returns window** from delivery date for unused items. Custom bats are non-returnable. Please contact our team with your order ID to start a return.",
      link: { to: '/contact', label: 'Contact Support' },
    }),
  },
  {
    patterns: ['size', 'sizing', 'what size', 'size guide', 'fit', 'measure', 'glove size', 'pad size', 'bat size'],
    response: () => ({
      text: "We have a complete **Size Guide** covering bat sizes by age/height, glove sizes, pad lengths, and jersey measurements. Most adult players use a Short Handle bat.",
      link: { to: '/size-guide', label: 'View Size Guide' },
    }),
  },
  {
    patterns: ['custom', 'personalise', 'personalize', 'engrave', 'logo', 'my name on', 'custom bat', 'team order', 'bulk'],
    response: () => ({
      text: "We offer custom bats with personalized grip colors, toe guards, and engravings. For team orders (11+ kits), our minimum is a full playing XI. Contact us with your requirements for a formal quote.",
      link: { to: '/contact', label: 'Enquire Now' },
    }),
  },
  {
    patterns: ['knock', 'knocking in', 'new bat', 'prepare bat', 'bat care', 'oil', 'mallet'],
    response: () => ({
      text: "New bats require **4–6 hours of knocking-in** with a bat mallet before match use. Start with light taps on the edges and face, then gradually increase force. Always apply a thin coat of raw linseed oil first.",
      link: { to: '/about', label: 'Bat Care Guidelines' },
    }),
  },
  {
    patterns: ['deliver', 'shipping', 'how long', 'when will', 'how many days', 'express', 'fast delivery'],
    response: () => ({
      text: "**Standard delivery**: 5–7 business days across India. **Express** (select cities): 2–3 business days. Custom bat orders take 10–14 days due to hand-crafting. All orders ship from Junagadh, Gujarat.",
    }),
  },
  {
    patterns: ['warranty', 'guarantee', 'crack', 'broken', 'defect', 'fault'],
    response: () => ({
      text: "All CREX ELITE bats carry a **6-month manufacturing warranty** covering wood grain defects and handle issues. Surface grain lines are natural and not defects. Gear carries a 3-month warranty.",
      link: { to: '/faq', label: 'Read Full Warranty Policy' },
    }),
  },
  {
    patterns: ['price', 'cost', 'how much', 'discount', 'offer', 'sale', 'cheapest'],
    response: () => ({
      text: "Our bat range starts from ₹2,499 for junior models, up to ₹18,999 for our Grade 1+ English Willow range. Browse all products to compare specs and pricing.",
      link: { to: '/category/bats', label: 'Shop Bats' },
    }),
  },
  {
    patterns: ['contact', 'phone', 'email', 'call', 'speak to', 'talk to', 'human', 'agent', 'support team'],
    response: () => ({
      text: "Our support team in **Junagadh, Gujarat** is available Mon–Sat, 9am–6pm IST. We typically respond to enquiries within 4 hours.",
      link: { to: '/contact', label: 'Contact Us' },
    }),
  },
  {
    patterns: ['payment', 'pay', 'upi', 'card', 'cod', 'cash on delivery', 'razorpay'],
    response: () => ({
      text: "We accept **UPI, Debit/Credit cards, Net Banking, and EMI** via our secure checkout. Cash on Delivery is available for orders below ₹5,000.",
    }),
  },
  {
    patterns: ['english willow', 'kashmir willow', 'grade', 'willow grade', 'wood'],
    response: () => ({
      text: "Our premium range uses **Grade 1+ English Willow** — the finest available, with tight grains. Our value range uses Grade 2 English Willow. Kashmir Willow is great for practice and junior players.",
      link: { to: '/category/bats', label: 'Browse Bats' },
    }),
  },
  {
    patterns: ['hello', 'hi', 'hey', 'helo', 'namaste', 'good morning', 'good evening'],
    response: () => ({
      text: "Hello! 👋 I'm **CREX AI**, your cricket gear assistant. Ask me anything about our bats, orders, sizing, shipping, or returns — I'm here to help!",
    }),
  },
]

function detectIntent(message) {
  const lower = message.toLowerCase()
  for (const intent of intents) {
    if (intent.patterns.some(p => lower.includes(p))) {
      return intent.response()
    }
  }
  return null
}

const INITIAL_MESSAGE = {
  id: 0,
  role: 'agent',
  text: "Hi! I'm **CREX AI**, your personal cricket gear assistant. Ask me about our bats, orders, sizing, shipping, returns, or anything else. How can I help you today?",
}

function parseMarkdown(text) {
  // Bold
  return text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-off-white font-semibold">$1</strong>')
}

export default function SupportChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [pulse, setPulse] = useState(true)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  // Stop pulsing after first open
  const handleOpen = () => {
    setIsOpen(true)
    setPulse(false)
    setTimeout(() => inputRef.current?.focus(), 350)
  }

  // Scroll to bottom on new message
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
    }
  }, [messages, isTyping, isOpen])

  const sendMessage = () => {
    const trimmed = input.trim()
    if (!trimmed || isTyping) return

    const userMsg = { id: Date.now(), role: 'user', text: trimmed }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    const delay = 900 + Math.random() * 600

    setTimeout(() => {
      const result = detectIntent(trimmed)
      const agentMsg = {
        id: Date.now() + 1,
        role: 'agent',
        text: result?.text || "I'm not sure about that one. Our support team will be happy to help — they're based in Junagadh and respond within 4 hours.",
        link: result?.link || { to: '/contact', label: 'Contact Support Team' },
      }
      setMessages(prev => [...prev, agentMsg])
      setIsTyping(false)
    }, delay)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const resetChat = () => {
    setMessages([INITIAL_MESSAGE])
    setInput('')
  }

  const quickReplies = ['Track my order', 'Return policy', 'What bat size?', 'Delivery time']

  return (
    <>
      {/* Floating Chat Bubble */}
      <div className="fixed bottom-6 right-5 z-[200] flex flex-col items-end gap-3">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="bg-[#111] border border-white/10 px-3 py-2 text-[11px] font-sans text-off-white/60 shadow-xl whitespace-nowrap"
            >
              Got a question? Ask CREX AI ✦
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => isOpen ? setIsOpen(false) : handleOpen()}
          aria-label="Open Support Chat"
          className="relative w-14 h-14 bg-gold flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer"
        >
          {pulse && (
            <span className="absolute inset-0 animate-ping bg-gold/40 rounded-full" />
          )}
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X size={20} className="text-black" />
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <MessageCircle size={20} className="text-black" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-5 z-[199] w-[calc(100vw-2.5rem)] max-w-[380px] bg-[#0a0a0a] border border-white/8 shadow-2xl flex flex-col overflow-hidden"
            style={{ height: 'min(520px, calc(100dvh - 120px))' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/5 bg-[#0d0d0d] flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 bg-gold flex items-center justify-center">
                    <span className="font-serif text-black text-xs font-bold">C</span>
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border border-[#0d0d0d]" />
                </div>
                <div>
                  <p className="font-sans text-xs font-semibold text-off-white tracking-wide">CREX AI</p>
                  <p className="font-sans text-[9px] text-green-400 uppercase tracking-widest">Online — Ready to help</p>
                </div>
              </div>
              <button onClick={resetChat} className="text-off-white/30 hover:text-gold transition-colors duration-200 cursor-pointer" title="Reset chat">
                <RotateCcw size={13} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 scrollbar-none" data-lenis-prevent>
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] ${msg.role === 'user' ? 'bg-gold text-black' : 'bg-white/5 border border-white/8 text-off-white/80'} px-3.5 py-2.5 text-xs font-sans leading-relaxed`}>
                    <span dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.text) }} />
                    {msg.link && (
                      <Link
                        to={msg.link.to}
                        onClick={() => setIsOpen(false)}
                        className={`block mt-2 text-[10px] font-semibold uppercase tracking-wider underline underline-offset-2 ${msg.role === 'user' ? 'text-black/70' : 'text-gold'}`}
                      >
                        {msg.link.label} →
                      </Link>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white/5 border border-white/8 px-4 py-2.5 flex items-center gap-1.5">
                      {[0, 1, 2].map(i => (
                        <motion.span
                          key={i}
                          className="w-1.5 h-1.5 bg-gold/60 rounded-full"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={bottomRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 2 && !isTyping && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5 flex-shrink-0">
                {quickReplies.map(qr => (
                  <button
                    key={qr}
                    onClick={() => { setInput(qr); setTimeout(() => sendMessage(), 0) }}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      const trimmed = qr.trim()
                      const userMsg = { id: Date.now(), role: 'user', text: trimmed }
                      setMessages(prev => [...prev, userMsg])
                      setIsTyping(true)
                      setTimeout(() => {
                        const result = detectIntent(trimmed)
                        const agentMsg = {
                          id: Date.now() + 1,
                          role: 'agent',
                          text: result?.text || "Our support team will be happy to help — they respond within 4 hours.",
                          link: result?.link || { to: '/contact', label: 'Contact Support Team' },
                        }
                        setMessages(prev => [...prev, agentMsg])
                        setIsTyping(false)
                      }, 1000)
                    }}
                    className="font-sans text-[9px] uppercase tracking-wider border border-white/10 text-off-white/50 hover:border-gold/40 hover:text-gold px-2.5 py-1.5 transition-all duration-200 cursor-pointer"
                  >
                    {qr}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="flex items-center gap-2 px-3 py-3 border-t border-white/5 bg-[#0d0d0d] flex-shrink-0">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question…"
                className="flex-1 bg-white/5 border border-white/8 text-off-white font-sans text-xs px-3 py-2.5 placeholder-white/20 focus:outline-none focus:border-gold/40 transition-colors duration-300 min-w-0"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isTyping}
                className="w-9 h-9 bg-gold flex items-center justify-center disabled:opacity-30 hover:bg-gold/80 transition-all duration-200 cursor-pointer flex-shrink-0"
              >
                <Send size={13} className="text-black" />
              </button>
            </div>

            {/* Footer note */}
            <div className="px-4 py-2 border-t border-white/5 bg-[#080808] flex-shrink-0">
              <p className="font-sans text-[9px] text-off-white/20 text-center tracking-wide">
                CREX AI · Powered by CREX ELITE · <Link to="/contact" onClick={() => setIsOpen(false)} className="hover:text-gold transition-colors">Talk to a human</Link>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
