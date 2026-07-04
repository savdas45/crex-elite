import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Ruler, Activity, CheckCircle, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function BatMatchAssistant() {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState({
    height: '',
    age: '',
    style: ''
  })
  
  const [recommendation, setRecommendation] = useState(null)
  const [hasSavedProfile, setHasSavedProfile] = useState(false)
  const [savedProfileData, setSavedProfileData] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('crex_player_profile')
    if (saved) {
      const parsed = JSON.parse(saved)
      if (parsed.name && parsed.height && parsed.style && parsed.playLevel) {
        setHasSavedProfile(true)
        setSavedProfileData(parsed)
      }
    }
  }, [])

  const handleUseProfile = () => {
    if (!savedProfileData) return
    const finalAnswers = {
      height: savedProfileData.height,
      style: savedProfileData.style,
      age: savedProfileData.playLevel
    }
    setAnswers(finalAnswers)
    calculateMatch(finalAnswers)
  }

  const handleNext = (key, value) => {
    setAnswers(prev => ({ ...prev, [key]: value }))
    if (step < 3) {
      setStep(step + 1)
    } else {
      calculateMatch({ ...answers, [key]: value })
    }
  }

  const calculateMatch = (finalAnswers) => {
    let size = 'Short Handle (SH)'
    let weight = '2lbs 8oz - 2lbs 9oz'
    let sweetSpot = 'Mid-to-Low'

    // Simple mock logic
    if (finalAnswers.height === 'under_5') size = 'Size 4 or 5'
    else if (finalAnswers.height === '5_to_5_6') size = 'Harrow or Size 6'
    
    if (finalAnswers.style === 'aggressive') {
      weight = '2lbs 10oz+'
      sweetSpot = 'High (for backfoot play)'
    } else if (finalAnswers.style === 'touch') {
      weight = '2lbs 7oz - 2lbs 9oz'
      sweetSpot = 'Mid-to-Low (for front-foot drives)'
    }

    setRecommendation({ size, weight, sweetSpot })
    setStep(4)
  }

  return (
    <div className="min-h-screen bg-black text-off-white pt-24 pb-12 flex flex-col items-center">
      <div className="max-w-2xl w-full px-4">
        <div className="mb-12 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-light mb-4">Bat Match Assistant</h1>
          <p className="text-off-white/60 font-sans text-sm md:text-base">
            Find the perfect blade engineered for your height, age, and batting style.
          </p>
        </div>

        <div className="relative bg-zinc-900/40 border border-zinc-800 rounded-2xl p-8 md:p-12 overflow-hidden glass-panel">
          
          {/* Progress Bar */}
          {step < 4 && (
            <div className="flex gap-2 mb-8">
              {[1, 2, 3].map(i => (
                <div key={i} className={`h-1 flex-1 rounded-full ${step >= i ? 'bg-gold' : 'bg-zinc-800'}`} />
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-6"
              >
                {hasSavedProfile && (
                  <div className="bg-gold/10 border border-gold/30 p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2 rounded-xl">
                    <div>
                      <p className="font-serif text-sm text-gold font-light">Saved Profile Detected</p>
                      <p className="font-sans text-[11px] text-off-white/60 mt-0.5">Use specs from {savedProfileData.name}'s locker profile.</p>
                    </div>
                    <button 
                      onClick={handleUseProfile} 
                      className="btn-primary text-[10px] tracking-widest uppercase py-2 px-4 whitespace-nowrap"
                    >
                      Instant Match
                    </button>
                  </div>
                )}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                    <Ruler size={20} />
                  </div>
                  <h2 className="font-serif text-2xl">What is your height?</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button onClick={() => handleNext('height', 'under_5')} className="p-6 border border-zinc-800 rounded-xl hover:border-gold hover:bg-gold/5 transition-all text-left">
                    <span className="block font-sans text-lg text-white mb-1">Under 5'0"</span>
                    <span className="block font-sans text-sm text-off-white/60">Junior / Youth</span>
                  </button>
                  <button onClick={() => handleNext('height', '5_to_5_6')} className="p-6 border border-zinc-800 rounded-xl hover:border-gold hover:bg-gold/5 transition-all text-left">
                    <span className="block font-sans text-lg text-white mb-1">5'0" - 5'6"</span>
                    <span className="block font-sans text-sm text-off-white/60">Academy Player</span>
                  </button>
                  <button onClick={() => handleNext('height', '5_7_to_6')} className="p-6 border border-zinc-800 rounded-xl hover:border-gold hover:bg-gold/5 transition-all text-left">
                    <span className="block font-sans text-lg text-white mb-1">5'7" - 6'0"</span>
                    <span className="block font-sans text-sm text-off-white/60">Standard Adult</span>
                  </button>
                  <button onClick={() => handleNext('height', 'over_6')} className="p-6 border border-zinc-800 rounded-xl hover:border-gold hover:bg-gold/5 transition-all text-left">
                    <span className="block font-sans text-lg text-white mb-1">Over 6'0"</span>
                    <span className="block font-sans text-sm text-off-white/60">Tall Adult</span>
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                    <Activity size={20} />
                  </div>
                  <h2 className="font-serif text-2xl">What is your batting style?</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button onClick={() => handleNext('style', 'aggressive')} className="p-6 border border-zinc-800 rounded-xl hover:border-gold hover:bg-gold/5 transition-all text-left">
                    <span className="block font-sans text-lg text-white mb-1">Aggressive / Power</span>
                    <span className="block font-sans text-sm text-off-white/60">Likes to hit big, plays off the back foot</span>
                  </button>
                  <button onClick={() => handleNext('style', 'touch')} className="p-6 border border-zinc-800 rounded-xl hover:border-gold hover:bg-gold/5 transition-all text-left">
                    <span className="block font-sans text-lg text-white mb-1">Touch / Timer</span>
                    <span className="block font-sans text-sm text-off-white/60">Relies on timing, drives off the front foot</span>
                  </button>
                  <button onClick={() => handleNext('style', 'balanced')} className="p-6 border border-zinc-800 rounded-xl hover:border-gold hover:bg-gold/5 transition-all text-left col-span-1 md:col-span-2">
                    <span className="block font-sans text-lg text-white mb-1">Balanced All-Rounder</span>
                    <span className="block font-sans text-sm text-off-white/60">Plays all around the wicket, adapts to the situation</span>
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                    <CheckCircle size={20} />
                  </div>
                  <h2 className="font-serif text-2xl">What level do you play?</h2>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <button onClick={() => handleNext('age', 'pro')} className="p-6 border border-zinc-800 rounded-xl hover:border-gold hover:bg-gold/5 transition-all text-left flex justify-between items-center">
                    <div>
                      <span className="block font-sans text-lg text-white mb-1">Professional / Premier Grade</span>
                      <span className="block font-sans text-sm text-off-white/60">Needs Grade 1+ English Willow</span>
                    </div>
                    <ChevronRight className="text-zinc-600" />
                  </button>
                  <button onClick={() => handleNext('age', 'club')} className="p-6 border border-zinc-800 rounded-xl hover:border-gold hover:bg-gold/5 transition-all text-left flex justify-between items-center">
                    <div>
                      <span className="block font-sans text-lg text-white mb-1">Club Cricket</span>
                      <span className="block font-sans text-sm text-off-white/60">Reliable performance, Grade 2/3</span>
                    </div>
                    <ChevronRight className="text-zinc-600" />
                  </button>
                  <button onClick={() => handleNext('age', 'casual')} className="p-6 border border-zinc-800 rounded-xl hover:border-gold hover:bg-gold/5 transition-all text-left flex justify-between items-center">
                    <div>
                      <span className="block font-sans text-lg text-white mb-1">Casual / Net Sessions</span>
                      <span className="block font-sans text-sm text-off-white/60">Durable and affordable options</span>
                    </div>
                    <ChevronRight className="text-zinc-600" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 4 && recommendation && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="inline-flex w-16 h-16 rounded-full bg-gold/20 items-center justify-center text-gold mb-6">
                  <CheckCircle size={32} />
                </div>
                <h2 className="font-serif text-3xl mb-2">Your Perfect Match</h2>
                <p className="text-off-white/60 mb-8 font-sans">Based on your profile, here are your ideal specifications:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-black/50 border border-zinc-800 rounded-xl p-6">
                    <span className="block text-xs uppercase tracking-wider text-gold mb-2">Ideal Size</span>
                    <span className="block font-serif text-xl text-white">{recommendation.size}</span>
                  </div>
                  <div className="bg-black/50 border border-zinc-800 rounded-xl p-6">
                    <span className="block text-xs uppercase tracking-wider text-gold mb-2">Ideal Weight</span>
                    <span className="block font-serif text-xl text-white">{recommendation.weight}</span>
                  </div>
                  <div className="bg-black/50 border border-zinc-800 rounded-xl p-6">
                    <span className="block text-xs uppercase tracking-wider text-gold mb-2">Sweet Spot</span>
                    <span className="block font-serif text-xl text-white">{recommendation.sweetSpot}</span>
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                  <button onClick={() => setStep(1)} className="btn-ghost">
                    Retake Quiz
                  </button>
                  <Link to="/category/bats" className="btn-primary flex items-center gap-2">
                    Shop Recommended Bats <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
