import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Menu, X, ShoppingBag, Heart, Search, ChevronDown, User } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

gsap.registerPlugin(ScrollTrigger)

const categories = [
  { name: 'Bats', to: '/category/bats', desc: 'Handcrafted Grade 1 English Willow bats' },
  { name: 'Gear', to: '/category/gear', desc: 'Elite protection, helmets & pads' },
  { name: 'Apparel', to: '/category/apparel', desc: 'Premium matches & training wear' },
  { name: 'Accessories', to: '/category/accessories', desc: 'Crucial on-field essentials' },
  { name: 'Coaching', to: '/category/coaching', desc: 'Elite training & practice gear' },
]

const mainLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop', isDropdown: true },
  { label: 'Teamwear', to: '/teamwear' },
  { label: 'Bat Fitter', to: '/bat-fitter' },
  { label: 'Blog', to: '/blog' },
  { label: 'About', to: '/about' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false)
  const [mobileShopOpen, setMobileShopOpen] = useState(false)
  const { totalItems, toggleCart } = useCart()
  const { items: wishlistItems } = useWishlist()
  const navigate = useNavigate()
  const location = useLocation()
  const searchRef = useRef()

  // Track scroll direction for hide/show behaviour
  useEffect(() => {
    let lastScrollY = window.scrollY
    let scrollTimer = null

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Mark as scrolled (for background change) after 80px
      setScrolled(currentScrollY > 80)

      // Hide navbar when scrolling DOWN (and past the hero a bit)
      if (currentScrollY > 120) {
        if (currentScrollY > lastScrollY) {
          setHidden(true)
        } else {
          setHidden(false)
        }
      } else {
        setHidden(false)
      }

      lastScrollY = currentScrollY

      // Show navbar again when scrolling stops
      clearTimeout(scrollTimer)
      scrollTimer = setTimeout(() => {
        setHidden(false)
      }, 300)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimer)
    }
  }, [])

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus()
  }, [searchOpen])

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false)
    setShopDropdownOpen(false)
    setMobileShopOpen(false)
  }, [location.pathname])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: hidden ? -100 : 0, 
          opacity: hidden ? 0 : 1 
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-colors duration-700 ${
          scrolled 
            ? 'bg-black/90 backdrop-blur-xl border-b border-white/5 shadow-2xl' 
            : 'bg-transparent'
        }`}
      >
        <div className="section-pad flex items-center justify-between py-5">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="font-serif text-2xl font-light tracking-[0.2em] text-gold">CREX</span>
            <span className="w-px h-6 bg-gold/50" />
            <span className="font-serif text-2xl font-light tracking-[0.2em] text-off-white">ELITE</span>
          </Link>

          {/* Desktop Nav links */}
          <div className="hidden md:flex items-center gap-8">
            {mainLinks.map((link, i) => (
              <motion.div key={link.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.5, duration: 0.6 }}
              >
                {link.isDropdown ? (
                  <div
                    className="relative py-2 cursor-pointer"
                    onMouseEnter={() => setShopDropdownOpen(true)}
                    onMouseLeave={() => setShopDropdownOpen(false)}
                  >
                    <span
                      className={`relative flex items-center gap-1.5 font-sans text-[11px] tracking-widest uppercase transition-colors duration-300 group ${
                        location.pathname.startsWith('/category') ? 'text-gold' : 'text-off-white/70 hover:text-gold'
                      }`}
                    >
                      {link.label}
                      <ChevronDown size={10} className={`transition-transform duration-300 ${shopDropdownOpen ? 'rotate-180' : ''}`} />
                      <span className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-500 ${
                        location.pathname.startsWith('/category') ? 'w-full' : 'w-0 group-hover:w-full'
                      }`} />
                    </span>

                    <AnimatePresence>
                      {shopDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className="absolute top-full left-0 mt-3 w-48 bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/15 py-2 shadow-2xl z-[150] rounded-sm flex flex-col text-left"
                        >
                          {categories.map((cat) => (
                            <Link
                              key={cat.name}
                              to={cat.to}
                              onClick={() => setShopDropdownOpen(false)}
                              className="group flex items-center justify-between px-4 py-2.5 hover:bg-white/[0.04] transition-all duration-300"
                            >
                              <span className="font-sans text-[10px] tracking-wider uppercase text-off-white/70 group-hover:text-gold transition-colors duration-300">
                                {cat.name}
                              </span>
                              <span className="w-1 h-1 rounded-full bg-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to={link.to}
                    className={`relative font-sans text-[11px] tracking-widest uppercase transition-colors duration-300 group ${
                      location.pathname === link.to || (link.to !== '/' && location.pathname.startsWith(link.to))
                        ? 'text-gold' : 'text-off-white/70 hover:text-gold'
                    }`}
                  >
                    {link.label}
                    <span className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-500 ${
                      location.pathname === link.to || (link.to !== '/' && location.pathname.startsWith(link.to)) ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                  </Link>
                )}
              </motion.div>
            ))}
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="hidden md:flex w-9 h-9 items-center justify-center text-off-white/50 hover:text-gold transition-colors duration-300"
              aria-label="Search"
            >
              <Search size={16} />
            </button>

            {/* Locker Portal */}
            <Link
              to="/locker"
              className="hidden md:flex w-9 h-9 items-center justify-center text-off-white/50 hover:text-gold transition-colors duration-300 relative"
              aria-label="Member Locker"
            >
              <User size={16} />
            </Link>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="hidden md:flex w-9 h-9 items-center justify-center text-off-white/50 hover:text-gold transition-colors duration-300 relative"
              aria-label="Wishlist"
            >
              <Heart size={16} />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold text-black font-sans text-[9px] font-bold flex items-center justify-center rounded-full">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={toggleCart}
              className="hidden md:flex w-9 h-9 items-center justify-center text-off-white/50 hover:text-gold transition-colors duration-300 relative"
              aria-label="Cart"
            >
              <ShoppingBag size={16} />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-gold text-black font-sans text-[9px] font-bold flex items-center justify-center rounded-full"
                  >
                    {totalItems > 9 ? '9+' : totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Shop Now */}
            <Link to="/category/bats" className="hidden md:inline-flex btn-primary text-xs py-2.5 px-5">
              Shop Now
            </Link>

            {/* Mobile hamburger */}
            <motion.button
              className="md:hidden text-off-white hover:text-gold transition-colors duration-300 relative"
              onClick={() => setMenuOpen(!menuOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
              {totalItems > 0 && !menuOpen && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold text-black font-sans text-[9px] font-bold flex items-center justify-center rounded-full">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </motion.button>
          </div>
        </div>

        {/* Search bar (desktop) */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-white/5 bg-black/95 backdrop-blur-xl"
            >
              <form onSubmit={handleSearch} className="section-pad max-w-3xl mx-auto py-4 flex items-center gap-4">
                <Search size={16} className="text-off-white/30 flex-shrink-0" />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search products…"
                  className="flex-1 bg-transparent font-sans text-sm text-off-white placeholder-white/20 focus:outline-none"
                />
                <button type="submit" className="font-sans text-[10px] tracking-widest uppercase text-gold hover:text-gold/70 transition-colors duration-300 flex-shrink-0">
                  Search
                </button>
                <button type="button" onClick={() => setSearchOpen(false)} className="text-off-white/30 hover:text-gold transition-colors duration-300">
                  <X size={16} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile slide-out drawer menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Dark overlay backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[140] bg-black/60 backdrop-blur-sm"
            />

            {/* Slide-out Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-[360px] z-[150] bg-[#080808]/98 backdrop-blur-xl border-l border-white/5 flex flex-col justify-between shadow-2xl h-screen overflow-hidden text-left"
            >
              {/* Drawer Header */}
              <div className="flex justify-between items-center px-6 py-5 border-b border-white/5 bg-[#0a0a0a]">
                <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-1.5">
                  <span className="font-serif text-lg tracking-[0.15em] text-gold font-light">CREX</span>
                  <span className="font-serif text-lg tracking-[0.15em] text-off-white font-light">ELITE</span>
                </Link>
                <button onClick={() => setMenuOpen(false)} className="text-off-white/40 hover:text-gold transition-colors duration-300">
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Content - Scrollable */}
              <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-8 scrollbar-none" data-lenis-prevent>
                {/* Shop Categories Accordion */}
                <div>
                  <span className="block font-sans text-[9px] uppercase tracking-widest text-off-white/30 mb-4 font-semibold">Shop Categories</span>
                  <div className="flex flex-col gap-3">
                    {categories.map(cat => (
                      <Link
                        key={cat.name}
                        to={cat.to}
                        onClick={() => setMenuOpen(false)}
                        className={`flex justify-between items-center py-1 font-sans text-xs tracking-wider uppercase ${
                          location.pathname === cat.to ? 'text-gold' : 'text-off-white/70 hover:text-gold'
                        }`}
                      >
                        <span>{cat.name}</span>
                        <span className="text-[10px] text-off-white/20">➔</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Explore Sections */}
                <div>
                  <span className="block font-sans text-[9px] uppercase tracking-widest text-off-white/30 mb-4 font-semibold">Explore</span>
                  <div className="flex flex-col gap-3">
                    <Link to="/" onClick={() => setMenuOpen(false)} className={`block py-1 font-sans text-xs tracking-wider uppercase ${location.pathname === '/' ? 'text-gold' : 'text-off-white/70 hover:text-gold'}`}>Home</Link>
                    <Link to="/teamwear" onClick={() => setMenuOpen(false)} className={`block py-1 font-sans text-xs tracking-wider uppercase ${location.pathname === '/teamwear' ? 'text-gold' : 'text-off-white/70 hover:text-gold'}`}>Teamwear</Link>
                    <Link to="/bat-fitter" onClick={() => setMenuOpen(false)} className={`block py-1 font-sans text-xs tracking-wider uppercase ${location.pathname === '/bat-fitter' ? 'text-gold' : 'text-off-white/70 hover:text-gold'}`}>Bat Fitter Guide</Link>
                    <Link to="/blog" onClick={() => setMenuOpen(false)} className={`block py-1 font-sans text-xs tracking-wider uppercase ${location.pathname === '/blog' ? 'text-gold' : 'text-off-white/70 hover:text-gold'}`}>Blog</Link>
                    <Link to="/about" onClick={() => setMenuOpen(false)} className={`block py-1 font-sans text-xs tracking-wider uppercase ${location.pathname === '/about' ? 'text-gold' : 'text-off-white/70 hover:text-gold'}`}>About Us</Link>
                  </div>
                </div>

                {/* User Account Portal shortcut */}
                <div>
                  <span className="block font-sans text-[9px] uppercase tracking-widest text-off-white/30 mb-4 font-semibold">Your Account</span>
                  <div className="flex flex-col gap-3">
                    <Link to="/locker" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 py-1 font-sans text-xs tracking-wider uppercase text-off-white/70 hover:text-gold">
                      <User size={13} className="text-gold" />
                      <span>Member Locker</span>
                    </Link>
                    <Link to="/wishlist" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 py-1 font-sans text-xs tracking-wider uppercase text-off-white/70 hover:text-gold">
                      <Heart size={13} className="text-gold" />
                      <span>Wishlist ({wishlistItems.length})</span>
                    </Link>
                    <Link to="/contact" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 py-1 font-sans text-xs tracking-wider uppercase text-off-white/70 hover:text-gold">
                      <ShoppingBag size={13} className="text-gold" />
                      <span>Contact & Support</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div className="p-6 border-t border-white/5 bg-[#0a0a0a] flex flex-col gap-3">
                <Link
                  to="/category/bats"
                  onClick={() => setMenuOpen(false)}
                  className="w-full py-3 bg-gold border border-gold text-black text-center font-sans text-xs tracking-widest uppercase font-semibold hover:bg-transparent hover:text-gold transition-all duration-300 cursor-pointer block"
                >
                  Shop Collection
                </Link>
                <div className="flex justify-between items-center text-[9px] font-sans uppercase tracking-widest text-off-white/20">
                  <span>© 2026 CREX ELITE</span>
                  <span>Junagadh, India</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
