import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, Phone, MapPin, Clock, Send, Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const contactInfo = [
  { icon: Mail, label: 'Email Us', value: 'support@crexelite.com', sub: 'Response within 24 hours' },
  { icon: Phone, label: 'Call Us', value: '+44 20 7946 0958', sub: 'Mon–Fri  9am–6pm GMT' },
  { icon: MapPin, label: 'Workshop', value: 'Suffolk, England', sub: 'Visit by appointment only' },
  { icon: Clock, label: 'Business Hours', value: 'Mon – Fri', sub: '9:00 AM – 6:00 PM GMT' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1500)
  }

  return (
    <div className="bg-black min-h-screen text-off-white pt-32 pb-24">
      {/* Hero Header */}
      <div className="section-pad max-w-7xl mx-auto mb-20 text-center py-10 relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(circle at center, rgba(201,168,76,0.05) 0%, transparent 70%)' }}
        />
        <p className="label-text mb-4">We're Here to Help</p>
        <h1 className="heading-lg text-off-white mb-6">
          Get in <span className="text-gold italic">Touch</span>
        </h1>
        <p className="body-text max-w-xl mx-auto text-off-white/60">
          Whether you need bat care advice, custom sizing, or simply want to talk cricket — our team of experts is ready to help.
        </p>
        <div className="gold-line w-24 mx-auto mt-8" />
      </div>

      <div className="section-pad max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16">
        {/* Contact Info Cards */}
        <div className="lg:col-span-2 space-y-6">
          {contactInfo.map(({ icon: Icon, label, value, sub }, i) => (
            <motion.div
              key={label}
              className="p-6 border border-white/5 bg-charcoal/20 flex gap-5 items-start relative"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
            >
              <div className="w-10 h-10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                <Icon size={16} className="text-gold" />
              </div>
              <div>
                <p className="font-sans text-[10px] tracking-widest uppercase text-gold/70 mb-1">{label}</p>
                <p className="font-serif text-lg font-light text-off-white mb-1">{value}</p>
                <p className="font-sans text-xs text-off-white/40">{sub}</p>
              </div>
            </motion.div>
          ))}

          {/* Map Placeholder */}
          <div className="border border-white/5 bg-charcoal/10 h-48 flex flex-col items-center justify-center gap-3">
            <MapPin size={28} className="text-gold/40" />
            <p className="font-sans text-xs text-off-white/30 tracking-widest uppercase">Suffolk Workshop, England</p>
            <p className="font-sans text-[10px] text-off-white/20">Visits by appointment only</p>
          </div>
        </div>

        {/* Contact Form */}
        <motion.div
          className="lg:col-span-3 border border-white/5 bg-charcoal/20 p-10 relative"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Corners */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold/30" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold/30" />

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col items-center justify-center gap-6 py-16"
            >
              <div className="w-16 h-16 border border-gold/40 flex items-center justify-center">
                <Check size={24} className="text-gold" />
              </div>
              <h3 className="font-serif text-3xl text-off-white">Message Sent</h3>
              <p className="font-sans text-sm text-off-white/50 text-center max-w-xs leading-relaxed">
                Thank you for reaching out. Our team will respond within 24 hours.
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                className="btn-ghost text-xs"
              >
                Send Another
              </button>
            </motion.div>
          ) : (
            <>
              <h2 className="font-serif text-3xl font-light text-off-white mb-2">
                Send a <span className="text-gold italic">Message</span>
              </h2>
              <p className="font-sans text-xs text-off-white/40 tracking-wide mb-10">All fields are required</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-sans text-[10px] tracking-widest uppercase text-off-white/40 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full bg-black border border-white/10 text-off-white text-sm font-sans px-4 py-3 focus:outline-none focus:border-gold/50 placeholder-white/15 transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-[10px] tracking-widest uppercase text-off-white/40 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full bg-black border border-white/10 text-off-white text-sm font-sans px-4 py-3 focus:outline-none focus:border-gold/50 placeholder-white/15 transition-colors duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-sans text-[10px] tracking-widest uppercase text-off-white/40 mb-2">Subject</label>
                  <select
                    name="subject"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full bg-black border border-white/10 text-off-white text-sm font-sans px-4 py-3 focus:outline-none focus:border-gold/50 transition-colors duration-300"
                  >
                    <option value="" disabled>Select a subject</option>
                    <option value="order">Order Enquiry</option>
                    <option value="custom">Custom Bat Request</option>
                    <option value="sizing">Sizing & Fit Help</option>
                    <option value="care">Bat Care Advice</option>
                    <option value="returns">Returns & Refunds</option>
                    <option value="other">General Enquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block font-sans text-[10px] tracking-widest uppercase text-off-white/40 mb-2">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help you..."
                    className="w-full bg-black border border-white/10 text-off-white text-sm font-sans px-4 py-3 focus:outline-none focus:border-gold/50 placeholder-white/15 transition-colors duration-300 resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center gold-glow py-4"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 border border-gold/50 border-t-gold rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send size={13} /> Send Message
                    </span>
                  )}
                </motion.button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </div>
  )
}
