import React, { useState, useEffect } from 'react';
import { DocsSidebar } from '../../docs/components/DocsSidebar';
import { DocsTOC } from '../../docs/components/DocsTOC';
import { DocsSearch } from '../../docs/components/DocsSearch';
import { Outlet, useLocation } from 'react-router-dom';

export const DocsPage: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-pearl flex flex-col">
      <div className="flex-1 flex">
        {/* Sidebar - Fixed */}
        <DocsSidebar onSearchOpen={() => setIsSearchOpen(true)} />

        {/* Main Content Area */}
        <main className="flex-1 lg:pl-[260px] xl:pr-[200px] relative z-0">
          <div 
            key={location.pathname}
            className="max-w-[720px] mx-auto px-6 lg:px-12 py-16 lg:py-24 animate-in fade-in slide-in-from-bottom-2 duration-500"
          >
            <Outlet />
          </div>
        </main>

        {/* TOC - Fixed */}
        <DocsTOC />
      </div>

      <DocsSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};
