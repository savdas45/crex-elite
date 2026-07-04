import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MATERIAL_SPECS = [
  {
    id: 'timber',
    num: '01',
    label: 'Timber Sourcing',
    name: 'Grade 1 English Willow Clefts',
    desc: 'Individually selected wood clefts seasoned naturally in our yard to attain an optimal 11% moisture level before they are pressed to absolute perfection.',
    blueprint: (
      <svg viewBox="0 0 200 200" className="w-full h-48 md:h-64" fill="none">
        <rect x="30" y="20" width="140" height="160" rx="2" stroke="#C9A84C" strokeWidth="1" opacity="0.3" />
        <path d="M40 50 Q60 55 40 160 M70 40 Q90 45 70 170 M100 30 Q120 35 100 170 M130 40 Q150 45 130 160 M160 50 Q170 55 160 150" stroke="#C9A84C" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.5" />
        <path d="M50 20 L50 180 M150 20 L150 180" stroke="#fff" strokeWidth="0.5" opacity="0.2" />
        <circle cx="100" cy="100" r="40" stroke="#C9A84C" strokeWidth="0.5" opacity="0.2" />
        <text x="100" y="105" fill="#C9A84C" fontSize="8" textAnchor="middle" letterSpacing="1" opacity="0.7">COMPRESSION ZONE</text>
      </svg>
    ),
    specs: [
      { label: 'Harvest Age', value: '15–20 Years' },
      { label: 'Seasoning Time', value: '12 Months' },
      { label: 'Pressing Density', value: '2,000 PSI' },
      { label: 'Wood Grade', value: 'Grade 1 English Willow' }
    ],
    bars: [
      { name: 'Elasticity / Rebound', value: 95 },
      { name: 'Durability / Lifespan', value: 85 },
      { name: 'Weight-to-Strength Ratio', value: 90 }
    ]
  },
  {
    id: 'armor',
    num: '02',
    label: 'Protective Armor',
    name: 'Aerospace-Grade Carbon Shielding',
    desc: 'Impact-absorbing composite layers designed to disperse high-speed ball momentum across the surface, combined with ergonomic memory foam padding.',
    blueprint: (
      <svg viewBox="0 0 200 200" className="w-full h-48 md:h-64" fill="none">
        <circle cx="100" cy="100" r="70" stroke="#C9A84C" strokeWidth="1" strokeDasharray="5 5" opacity="0.3" />
        <path d="M40 100 Q100 60 160 100 M40 100 Q100 140 160 100" stroke="#fff" strokeWidth="1" opacity="0.2" />
        <path d="M30 100 H170" stroke="#C9A84C" strokeWidth="0.5" opacity="0.2" />
        <rect x="70" y="85" width="60" height="30" rx="3" fill="#C9A84C" opacity="0.1" stroke="#C9A84C" strokeWidth="1" />
        <text x="100" y="102" fill="#C9A84C" fontSize="7" textAnchor="middle" letterSpacing="1" opacity="0.7">IMPACT SHIELD</text>
      </svg>
    ),
    specs: [
      { label: 'Shell Material', value: 'Carbon Fiber Composite' },
      { label: 'Foam Core', value: 'High-Density EVA memory' },
      { label: 'Impact Protection', value: 'Up to 160 KPH' },
      { label: 'Ergonomics', value: '3D Molded Flex' }
    ],
    bars: [
      { name: 'Shock Absorption', value: 98 },
      { name: 'Lightweight Mobility', value: 90 },
      { name: 'Ventilation Index', value: 80 }
    ]
  },
  {
    id: 'fabric',
    num: '03',
    label: 'Apparel Fabrics',
    name: 'Aero-Capillary Performance Mesh',
    desc: 'Advanced synthetic fibers designed to wick sweat instantly through micropores, combined with high-grade elastane for unrestricted player mobility.',
    blueprint: (
      <svg viewBox="0 0 200 200" className="w-full h-48 md:h-64" fill="none">
        <path d="M30 40 C 60 10, 80 70, 100 40 C 120 10, 140 70, 170 40" stroke="#C9A84C" strokeWidth="1.5" opacity="0.4" />
        <path d="M30 80 C 60 50, 80 110, 100 80 C 120 50, 140 110, 170 80" stroke="#C9A84C" strokeWidth="1.5" opacity="0.4" />
        <path d="M30 120 C 60 90, 80 150, 100 120 C 120 90, 140 150, 170 120" stroke="#C9A84C" strokeWidth="1.5" opacity="0.4" />
        <line x1="100" y1="20" x2="100" y2="180" stroke="#fff" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.2" />
        <text x="100" y="170" fill="#C9A84C" fontSize="8" textAnchor="middle" letterSpacing="1" opacity="0.7">FIBRE WEAVE</text>
      </svg>
    ),
    specs: [
      { label: 'Material Blend', value: '88% Poly, 12% Elastane' },
      { label: 'Fabric Weight', value: '180 GSM (Lightweight)' },
      { label: 'Sun Protection', value: 'UPF 50+ Certified' },
      { label: 'Hardware', value: 'Gold-tipped YKK zippers' }
    ],
    bars: [
      { name: 'Moisture Wicking', value: 92 },
      { name: '4-Way Elasticity', value: 95 },
      { name: 'Breathability Score', value: 88 }
    ]
  },
  {
    id: 'intel',
    num: '04',
    label: 'IoT Sensors',
    name: 'CREX Swing Telemetry Chip',
    desc: 'High-frequency micro-sensor mounted securely at the handle cap, delivering real-time acceleration and angles directly to iOS and Android applications.',
    blueprint: (
      <svg viewBox="0 0 200 200" className="w-full h-48 md:h-64" fill="none">
        <polygon points="100,30 160,65 160,135 100,170 40,135 40,65" stroke="#C9A84C" strokeWidth="1" opacity="0.4" />
        <polygon points="100,45 145,71 145,129 100,155 55,129 55,71" stroke="#fff" strokeWidth="0.5" opacity="0.2" />
        <circle cx="100" cy="100" r="20" fill="#C9A84C" opacity="0.15" stroke="#C9A84C" strokeWidth="0.75" />
        <circle cx="100" cy="100" r="5" fill="#C9A84C" />
        <text x="100" y="125" fill="#C9A84C" fontSize="7" textAnchor="middle" letterSpacing="1" opacity="0.7">IMU SENSOR CHIP</text>
      </svg>
    ),
    specs: [
      { label: 'Sensor Type', value: '3D Accel + 3D Gyro' },
      { label: 'Sampling Rate', value: '500 Hz (Real-time)' },
      { label: 'Connectivity', value: 'Bluetooth Low Energy 5.2' },
      { label: 'Battery Capacity', value: '15 Hours active play' }
    ],
    bars: [
      { name: 'Data Latency', value: 96 },
      { name: 'Calibrated Accuracy', value: 98 },
      { name: 'Battery Efficiency', value: 90 }
    ]
  }
]

