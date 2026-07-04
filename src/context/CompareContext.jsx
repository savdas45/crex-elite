import { createContext, useContext, useState, useEffect } from 'react'

const CompareContext = createContext()

export function CompareProvider({ children }) {
  const [compareItems, setCompareItems] = useState(() => {
    const saved = localStorage.getItem('crex_compare')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('crex_compare', JSON.stringify(compareItems))
  }, [compareItems])

  const addToCompare = (product) => {
    if (compareItems.length < 2 && !compareItems.some(item => item.id === product.id)) {
      setCompareItems([...compareItems, product])
    }
  }

  const removeFromCompare = (productId) => {
    setCompareItems(compareItems.filter(item => item.id !== productId))
  }

  const clearCompare = () => {
    setCompareItems([])
  }

  return (
    <CompareContext.Provider value={{ compareItems, addToCompare, removeFromCompare, clearCompare }}>
      {children}
    </CompareContext.Provider>
  )
}

export const useCompare = () => useContext(CompareContext)
