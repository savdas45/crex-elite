import { useCompare } from '../context/CompareContext'
import { Link } from 'react-router-dom'
import { X, ArrowRight, ShieldCheck, Scale, Ruler, Sparkles, Layers } from 'lucide-react'

export default function Compare() {
  const { compareItems, removeFromCompare, clearCompare } = useCompare()

  if (compareItems.length === 0) {
    return (
      <div className="min-h-screen bg-black text-off-white pt-32 pb-12 flex flex-col items-center justify-center text-center">
        <Scale size={48} className="text-gold mb-6 opacity-50" />
        <h1 className="font-serif text-4xl font-light mb-4">Compare Gear</h1>
        <p className="text-off-white/50 mb-8 max-w-md mx-auto">
          You haven't selected any items to compare. Browse our collection and add up to 2 items to see them side-by-side.
        </p>
        <Link to="/category/bats" className="btn-primary">
          Browse Collection
        </Link>
      </div>
    )
  }

  // Get all unique spec keys across the compared items
  const allSpecKeys = Array.from(new Set(
    compareItems.flatMap(item => Object.keys(item.specs || {}))
  ))

  const formatSpecKey = (key) => key.charAt(0).toUpperCase() + key.slice(1)

  return (
    <div className="min-h-screen bg-black text-off-white pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl font-light mb-2">Compare</h1>
            <p className="text-off-white/60 font-sans text-sm tracking-widest uppercase">Side-by-Side Analysis</p>
          </div>
          {compareItems.length > 0 && (
            <button onClick={clearCompare} className="text-off-white/40 hover:text-white text-sm transition-colors">
              Clear All
            </button>
          )}
        </div>

        <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl overflow-hidden glass-panel">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr>
                  <th className="w-1/3 p-6 border-b border-zinc-800 border-r border-zinc-800/50">
                    <span className="text-xs uppercase tracking-widest text-gold">Product Features</span>
                  </th>
                  {compareItems.map((item, index) => (
                    <th key={item.id} className={`w-1/3 p-6 border-b border-zinc-800 relative ${index === 0 ? 'border-r border-zinc-800/50' : ''}`}>
                      <button 
                        onClick={() => removeFromCompare(item.id)}
                        className="absolute top-4 right-4 text-off-white/30 hover:text-white transition-colors"
                        aria-label="Remove item"
                      >
                        <X size={16} />
                      </button>
                      <div className="flex flex-col items-center text-center">
                        <div className="w-32 h-40 relative mb-4">
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                        </div>
                        <h3 className="font-serif text-xl mb-1">{item.name}</h3>
                        <p className="text-gold font-sans text-sm mb-4">£{item.price}</p>
                        <Link to={`/product/${item.slug}`} className="btn-ghost text-xs w-full justify-center">
                          View Details
                        </Link>
                      </div>
                    </th>
                  ))}
                  {compareItems.length < 2 && (
                    <th className="w-1/3 p-6 border-b border-zinc-800 text-center">
                      <div className="border border-dashed border-zinc-700 rounded-xl h-full min-h-[250px] flex flex-col items-center justify-center p-6 text-off-white/30">
                        <Scale size={32} className="mb-4 opacity-50" />
                        <span className="text-sm font-sans">Add another item to compare</span>
                        <Link to="/category/bats" className="mt-4 btn-ghost text-xs text-gold border-gold/30 hover:border-gold">
                          Browse
                        </Link>
                      </div>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {/* Basic Details */}
                <tr>
                  <td className="p-6 border-b border-zinc-800 border-r border-zinc-800/50 font-sans text-sm text-off-white/60">Category</td>
                  {compareItems.map((item, i) => (
                    <td key={item.id} className={`p-6 border-b border-zinc-800 font-sans text-sm capitalize ${i === 0 ? 'border-r border-zinc-800/50' : ''}`}>
                      {item.category}
                    </td>
                  ))}
                  {compareItems.length < 2 && <td className="border-b border-zinc-800"></td>}
                </tr>
                <tr>
                  <td className="p-6 border-b border-zinc-800 border-r border-zinc-800/50 font-sans text-sm text-off-white/60">Rating</td>
                  {compareItems.map((item, i) => (
                    <td key={item.id} className={`p-6 border-b border-zinc-800 font-sans text-sm ${i === 0 ? 'border-r border-zinc-800/50' : ''}`}>
                      {item.rating} / 5 ({item.reviews} reviews)
                    </td>
                  ))}
                  {compareItems.length < 2 && <td className="border-b border-zinc-800"></td>}
                </tr>
                
                {/* Dynamic Specs */}
                {allSpecKeys.map(specKey => (
                  <tr key={specKey} className="hover:bg-white/5 transition-colors">
                    <td className="p-6 border-b border-zinc-800 border-r border-zinc-800/50 font-sans text-sm text-off-white/60">
                      {formatSpecKey(specKey)}
                    </td>
                    {compareItems.map((item, i) => (
                      <td key={item.id} className={`p-6 border-b border-zinc-800 font-sans text-sm ${i === 0 ? 'border-r border-zinc-800/50' : ''}`}>
                        {item.specs && item.specs[specKey] ? item.specs[specKey] : <span className="text-off-white/20">-</span>}
                      </td>
                    ))}
                    {compareItems.length < 2 && <td className="border-b border-zinc-800"></td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