const ANATOMY_DATA = {
  handle: {
    title: "Singapore Cane Handle",
    desc: "Crafted from imported Sarawak cane, split into triple sections and laminated with premium natural rubber strips. This composite structure allows the handle to flex slightly during a shot, storing energy and absorbing high-frequency sting vibrations before they reach the player's hands.",
    specs: [
      { label: "Material Sourcing", value: "Sarawak Singapore Cane" },
      { label: "Lamination Count", value: "3-Way Rubber Strips" },
      { label: "Sting Isolation", value: "98% Vibration Damping" },
      { label: "Ergonomics", value: "Octagonal Grip Profile" }
    ]
  },
  splice: {
    title: "Torsional Splice Joint",
    desc: "The critical interface where the handle is wedged into the willow blade. We use a deep V-cut splice bonded with flexible impact-absorbing epoxy resin. This joint is cured under 500 lbs of lateral clamping pressure, ensuring maximum structural continuity and resistance to twist.",
    specs: [
      { label: "Adhesive Compound", value: "High-Elasticity Epoxy" },
      { label: "Joint Depth", value: "110mm Insertion V-Cut" },
      { label: "Clamping Force", value: "500 lbs Static Tension" },
      { label: "Torsional Strength", value: "Over 8,000 NM/Rad" }
    ]
  },
  shoulder: {
    title: "Balanced Blade Shoulders",
    desc: "The top contours of the willow blade. By tapering the shoulders, our master bat makers sculpt the balance points, shifting the bulk of the timber into the hitting sweet spot while ensuring a feather-light pickup index during backlift.",
    specs: [
      { label: "Shape Contour", value: "Slightly Concaved Slope" },
      { label: "Taper Thickness", value: "12mm to 16mm Edge" },
      { label: "Weight Reduction", value: "-45 grams average" },
      { label: "Pickup Assist Index", value: "+15% Leverage Speed" }
    ]
  },
  spine: {
    title: "High Spine Rigidity",
    desc: "A vertical ridge extending down the back of the blade. The spine acts as a structural backbone, preventing the bat from bending backward when impacting a 160 kph ball. It enables us to leave maximum wood thickness directly behind the sweet spot without making the bat heavy.",
    specs: [
      { label: "Spine Peak Height", value: "60mm to 68mm Max" },
      { label: "Structural Role", value: "Bending Stiffness Backbone" },
      { label: "Wood Distribution", value: "Linear Spine Profile" },
      { label: "Flex Deflection", value: "Under 1.5mm on impact" }
    ]
  },
  swell: {
    title: "Active Rebound Swell",
    desc: "The primary hitting zone or 'sweet spot'. The cellulose fibers in this zone are pressed at 2,000 PSI to hit a precise equilibrium: dense enough to resist indentation, yet springy enough to maximize the Coefficient of Restitution (COR).",
    specs: [
      { label: "Pressing Pressure", value: "2,000 PSI Hydraulic" },
      { label: "Edge Thickness", value: "38mm to 42mm Power Edges" },
      { label: "Sweet Spot Width", value: "120mm Active Zone" },
      { label: "Rebound Coefficient", value: "0.55 COR (Peak)" }
    ]
  },
  toe: {
    title: "Poly-Armor Toe Guard",
    desc: "The bottom edge of the blade, which is vulnerable to split fibers from yorkers or ground scraping. We dry-press the toe, apply a flexible seal, and fit it with an aerospace-grade polymer toe guard to prevent moisture ingress and thread splits.",
    specs: [
      { label: "Protection Shell", value: "Aerospace-Grade Polymer" },
      { label: "Fiber Prep", value: "Dry-Pressed Compaction" },
      { label: "Moisture Shield", value: "100% Water Resistant" },
      { label: "Yorker Resistance", value: "High Impact Dispersal" }
    ]
  }
}

