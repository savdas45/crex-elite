import { createContext, useContext, useState, useEffect } from 'react'

const ReviewsContext = createContext()

// Seed reviews so products always start with some reviews
const SEED_REVIEWS = {
  'the-sovereign': [
    { id: 1, name: 'James H.', rating: 5, date: 'March 2025', text: 'Absolutely outstanding quality. The craftsmanship is second to none — you can feel the premium quality from the moment you hold it. Worth every penny.', verified: true },
    { id: 2, name: 'Rohit S.', rating: 5, date: 'January 2025', text: "I've been playing cricket for 18 years and this is by far the best bat I've ever used. The CREX ELITE standard is genuinely world-class.", verified: true },
    { id: 3, name: 'Aiden K.', rating: 4, date: 'November 2024', text: 'Exceptional bat. Minor delivery delay but customer service was excellent. The quality more than makes up for any wait. Will definitely be buying again.', verified: true },
  ],
  'the-legacy': [
    { id: 1, name: 'Marcus T.', rating: 5, date: 'February 2025', text: "A true collector's piece. The finish is immaculate and the certificate of authenticity makes it extra special. Only 50 produced — very proud to own one.", verified: true },
    { id: 2, name: 'Priya N.', rating: 5, date: 'December 2024', text: 'Bought as a gift and the recipient was completely blown away. The display case alone is worth the price. Pure luxury.', verified: true },
  ],
  'the-prestige': [
    { id: 1, name: 'Daniel F.', rating: 5, date: 'April 2025', text: 'Brilliant bat for the price. Power behind every shot. Highly recommend for club players looking to step up their game.', verified: true },
    { id: 2, name: 'Sam W.', rating: 4, date: 'March 2025', text: "Great pickup, hits the ball hard. Took a little time to knock in properly but now it's flying. Very happy with this purchase.", verified: true },
  ],
}

export function ReviewsProvider({ children }) {
  const [allReviews, setAllReviews] = useState(() => {
    const saved = localStorage.getItem('crex_reviews')
    return saved ? JSON.parse(saved) : SEED_REVIEWS
  })

  useEffect(() => {
    localStorage.setItem('crex_reviews', JSON.stringify(allReviews))
  }, [allReviews])

  const getReviews = (slug) => allReviews[slug] || []

  const addReview = (slug, review) => {
    const existing = allReviews[slug] || []
    const newReview = {
      ...review,
      id: Date.now(),
      date: new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }),
      verified: false,
    }
    setAllReviews(prev => ({
      ...prev,
      [slug]: [newReview, ...existing],
    }))
    return newReview
  }

  const getAverageRating = (slug) => {
    const reviews = allReviews[slug] || []
    if (reviews.length === 0) return 0
    return reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
  }

  return (
    <ReviewsContext.Provider value={{ getReviews, addReview, getAverageRating }}>
      {children}
    </ReviewsContext.Provider>
  )
}

export const useReviews = () => useContext(ReviewsContext)
