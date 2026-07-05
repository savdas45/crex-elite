import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import CompareTray from './components/CompareTray'
import Preloader from './components/Preloader'
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'
import ProductDetail from './pages/ProductDetail'
import About from './pages/About'
import Blog from './pages/Blog'
import Cart from './pages/Cart'
import Contact from './pages/Contact'
import SizeGuide from './pages/SizeGuide'
import Checkout from './pages/Checkout'
import Wishlist from './pages/Wishlist'
import SearchPage from './pages/SearchPage'
import BatMatchAssistant from './pages/BatMatchAssistant'
import Compare from './pages/Compare'
import TeamwearConfigurator from './pages/TeamwearConfigurator'
import MemberLocker from './pages/MemberLocker'
import FAQ from './pages/FAQ'
import SupportChat from './components/SupportChat'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const location = useLocation()
  const [showPreloader, setShowPreloader] = useState(true)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    window.__lenis = lenis
    lenis.stop()

    let rafId
    const raf = (time) => {
      lenis.raf(time)
      ScrollTrigger.update()
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      delete window.__lenis
    }
  }, [])

  useEffect(() => {
    if (window.__lenis) {
      if (showPreloader) {
        window.__lenis.stop()
      } else {
        window.__lenis.start()
      }
    }
  }, [showPreloader])

  useEffect(() => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [location.pathname])

  const handlePreloaderComplete = () => {
    setShowPreloader(false)
  }

  return (
    <div className="bg-black">
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      <Navbar />
      <CartDrawer />
      <CompareTray />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/size-guide" element={<SizeGuide />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/bat-fitter" element={<BatMatchAssistant />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/teamwear" element={<TeamwearConfigurator />} />
        <Route path="/locker" element={<MemberLocker />} />
        <Route path="/faq" element={<FAQ />} />
        {/* 404 catch-all */}
        <Route path="*" element={
          <div className="bg-black min-h-screen flex flex-col items-center justify-center text-off-white pt-20 gap-6">
            <p className="font-sans text-xs tracking-widest uppercase text-gold">404</p>
            <h1 className="font-serif text-5xl font-light">Page Not Found</h1>
            <p className="font-sans text-sm text-off-white/40">The page you're looking for doesn't exist.</p>
            <div className="flex gap-4 mt-4">
              <a href="/" className="btn-ghost text-xs">Return Home</a>
              <a href="/category/bats" className="btn-primary text-xs">Shop Now</a>
            </div>
          </div>
        } />
      </Routes>
      <Footer />
      <SupportChat />
    </div>
  )
}
