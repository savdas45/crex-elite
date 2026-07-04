import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, User, Clock, ArrowRight, X } from 'lucide-react'

const BLOG_POSTS = [
  {
    id: 1,
    title: 'The Art of the Willow: Grading English Willow Clefts',
    category: 'Craftsmanship',
    date: 'June 15, 2026',
    author: 'Krunal Champanera, Master Bat Maker',
    readTime: '5 min read',
    excerpt: 'Explore the hidden details that separate a Grade 1+ Pro cleft from standard willow, and how grain structure and wood density influence the power of your strokes.',
    image: '/bat_sovereign.png',
    content: `
      English Willow (Salix Alba Caerulea) is the heart of cricket. However, not all willow is created equal. In our Junagadh workshop, every bat begins as a raw cleft, which is meticulously graded from Grade 1+ (Pro Elite) down to Grade 3. Here is an inside look at how we select our timber.

      ### 1. Grain Straightness and Spacing
      The first visual check is the grain. A premium Grade 1+ cleft typically features 8 to 12 straight, evenly spaced grains running vertically down the face of the blade. Straight grains indicate uniform growth in the timber, resulting in an even, predictable response when striking the ball. While minor wavy grains do not impact performance, master batsmen prefer straight lines for structural confidence.

      ### 2. Sapwood vs. Heartwood
      * **Sapwood (White Willow):** This is the outer section of the tree trunk. It is soft, elastic, and provides the "spring" or rebound power. Almost the entire face of a Grade 1 bat is made of sapwood.
      * **Heartwood (Red Willow):** Sourced from the center of the tree, heartwood is denser and drier. While slightly less resilient than sapwood, it is highly durable. Some bats feature a "red wood edge" which adds stability and durability to the off-center strikes.

      ### 3. The Pressing Process: Hardness vs. Ping
      Pressing is where the magic happens. We press our clefts using hydraulic rollers at 2,000 PSI. If pressed too hard, the wood becomes brittle and has no "ping." If pressed too soft, it indents easily and performs poorly. Our master bat makers press each cleft individually, testing the wood's density by ear and feel to find the perfect equilibrium.
    `
  },
  {
    id: 2,
    title: 'Preparing for Battle: The Complete Bat Knocking-In Guide',
    category: 'Preparation',
    date: 'May 28, 2026',
    author: 'Marcus T., Professional Batsman',
    readTime: '7 min read',
    excerpt: 'A new bat is a raw block of compressed fibers. Learn the step-by-step master process of oiling, mallet knocking-in, and boundary prep to protect your investment.',
    image: '/bat_mallet.png',
    content: `
      Buying a Grade 1 English Willow bat is an investment. However, bringing a raw bat straight to the pitch without proper preparation is a recipe for immediate cracking. Knocking-in is the essential process of compressing the willow fibers to withstand strikes from a 5.5oz leather ball.

      ### Phase 1: Oiling (The Foundation)
      Before hitting the wood with a mallet, the willow must be hydrated. 
      * Apply a teaspoon of raw linseed oil to the face and edges of the blade.
      * Spread it evenly using a clean cloth or sponge. Avoid the handle and splice.
      * Let the bat dry horizontally for 24 hours. Repeat the process once.
      * *Caution:* Over-oiling makes the wood wet, heavy, and lifeless. Two light coats are all you need.

      ### Phase 2: Mallet Strikes (Compacting the Fibers)
      Using a hardwood mallet, you must gradually compress the fibers.
      * Focus on the edges first. Strike the edges at a 45-degree angle to round them off. Do not strike the edges directly at a 90-degree angle.
      * Gradually work your way to the face, striking the wood firmly.
      * Devote at least 4 hours of progressive knocking-in.
      * **The Test:** If a fingernail pressed into the willow leaves an indentation, the bat is not yet ready. It must be knocked until the wood is hard and resilient.

      ### Phase 3: Transition to Play
      Do not start by facing fast bowlers. Begin by hitting old, soft balls in a throw-down session. Gradually increase the pace, and only use new leather balls once you are fully confident the bat shows no seam marks or bruising.
    `
  },
  {
    id: 3,
    title: 'Data at the Crease: IoT Sensors in Modern Cricket',
    category: 'Technology',
    date: 'April 12, 2026',
    author: 'Dr. Sarah Chen, Sports Science Director',
    readTime: '6 min read',
    excerpt: 'How we integrated 3D gyroscopes and Bluetooth telemetry into bat handles to unlock swing speeds, swing path tracking, and connection metrics in real time.',
    image: '/smart_bat_sensor.png',
    content: `
      Cricket has historically relied on coach observation and video analysis to correct batting stances and swing mechanics. However, modern IoT (Internet of Things) tech is changing the game by bringing micro-telemetry right to the bat handle.

      ### The Anatomy of a Swing Sensor
      The CREX Smart-Sensor houses a high-frequency inertial measurement unit (IMU) featuring a 3D accelerometer and a 3D gyroscope. Operating at 500Hz (logging data 500 times per second), the sensor tracks every millimeter of motion.

      ### Key Telemetry Metrics
      * **Swing Speed (Max & Impact):** Measures the acceleration of the bat head. Higher speeds translate directly to boundary clearing power.
      * **Backlift and Downswing Angle:** Detects if the bat is coming down straight ("from second slip to mid-off") or curving, which can lead to edges.
      * **Time to Contact:** The split-second duration between the start of the downswing and impact. Essential for auditing shot reaction times.
      * **3D Path Reconstruction:** The app visualizes the entire swing arc in a 3D model, allowing coaches to identify wrist roll and alignment errors.

      Using Bluetooth Low Energy, this data transfers instantly to the player's smartphone, bridging the gap between raw intuition and empirical sports science.
    `
  }
]

