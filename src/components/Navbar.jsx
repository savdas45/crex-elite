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

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/98 backdrop-blur-xl flex flex-col items-center justify-start overflow-y-auto pt-28 pb-12"
          >
            <div className="flex flex-col items-center gap-7 w-full px-4 md:px-8">
              {mainLinks.map((link, i) => (
                <motion.div key={link.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  className="w-full flex flex-col items-center"
                >
                  {link.isDropdown ? (
                    <div className="w-full flex flex-col items-center">
                      <button
                        onClick={() => setMobileShopOpen(!mobileShopOpen)}
                        className="font-serif text-3xl md:text-4xl transition-colors duration-300 text-off-white hover:text-gold flex items-center gap-2 justify-center cursor-pointer"
                      >
                        {link.label}
                        <ChevronDown size={22} className={`transition-transform duration-300 ${mobileShopOpen ? 'rotate-180' : ''} text-gold`} />
                      </button>
                      <AnimatePresence>
                        {mobileShopOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden flex flex-col items-center gap-4 mt-4 w-full"
                          >
                            {categories.map((cat, catIdx) => (
                              <motion.div
                                key={cat.name}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: catIdx * 0.05 }}
                              >
                                <Link
                                  to={cat.to}
                                  onClick={() => setMenuOpen(false)}
                                  className={`font-sans text-lg tracking-widest uppercase transition-colors duration-300 ${
                                    location.pathname === cat.to ? 'text-gold' : 'text-off-white/70 hover:text-gold'
                                  }`}
                                >
                                  {cat.name}
                                </Link>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={link.to}
                      onClick={() => setMenuOpen(false)}
                      className={`font-serif text-3xl md:text-4xl transition-colors duration-300 ${location.pathname === link.to ? 'text-gold' : 'text-off-white hover:text-gold'}`}
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}

              <motion.div className="w-16 h-px bg-gold/40 my-2" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5, duration: 0.5 }} />

              <motion.div className="flex gap-5 items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
                <Link to="/locker" onClick={() => setMenuOpen(false)} className="flex flex-col items-center gap-1 text-off-white/40 hover:text-gold transition-colors duration-300">
                  <User size={20} />
                  <span className="font-sans text-[9px] tracking-widest uppercase">Locker</span>
                </Link>
                <Link to="/search" onClick={() => setMenuOpen(false)} className="flex flex-col items-center gap-1 text-off-white/40 hover:text-gold transition-colors duration-300">
                  <Search size={20} />
                  <span className="font-sans text-[9px] tracking-widest uppercase">Search</span>
                </Link>
                <Link to="/wishlist" className="flex flex-col items-center gap-1 text-off-white/40 hover:text-gold transition-colors duration-300 relative">
                  <Heart size={20} />
                  {wishlistItems.length > 0 && <span className="absolute -top-1 -right-2 w-4 h-4 bg-gold text-black font-sans text-[9px] font-bold flex items-center justify-center rounded-full">{wishlistItems.length}</span>}
                  <span className="font-sans text-[9px] tracking-widest uppercase">Wishlist</span>
                </Link>
                <button onClick={() => { toggleCart(); setMenuOpen(false); }} className="flex flex-col items-center gap-1 text-off-white/40 hover:text-gold transition-colors duration-300 relative">
                  <ShoppingBag size={20} />
                  {totalItems > 0 && <span className="absolute -top-1 -right-2 w-4 h-4 bg-gold text-black font-sans text-[9px] font-bold flex items-center justify-center rounded-full">{totalItems}</span>}
                  <span className="font-sans text-[9px] tracking-widest uppercase">Cart</span>
                </button>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                <Link to="/category/bats" className="btn-primary text-xs mt-2">Shop Now</Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
