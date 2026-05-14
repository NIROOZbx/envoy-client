import React from 'react';
import { Link } from 'react-router-dom';
import {  Search, Command, ArrowRight, Sun } from 'lucide-react';

export const DocsNavbar: React.FC<{ onSearchOpen: () => void }> = ({ onSearchOpen }) => {
  return (
    <header className="h-14 fixed top-0 left-0 right-0 z-[60] bg-pearl border-b border-black/5 flex items-center justify-between px-6">
      {/* Left: Logo */}
      <div className="flex items-center gap-4">
        <Link to="/" className="text-[14px] font-black uppercase tracking-tighter text-black">
          ENVOY
        </Link>
        <div className="h-4 w-[1px] bg-black/10 mx-2" />
        <span className="text-[10px] font-black uppercase tracking-widest text-black/40">Docs</span>
      </div>

      {/* Center: Search Trigger (Desktop) */}
      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <button 
          onClick={onSearchOpen}
          className="w-full flex items-center justify-between px-3 py-1.5 bg-black/5 hover:bg-black/10 rounded-lg transition-all group"
        >
          <div className="flex items-center gap-2">
            <Search size={14} className="text-black/40 group-hover:text-black transition-colors" />
            <span className="text-xs font-semibold text-black/40 group-hover:text-black transition-colors">Search documentation...</span>
          </div>
          <div className="flex items-center gap-1">
            <Command size={10} className="text-black/20" />
            <span className="text-[10px] font-bold text-black/20">K</span>
          </div>
        </button>
      </div>

      {/* Right: Links */}
      <div className="flex items-center gap-3">
        <a 
          href="https://github.com/nyrooz/notification-engine" 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 hover:bg-black/5 rounded-lg transition-all text-black/60 hover:text-black"
        >
        </a>
        <button className="p-2 hover:bg-black/5 rounded-lg transition-all text-black/60 hover:text-black">
          <Sun size={20} />
        </button>
        <div className="w-[1px] h-4 bg-black/10 mx-1" />
        <Link 
          to="/dashboard" 
          className="flex items-center gap-2 px-3 py-1.5 bg-black text-white rounded-lg text-[11px] font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-black/10"
        >
          Dashboard
          <ArrowRight size={14} />
        </Link>
      </div>
    </header>
  );
};
