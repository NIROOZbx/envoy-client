import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-center items-center py-20 px-6 overflow-hidden">
             {/* Background Glow: Blurred Ellipse Stacking */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 1024"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="ellipse-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="50" />
            </filter>
          </defs>
          {/* Layer 1: Pale Ivory (Wide Base) */}
          <ellipse cx="720" cy="1024" rx="1440" ry="450" fill="#FAF3E1" filter="url(#ellipse-glow)" />
          {/* Layer 2: Warm Cream */}
          <ellipse cx="720" cy="1024" rx="1200" ry="350" fill="#F5E7C6" filter="url(#ellipse-glow)" />
          {/* Layer 3: Saturated Orange */}
          <ellipse cx="720" cy="1024" rx="950" ry="250" fill="#FA8112" filter="url(#ellipse-glow)" />
          {/* Layer 4: Dark Charcoal Core */}
          <ellipse cx="720" cy="1024" rx="700" ry="130" fill="#1A1208" filter="url(#ellipse-glow)" />
        </svg>
      </div>

 
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center relative z-10">

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[42px] sm:text-6xl lg:text-9xl font-bold tracking-tight text-black leading-[0.95] sm:leading-[0.85] mb-8"
        >
          Notifications That <br className="hidden sm:block" />
          <span className="inline-flex items-center gap-2 lg:gap-3 align-middle">
            <motion.img
              src="/bell3d.png"
              className="h-10 sm:h-16 lg:h-28 w-auto drop-shadow-xl"
              animate={{ y: [0, -10, 0], rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="text-destructive whitespace-nowrap">Never Wait</span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl text-xl text-ui-muted leading-tight mb-12"
        >
          Stop fighting legacy infrastructure. Route events, <br className="hidden lg:block" />
          automate logic, and ensure real-time delivery at scale.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            to="/register"
            className="group h-14 sm:h-16 px-6 sm:px-10 bg-black text-white rounded-2xl font-bold text-xs sm:text-sm uppercase tracking-widest flex items-center gap-3 hover:bg-black-hover transition-colors shadow-2xl shadow-black/20"
          >
            Start Shipping
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/docs"
            className="h-14 sm:h-16 px-6 sm:px-10 border border-ui-border text-black rounded-2xl font-bold text-xs sm:text-sm uppercase tracking-widest flex items-center hover:bg-black/5 transition-all"
          >
            API Documentation
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
