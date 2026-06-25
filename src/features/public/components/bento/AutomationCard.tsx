import React from 'react';

export const AutomationCard: React.FC = () => {
  return (
    <div className="relative mt-8 flex flex-col items-center w-full h-full">
      
      {/* SVG Lines Layer — Connecting the nodes */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none" 
        viewBox="0 0 400 400"
        fill="none"
      >
        {/* Main Tree (Settings -> Left/Right Nodes) */}
        <path d="M 200 60 L 200 100 L 90 100 L 90 160" stroke="#000" strokeOpacity="0.05" strokeWidth="1.5" />
        <path d="M 200 60 L 200 100 L 310 100 L 310 160" stroke="#000" strokeOpacity="0.05" strokeWidth="1.5" />
        
        {/* Convergence (Left/Right Nodes -> Bottom Node) */}
        <path d="M 90 200 L 90 240 L 200 240 L 200 280" stroke="#000" strokeOpacity="0.05" strokeWidth="1.5" />
        <path d="M 310 200 L 310 240 L 200 240 L 200 280" stroke="#000" strokeOpacity="0.05" strokeWidth="1.5" />
      </svg>

      {/* 1. Master Node (Top) */}
      <div className="relative z-10 w-14 h-14 bg-white border border-black/5 rounded-2xl flex items-center justify-center shadow-xl p-3">
        <img src="/settings.png" className="w-full h-full object-contain" alt="Settings" />
      </div>

      {/* 2. Middle Tier (Left & Right) */}
      <div className="relative z-10 flex justify-between w-full mt-16 px-4">
         {/* Save Time Node */}
         <div className="flex flex-col items-center gap-2 bg-white border border-black/5 rounded-full px-5 py-2.5 shadow-sm">
            <div className="flex items-center gap-2">
               <img src="/timer.svg" className="w-4 h-4" alt="" />
               <span className="text-[11px] font-bold uppercase tracking-widest text-black">Save Time</span>
            </div>
         </div>

         {/* Stay Focused Node */}
         <div className="flex flex-col items-center gap-2 bg-white border border-black/5 rounded-full px-5 py-2.5 shadow-sm">
            <div className="flex items-center gap-2">
               <img src="/Scan.png" className="w-4 h-4 object-contain" alt="" />
               <span className="text-[11px] font-bold uppercase tracking-widest text-black">Stay Focused</span>
            </div>
         </div>
      </div>

      {/* 3. Terminal Node (Bottom) */}
      <div className="relative z-10 bg-white border border-black/5 rounded-full px-6 py-3 shadow-sm mt-20">
        <div className="flex items-center gap-3">
          <img src="/noun-easy-4676087.svg" className="w-5 h-5" alt="" />
          <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-black">One Click</span>
        </div>
      </div>
    </div>
  );
};