import React from 'react';

export const IntegrationsCard: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
      <div className="relative w-full h-[300px] flex items-center justify-center">
        {/* Orbiting Circles */}
        <div className="absolute w-[600px] h-[600px] border-2 border-black/5 rounded-full bottom-[-300px]" />
        <div className="absolute w-[450px] h-[450px] border-2 border-black/5 rounded-full bottom-[-225px]" />
        <div className="absolute w-[300px] h-[300px] border-2 border-black/5 rounded-full bottom-[-150px]" />

        {/* Central Logo at Bottom - Using favicon.svg */}
        <div className="absolute bottom-[-20px] w-20 h-20 bg-black rounded-[32px] flex items-center justify-center shadow-2xl z-20 p-4">
           <img src="/favicon.svg" className="w-full h-full invert brightness-0" alt="Envoy" />
        </div>

        {/* Provider Icons from public folder */}
        <div className="absolute left-[15%] top-[20%] w-12 h-12 bg-white rounded-full border border-black/5 flex items-center justify-center shadow-md p-2">
           <img src="/firebase.svg" className="w-6 h-6" alt="Firebase" />
        </div>
        <div className="absolute left-[35%] top-[5%] w-12 h-12 bg-white rounded-full border border-black/5 flex items-center justify-center shadow-md p-2">
           <img src="/discord.png" className="w-6 h-6" alt="Discord" />
        </div>
        <div className="absolute right-[35%] top-[5%] w-12 h-12 bg-white rounded-full border border-black/5 flex items-center justify-center shadow-md p-2">
           <img src="/amazon-web-services.png" className="w-6 h-6 object-contain" alt="AWS" />
        </div>
        <div className="absolute right-[15%] top-[20%] w-12 h-12 bg-white rounded-full border border-black/5 flex items-center justify-center shadow-md p-2">
           <img src="/google.svg" className="w-6 h-6" alt="Google" />
        </div>
      </div>
    </div>
  );
};
