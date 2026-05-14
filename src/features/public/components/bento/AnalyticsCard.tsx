import React from 'react';
import { motion } from 'framer-motion';

var PHONE_IMAGE = "/mockup.png";

export const AnalyticsCard: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-[110%] flex flex-col items-center justify-center translate-y-[5%]">

        {/* Main Mockup Image */}
        <div className="relative w-[95%] h-full flex items-center justify-center">
          <img
            src={PHONE_IMAGE}
            className="w-full h-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.1)]"
            alt="Dashboard Analytics"
          />

          {/* Compact Overlapping Sent Status Card */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[25%] left-[5%] z-20"
          >
            <div className="bg-white/95 backdrop-blur-md rounded-xl p-2 shadow-2xl border border-black/5 w-[140px]">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-full bg-[#673AB7]/10 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#673AB7]" />
                </div>
                <span className="text-[8px] font-satoshi-bold uppercase tracking-widest text-black/40">Sent</span>
              </div>
              <div className="text-sm font-satoshi-black text-black">Delivered</div>
              <div className=" text-[8px] font-satoshi-medium text-black/30">Just now • Email</div>
            </div>
          </motion.div>

          {/* Compact Overlapping Delivered Count Card */}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-[28%] right-[5%] z-20"
          >
            <div className="bg-white/95 backdrop-blur-md rounded-xl p-3.5 shadow-2xl border border-black/5 w-[150px]">
              <div className="flex justify-between items-start mb-0.5">
                <span className="text-[8px] font-satoshi-bold uppercase tracking-widest text-black/40">Total</span>
                <span className="text-[8px] font-satoshi-black text-green-500">+99%</span>
              </div>
              <div className="text-xl font-satoshi-black text-black tracking-tight">17,234</div>
              <div className="mt-2 flex gap-0.5">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-0.5 flex-1 bg-black rounded-full opacity-[0.05]" />
                ))}
                <div className="h-0.5 flex-1 bg-black rounded-full" />
              </div>
            </div>
          </motion.div>

          {/* Minimal Channel Badge */}
          <div className="absolute top-[12%] right-[12%] bg-black text-white px-3 py-1 rounded-full text-[8px] font-satoshi-bold uppercase tracking-widest shadow-xl">
            Live Activity
          </div>
        </div>
      </div>
    </div>
  );
};