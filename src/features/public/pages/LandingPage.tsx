import React from 'react';
import { Hero } from '../components/Hero';
import { HeroMarquee } from '../components/HeroMarquee';
import { Integrations } from '../components/Integrations';
import { BentoGrid } from '../components/BentoGrid';
import { Growth } from '../components/Growth';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-pearl selection:bg-black selection:text-pearl">
      <Hero />
      <HeroMarquee />
      <Integrations />
      <BentoGrid />
      <Growth />
    </div>
  );
};
