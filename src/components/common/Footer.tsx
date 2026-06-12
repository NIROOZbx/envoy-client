import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Share2, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-pearl border-t border-black/5 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-ui bg-black">
                <Bell className="h-4 w-4 text-pearl" />
              </div>
              <span className="text-md font-black uppercase tracking-tighter text-black">ENVOY</span>
            </div>
            <p className="text-[13px] font-bold text-black/40 leading-relaxed max-w-[200px]">
              The infrastructure layer for modern product notifications.
            </p>
          </div>

          {/* Links Columns */}
          {[
            { title: 'Platform', links: ['Workflow', 'Providers', 'Logs', 'API Docs'] },
            { title: 'Company', links: ['About', 'Changelog', 'Careers', 'Contact'] },
            { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'SLA'] },
          ].map((section) => (
            <div key={section.title}>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-black mb-6">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link to="#" className="text-[12px] font-bold text-black/40 hover:text-black transition-colors">{link}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[11px] font-bold text-black/20 uppercase tracking-widest">
            © 2026 ENVOY Infrastructure Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-black/20">
            <Share2 size={16} className="hover:text-black cursor-pointer transition-colors" />
            
            {/* Using the public GitHub SVG */}
            <Link to="https://github.com/NIROOZbx/notification-engine" target="_blank">
              <img src="/github.svg" alt="GitHub" className="w-4 h-4 opacity-20 hover:opacity-100 transition-opacity" />
            </Link>

            <Globe size={16} className="hover:text-black cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </footer>
  );
};
