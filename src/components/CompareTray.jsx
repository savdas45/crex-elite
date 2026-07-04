import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Scale } from 'lucide-react'
import { useCompare } from '../context/CompareContext'

export default function CompareTray() {
  const { compareItems, removeFromCompare, clearCompare } = useCompare()

  return (
    <AnimatePresence>
      {compareItems.length > 0 && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] w-full max-w-xl px-4"
        >
          <div className="bg-zinc-900/95 backdrop-blur-xl border border-gold/30 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] px-3 md:px-5 py-3 md:py-4 flex items-center gap-2 md:gap-4">
            
            {/* Icon */}
            <div className="hidden sm:flex flex-shrink-0 w-9 h-9 rounded-full bg-gold/10 border border-gold/30 items-center justify-center">
              <Scale size={16} className="text-gold" />
            </div>

            {/* Items */}
            <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0 overflow-x-auto scrollbar-hide">
              {compareItems.map(item => (
                <div key={item.id} className="flex items-center gap-2 bg-white/5 rounded-lg px-2 md:px-3 py-1.5 min-w-0 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-6 h-6 md:w-8 md:h-8 object-contain flex-shrink-0" />
                  <span className="font-sans text-[10px] md:text-xs text-off-white/80 truncate max-w-[60px] md:max-w-[80px]">{item.name}</span>
                  <button
                    onClick={() => removeFromCompare(item.id)}
                    className="text-off-white/30 hover:text-white transition-colors flex-shrink-0"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}

              {/* Placeholder slot */}
              {compareItems.length < 2 && (
                <div className="flex items-center gap-2 border border-dashed border-white/15 rounded-lg px-2 md:px-3 py-1.5 text-off-white/25 flex-shrink-0">
                  <Scale size={12} />
                  <span className="font-sans text-[10px] md:text-xs">Add 1 more</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={clearCompare}
                className="font-sans text-[9px] md:text-[10px] tracking-widest uppercase text-off-white/30 hover:text-white transition-colors"
              >
                Clear
              </button>
              {compareItems.length === 2 && (
                <Link
                  to="/compare"
                  className="btn-primary text-[10px] md:text-xs py-2 px-3 md:px-4 whitespace-nowrap"
                >
                  Compare Now
                </Link>
              )}
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
