import { createContext, useContext, useState, useEffect } from 'react'

const ReviewsContext = createContext()

// Comprehensive seed reviews across all key products
const SEED_REVIEWS = {
  'the-sovereign': [
    { id: 1, name: 'Arjun M.', rating: 5, date: 'March 2026', text: 'Absolutely outstanding quality. The craftsmanship is second to none — you can feel the premium Grade 1 willow from the moment you pick it up. The pickup is unreal for its weight.', verified: true, helpful: 24 },
    { id: 2, name: 'Rohit S.', rating: 5, date: 'January 2026', text: "I've played with many bats over 18 years and this is by far the best I've used. The CREX ELITE standard is genuinely world-class. Edges are thick and the swell is perfect.", verified: true, helpful: 19 },
    { id: 3, name: 'Aiden K.', rating: 4, date: 'November 2025', text: 'Exceptional bat. Minor delivery delay but customer service was excellent. The quality more than makes up for any wait. Will definitely be buying again.', verified: true, helpful: 8 },
    { id: 4, name: 'Vikram P.', rating: 5, date: 'October 2025', text: 'Best bat I have ever owned. The 7-grain willow is incredibly responsive. Six fours in my first knock with it. Highly recommended.', verified: true, helpful: 15 },
  ],
  'the-prestige': [
    { id: 1, name: 'Daniel F.', rating: 5, date: 'April 2026', text: 'Brilliant bat for the price. Power behind every shot. Highly recommend for club players looking to step up their game.', verified: true, helpful: 11 },
    { id: 2, name: 'Sam W.', rating: 4, date: 'March 2026', text: "Great pickup, hits the ball hard. Took a little time to knock in properly but now it's flying. Very happy with this purchase.", verified: true, helpful: 6 },
    { id: 3, name: 'Karan T.', rating: 5, date: 'February 2026', text: 'Ordered for the new season and it arrived perfectly. Grade 2 English Willow is brilliant for this price range. Will be ordering the Sovereign next.', verified: true, helpful: 9 },
  ],
  'the-apex': [
    { id: 1, name: 'Jay B.', rating: 4, date: 'March 2026', text: 'Solid practice bat. Durable and dependable — exactly what I needed for net sessions. The Kashmir willow is dense and tough.', verified: true, helpful: 7 },
    { id: 2, name: 'Priya N.', rating: 4, date: 'January 2026', text: 'Great value. Bought for my son and he loves it. Feels professional and the finish is excellent. Very happy with the purchase.', verified: true, helpful: 4 },
    { id: 3, name: 'Rahul D.', rating: 5, date: 'December 2025', text: 'Perfect club bat. I play twice a week and this has held up brilliantly over the season. Great grip and balance.', verified: true, helpful: 12 },
  ],
  'the-legacy': [
    { id: 1, name: 'Marcus T.', rating: 5, date: 'February 2026', text: "A true collector's piece. The finish is immaculate and the certificate of authenticity makes it extra special. Pure luxury from CREX.", verified: true, helpful: 31 },
    { id: 2, name: 'Suresh B.', rating: 5, date: 'January 2026', text: 'Bought as a gift and the recipient was completely blown away. The display case alone is worth the price. Pure luxury — genuinely the finest bat I have seen.', verified: true, helpful: 22 },
    { id: 3, name: 'Alex R.', rating: 4, date: 'November 2025', text: 'Stunning bat. The hand-engraving is a beautiful touch. Took slightly longer to deliver than expected for a custom piece but absolutely worth the wait.', verified: true, helpful: 14 },
  ],
  'the-commander': [
    { id: 1, name: 'Nikhil A.', rating: 5, date: 'April 2026', text: 'Aggressive bat for aggressive batters. The flat face and thick edges are perfect for big hitting. Absolutely demolished some bowling attacks this season.', verified: true, helpful: 18 },
    { id: 2, name: 'Tom H.', rating: 4, date: 'March 2026', text: 'Solid bat with great power behind it. Slightly heavier than expected but once broken in it felt natural. High quality craftsmanship throughout.', verified: true, helpful: 9 },
  ],
  'the-dynasty': [
    { id: 1, name: 'Raj P.', rating: 5, date: 'March 2026', text: 'Brilliant bat for big occasions. The balance is incredible and the swell sits right in the middle for clean drives. Thoroughly impressed.', verified: true, helpful: 13 },
    { id: 2, name: 'Charlie M.', rating: 5, date: 'February 2026', text: 'Ordered this after seeing it at my club and I am not disappointed. Premium feel at every touch. The grip is the best I have ever had on a bat out of the box.', verified: true, helpful: 10 },
    { id: 3, name: 'Sahil K.', rating: 4, date: 'January 2026', text: 'Really pleased with this bat. Strong willow and a clean finish. Small hairline surface marks came during knocking in which is totally normal.', verified: true, helpful: 5 },
  ],
  'the-eclipse': [
    { id: 1, name: 'Dev R.', rating: 5, date: 'April 2026', text: 'The Eclipse is a masterclass in balance. Low sweet spot, incredible for late cuts and pulls. Best bat in the range for technical batters.', verified: true, helpful: 21 },
    { id: 2, name: 'Amit S.', rating: 5, date: 'February 2026', text: 'World-class bat. I play district cricket and this stands up against anything in the professional game. The edges are massive.', verified: true, helpful: 17 },
    { id: 3, name: 'George F.', rating: 4, date: 'January 2026', text: 'Very happy with this. The knocking-in service is 100% worth paying for — came ready to play and has already taken a full county net session without a scratch.', verified: true, helpful: 11 },
  ],
  'the-junior-pro': [
    { id: 1, name: 'Ravi M.', rating: 5, date: 'March 2026', text: 'Bought for my 10-year-old and he loves it. Perfect weight for his age and the quality is incredible for a junior bat. He is hitting the ball better than ever.', verified: true, helpful: 16 },
    { id: 2, name: 'Emma L.', rating: 5, date: 'February 2026', text: 'Great junior bat. Well balanced and the grip is good for smaller hands. My daughter has improved so much since switching to this. Highly recommend.', verified: true, helpful: 12 },
    { id: 3, name: 'Sanjay B.', rating: 4, date: 'January 2026', text: 'Good junior bat. Very well made and delivered quickly. Would have liked a carry bag included but overall excellent value.', verified: true, helpful: 7 },
  ],
  'monarch-batting-gloves': [
    { id: 1, name: 'Chris P.', rating: 5, date: 'March 2026', text: 'Best gloves I have ever worn. The grip is incredible and the ventilation keeps my hands cool even in long innings. Premium all the way.', verified: true, helpful: 14 },
    { id: 2, name: 'Liam S.', rating: 4, date: 'February 2026', text: 'Very comfortable and good protection. Took a few knocks in the nets to break in but now they feel like a second skin.', verified: true, helpful: 8 },
  ],
  'elite-batting-pads': [
    { id: 1, name: 'Oliver T.', rating: 5, date: 'April 2026', text: 'Excellent pads. Lightweight but well protected. Scored a century wearing these and barely felt any impact from the quicks.', verified: true, helpful: 19 },
    { id: 2, name: 'Manish R.', rating: 4, date: 'March 2026', text: 'Good pads at a fair price. Strapping is solid and they stayed in place throughout a long innings. Will buy again.', verified: true, helpful: 6 },
  ],
  'sovereign-helmet': [
    { id: 1, name: 'Harry B.', rating: 5, date: 'April 2026', text: 'Premium helmet. Incredibly secure fit and the ventilation is the best I have tried. Confident facing the quicks with this on.', verified: true, helpful: 22 },
    { id: 2, name: 'Aryan V.', rating: 5, date: 'March 2026', text: 'The build quality is exceptional. Feels solid and protective without being heavy. Great piece of kit from CREX.', verified: true, helpful: 15 },
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
      date: new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
      verified: false,
      helpful: 0,
    }
    setAllReviews(prev => ({
      ...prev,
      [slug]: [newReview, ...existing],
    }))
    return newReview
  }

  const voteHelpful = (slug, reviewId) => {
    setAllReviews(prev => ({
      ...prev,
      [slug]: (prev[slug] || []).map(r =>
        r.id === reviewId ? { ...r, helpful: (r.helpful || 0) + 1 } : r
      ),
    }))
  }

  const getAverageRating = (slug) => {
    const reviews = allReviews[slug] || []
    if (reviews.length === 0) return 0
    return reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
  }

  // Returns top N products by combined score (avg rating × review count)
  const getTopRated = (n = 4) => {
    return Object.entries(allReviews)
      .map(([slug, reviews]) => {
        const avg = reviews.reduce((a, r) => a + r.rating, 0) / reviews.length
        return { slug, avgRating: avg, reviewCount: reviews.length, score: avg * Math.log(reviews.length + 1) }
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, n)
  }

  return (
    <ReviewsContext.Provider value={{ getReviews, addReview, voteHelpful, getAverageRating, getTopRated }}>
      {children}
    </ReviewsContext.Provider>
  )
}

export const useReviews = () => useContext(ReviewsContext)
