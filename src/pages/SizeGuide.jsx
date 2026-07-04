import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Ruler, ChevronDown, ChevronUp } from 'lucide-react'

const batSizes = [
  { size: 'Size 1', age: '4–5 yrs', height: 'Up to 4\'3"', weight: '1,050–1,080g' },
  { size: 'Size 2', age: '5–6 yrs', height: '4\'3" – 4\'6"', weight: '1,060–1,090g' },
  { size: 'Size 3', age: '6–7 yrs', height: '4\'6" – 4\'9"', weight: '1,070–1,100g' },
  { size: 'Size 4', age: '7–9 yrs', height: '4\'9" – 5\'0"', weight: '1,080–1,110g' },
  { size: 'Size 5', age: '9–11 yrs', height: '5\'0" – 5\'3"', weight: '1,090–1,120g' },
  { size: 'Size 6', age: '11–13 yrs', height: '5\'3" – 5\'6"', weight: '1,100–1,140g' },
  { size: 'Harrow', age: '13–15 yrs', height: '5\'6" – 5\'9"', weight: '1,120–1,160g' },
  { size: 'Short Handle', age: '15+ yrs', height: '5\'7" – 6\'2"', weight: '1,140–1,210g' },
  { size: 'Long Handle', age: 'Adult', height: '6\'2"+', weight: '1,160–1,230g' },
]

const apparelSizes = {
  jersey: [
    { size: 'XXS', chest: '30–32"', waist: '24–26"', hip: '33–35"' },
    { size: 'XS', chest: '32–34"', waist: '26–28"', hip: '35–37"' },
    { size: 'S', chest: '35–37"', waist: '29–31"', hip: '38–40"' },
    { size: 'M', chest: '38–40"', waist: '32–34"', hip: '41–43"' },
    { size: 'L', chest: '41–43"', waist: '35–37"', hip: '44–46"' },
    { size: 'XL', chest: '44–46"', waist: '38–40"', hip: '47–49"' },
    { size: 'XXL', chest: '47–49"', waist: '41–43"', hip: '50–52"' },
    { size: 'XXXL', chest: '50–52"', waist: '44–46"', hip: '53–55"' },
  ],
  trousers: [
    { waist: '28"', hip: '37"', inseam: '30"', fit: 'XS' },
    { waist: '30"', hip: '39"', inseam: '30"', fit: 'S' },
    { waist: '32"', hip: '41"', inseam: '31"', fit: 'M' },
    { waist: '34"', hip: '43"', inseam: '31"', fit: 'L' },
    { waist: '36"', hip: '45"', inseam: '32"', fit: 'XL' },
    { waist: '38"', hip: '47"', inseam: '32"', fit: 'XXL' },
    { waist: '40"', hip: '49"', inseam: '33"', fit: 'XXXL' },
  ],
}

const faqs = [
  {
    q: 'What bat size do professionals use?',
    a: 'Almost all professional adult players use a Short Handle bat regardless of height. This is the industry standard. Long Handle is used by very tall players (6\'2"+) who need extra reach for low deliveries.'
  },
  {
    q: 'How do I measure for a jersey?',
    a: 'Use a soft measuring tape around the fullest part of your chest (under the arms). Keep the tape flat. For the best athletic fit, choose a size where your chest measurement matches or is slightly below the listed maximum.'
  },
  {
    q: 'Do your batting pads come in different sizes?',
    a: 'Yes — our pads are available in Short, Regular, and Long lengths. Measure from the center of your kneecap to the top of your foot for the correct length. The standard adult Regular fits most players between 5\'6" and 6\'2".'
  },
  {
    q: 'Are gloves the same for left and right handed batsmen?',
    a: 'No — batting gloves are handed. The top hand (left for a right-hander) takes the most impact and has extra padding, so always specify your batting hand when ordering.'
  },
  {
    q: 'How should a helmet fit?',
    a: 'The helmet should sit level on your head, approximately one inch above your eyebrows. It should feel snug with no side-to-side movement. The grille should not touch your nose. Measure head circumference at its widest point.'
  },
]

