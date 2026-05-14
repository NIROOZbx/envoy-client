import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DocsSearch: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
      }
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/20 backdrop-blur-sm" 
        />

        {/* Modal Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-black/5 overflow-hidden"
        >
          {/* Search Header */}
          <div className="flex items-center px-4 h-14 border-b border-black/5">
            <Search size={18} className="text-black/40 mr-3" />
            <input 
              autoFocus
              placeholder="Search documentation..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-sm font-semibold placeholder:text-black/20"
            />
            <div className="flex items-center gap-1.5 px-2 py-1 bg-black/5 rounded-md">
              <span className="text-[10px] font-black uppercase tracking-widest text-black/40">ESC</span>
            </div>
          </div>

          {/* Results Area */}
          <div className="max-h-[400px] overflow-y-auto p-2">
            {query.length > 0 ? (
              <div className="space-y-1">
                <div className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-black/20">Results</div>
                {[
                  { title: 'Introduction', section: 'Getting Started', path: '/docs/introduction' },
                  { title: 'Quickstart', section: 'Getting Started', path: '/docs/quickstart' },
                  { title: 'Core Concepts', section: 'Getting Started', path: '/docs/concepts' },
                ].filter(r => r.title.toLowerCase().includes(query.toLowerCase())).map((result) => (
                  <button
                    key={result.path}
                    onClick={() => {
                      navigate(result.path);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-3 hover:bg-black/5 rounded-xl transition-all group text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                        <FileText size={16} />
                      </div>
                      <div>
                        <div className="text-sm font-black tracking-tight">{result.title}</div>
                        <div className="text-[10px] font-bold text-black/40">{result.section}</div>
                      </div>
                    </div>
                    <ArrowRight size={14} className="text-black/0 group-hover:text-black/20 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-center opacity-20">
                <Search size={48} className="mb-4" />
                <p className="text-sm font-black uppercase tracking-widest">Type to search docs</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 bg-black/[0.02] border-t border-black/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-black/5 text-[10px] font-black tracking-tighter">↑↓</kbd>
                <span className="text-[10px] font-bold text-black/40">to navigate</span>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-black/5 text-[10px] font-black tracking-tighter">↵</kbd>
                <span className="text-[10px] font-bold text-black/40">to select</span>
              </div>
            </div>
            <div className="text-[10px] font-bold text-black/20 uppercase tracking-widest">ENVOY Docs Search</div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