const GRADE_COMPARISON = {
  grade1plus: {
    name: "Grade 1+ English Willow (Pro Elite)",
    grains: "9 to 12 Straight Grains",
    moisture: "10.5% - 11.5% Cured",
    description: "The absolute zenith of sports timber. Sourced exclusively from the outer sapwood rings of 20-year-old trees. Features pristine aesthetics, perfectly parallel growth rings, and a high cell lumen count for instant responsiveness.",
    ratings: [
      { label: "Elastic Rebound (COR)", value: 98 },
      { label: "Vibration Dampening", value: 92 },
      { label: "Indentation Resistance", value: 75 },
      { label: "Structural Lifespan", value: 80 }
    ]
  },
  grade1: {
    name: "Grade 1 English Willow (Pro Grade)",
    grains: "7 to 9 Straight Grains",
    moisture: "11.0% - 12.0% Cured",
    description: "Tournament-grade timber trusted by top-order club and professional batsmen. May exhibit minor pin-knots or natural coloration at the back edges, but maintains pristine performance with a large sweet spot.",
    ratings: [
      { label: "Elastic Rebound (COR)", value: 90 },
      { label: "Vibration Dampening", value: 88 },
      { label: "Indentation Resistance", value: 80 },
      { label: "Structural Lifespan", value: 85 }
    ]
  },
  grade2: {
    name: "Grade 2 English Willow (Club Elite)",
    grains: "5 to 7 Grains",
    moisture: "11.5% - 12.5% Cured",
    description: "The workhorse of competitive cricket. Excellent balance of cost, durability, and response. Often features beautiful dark red heartwood wood streaks which naturally increase the density and life-expectancy of the bat.",
    ratings: [
      { label: "Elastic Rebound (COR)", value: 80 },
      { label: "Vibration Dampening", value: 82 },
      { label: "Indentation Resistance", value: 90 },
      { label: "Structural Lifespan", value: 95 }
    ]
  },
  kashmir: {
    name: "Kashmir Willow (Academy Pro)",
    grains: "Densely Packed Grains",
    moisture: "13.0% - 14.5% Cured",
    description: "Harvested from northern Indian valleys, this wood grows in warmer conditions, yielding a dry, rigid, and highly dense grain. Extremely durable and split-resistant, perfect for hard damp match balls, training, and young academy cricketers.",
    ratings: [
      { label: "Elastic Rebound (COR)", value: 65 },
      { label: "Vibration Dampening", value: 70 },
      { label: "Indentation Resistance", value: 98 },
      { label: "Structural Lifespan", value: 99 }
    ]
  }
}

