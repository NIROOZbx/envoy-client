import React from 'react';



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
