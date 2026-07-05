import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Search, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const faqData = [
  {
    category: 'Orders & Shipping',
    icon: '📦',
    items: [
      {
        q: 'How long does order processing take?',
        a: 'All orders are processed within 1–2 business days from our workshop in Junagadh, Gujarat. You will receive a shipping confirmation email with a tracking number once your order is dispatched.',
      },
      {
        q: 'Which areas do you deliver to?',
        a: 'We currently deliver across all major cities and towns in India. We are actively working on international shipping to the UK, Australia, and UAE — sign up to our newsletter to be notified when it launches.',
      },
      {
        q: 'What are the standard delivery timelines?',
        a: 'Standard delivery: 5–7 business days. Express delivery (select cities): 2–3 business days. Custom bat orders: 10–14 business days due to hand-crafting and knocking time.',
      },
      {
        q: 'How do I track my order?',
        a: 'You can track your order directly from your Member Locker dashboard. Navigate to the Workshop Tracker tab and enter your order ID. You will receive email updates at each milestone.',
      },
      {
        q: 'Can I modify or cancel my order after placing it?',
        a: 'Orders can be modified or cancelled within 24 hours of placement by contacting our support team. Once the bat has entered the crafting stage, modifications to custom orders cannot be made.',
      },
    ],
  },
  {
    category: 'Products & Bats',
    icon: '🏏',
    items: [
      {
        q: 'What willow grade do you use in your bats?',
        a: 'Our premium range (Sovereign, Legacy, Eclipse) uses Grade 1+ English Willow — the highest available, with tight grains, minimal blemishes, and maximum pickup. Our mid-range uses Grade 2 English Willow, offering excellent performance at a competitive price point.',
      },
      {
        q: 'Do your bats require knocking-in before use?',
        a: 'Yes — all English Willow bats require knocking-in before first use in a match. We recommend 4–6 hours of knock-in with a bat mallet and 2 hours of throw-down practice before facing hard balls. Our Bat Care Guidelines page has a full step-by-step guide.',
      },
      {
        q: 'How do I know which bat weight is right for me?',
        a: 'Most adult batters perform best with a bat between 1,150g – 1,200g. Aggressive stroke players often prefer heavier bats (1,200g+) while technical players prefer lighter bats for faster bat speed. Visit our Bat Fitter Guide for a personalized recommendation.',
      },
      {
        q: 'Do you offer custom-engraved bats?',
        a: 'Yes, we offer custom toe guards, grip colors, and edge stickers across selected models. For fully personalized bats with custom engravings and profile modifications, contact us directly — our master shaper Krunal Champanera will handle your order personally.',
      },
      {
        q: 'What is the difference between Short Handle and Long Handle bats?',
        a: 'Short Handle (SH) is the industry standard used by most professional adult players. Long Handle (LH) provides approximately 1.25 inches of extra reach and is designed for players over 6\'2\" or those who prefer a more bottom-handed grip style.',
      },
    ],
  },
  {
    category: 'Returns & Warranty',
    icon: '🔁',
    items: [
      {
        q: 'What is your returns policy?',
        a: 'We offer a 14-day returns window from the date of delivery for unused, unaltered items in their original packaging. Custom-order bats and personalized items are non-returnable. To initiate a return, contact our support team with your order ID.',
      },
      {
        q: 'What does the warranty cover?',
        a: 'All CREX ELITE bats carry a 6-month manufacturing warranty covering defects in the wood grain and handle. The warranty does not cover natural cracking from normal use, toe damage, or damage caused by incorrect knocking-in. Protective gear carries a 3-month warranty.',
      },
      {
        q: 'My bat arrived with a crack. What do I do?',
        a: 'If your bat arrives with a structural crack (not surface grain lines, which are normal), please photograph it immediately and email our support team within 48 hours of delivery. We will arrange a free replacement or repair at no charge to you.',
      },
      {
        q: 'Are surface grain lines on my bat a defect?',
        a: 'No — surface grain lines are a natural characteristic of English Willow and are not a manufacturing defect. They indicate a natural wood product and do not affect performance. Only deep structural cracks that affect the bat profile are covered under warranty.',
      },
    ],
  },
  {
    category: 'Teamwear & Bulk Orders',
    icon: '👕',
    items: [
      {
        q: 'What is the minimum order for teamwear?',
        a: 'Our minimum order for custom teamwear kits (jerseys + trousers) is 11 units — a full playing XI. We also accept smaller orders of 5+ units for training kits without full custom printing.',
      },
      {
        q: 'How long does a custom teamwear order take?',
        a: 'Standard teamwear with name and number printing takes 10–12 business days. Fully custom designs with logo embroidery and sublimation printing take 14–18 business days. Rush orders are available for select quantities — enquire via Contact.',
      },
      {
        q: 'Can I supply my own club logo for the jerseys?',
        a: 'Yes — we accept logo files in SVG, AI, or high-resolution PNG (minimum 300 DPI) format. Our design team will provide a digital proof for approval before production begins. A ₹500 design setup fee applies for first-time orders.',
      },
      {
        q: 'Do you offer discounts for school and academy orders?',
        a: 'Yes. We offer structured bulk pricing for schools, academies, and registered cricket associations. Orders of 30+ units receive 15% discount; orders of 60+ units receive 22% discount. Contact us with your institution details to receive a formal quote.',
      },
    ],
  },
]

