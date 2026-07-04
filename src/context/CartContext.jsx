import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('crex_cart') || '[]') } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem('crex_cart', JSON.stringify(items))
  }, [items])

  const addItem = (product, qty = 1, size = null, modifier = null, color = null) => {
    setItems(prev => {
      let key = `${product.id}`
      if (size) key += `-${size}`
      if (color) key += `-${color}`
      if (modifier?.name) key += `-${modifier.name}`

      const existing = prev.find(i => i.key === key)
      if (existing) return prev.map(i => i.key === key ? { ...i, qty: i.qty + qty } : i)
      return [...prev, { ...product, qty, size, modifier, color, key }]
    })
    setIsCartOpen(true) // auto open cart
  }

  const removeItem = (key) => setItems(prev => prev.filter(i => i.key !== key))

  const updateQty = (key, qty) => {
    if (qty < 1) return removeItem(key)
    setItems(prev => prev.map(i => i.key === key ? { ...i, qty } : i))
  }

  const clearCart = () => setItems([])

  const totalItems = items.reduce((s, i) => s + i.qty, 0)
  const subtotal = items.reduce((s, i) => s + (i.price + (i.modifier?.price || 0)) * i.qty, 0)

  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)
  const toggleCart = () => setIsCartOpen(!isCartOpen)

  return (
    <CartContext.Provider value={{ 
      items, addItem, removeItem, updateQty, clearCart, totalItems, subtotal,
      isCartOpen, openCart, closeCart, toggleCart 
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be inside CartProvider')
  return ctx
}
