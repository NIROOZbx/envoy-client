import React from 'react';
import { motion } from 'framer-motion';

const features = [
  { title: "Predictable, Reliable Delivery", desc: "Our engine ensures your critical messages reach their destination, every time." },
  { title: "Zero Latency Relays", desc: "Built with high-performance Go architecture to minimize delay between event and delivery." },
  { title: "Multi-Provider Failover", desc: "Switch providers instantly if one goes down, maintaining uninterrupted service." },
  { title: "Automated Rescheduling", desc: "Smart retry logic handles transient failures without manual intervention." },
  { title: "Advanced Batching", desc: "Reduce noise by grouping multiple notifications into a single elegant delivery." },
  { title: "Scalability as Standard", desc: "Process millions of events per second without breaking a sweat." },
];

export const Growth: React.FC = () => {
  return (
    <section className="py-24 lg:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl lg:text-7xl font-black tracking-tighter mb-4 underline decoration-black decoration-4 underline-offset-8 leading-none">
              Built to Help You Grow
            </h2>
            <p className="text-lg text-(--black-40) font-medium">
              One platform to manage notifications, pipelines, and everything in between.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 bg-white border border-(--black-10) rounded-[2.5rem] hover:border-black transition-colors"
            >
              <h4 className="text-lg font-bold mb-3 tracking-tight">{feature.title}</h4>
              <p className="text-sm text-(--black-40) font-medium leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
