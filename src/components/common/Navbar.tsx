import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-3">
      <motion.nav
        initial={false}
        animate={{
          width: isScrolled ? '1200px' : '100%',
          borderRadius: isScrolled ? '100px' : '0px',
          backgroundColor: isScrolled ? 'color-mix(in srgb, var(--pearl), transparent 25%)' : 'transparent',
          paddingLeft: isScrolled ? '32px' : '40px',
          paddingRight: isScrolled ? '32px' : '40px',
          y: isScrolled ? 10 : 0,
        }}
        transition={{ type: 'spring', stiffness: 450, damping: 35 }}
        className={`grid grid-cols-2 lg:grid-cols-3 items-center h-16 transition-shadow backdrop-blur-xl ${isScrolled ? 'shadow-2xl shadow-black/5' : ''
          }`}
      >
        {/* Column 1: Logo */}
        <div className="flex justify-start">
          <Link to="/" className="text-[16px] font-black uppercase tracking-tighter text-black">
            ENVOY
          </Link>
        </div>

        {/* Column 2: Nav Links (Mathematical Center) - Hidden on Mobile */}
        <div className="hidden lg:flex justify-center">
          <div className="flex gap-14 items-center">
            {[
              { name: 'Home', path: '/' },
              { name: 'Contact Us', path: 'mailto:hello@envoy.io' },
              { name: 'Pricing', path: '/pricing' },
              { name: 'Docs', path: '/docs' }
            ].map((item) => (
              <Link 
                key={item.name} 
                to={item.path} 
                className="font-bold text-[13px] whitespace-nowrap text-black hover:opacity-70 transition-opacity"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Column 3: Action Buttons */}
        <div className="flex justify-end items-center gap-2 sm:gap-4">
          <Link
            to="/login"
            className="px-3 sm:px-5 py-2 whitespace-nowrap text-[12px] sm:text-[13px] font-semibold text-black hover:bg-black/5 rounded-full transition-all"
          >
            Log in
          </Link>

          <Link
            to="/register"
            className={`flex items-center justify-center font-bold text-pearl whitespace-nowrap bg-black hover:opacity-90 transition-all ${isScrolled
              ? 'h-9 sm:h-10 px-4 sm:px-6 rounded-full text-[11px] sm:text-[12px]  tracking-widest'
              : 'h-10 sm:h-11 px-5 sm:px-8 rounded-full text-[12px] sm:text-[14px]'
              }`}
          >
            Get Started
            <ChevronRight size={14} className="ml-1 opacity-50 hidden sm:block" />
          </Link>
        </div>
      </motion.nav>
    </div>
  );
};