export default function FAQ() {
  const [openItem, setOpenItem] = useState(null)
  const [activeCategory, setActiveCategory] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const toggle = (id) => setOpenItem(prev => prev === id ? null : id)

  const allItems = faqData.flatMap((cat, ci) =>
    cat.items.map((item, qi) => ({ ...item, id: `${ci}-${qi}`, category: cat.category }))
  )

  const filtered = searchQuery.trim()
    ? allItems.filter(item =>
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : null

  const displayData = filtered
    ? [{ category: `Results for "${searchQuery}"`, icon: '🔍', items: filtered }]
    : activeCategory
      ? faqData.filter(c => c.category === activeCategory)
      : faqData

  return (
    <div className="bg-black min-h-screen pt-24 pb-20">
      {/* Hero Header */}
      <div className="section-pad max-w-5xl mx-auto pt-10 pb-14">
        <motion.p
          className="font-sans text-[10px] tracking-widest uppercase text-gold mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Help Centre
        </motion.p>
        <motion.h1
          className="font-serif text-4xl md:text-6xl font-light text-off-white leading-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          Frequently Asked
          <br />
          <span className="text-gold">Questions</span>
        </motion.h1>
        <motion.p
          className="font-sans text-sm text-off-white/50 max-w-xl leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Everything you need to know about our products, orders, and services. Can't find your answer? Our support team is here to help.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          className="relative mt-8 max-w-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-off-white/30" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setActiveCategory(null) }}
            placeholder="Search questions…"
            className="w-full bg-white/5 border border-white/10 text-off-white font-sans text-sm pl-10 pr-4 py-3 placeholder-white/20 focus:outline-none focus:border-gold/50 transition-colors duration-300"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-off-white/30 hover:text-gold transition-colors text-xs"
            >
              ✕
            </button>
          )}
        </motion.div>
      </div>

      <div className="section-pad max-w-5xl mx-auto">
        {/* Category Pills */}
        {!searchQuery && (
          <div className="flex flex-wrap gap-2 mb-12">
            <button
              onClick={() => setActiveCategory(null)}
              className={`font-sans text-[10px] tracking-widest uppercase px-4 py-2 border transition-all duration-300 cursor-pointer ${
                !activeCategory ? 'bg-gold border-gold text-black font-semibold' : 'border-white/10 text-off-white/50 hover:border-gold/40 hover:text-gold'
              }`}
            >
              All Topics
            </button>
            {faqData.map(cat => (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
                className={`font-sans text-[10px] tracking-widest uppercase px-4 py-2 border transition-all duration-300 cursor-pointer ${
                  activeCategory === cat.category ? 'bg-gold border-gold text-black font-semibold' : 'border-white/10 text-off-white/50 hover:border-gold/40 hover:text-gold'
                }`}
              >
                {cat.icon} {cat.category}
              </button>
            ))}
          </div>
        )}

        {/* FAQ Sections */}
        <div className="flex flex-col gap-12">
          {displayData.map((section, si) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: si * 0.05 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xl">{section.icon}</span>
                <h2 className="font-sans text-[10px] tracking-widest uppercase text-gold font-semibold">
                  {section.category}
                </h2>
                <div className="flex-1 h-px bg-white/5" />
                <span className="font-sans text-[9px] text-off-white/25 uppercase tracking-widest">
                  {section.items.length} questions
                </span>
              </div>

              <div className="flex flex-col gap-1">
                {section.items.map((item, qi) => {
                  const id = item.id || `${si}-${qi}`
                  const isOpen = openItem === id

                  return (
                    <div key={id} className={`border border-white/5 transition-all duration-300 ${isOpen ? 'border-gold/20 bg-white/[0.02]' : 'hover:border-white/10'}`}>
                      <button
                        onClick={() => toggle(id)}
                        className="w-full flex justify-between items-start gap-4 px-5 py-4 text-left cursor-pointer"
                      >
                        <span className={`font-sans text-sm leading-snug transition-colors duration-300 ${isOpen ? 'text-gold' : 'text-off-white/80'}`}>
                          {item.q}
                        </span>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.25 }}
                          className="flex-shrink-0 mt-0.5"
                        >
                          <ChevronDown size={14} className={isOpen ? 'text-gold' : 'text-off-white/30'} />
                        </motion.div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <p className="font-sans text-sm text-off-white/55 leading-relaxed px-5 pb-5 border-t border-white/5 pt-3">
                              {item.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* No results */}
        {filtered && filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="font-sans text-sm text-off-white/30">No questions match your search.</p>
            <button onClick={() => setSearchQuery('')} className="mt-4 font-sans text-xs text-gold hover:underline">Clear search</button>
          </div>
        )}

        {/* Still need help CTA */}
        <div className="mt-16 border border-white/5 bg-white/[0.02] p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 border border-gold/30 flex items-center justify-center flex-shrink-0">
              <MessageCircle size={16} className="text-gold" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-light text-off-white mb-1">Still have a question?</h3>
              <p className="font-sans text-xs text-off-white/40 leading-relaxed max-w-sm">
                Our support team based in Junagadh is available Mon–Sat, 9am–6pm IST. We typically respond within 4 hours.
              </p>
            </div>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link to="/contact" className="btn-primary text-xs px-6 py-2.5">Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
