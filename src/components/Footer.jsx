import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { AtSign, Share, Rss, Globe, Plus, Minus } from 'lucide-react'

const footerLinks = {
  Shop: [
    { label: 'Cricket Bats', to: '/category/bats' },
    { label: 'Batting Gloves', to: '/category/gear' },
    { label: 'Protective Gear', to: '/category/gear' },
    { label: 'Apparel', to: '/category/apparel' },
    { label: 'Accessories', to: '/category/gear' },
  ],
  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'Our Story', to: '/about' },
    { label: 'The Journal (Blog)', to: '/blog' },
    { label: 'Contact Us', to: '/contact' },
    { label: 'Size Guide', to: '/size-guide' },
  ],
  Support: [
    { label: 'FAQ & Help Centre', to: '/faq' },
    { label: 'Size Guide', to: '/size-guide' },
    { label: 'Member Locker', to: '/locker' },
    { label: 'Track Order', to: '/locker' },
    { label: 'Contact & Support', to: '/contact' },
  ],
}

const socials = [
  { icon: AtSign, label: 'Instagram', href: '#' },
  { icon: Share, label: 'Twitter', href: '#' },
  { icon: Rss, label: 'YouTube', href: '#' },
  { icon: Globe, label: 'Website', href: '#' },
]

export default function Footer() {
  const [openCategory, setOpenCategory] = useState(null)

  const toggleCategory = (cat) => {
    setOpenCategory(prev => prev === cat ? null : cat)
  }

  return (
    <footer className="relative bg-[#080808] border-t border-white/5">
      {/* Top section */}
      <div className="section-pad max-w-7xl mx-auto py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
          
          {/* Brand */}
          <div className="lg:col-span-2 flex flex-col items-start text-left">
            <motion.div
              className="flex items-center gap-2 mb-4 md:mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Link to="/" className="flex items-center gap-2">
                <span className="font-serif text-2xl font-light tracking-[0.2em] text-gold">CREX</span>
                <span className="w-px h-6 bg-gold/50" />
                <span className="font-serif text-2xl font-light tracking-[0.2em] text-off-white">ELITE</span>
              </Link>
            </motion.div>

            <p className="font-sans text-xs text-off-white/50 max-w-xs mb-6 md:mb-8 leading-relaxed">
              Crafting world-class cricket equipment for champions since 2026. Every bat, every glove, every stitch — made with passion for the game.
            </p>

            <div className="flex gap-4 mb-8 md:mb-0">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 border border-white/10 flex items-center justify-center text-off-white/40 hover:border-gold/50 hover:text-gold transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={13} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link Columns - Accordions on mobile */}
          {Object.entries(footerLinks).map(([category, links]) => {
            const isOpen = openCategory === category

            return (
              <div key={category} className="border-b border-white/5 md:border-b-0 pb-4 md:pb-0 text-left">
                {/* Accordion header button (mobile) / static header (desktop) */}
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full md:pointer-events-none flex justify-between items-center text-left py-2.5 md:py-0 mb-0 md:mb-6 cursor-pointer"
                >
                  <h4 className="font-sans text-[10px] tracking-widest uppercase text-gold font-semibold">
                    {category}
                  </h4>
                  {/* Plus/Minus toggles on mobile viewport */}
                  <span className="md:hidden text-gold">
                    {isOpen ? <Minus size={12} /> : <Plus size={12} />}
                  </span>
                </button>

                {/* Collapsible list */}
                <ul className={`md:block space-y-2 md:space-y-3 mt-3 md:mt-0 transition-all duration-300 ${
                  isOpen ? 'block' : 'hidden'
                }`}>
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="font-sans text-xs md:text-sm text-off-white/40 hover:text-off-white transition-colors duration-300 block py-1 md:py-0"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 bg-[#050505]">
        <div className="section-pad max-w-7xl mx-auto py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-[10px] md:text-xs text-off-white/30 tracking-wide">
            © 2026 CREX ELITE. Crafted for Champions.
          </p>
          <div className="flex items-center gap-6">
            {[
              { label: 'Privacy Policy', to: '/contact' },
              { label: 'Size Guide', to: '/size-guide' },
              { label: 'Contact', to: '/contact' },
            ].map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="font-sans text-[10px] md:text-xs text-off-white/20 hover:text-off-white/40 transition-colors duration-300 tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
