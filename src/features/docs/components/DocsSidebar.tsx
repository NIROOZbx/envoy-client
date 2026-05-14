import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { getDocsBySection } from '../constants/docs-registry';
import { cn } from '@/lib/utils';
import { Search, Command } from 'lucide-react';

export const DocsSidebar: React.FC<{ onSearchOpen: () => void }> = ({ onSearchOpen }) => {
  const sections = getDocsBySection();

  return (
    <aside className="w-[260px] h-screen fixed left-0 top-0 pt-16 pb-10 px-6 border-r border-black/5 bg-pearl overflow-y-auto hidden lg:block z-50">
      {/* Logo + Docs Wordmark */}
      <div className="flex items-center gap-3 mb-8 px-1">
        <Link to="/" className="text-[14px] font-black uppercase tracking-tighter text-ui-text">
          ENVOY
        </Link>
        <div className="h-3 w-[1px] bg-ui-border mx-1" />
        <span className="text-[10px] font-black uppercase tracking-widest text-ui-muted-subtle">Docs</span>
      </div>

      {/* Search Bar */}
      <button 
        onClick={onSearchOpen}
        className="w-full flex items-center justify-between px-3 py-2 bg-black/5 hover:bg-black/10 rounded-lg transition-all mb-8 group"
      >
        <div className="flex items-center gap-2">
          <Search size={14} className="text-ui-muted-subtle group-hover:text-ui-text transition-colors" />
          <span className="text-xs font-semibold text-ui-muted-subtle group-hover:text-ui-text transition-colors">Search...</span>
        </div>
        <div className="flex items-center gap-1">
          <Command size={10} className="text-black/20" />
          <span className="text-[10px] font-bold text-black/20">K</span>
        </div>
      </button>

      <nav className="space-y-8">
        {Object.entries(sections).map(([sectionName, pages]) => (
          <div key={sectionName} className="space-y-3">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-ui-muted-subtle px-3">
              {sectionName}
            </h4>
            <div className="space-y-1">
              {pages.map((page) => (
                <NavLink
                  key={page.slug}
                  to={`/docs/${page.slug}`}
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 px-3 py-1.5 rounded-md text-sm font-semibold transition-all border-l-2",
                    isActive 
                      ? "bg-black/5 text-ui-text border-black font-black" 
                      : "text-ui-muted-dark hover:text-ui-text hover:bg-black/[0.02] border-transparent"
                  )}
                >
                  {page.title}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Version Badge */}
      <div className="mt-12 pt-8 border-t border-black/5 flex items-center justify-between px-3">
        <span className="text-[10px] font-black uppercase tracking-widest text-black/20">v1.0</span>
        <a href="#" className="text-[10px] font-black uppercase tracking-widest text-black/40 hover:text-black transition-colors">
          Changelog
        </a>
      </div>
    </aside>
  );
};
