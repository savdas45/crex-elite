import { motion } from 'framer-motion'

const marqueeText = '  PREMIUM CRICKET GEAR  ·  HANDCRAFTED BATS  ·  ELITE APPAREL  ·  WORLD CLASS EQUIPMENT  ·  '

export default function MarqueeStrip() {
  return (
    <section className="relative w-full overflow-hidden bg-black border-t border-b border-gold/20 py-5 flex">
      <motion.div
        className="flex whitespace-nowrap flex-shrink-0"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
      >
        <span className="font-sans text-xs tracking-[0.2em] uppercase text-gold">
          {marqueeText.repeat(4)}
        </span>
        <span className="font-sans text-xs tracking-[0.2em] uppercase text-gold">
          {marqueeText.repeat(4)}
        </span>
      </motion.div>
    </section>
  )
}
