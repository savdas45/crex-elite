import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Star, ShoppingBag, ArrowRight, X } from 'lucide-react'
import { searchProducts } from '../data/products'
import { useCart } from '../context/CartContext'

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [results, setResults] = useState([])
  const [searched, setSearched] = useState(false)
  const { addItem } = useCart()
  const [addedIds, setAddedIds] = useState([])

  useEffect(() => {
    const q = searchParams.get('q') || ''
    setQuery(q)
    if (q.trim()) {
      setResults(searchProducts(q))
      setSearched(true)
    } else {
      setResults([])
      setSearched(false)
    }
  }, [searchParams])

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      setSearchParams({ q: query.trim() })
    }
  }

  const handleAdd = (product) => {
    addItem(product, 1)
    setAddedIds(prev => [...prev, product.id])
    setTimeout(() => setAddedIds(prev => prev.filter(id => id !== product.id)), 2000)
  }

  const SUGGESTIONS = ['cricket bats', 'batting gloves', 'jersey', 'helmet', 'batting pads', 'cricket ball']

  return (
    <div className="bg-black min-h-screen text-off-white pt-32 pb-24">
      <div className="section-pad max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="label-text mb-3">Search</p>
          <h1 className="font-serif text-5xl font-light text-off-white mb-8">
            Find Your <span className="text-gold italic">Equipment</span>
          </h1>

          {/* Search form */}
          <form onSubmit={handleSearch} className="max-w-xl mx-auto relative">
            <div className="flex border border-white/10 focus-within:border-gold/50 transition-colors duration-300">
              <div className="flex items-center px-4 text-off-white/30">
                <Search size={16} />
              </div>
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search bats, helmets, jerseys..."
                className="flex-1 bg-transparent text-off-white font-sans text-sm py-4 pr-4 focus:outline-none placeholder-white/20"
                autoFocus
              />
              {query && (
                <button type="button" onClick={() => { setQuery(''); setSearchParams({}) }}
                  className="px-4 text-off-white/30 hover:text-gold transition-colors duration-300">
                  <X size={14} />
                </button>
              )}
            </div>
            <button type="submit" className="absolute right-0 top-0 bottom-0 px-6 bg-gold text-black font-sans text-[10px] tracking-widest uppercase hover:bg-gold/90 transition-colors duration-300">
              Search
            </button>
          </form>

          {/* Suggestions */}
          {!searched && (
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              {SUGGESTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => setSearchParams({ q: s })}
                  className="font-sans text-xs px-4 py-2 border border-white/10 text-off-white/40 hover:border-gold/40 hover:text-gold transition-all duration-300 capitalize"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Results */}
        {searched && (
          <div>
            <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
              <span className="font-sans text-xs text-off-white/40 tracking-wide">
                {results.length === 0
                  ? `No results for "${searchParams.get('q')}"`
                  : `${results.length} result${results.length !== 1 ? 's' : ''} for "${searchParams.get('q')}"`
                }
              </span>
            </div>

            {results.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                <Search size={40} className="text-white/10 mx-auto mb-6" />
                <h3 className="font-serif text-2xl text-off-white/30 mb-3">No products found</h3>
                <p className="font-sans text-sm text-off-white/25 mb-8">Try searching for "bat", "gloves", or "jersey"</p>
                <Link to="/category/bats" className="btn-ghost text-xs">Browse All Products</Link>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence>
                  {results.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.07, duration: 0.5 }}
                      className="product-card group flex flex-col"
                    >
                      {product.badge && (
                        <div className="absolute top-4 left-4 z-10">
                          <span className="font-sans text-[10px] tracking-widest uppercase px-3 py-1 border border-gold/60 text-gold bg-black/80">{product.badge}</span>
                        </div>
                      )}

                      <Link to={`/product/${product.slug}`} className="flex-shrink-0">
                        <div className="h-56 bg-gradient-to-b from-neutral-900/40 to-black flex items-center justify-center overflow-hidden border-b border-white/5">
                          <img src={product.image} alt={product.name}
                            loading="lazy"
                            className="h-40 object-contain p-3 group-hover:scale-105 transition-transform duration-700" />
                        </div>
                      </Link>

                      <div className="p-5 flex flex-col flex-1">
                        <span className="font-sans text-[9px] tracking-widest uppercase text-gold/50 mb-1 capitalize">{product.category}</span>
                        <Link to={`/product/${product.slug}`}>
                          <h3 className="font-serif text-lg font-light text-off-white group-hover:text-gold transition-colors duration-300 mb-1">{product.name}</h3>
                        </Link>
                        <p className="font-sans text-[10px] text-off-white/40 mb-3">{product.subtitle}</p>
                        <div className="flex items-center gap-1 mb-3">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star key={i} size={10} className={i < product.rating ? 'fill-gold text-gold' : 'text-white/15'} />
                          ))}
                          <span className="font-sans text-[9px] text-off-white/25 ml-1">({product.reviews})</span>
                        </div>
                        <div className="flex items-baseline gap-2 mt-auto mb-4">
                          <span className="font-serif text-xl text-gold">£{product.price}</span>
                          {product.originalPrice && <span className="font-serif text-xs text-off-white/25 line-through">£{product.originalPrice}</span>}
                        </div>

                        <div className="flex gap-2">
                          <Link to={`/product/${product.slug}`} className="flex-1">
                            <button className="w-full py-2.5 border border-white/10 font-sans text-[10px] tracking-widest uppercase text-off-white/40 group-hover:border-gold/40 group-hover:text-gold transition-all duration-500 flex items-center justify-center gap-1">
                              Details <ArrowRight size={9} />
                            </button>
                          </Link>
                          {product.inStock && (
                            <button onClick={() => handleAdd(product)}
                              className={`px-3 py-2.5 border font-sans text-[10px] tracking-widest uppercase transition-all duration-300 ${
                                addedIds.includes(product.id)
                                  ? 'border-gold bg-gold/10 text-gold'
                                  : 'border-white/10 text-off-white/40 hover:border-gold hover:bg-gold hover:text-black'
                              }`}>
                              {addedIds.includes(product.id) ? '✓' : <ShoppingBag size={11} />}
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