function FaqItem({ faq }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-white/5 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="font-serif text-lg font-light text-off-white group-hover:text-gold transition-colors duration-300 pr-6">
          {faq.q}
        </span>
        <span className="text-gold/60 flex-shrink-0">
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <p className="font-sans text-sm text-off-white/60 leading-relaxed pb-6 pr-8">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function SizeGuide() {
  const [activeTab, setActiveTab] = useState('bats')

  const tabs = [
    { id: 'bats', label: 'Cricket Bats' },
    { id: 'jersey', label: 'Jerseys & Tops' },
    { id: 'trousers', label: 'Trousers & Lowers' },
  ]

  return (
    <div className="bg-black min-h-screen text-off-white pt-32 pb-24">
      {/* Header */}
      <div className="section-pad max-w-7xl mx-auto mb-16 text-center py-10 relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(circle at center, rgba(201,168,76,0.05) 0%, transparent 70%)' }}
        />
        <p className="label-text mb-4">Find Your Perfect Fit</p>
        <h1 className="heading-lg text-off-white mb-6">
          Size <span className="text-gold italic">Guide</span>
        </h1>
        <p className="body-text max-w-xl mx-auto text-off-white/60">
          Our expert-crafted sizing charts ensure you get the optimal fit for peak performance. When in doubt, always size up.
        </p>
        <div className="gold-line w-24 mx-auto mt-8" />
      </div>

      <div className="section-pad max-w-7xl mx-auto">
        {/* How to Measure Tips */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: '📏', title: 'Bat Length', tip: 'Stand upright. Hold the bat vertically beside your leg. The top of the handle should reach your hip bone.' },
            { icon: '👕', title: 'Jersey Chest', tip: 'Measure around the fullest part of your chest, keeping the tape horizontal. Add 1–2 inches for a performance fit.' },
            { icon: '🩳', title: 'Trouser Waist', tip: 'Measure around your natural waist (above the hip bone). For trousers, add 1 inch for comfort allowance.' },
          ].map((tip) => (
            <div key={tip.title} className="border border-white/5 bg-charcoal/20 p-6">
              <div className="text-3xl mb-4">{tip.icon}</div>
              <h3 className="font-serif text-xl font-light text-off-white mb-3">{tip.title}</h3>
              <p className="font-sans text-xs text-off-white/50 leading-relaxed">{tip.tip}</p>
            </div>
          ))}
        </div>

        {/* Size Chart Tabs */}
        <div className="mb-10">
          <div className="flex gap-0 border-b border-white/10 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-sans text-xs tracking-widest uppercase transition-all duration-300 border-b-2 -mb-px ${
                  activeTab === tab.id
                    ? 'border-gold text-gold'
                    : 'border-transparent text-off-white/40 hover:text-off-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'bats' && (
              <motion.div
                key="bats"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/10">
                        {['Size', 'Age Range', 'Player Height', 'Bat Weight'].map(h => (
                          <th key={h} className="font-sans text-[10px] tracking-widest uppercase text-gold/70 pb-4 pr-8">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {batSizes.map((row, i) => (
                        <motion.tr
                          key={row.size}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 }}
                          className={`border-b border-white/5 ${row.size === 'Short Handle' ? 'bg-gold/5' : ''}`}
                        >
                          <td className="py-4 pr-8">
                            <span className="font-serif text-base text-off-white font-light">{row.size}</span>
                            {row.size === 'Short Handle' && (
                              <span className="ml-2 font-sans text-[9px] tracking-widest uppercase px-2 py-0.5 border border-gold/50 text-gold">Most Popular</span>
                            )}
                          </td>
                          <td className="py-4 pr-8 font-sans text-sm text-off-white/60">{row.age}</td>
                          <td className="py-4 pr-8 font-sans text-sm text-off-white/60">{row.height}</td>
                          <td className="py-4 font-sans text-sm text-off-white/60">{row.weight}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'jersey' && (
              <motion.div
                key="jersey"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                <div className="mb-4 flex gap-4">
                  <span className="font-sans text-[10px] tracking-widest uppercase text-off-white/30">Applies to: Pro Training Jersey · Women Elite Jersey · Practice Jersey Full</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/10">
                        {['Size', 'Chest', 'Waist', 'Hip'].map(h => (
                          <th key={h} className="font-sans text-[10px] tracking-widest uppercase text-gold/70 pb-4 pr-10">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {apparelSizes.jersey.map((row, i) => (
                        <motion.tr
                          key={row.size}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 }}
                          className="border-b border-white/5"
                        >
                          <td className="py-4 pr-10 font-serif text-base text-off-white font-light">{row.size}</td>
                          <td className="py-4 pr-10 font-sans text-sm text-off-white/60">{row.chest}</td>
                          <td className="py-4 pr-10 font-sans text-sm text-off-white/60">{row.waist}</td>
                          <td className="py-4 font-sans text-sm text-off-white/60">{row.hip}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'trousers' && (
              <motion.div
                key="trousers"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                <div className="mb-4">
                  <span className="font-sans text-[10px] tracking-widest uppercase text-off-white/30">Applies to: Elite Match Trousers · Elite Practice Trousers</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/10">
                        {['Waist', 'Hip', 'Inseam', 'UK Size'].map(h => (
                          <th key={h} className="font-sans text-[10px] tracking-widest uppercase text-gold/70 pb-4 pr-10">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {apparelSizes.trousers.map((row, i) => (
                        <motion.tr
                          key={row.waist}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 }}
                          className="border-b border-white/5"
                        >
                          <td className="py-4 pr-10 font-serif text-base text-off-white font-light">{row.waist}</td>
                          <td className="py-4 pr-10 font-sans text-sm text-off-white/60">{row.hip}</td>
                          <td className="py-4 pr-10 font-sans text-sm text-off-white/60">{row.inseam}</td>
                          <td className="py-4 font-sans text-sm text-gold/80">{row.fit}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* FAQ Accordion */}
        <div className="mt-24 border-t border-white/5 pt-16">
          <div className="text-center mb-12">
            <p className="label-text mb-4">Sizing Questions</p>
            <h2 className="heading-md text-off-white">
              Frequently <span className="text-gold italic">Asked</span>
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq) => (
              <FaqItem key={faq.q} faq={faq} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
