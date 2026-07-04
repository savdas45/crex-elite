import React from 'react';
import Hero from '../components/Hero';
import MarqueeStrip from '../components/Marquee';
import Products from '../components/Products';
import HorizontalScroll from '../components/HorizontalScroll';
import Stats from '../components/Stats';
import Apparel from '../components/Apparel';
import MannequinShowcase from '../components/MannequinShowcase';
import BespokeConfigurator from '../components/BespokeConfigurator';
import Newsletter from '../components/Newsletter';

export default function Home() {
  return (
    <div className="home-page-container">
      <Hero />
      <MarqueeStrip />
      <Products />
      <HorizontalScroll />
      <Stats />
      <Apparel />
      <MannequinShowcase />
      <BespokeConfigurator />
      <Newsletter />
    </div>
  );
}
