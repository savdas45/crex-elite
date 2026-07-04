import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { AtSign, Share, Rss, Globe } from 'lucide-react'

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
    { label: 'Size Guide', to: '/size-guide' },
    { label: 'Member Locker', to: '/locker' },
    { label: 'Track Order', to: '/locker' },
    { label: 'Bat Care Guidelines', to: '/about' },
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
  return (
    <footer className="relative bg-charcoal border-t border-gold/20">
      {/* Top section */}
      <div className="section-pad max-w-7xl mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              className="flex items-center gap-2 mb-6"
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

            <p className="body-text max-w-xs mb-8 leading-loose">
              Crafting world-class cricket equipment for champions since 2026. Every bat, every glove, every stitch — made with passion for the game.
            </p>

            <div className="flex gap-4">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 border border-white/10 flex items-center justify-center text-off-white/40 hover:border-gold/50 hover:text-gold transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon size={14} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-sans text-xs tracking-widest uppercase text-gold mb-6">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="font-sans text-sm text-off-white/40 hover:text-off-white transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="section-pad max-w-7xl mx-auto py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-off-white/30 tracking-wide">
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
                className="font-sans text-xs text-off-white/25 hover:text-off-white/50 transition-colors duration-300 tracking-wide"
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