export default function About() {
  const containerRef = useRef();
  const [activeSpecTab, setActiveSpecTab] = useState('timber');
  const [activeAnatomyPart, setActiveAnatomyPart] = useState('swell');
  const [activeCompareGrade, setActiveCompareGrade] = useState('grade1plus');


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    const ctx = gsap.context(() => {
      // Animate text sections on scroll
      gsap.utils.toArray('.reveal-section').forEach((sec) => {
        gsap.fromTo(sec,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            scrollTrigger: {
              trigger: sec,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-black min-h-screen text-off-white pt-32 pb-24">
      {/* Hero Header */}
      <div className="section-pad max-w-7xl mx-auto mb-24 text-center py-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, rgba(201, 168, 76, 0.05) 0%, transparent 70%)' }} />
        <p className="label-text mb-4">Our Heritage</p>
        <h1 className="heading-lg mb-6">
          Crafted For <span className="text-gold italic">Champions</span>
        </h1>
        <p className="body-text max-w-2xl mx-auto mb-8 text-off-white/60 text-lg font-light leading-relaxed">
          At CREX ELITE, we believe that cricket equipment is not just gear—it is an extension of the batsman. Every willow cleft we select and shape is a testament to our dedication to the perfect pickup, balance, and stroke.
        </p>
        <div className="gold-line w-24 mx-auto" />
      </div>

      {/* Craftsmanship Section */}
      <div className="reveal-section section-pad max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
        <div>
          <p className="label-text mb-4">The Workshop</p>
          <h2 className="heading-md mb-6">
            The Art of the <span className="text-gold italic">Cleft Selection</span>
          </h2>
          <p className="body-text mb-6 leading-loose text-off-white/70">
            Our premium English willow is imported directly from private timber reserves in England and hand-crafted at our state-of-the-art facility in Junagadh, India. Master craftsmen analyze each log for grain consistency, moisture content, and weight.
          </p>
          <p className="body-text mb-8 leading-loose text-off-white/70">
            It takes up to 15 years to acquire the skill required to press a willow block correctly. We press every blade to 2,000 PSI in order to optimize performance while preserving the wood's structural integrity.
          </p>
          <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/5">
            <div>
              <p className="font-serif text-3xl text-gold font-light">Junagadh, IN</p>
              <p className="font-sans text-xs text-off-white/40 uppercase tracking-widest mt-1">HQ & Workshop</p>
            </div>
            <div>
              <p className="font-serif text-3xl text-gold font-light">100% Handcrafted</p>
              <p className="font-sans text-xs text-off-white/40 uppercase tracking-widest mt-1">Production Process</p>
            </div>
          </div>
        </div>
        <div className="relative aspect-video lg:aspect-square bg-gradient-to-b from-neutral-900/30 to-black border border-white/5 flex items-center justify-center overflow-hidden">
          {/* Custom luxury SVG Workshop Illustration */}
          <svg viewBox="0 0 200 200" className="w-64 h-64" fill="none">
            <rect x="20" y="30" width="160" height="140" rx="4" stroke="#C9A84C" strokeWidth="1" opacity="0.2" />
            <path d="M40 70 L160 70 M40 100 L160 100 M40 130 L160 130" stroke="#C9A84C" strokeWidth="0.5" opacity="0.3" />
            {/* Draw wood grain paths */}
            <path d="M60 50 Q65 100 60 150 M100 50 Q105 100 100 150 M140 50 Q145 100 140 150" stroke="#C9A84C" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
            {/* Chisel */}
            <rect x="90" y="70" width="20" height="70" rx="2" fill="#C9A84C" opacity="0.15" stroke="#C9A84C" strokeWidth="1" />
            <rect x="95" y="140" width="10" height="20" rx="1" fill="#C9A84C" opacity="0.3" />
          </svg>
          <div className="absolute bottom-4 left-4">
            <span className="font-sans text-[10px] tracking-widest text-gold/50 uppercase"> Junagadh Workshop</span>
          </div>
        </div>
      </div>

      {/* Anatomy of a Champion's Willow */}
      <div className="reveal-section section-pad max-w-7xl mx-auto mb-32 border-t border-white/5 pt-24">
        <div className="text-center mb-16">
          <p className="label-text mb-4">Bat Anatomy</p>
          <h2 className="heading-md">
            Anatomy of a <span className="text-gold italic">Champion's Willow</span>
          </h2>
          <p className="body-text max-w-xl mx-auto mt-4 text-off-white/50 text-sm font-light leading-relaxed">
            Click on the hotspots of our technical blueprint diagram to inspect the engineered construction zones of a CREX elite bat.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* SVG Diagram Column */}
          <div className="lg:col-span-5 bg-[#0a0a0a] border border-white/10 p-8 rounded-sm flex flex-col items-center justify-center relative overflow-hidden h-[450px]">
            <div className="absolute top-4 left-4">
              <span className="font-serif text-[9px] tracking-wider text-gold font-light">TECH DIAGRAM // MODEL CX-E</span>
            </div>

            <svg viewBox="0 0 200 200" className="w-auto h-full max-h-[350px]" fill="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(201,168,76,0.03)" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Bat Handle */}
              <rect x="94" y="10" width="12" height="70" rx="2" fill="rgba(201,168,76,0.05)" stroke="#fff" strokeWidth="0.5" opacity="0.3" />
              <path d="M94 20 H106 M94 30 H106 M94 40 H106 M94 50 H106 M94 60 H106 M94 70 H106" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />

              {/* Splice (V-Cut) */}
              <polygon points="94,80 106,80 100,98" fill="rgba(201,168,76,0.15)" stroke="#C9A84C" strokeWidth="0.5" />

              {/* Bat Blade */}
              <path d="M 86 80 L 94 80 M 114 80 L 106 80" stroke="#fff" strokeWidth="0.5" opacity="0.3" />
              <path d="M 86 80 Q 86 95 86 175 Q 86 185 100 188 Q 114 185 114 175 Q 114 95 114 80 Z" fill="none" stroke="#fff" strokeWidth="0.75" opacity="0.4" />
              
              {/* Bat Spine */}
              <line x1="100" y1="98" x2="100" y2="182" stroke="#C9A84C" strokeWidth="0.75" strokeDasharray="2 2" opacity="0.6" />

              {/* Sweet spot (Swell) outline */}
              <ellipse cx="100" cy="145" rx="12" ry="20" stroke="#C9A84C" strokeWidth="0.75" strokeDasharray="3 3" fill="rgba(201,168,76,0.05)" opacity="0.7" />

              {/* Hotspot Circles & Markers */}
              {[
                { id: 'handle', cx: 100, cy: 40 },
                { id: 'splice', cx: 100, cy: 80 },
                { id: 'shoulder', cx: 86, cy: 88 },
                { id: 'spine', cx: 100, cy: 115 },
                { id: 'swell', cx: 100, cy: 145 },
                { id: 'toe', cx: 100, cy: 185 }
              ].map((pt) => (
                <g key={pt.id} className="cursor-pointer" onClick={() => setActiveAnatomyPart(pt.id)}>
                  <circle
                    cx={pt.cx}
                    cy={pt.cy}
                    r="8"
                    fill={activeAnatomyPart === pt.id ? 'rgba(201,168,76,0.25)' : 'rgba(255,255,255,0.05)'}
                    stroke={activeAnatomyPart === pt.id ? '#C9A84C' : 'rgba(255,255,255,0.3)'}
                    strokeWidth="0.5"
                    className="transition-all duration-300 hover:fill-gold/20"
                  />
                  <circle
                    cx={pt.cx}
                    cy={pt.cy}
                    r="2.5"
                    fill={activeAnatomyPart === pt.id ? '#C9A84C' : '#fff'}
                    className="transition-all duration-300"
                  />
                </g>
              ))}
            </svg>

            {/* Quick Hotspot Buttons for Mobile */}
            <div className="flex flex-wrap justify-center gap-1.5 mt-4 border-t border-white/5 pt-4 lg:hidden">
              {Object.keys(ANATOMY_DATA).map((partKey) => (
                <button
                  key={partKey}
                  onClick={() => setActiveAnatomyPart(partKey)}
                  className={`px-2.5 py-1 text-[8px] tracking-wider uppercase border transition-all ${
                    activeAnatomyPart === partKey ? 'border-gold text-gold bg-gold/5' : 'border-white/5 text-off-white/40'
                  }`}
                >
                  {partKey}
                </button>
              ))}
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeAnatomyPart}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white/[0.01] border border-white/5 p-8 rounded-sm"
              >
                <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-4">
                  <div>
                    <span className="font-sans text-[9px] tracking-widest uppercase text-gold">Zone Specification</span>
                    <h3 className="font-serif text-2xl font-light text-off-white mt-1">{ANATOMY_DATA[activeAnatomyPart].title}</h3>
                  </div>
                  <span className="font-sans text-[10px] text-off-white/20 uppercase tracking-widest">
                    Part {Object.keys(ANATOMY_DATA).indexOf(activeAnatomyPart) + 1} of 6
                  </span>
                </div>

                <p className="font-sans text-xs text-off-white/60 leading-relaxed mb-8">
                  {ANATOMY_DATA[activeAnatomyPart].desc}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {ANATOMY_DATA[activeAnatomyPart].specs.map((spec, idx) => (
                    <div key={idx} className="border-l border-gold/30 pl-4">
                      <p className="font-sans text-[9px] text-off-white/40 uppercase tracking-wider">{spec.label}</p>
                      <p className="font-serif text-base text-gold mt-1 font-light">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Materials & Manufacturing Section (Interactive Spec Inspector) */}
      <div className="reveal-section section-pad max-w-7xl mx-auto mb-32 border-t border-white/5 pt-24">
        <div className="text-center mb-12">
          <p className="label-text mb-4">Interactive Specs</p>
          <h2 className="heading-md">
            Materials & <span className="text-gold italic">Engineered Specs</span>
          </h2>
          <p className="body-text max-w-xl mx-auto mt-4 text-off-white/50">
            Click each tab to inspect the blueprints, technical specifications, and laboratory performance ratings of our raw materials.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center flex-wrap gap-3 mb-16 border-b border-white/5 pb-8">
          {MATERIAL_SPECS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSpecTab(tab.id)}
              className={`px-5 py-3 font-sans text-[10px] tracking-widest uppercase border transition-all duration-300 cursor-pointer ${
                activeSpecTab === tab.id
                  ? 'border-gold text-gold bg-gold/5'
                  : 'border-white/10 text-off-white/50 hover:border-gold/30 hover:text-gold'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Selected Tab Detail Grid */}
        <AnimatePresence mode="wait">
          {MATERIAL_SPECS.filter((item) => item.id === activeSpecTab).map((selected) => (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              {/* Left Column: Blueprint */}
              <div className="lg:col-span-4 bg-[#0a0a0a] border border-white/10 p-6 flex flex-col items-center justify-center rounded-sm relative group overflow-hidden">
                <div className="absolute top-4 left-4">
                  <span className="font-serif text-[10px] tracking-wider text-gold">{selected.num} / BLUEPRINT</span>
                </div>
                {selected.blueprint}
                <div className="absolute bottom-4 right-4">
                  <span className="font-sans text-[9px] tracking-widest text-off-white/20 uppercase">CREX Technical Lab</span>
                </div>
              </div>

              {/* Middle Column: Specs Description */}
              <div className="lg:col-span-5 flex flex-col gap-6 text-left">
                <div>
                  <span className="font-sans text-[9px] tracking-widest uppercase text-gold">Spec Sheet</span>
                  <h3 className="font-serif text-2xl font-light text-off-white mt-2 mb-3">{selected.name}</h3>
                  <p className="font-sans text-xs text-off-white/60 leading-relaxed">{selected.desc}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6">
                  {selected.specs.map((s, idx) => (
                    <div key={idx}>
                      <p className="font-sans text-[10px] text-off-white/40 uppercase tracking-wider">{s.label}</p>
                      <p className="font-serif text-base text-gold mt-1 font-light">{s.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Lab ratings progress bars */}
              <div className="lg:col-span-3 bg-white/[0.01] border border-white/5 p-6 rounded-sm flex flex-col gap-6 text-left">
                <h4 className="font-serif text-xs tracking-wider text-gold uppercase border-b border-white/5 pb-2">
                  Lab Ratings
                </h4>
                <div className="flex flex-col gap-5">
                  {selected.bars.map((bar, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between font-sans text-[10px] text-off-white/70 mb-1">
                        <span>{bar.name}</span>
                        <span className="text-gold">{bar.value}%</span>
                      </div>
                      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${bar.value}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className="h-full bg-gold"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Cleft Grades Comparison Guide (Fact Knowledge) */}
      <div className="reveal-section section-pad max-w-7xl mx-auto mb-32 border-t border-white/5 pt-24">
        <div className="text-center mb-12">
          <p className="label-text mb-4">Willow Knowledge</p>
          <h2 className="heading-md">
            The Cleft Grading <span className="text-gold italic">Spectrum</span>
          </h2>
          <p className="body-text max-w-xl mx-auto mt-4 text-off-white/50 text-sm font-light leading-relaxed">
            Click each cleft grade to inspect structural metrics, grain straightness, and moisture profiles from our laboratory testing registry.
          </p>
        </div>

        {/* Grade Tab selectors */}
        <div className="flex justify-center flex-wrap gap-3 mb-16 border-b border-white/5 pb-8">
          {[
            { id: 'grade1plus', label: 'Grade 1+ Pro Elite' },
            { id: 'grade1', label: 'Grade 1 Pro Grade' },
            { id: 'grade2', label: 'Grade 2 Club Grade' },
            { id: 'kashmir', label: 'Kashmir Willow' }
          ].map((grade) => (
            <button
              key={grade.id}
              onClick={() => setActiveCompareGrade(grade.id)}
              className={`px-5 py-3 font-sans text-[10px] tracking-widest uppercase border transition-all duration-300 cursor-pointer ${
                activeCompareGrade === grade.id
                  ? 'border-gold text-gold bg-gold/5'
                  : 'border-white/10 text-off-white/50 hover:border-gold/30 hover:text-gold'
              }`}
            >
              {grade.label}
            </button>
          ))}
        </div>

        {/* Selected Grade Detail Grid */}
        <AnimatePresence mode="wait">
          {Object.keys(GRADE_COMPARISON).filter((key) => key === activeCompareGrade).map((key) => {
            const data = GRADE_COMPARISON[key];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
              >
                {/* Left Column: Grade Details */}
                <div className="lg:col-span-7 flex flex-col gap-6 text-left bg-[#080808] border border-white/5 p-8 rounded-sm">
                  <div>
                    <div className="flex justify-between items-center flex-wrap gap-4 border-b border-white/5 pb-4 mb-4">
                      <div>
                        <span className="font-sans text-[8px] tracking-widest uppercase text-gold">Material Registry</span>
                        <h3 className="font-serif text-2xl font-light text-off-white mt-1">{data.name}</h3>
                      </div>
                    </div>
                    <p className="font-sans text-xs text-off-white/60 leading-relaxed mb-6">
                      {data.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/5">
                    <div>
                      <p className="font-sans text-[9px] text-off-white/40 uppercase tracking-widest">Growth Profile</p>
                      <p className="font-serif text-lg text-gold mt-1 font-light">{data.grains}</p>
                    </div>
                    <div>
                      <p className="font-sans text-[9px] text-off-white/40 uppercase tracking-widest">Hydration Level</p>
                      <p className="font-serif text-lg text-gold mt-1 font-light">{data.moisture}</p>
                    </div>
                  </div>
                </div>

                {/* Right Column: Lab ratings progress bars */}
                <div className="lg:col-span-5 bg-white/[0.01] border border-white/5 p-8 rounded-sm flex flex-col gap-6 text-left">
                  <h4 className="font-serif text-xs tracking-wider text-gold uppercase border-b border-white/5 pb-2">
                    Elasticity & Structural Ratings
                  </h4>
                  <div className="flex flex-col gap-5">
                    {data.ratings.map((rating, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between font-sans text-[10px] text-off-white/70 mb-1">
                          <span>{rating.label}</span>
                          <span className="text-gold">{rating.value}%</span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${rating.value}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className="h-full bg-gold"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Sustainability Stewardship (Eco Initiative) */}
      <div className="reveal-section section-pad max-w-7xl mx-auto mb-32 border-t border-white/5 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-video bg-[#0a0a0a] border border-white/5 flex flex-col justify-center p-8 rounded-sm text-left">
            <span className="font-sans text-[9px] tracking-widest text-gold uppercase mb-2">Pledge & Cycle</span>
            <h3 className="font-serif text-2xl font-light text-off-white mb-4">The 3-for-1 Willow Cycle</h3>
            <p className="font-sans text-xs text-off-white/50 leading-relaxed mb-6">
              English White Willow is a precious resource. We harvest only mature trees (15+ years old) from private reserves in East Anglia. To protect future players, we fund and manage local planting efforts.
            </p>
            <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-6">
              <div>
                <p className="font-serif text-2xl text-gold font-light">12,500+</p>
                <p className="font-sans text-[9px] text-off-white/40 uppercase mt-1">Saplings Planted</p>
              </div>
              <div>
                <p className="font-serif text-2xl text-gold font-light">45 Hectares</p>
                <p className="font-sans text-[9px] text-off-white/40 uppercase mt-1">Managed Forests</p>
              </div>
              <div>
                <p className="font-serif text-2xl text-gold font-light">100% Cured</p>
                <p className="font-sans text-[9px] text-off-white/40 uppercase mt-1">Traceable Wood</p>
              </div>
            </div>
          </div>
          <div className="text-left">
            <p className="label-text mb-4">Eco Sourcing</p>
            <h2 className="heading-md mb-6">
              Preserving the <span className="text-gold italic">Willows Future</span>
            </h2>
            <p className="body-text mb-6 leading-loose text-off-white/70">
              For every single bat hand-carved in our workshop, we commit to planting three new White Willow saplings in the East Anglian wetlands. This ensures that the natural ecosystem thrives and that the raw timber needed for future generations is preserved.
            </p>
            <p className="body-text leading-loose text-off-white/70">
              We work directly with forestry wardens to inspect soil conditions and monitor timber health, tracking the carbon capture metrics of our private reserves to keep our footprint completely neutral.
            </p>
          </div>
        </div>
      </div>

      {/* The Story Timeline */}
      <div className="reveal-section bg-charcoal/30 py-24 border-t border-b border-white/5 mb-32">
        <div className="section-pad max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="label-text mb-4">Chronology</p>
            <h2 className="heading-md">
              A History of <span className="text-gold italic">Scientific Craft</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="border border-white/5 p-6 bg-black/40 text-left">
              <span className="font-serif text-3xl text-gold font-light mb-3 block">2026</span>
              <h3 className="font-serif text-lg font-light text-off-white mb-2">The Genesis</h3>
              <p className="font-sans text-[11px] text-off-white/60 leading-relaxed">
                Founded by Savdas Mer and Krunal Champanera in Green City, Junagadh, hand-crafting elite willow blades for premier players.
              </p>
            </div>
            <div className="border border-white/5 p-6 bg-black/40 text-left">
              <span className="font-serif text-3xl text-gold font-light mb-3 block">2026</span>
              <h3 className="font-serif text-lg font-light text-off-white mb-2">Junagadh HQ</h3>
              <p className="font-sans text-[11px] text-off-white/60 leading-relaxed">
                Opened our primary seasoned cleft curing yards and hydraulic pressing workshops in Gujarat, India.
              </p>
            </div>
            <div className="border border-white/5 p-6 bg-black/40 text-left">
              <span className="font-serif text-3xl text-gold font-light mb-3 block">2026</span>
              <h3 className="font-serif text-lg font-light text-off-white mb-2">Telemetry Launch</h3>
              <p className="font-sans text-[11px] text-off-white/60 leading-relaxed">
                Integrated the first 3D gyroscopic swing telemetry sensors inside bat handles for player swing analytics.
              </p>
            </div>
            <div className="border border-white/5 p-6 bg-black/40 text-left">
              <span className="font-serif text-3xl text-gold font-light mb-3 block">2026</span>
              <h3 className="font-serif text-lg font-light text-off-white mb-2">Carbon Shield</h3>
              <p className="font-sans text-[11px] text-off-white/60 leading-relaxed">
                Patented aerospace-grade carbon fiber composite shielding for helmets and protective batting gear.
              </p>
            </div>
            <div className="border border-white/5 p-6 bg-black/40 text-left">
              <span className="font-serif text-3xl text-gold font-light mb-3 block">2027+</span>
              <h3 className="font-serif text-lg font-light text-off-white mb-2">Global Eco</h3>
              <p className="font-sans text-[11px] text-off-white/60 leading-relaxed">
                Expanding our self-renewing wood replanting cycles and bringing custom Junagadh craftsmanship worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sourcing & Biosphere Metrics */}
      <div className="reveal-section section-pad max-w-7xl mx-auto mb-32 border-t border-white/5 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 text-left">
            <p className="label-text mb-4">Forestry Science</p>
            <h2 className="heading-md mb-6">
              English Willow <span className="text-gold italic">Cleft Sourcing</span>
            </h2>
            <p className="body-text mb-6 leading-loose text-off-white/70 text-sm font-light">
              Willow growth rings are formed by season-by-season rain and cell expansion. Sourcing premium timber from private English reserves allows us to secure raw clefts grown in optimal climate conditions, preventing density discrepancies.
            </p>
            <p className="body-text leading-loose text-off-white/70 text-sm font-light">
              Through partnership with East Anglia University's Forestry Division, we track soil moisture, sap circulation flow, and ambient tree temperatures to select trees that offer the highest cell lumen resilience indices.
            </p>
          </div>

          <div className="lg:col-span-7 bg-[#0a0a0a] border border-white/5 p-8 rounded-sm grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="p-5 border border-white/5 bg-black/20 rounded-sm">
              <span className="font-sans text-[8px] tracking-widest uppercase text-gold">Rainfall Index</span>
              <h4 className="font-serif text-lg font-light text-off-white mt-2 mb-2">620mm Annual Average</h4>
              <p className="font-sans text-[10px] text-off-white/50 leading-relaxed">
                Predictable UK rainfall yields growth rings spacing of 2-3mm, creating the perfect balance of straight grains and fiber spring density.
              </p>
            </div>

            <div className="p-5 border border-white/5 bg-black/20 rounded-sm">
              <span className="font-sans text-[8px] tracking-widest uppercase text-gold">Soil Composition</span>
              <h4 className="font-serif text-lg font-light text-off-white mt-2 mb-2">Silt-Clay Alluvium</h4>
              <p className="font-sans text-[10px] text-off-white/50 leading-relaxed">
                Deep alluvial clay deposits in English wetlands enrich willow roots with key mineral trace elements, ensuring elastic growth structures.
              </p>
            </div>

            <div className="p-5 border border-white/5 bg-black/20 rounded-sm">
              <span className="font-sans text-[8px] tracking-widest uppercase text-gold">Carbon Sequestration</span>
              <h4 className="font-serif text-lg font-light text-off-white mt-2 mb-2">1,200 Tons CO₂ / Year</h4>
              <p className="font-sans text-[10px] text-off-white/50 leading-relaxed">
                Our managed reserves capture 1,200 tons of carbon annually, ensuring the entire wood curing and shipping line remains carbon negative.
              </p>
            </div>

            <div className="p-5 border border-white/5 bg-black/20 rounded-sm">
              <span className="font-sans text-[8px] tracking-widest uppercase text-gold">Partner University</span>
              <h4 className="font-serif text-lg font-light text-off-white mt-2 mb-2">East Anglia Forestry</h4>
              <p className="font-sans text-[10px] text-off-white/50 leading-relaxed">
                Bi-annual audits evaluate the moisture retention, elasticity, and cellulose structure of our white willow reserves.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="reveal-section section-pad max-w-5xl mx-auto text-center">
        <p className="label-text mb-4">Values</p>
        <h2 className="heading-md mb-8">
          The Pillars of <span className="text-gold italic">CREX ELITE</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left mt-12">
          <div className="p-6 border-l border-gold/30">
            <h3 className="font-serif text-2xl font-light text-off-white mb-3">Aesthetic Perfection</h3>
            <p className="font-sans text-sm text-off-white/60 leading-relaxed">
              We design equipment that matches performance with high-class presentation. Luxury lines, minimalist branding, and premium finishes.
            </p>
          </div>
          <div className="p-6 border-l border-gold/30">
            <h3 className="font-serif text-2xl font-light text-off-white mb-3">Uncompromising Performance</h3>
            <p className="font-sans text-sm text-off-white/60 leading-relaxed">
              Every detail is engineered to offer maximum rebound speed, balance, and impact resistance. We never sacrifice quality for mass-production.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
