import React from 'react';
import { Mail, Shield, Zap, ArrowRight, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';

const CapabilityCard = ({ title, desc, icon: Icon }: any) => (
  <div className="p-6 rounded-2xl bg-white border border-black/5 shadow-sm hover:shadow-md transition-all group">
    <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
      <Icon size={20} />
    </div>
    <h3 className="text-sm font-black uppercase tracking-tight mb-2 text-ui-text">{title}</h3>
    <p className="text-xs text-ui-muted-dark font-medium leading-relaxed">{desc}</p>
  </div>
);

const PathCard = ({ title, linkText, to, icon: Icon }: any) => (
  <Link to={to} className="flex-1 p-8 rounded-2xl border border-black/5 hover:border-black/20 hover:bg-black/[0.01] transition-all group">
    <div className="flex items-center justify-between mb-4">
      <div className="w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
        <Icon size={24} />
      </div>
      <ArrowRight size={20} className="text-black/20 group-hover:translate-x-1 group-hover:text-black transition-all" />
    </div>
    <h3 className="text-lg font-black tracking-tight mb-1 text-ui-text">{title}</h3>
    <p className="text-sm font-bold text-ui-muted-subtle">{linkText}</p>
  </Link>
);

export const IntroductionPage: React.FC = () => {
  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-4xl lg:text-5xl font-black tracking-tighter mb-6">Introduction</h1>
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-black tracking-tight mb-4 text-ui-text">What is Envoy?</h2>
            <p className="text-lg text-ui-muted-dark font-medium leading-relaxed">
              Envoy is a multi-tenant notification orchestration engine. You send one API request. 
              Envoy handles routing, provider selection, async delivery, retries, and logging — across 
              email and SMS — without you managing any of that infrastructure.
            </p>
            <p className="text-lg text-ui-muted-dark font-medium leading-relaxed mt-4">
              It is built for teams that need reliable notification delivery without being locked into 
              a single provider, and without building a notification system from scratch.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-black tracking-tight mb-4 text-ui-text">What Envoy is not</h2>
            <p className="text-lg text-ui-muted-dark font-medium leading-relaxed">
              Envoy is not a marketing email tool. It is not a bulk sender. It is infrastructure — the 
              layer between your application and your notification providers.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