const CRICKET_FACTS = {
  physics: [
    {
      title: "Willow Porosity & Cell Lumen",
      metric: "11% Optimal Moisture",
      desc: "Salix Alba Caerulea (English Willow) features a microscopic network of hollow tubes called lumens. When seasoned to 11% moisture, these lumens act as cellular air cushions, compressing under impact and springing back to shape, which gives the bat its rebound quality (or 'ping')."
    },
    {
      title: "Acoustical Resonance Profile",
      metric: "500Hz - 650Hz Frequencies",
      desc: "The characteristic sound of a well-pressed bat striking a leather ball isn't just aesthetic; it's acoustic sports science. Resonance frequencies between 500Hz and 650Hz indicate optimal timber stiffness. Dampened, lower frequencies often suggest excess moisture or crushed fibers."
    },
    {
      title: "Sapwood vs Heartwood Density",
      metric: "0.35g/cm³ vs 0.48g/cm³",
      desc: "The white sapwood on the outer edges has lower density and higher elasticity, making it perfect for the hitting face. The dark red heartwood from the tree's center is denser and heavier, providing structural rigidity and extreme resistance to shearing forces."
    }
  ],
  aerodynamics: [
    {
      title: "The Seam Turbulator Effect",
      metric: "6 Rows of Raised Stitching",
      desc: "A cricket ball's raised leather seam acts as a turbulator, tripping the boundary air layer from laminar to turbulent flow. This delayed separation reduces pressure drag and allows the ball to swing when angled relative to the oncoming air flow."
    },
    {
      title: "Relative Humid Air Drag",
      metric: "-1.2% Air Density in Rain",
      desc: "Humid air is actually less dense than dry air (since water vapor molecules are lighter than nitrogen and oxygen). Contrary to popular belief, the ball does not swing more because of damp air drag; rather, moisture swells the leather seam, accentuating the aerodynamic turbulence."
    },
    {
      title: "Pink Ball Poly-Coat Reflection",
      metric: "4 Layers of Lacquer",
      desc: "Pink balls used in day-night Tests are coated in multiple layers of polyurethane lacquer to preserve their visibility under artificial lights. This extra coating increases the surface slickness and maintains swing properties for up to 30 overs longer than traditional red leather."
    }
  ],
  conditioning: [
    {
      title: "Linseed Oil Polymerization",
      metric: "72-Hour Curing Period",
      desc: "Raw linseed oil is a drying oil that reacts with atmospheric oxygen (polymerization) to form a flexible, water-resistant solid film. This film prevents moisture loss, keeping the willow fibers supple so they bend rather than splinter under impact."
    },
    {
      title: "Mallet Compaction Mechanics",
      metric: "15% Surface Density Increase",
      desc: "Knocking-in with a mallet compresses the outer 3-5mm of wood fibers by up to 15%, raising the surface density. This creates a hard shield that protects the soft, underlying springy fibers from cracking under high-velocity impacts."
    },
    {
      title: "Shear Stress Splitting",
      metric: "4,000 PSI Peak Shear Limit",
      desc: "A leather match ball hitting a bat toe at 140 kph exerts a shear stress exceeding 4,000 PSI. Unprepared (un-knocked) bats lack the compacted surface layer, causing the grain to split along the vertical growth rings."
    }
  ]
}

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState(null)
  const [activeFactTab, setActiveFactTab] = useState('physics')
  const [activeAccordion, setActiveAccordion] = useState(null)

  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState('idle')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])


  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    if (!newsletterEmail) return
    setNewsletterStatus('submitting')
    setTimeout(() => {
      setNewsletterStatus('success')
      setNewsletterEmail('')
    }, 1000)
  }

  return (
    <div className="bg-black min-h-screen text-off-white pt-32 pb-24">
      {/* Blog Hero Header */}
      <div className="section-pad max-w-7xl mx-auto mb-16 text-center py-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, rgba(201, 168, 76, 0.05) 0%, transparent 70%)' }} />
        <p className="label-text mb-4">The Journal</p>
        <h1 className="heading-lg mb-6">
          CREX <span className="text-gold italic">Insights</span>
        </h1>
        <p className="body-text max-w-xl mx-auto mb-8 text-off-white/60 text-base font-light leading-relaxed">
          Expert analysis on bat craftsmanship, equipment preparation guides, performance apparel science, and IoT coaching analytics.
        </p>
        <div className="gold-line w-24 mx-auto" />
      </div>

      {/* Interactive Fact Library */}
      <div className="section-pad max-w-7xl mx-auto mb-24">
        <div className="text-center mb-12">
          <p className="label-text mb-4">Science Hub</p>
          <h2 className="heading-md">
            Cricket Science <span className="text-gold italic">Library</span>
          </h2>
          <p className="body-text max-w-xl mx-auto mt-4 text-off-white/50 text-sm font-light leading-relaxed">
            Explore the biological, physical, and aerodynamic factors that govern elite cricket performance.
          </p>
        </div>

        {/* Library Tabs */}
        <div className="flex justify-center gap-4 mb-12 border-b border-white/5 pb-6">
          {[
            { id: 'physics', label: 'Cleft Physics' },
            { id: 'aerodynamics', label: 'Ball Aerodynamics' },
            { id: 'conditioning', label: 'Conditioning Science' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFactTab(tab.id)}
              className={`px-5 py-2 font-sans text-[10px] tracking-widest uppercase border transition-all duration-300 cursor-pointer ${
                activeFactTab === tab.id
                  ? 'border-gold text-gold bg-gold/5'
                  : 'border-white/10 text-off-white/50 hover:border-gold/30 hover:text-gold'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CRICKET_FACTS[activeFactTab].map((fact, idx) => (
            <motion.div
              key={fact.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              className="bg-[#090909] border border-white/5 p-6 rounded-sm hover:border-gold/30 transition-all duration-300 text-left flex flex-col justify-between"
            >
              <div>
                <span className="font-sans text-[9px] tracking-widest uppercase text-gold/60">{fact.metric}</span>
                <h3 className="font-serif text-lg font-light text-off-white mt-3 mb-4">{fact.title}</h3>
                <p className="font-sans text-xs text-off-white/50 leading-relaxed">{fact.desc}</p>
              </div>
              <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center text-[9px] font-sans text-off-white/30 uppercase tracking-widest">
                <span>Verified Metric</span>
                <span className="text-gold">0{idx + 1}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>



      {/* Expert Masterclass Q&A */}
      <div className="section-pad max-w-4xl mx-auto mb-28 border-t border-white/5 pt-20">
        <div className="text-center mb-12">
          <p className="label-text mb-4">Insights & Audits</p>
          <h2 className="heading-md">
            Expert <span className="text-gold italic">Masterclass Q&A</span>
          </h2>
          <p className="body-text max-w-xl mx-auto mt-4 text-off-white/50 text-sm font-light leading-relaxed">
            Master bat makers answer key physical, molecular, and biological questions about performance cricket gear.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {[
            {
              q: "Does linseed oil expire, and how does it protect the bat?",
              a: "Linseed oil undergoes gradual polymerization upon contact with air, drying into a flexible organic seal. Over a season of play, this protective barrier wears out or gets clogged with soil particles. Re-applying a single light coat once a year replenishes this shield, protecting the cellulose fibers from swelling or fracturing."
            },
            {
              q: "Why is Kashmir Willow heavier and less elastic than English Willow?",
              a: "Kashmir Willow (Salix Alba) grows in warmer, faster climates with different soil conditions. This leads to thicker growth rings and smaller cellular lumens (cavities). Because the cells are smaller and wood density is higher, the bat is stiffer and heavier, which increases impact energy absorption (lower rebound speed) compared to English Willow."
            },
            {
              q: "How does cold weather affect English Willow performance?",
              a: "When temperatures drop below 12°C (54°F), the cellular walls of the willow lose their natural elasticity and become brittle. Hitting a hard leather ball in cold weather without progressive warm-up is the leading cause of edge splits."
            },
            {
              q: "What is the science behind the 'Sweet Spot'?",
              a: "The sweet spot is located at the bat's center of percussion and fundamental node of vibration. When the ball collides with this specific region, the rotational shock waves cancel out the translational recoil forces, sending minimal vibrations up the handle. This ensures that almost 100% of the kinetic energy is transferred back to the ball."
            }
          ].map((item, idx) => (
            <div key={idx} className="border border-white/10 bg-[#060606] rounded-sm overflow-hidden text-left">
              <button
                onClick={() => setActiveAccordion(activeAccordion === idx ? null : idx)}
                className="w-full p-5 flex justify-between items-center text-left font-serif text-base text-off-white hover:text-gold transition-colors cursor-pointer"
              >
                <span>{item.q}</span>
                <span className="text-gold ml-4">
                  {activeAccordion === idx ? '−' : '+'}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {activeAccordion === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="border-t border-white/5 bg-[#090909]"
                  >
                    <p className="font-sans text-xs text-off-white/60 p-5 leading-relaxed">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Blog Grid */}
      <div className="section-pad max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, idx) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-[#0c0c0c] border border-white/5 rounded-sm overflow-hidden flex flex-col justify-between hover:border-gold/30 transition-all duration-500 group"
            >
              <div>
                {/* Image Showcase */}
                <div className="relative aspect-video overflow-hidden bg-black flex items-center justify-center p-6 border-b border-white/5">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="h-full w-auto object-contain group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-85"
                  />
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 border border-gold/20 rounded-sm">
                    <span className="font-sans text-[9px] tracking-wider uppercase text-gold">{post.category}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-off-white/40 text-[10px] font-sans uppercase tracking-wider mb-3">
                    <span className="flex items-center gap-1"><Calendar size={10} /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
                  </div>
                  <h3 className="font-serif text-xl font-light text-off-white mb-3 group-hover:text-gold transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="font-sans text-xs text-off-white/50 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button 
                  onClick={() => setSelectedPost(post)}
                  className="font-sans text-[10px] tracking-widest uppercase text-gold hover:text-gold/70 transition-colors flex items-center gap-2 cursor-pointer group/btn"
                >
                  Read Article <ArrowRight size={10} className="transform group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* CREX Chronicle Newsletter */}
      <div className="section-pad max-w-5xl mx-auto mb-12">
        <div className="bg-gradient-to-br from-[#0c0c0c] to-[#040404] border border-gold/20 p-8 md:p-12 rounded-sm text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 30% 30%, #C9A84C 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
          <p className="label-text mb-4">Elite Newsletter</p>
          <h2 className="font-serif text-2xl md:text-3xl font-light text-off-white mb-4">
            Subscribe to the <span className="text-gold italic">CREX Chronicle</span>
          </h2>
          <p className="font-sans text-xs text-off-white/50 max-w-md mx-auto mb-8 leading-relaxed">
            Get monthly technical publications on sports engineering, exclusive workshop previews, and masterclass bat preparation guides direct to your inbox.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 bg-black border border-white/10 text-off-white px-4 py-3 font-sans text-xs rounded-sm focus:outline-none focus:border-gold transition-colors"
              required
            />
            <button
              type="submit"
              className="bg-gold text-black hover:bg-gold/80 transition-colors font-sans text-[10px] tracking-widest uppercase font-semibold px-6 py-3 cursor-pointer rounded-sm"
              disabled={newsletterStatus === 'submitting'}
            >
              {newsletterStatus === 'submitting' ? 'Subscribing...' : 'Join Chronicle'}
            </button>
          </form>

          {newsletterStatus === 'success' && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-sans text-[10px] text-emerald-400 mt-4 tracking-wider uppercase"
            >
              Subscription confirmed. Welcome to the inner circle.
            </motion.p>
          )}
        </div>
      </div>

      {/* Modal Article Viewer */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 overflow-y-auto"
            data-lenis-prevent
          >
            <motion.div 
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-[#0a0a0a] border border-white/10 w-full max-w-3xl rounded-sm shadow-2xl relative flex flex-col max-h-[85vh] overflow-hidden"
              data-lenis-prevent
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center border border-white/10 text-off-white/60 hover:border-gold hover:text-gold rounded-full bg-black/50 transition-all cursor-pointer"
                aria-label="Close article"
              >
                <X size={18} />
              </button>

              {/* Scrollable Container */}
              <div className="flex-1 min-h-0 overflow-y-auto p-6 md:p-12" data-lenis-prevent>
                {/* Meta details */}
                <div className="mb-6">
                  <span className="font-sans text-[9px] tracking-widest uppercase text-gold border border-gold/30 px-3 py-1 rounded-sm bg-gold/5">{selectedPost.category}</span>
                  <h2 className="font-serif text-3xl md:text-4xl font-light text-off-white mt-6 mb-4">
                    {selectedPost.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-6 text-off-white/40 text-[10px] font-sans uppercase tracking-widest border-b border-white/5 pb-6">
                    <span className="flex items-center gap-1.5"><Calendar size={12} /> {selectedPost.date}</span>
                    <span className="flex items-center gap-1.5"><User size={12} /> {selectedPost.author}</span>
                    <span className="flex items-center gap-1.5"><Clock size={12} /> {selectedPost.readTime}</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="prose prose-invert max-w-none text-off-white/70 font-sans text-xs md:text-sm leading-relaxed space-y-6">
                  {selectedPost.content.split('\n\n').map((para, i) => {
                    const text = para.trim();
                    if (!text) return null;

                    // Markdown headers styling
                    if (text.startsWith('### ')) {
                      return <h4 key={i} className="font-serif text-lg text-gold mt-6 mb-2 font-normal">{text.replace('### ', '')}</h4>;
                    }
                    if (text.startsWith('* **')) {
                      // bullet items
                      const items = text.split('\n').map(item => item.trim());
                      return (
                        <ul key={i} className="list-disc pl-5 space-y-2 mt-2">
                          {items.map((it, idx) => (
                            <li key={idx} dangerouslySetInnerHTML={{ __html: it.replace('* **', '<strong>').replace('**:', '</strong>:') }} />
                          ))}
                        </ul>
                      );
                    }

                    return <p key={i} className="text-justify leading-loose" dangerouslySetInnerHTML={{ __html: text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />;
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
