import React from 'react';
import Lottie from 'lottie-react';
import workflowAnimation from '../../../../assets/workflow.json';

export const CollaborationCard: React.FC = () => {
  // Defensive check for the Lottie component to handle CJS/ESM interop
  const LottieComponent = (Lottie as any).default || Lottie;

  return (
    <div className="relative mt-2 flex flex-col items-center w-full h-full overflow-hidden">
      {/* Lottie Animation Container - Expanded to full width */}
      <div className="relative w-full aspect-video flex items-center justify-center">
        {LottieComponent && (
          <LottieComponent 
            animationData={workflowAnimation} 
            loop={true} 
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Subtle Gradient Overlay - Using Tailwind v4 syntax */}
        <div className="absolute inset-0 bg-linear-to-t from-white via-transparent to-transparent pointer-events-none" />
      </div>

    </div>
  );
};
