import React from 'react';

export const Integrations: React.FC = () => {
  const brands = ['SendGrid', 'Twilio', 'Resend', 'Firebase', 'AWS SES'];

  return (
    <section className="py-12 border-y border-(--black-5) bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-[10px] font-satoshi-black uppercase tracking-[0.3em] text-(--black-40) mb-10">
          Integrated Across Your Stack
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 opacity-30 hover:opacity-100 transition-opacity duration-700">
          {brands.map((brand) => (
            <span key={brand} className="text-2xl lg:text-3xl font-satoshi-black tracking-tighter text-black grayscale hover:grayscale-0 transition-all">
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
