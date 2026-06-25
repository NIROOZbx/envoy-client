import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Sub-components
import { AutomationCard } from './bento/AutomationCard';
import { IntegrationsCard } from './bento/IntegrationsCard';
import { CollaborationCard } from './bento/CollaborationCard';
import { AnalyticsCard } from './bento/AnalyticsCard';

interface BentoCardProps {
  title: string;
  description: string;
  className?: string;
  children?: React.ReactNode;
}

const BentoCard: React.FC<BentoCardProps> = ({ title, description, className, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={cn(
      "relative overflow-hidden rounded-[32px] border border-(--black-5) bg-(--ui-bg) p-8 md:p-10 transition-all hover:bg-white hover:shadow-2xl  group",
      className
    )}
  >
    <div className="relative z-20">
      <h3 className="text-2xl font-bold tracking-tight text-black leading-tight mb-2">
        {title}
      </h3>
      <p className="text-[15px] font-medium text-(--black-40) leading-relaxed max-w-[320px]">
        {description}
      </p>
    </div>

    <div className="relative z-10 mt-6 h-full w-full">
      {children}
    </div>
  </motion.div>
);

export const BentoGrid: React.FC = () => {
  return (
    <section className="bg-white py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[440px]">
          
          <BentoCard
            title="Smart Automation"
            description="Automate repetitive tasks with one click."
            className="md:col-span-4"
          >
            <AutomationCard />
          </BentoCard>

          <BentoCard
            title="Seamless Integrations"
            description="Connect with your favorite tools instantly. No complex setup required."
            className="md:col-span-8"
          >
            <IntegrationsCard />
          </BentoCard>

          <BentoCard
            title="Team Collaboration"
            description="Keep everyone aligned with shared workflows."
            className="md:col-span-4"
          >
            <CollaborationCard />
          </BentoCard>

          <BentoCard
            title="Advanced Analytics"
            description="Get real-time insights that drive decisions."
            className="md:col-span-8"
          >
            <AnalyticsCard />
          </BentoCard>

        </div>
      </div>
    </section>
  );
};
