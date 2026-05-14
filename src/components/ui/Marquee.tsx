import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Braces, Layers, Bell, Webhook, CreditCard, AlertTriangle, RefreshCw, Zap, Shield, Clock, Users } from 'lucide-react';

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

/**
 * Generic Base Marquee
 */
export const Marquee: React.FC<MarqueeProps> = ({ children, speed = 30, className = "" }) => {
  return (
    <div className={`relative w-full overflow-hidden flex ${className}`}>
      <motion.div 
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap"
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0">{children}</div>
      </motion.div>
    </div>
  );
};

/**
 * Specific Floating Notification Relay
 */


/**
 * High-Level Component for the Hero
 */
export const PipelineMarquee: React.FC = () => {
  const pipelineItems = [
  // notification types
  { icon: <Mail size={20} />, title: 'Order Confirmed', pipe: 'Email → SendGrid' },
  { icon: <MessageSquare size={20} />, title: 'Auth OTP', pipe: 'SMS → Twilio', secondary: true },
  { icon: <Bell size={20} />, title: 'Payment Failed', pipe: 'Push → Firebase' },
  { icon: <Webhook size={20} />, title: 'Deployment Done', pipe: 'Webhook Relay', secondary: true },
  
  // billing/system events
  { icon: <CreditCard size={20} />, title: 'Invoice Paid', pipe: 'Billing → Stripe', secondary: true },
  { icon: <AlertTriangle size={20} />, title: 'Usage at 80%', pipe: 'Threshold Alert' },
  { icon: <RefreshCw size={20} />, title: 'Retry #2', pipe: 'DLQ Recovery', secondary: true },
  
  // technical events
  { icon: <Zap size={20} />, title: 'Flash Sale', pipe: 'Batch → 50k users' },
  { icon: <Shield size={20} />, title: 'Login Attempt', pipe: 'Security Alert', secondary: true },
  { icon: <Clock size={20} />, title: 'Scheduled Digest', pipe: 'Weekly Report' },
  { icon: <Users size={20} />, title: 'Team Invite', pipe: 'Multi-channel', secondary: true },
]

  return (
    <div className="relative w-full mt-12 py-10">
      {/* Background Flying Relays */}


      {/* Fade Edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-pearl to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-pearl to-transparent z-10" />

      <Marquee speed={40}>
        {pipelineItems.map((item, i) => (
          <div key={i} className="px-4">
            <div className="p-5 bg-white rounded-2xl border border-(--black-5) shadow-xl shadow-black/5 flex items-center gap-4 w-72 text-left">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.secondary ? 'bg-(--black-5) text-black' : 'bg-black text-white'}`}>
                {item.icon}
              </div>
              <div>
                <div className="text-[12px] font-black uppercase tracking-tight">{item.title}</div>
                <div className="text-[10px] text-black/40 font-bold">{item.pipe}</div>
              </div>
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
};
