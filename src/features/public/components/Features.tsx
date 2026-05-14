import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Share2, Zap } from 'lucide-react';

export const Features: React.FC = () => {
  return (
    <section className="py-24 lg:py-32 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-black tracking-tighter mb-6 leading-[1.1]">
            Transform Your Infrastructure <br />
            into a Notification Powerhouse
          </h2>
          <p className="text-lg text-(--black-40) font-medium max-w-2xl mx-auto">
            Everything you need to build and scale your notifications — all in one platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 bg-pearl rounded-[2.5rem] border border-(--black-5) group hover:shadow-2xl hover:shadow-black/5 transition-all">
            <div className="w-12 h-12 bg-black text-pearl rounded-2xl flex items-center justify-center mb-6">
              <Bell size={24} />
            </div>
            <h3 className="text-xl font-bold mb-4">Centralized Control</h3>
            <p className="text-sm text-(--black-40) font-medium leading-relaxed mb-6">
              Manage all your templates and provider connections from a single unified workspace.
            </p>
            <div className="space-y-2">
              {[50, 80, 40].map((w, i) => (
                <div key={i} className="h-1 bg-black/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${w}%` }} className="h-full bg-black/20" />
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 bg-pearl rounded-[2.5rem] border border-(--black-5) group hover:shadow-2xl hover:shadow-black/5 transition-all">
            <div className="w-12 h-12 bg-black text-pearl rounded-2xl flex items-center justify-center mb-6">
              <Share2 size={24} />
            </div>
            <h3 className="text-xl font-bold mb-4">Dynamic Routing</h3>
            <p className="text-sm text-(--black-40) font-medium leading-relaxed mb-6">
              Deliver messages to the right channel based on user preferences and logic.
            </p>
            <div className="p-4 bg-white rounded-xl border border-(--black-10) space-y-2">
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wider">
                <span>If User Offline</span>
                <span className="px-2 py-0.5 bg-black text-white rounded">Push</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wider">
                <span>Fallback</span>
                <span className="px-2 py-0.5 bg-(--black-5) rounded">Email</span>
              </div>
            </div>
          </div>

          <div className="p-8 bg-pearl rounded-[2.5rem] border border-(--black-5) group hover:shadow-2xl hover:shadow-black/5 transition-all">
            <div className="w-12 h-12 bg-black text-pearl rounded-2xl flex items-center justify-center mb-6">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold mb-4">Real-Time Insights</h3>
            <p className="text-sm text-(--black-40) font-medium leading-relaxed mb-6">
              Track delivery rates, latencies, and conversion across every provider.
            </p>
            <div className="flex justify-end items-end gap-1.5 h-12 mt-4">
              {[30, 60, 45, 90, 70, 100].map((h, i) => (
                <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} className="w-full bg-black rounded-t-[4px]" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
