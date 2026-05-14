import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Step {
  id: string;
  label: string;
  status: 'pending' | 'loading' | 'success';
}

interface SteppedLoaderProps {
  steps: Omit<Step, 'status'>[];
  title: string;
  icon: LucideIcon;
  onComplete: () => void;
  simulationDelay?: number;
  className?: string;
}

export const SteppedLoader: React.FC<SteppedLoaderProps> = ({ 
  steps: initialSteps, 
  title, 
  icon: Icon, 
  onComplete,
  simulationDelay = 1500,
  className
}) => {
  const [steps, setSteps] = useState<Step[]>(
    initialSteps.map(s => ({ ...s, status: 'pending' }))
  );
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    if (currentStepIndex < steps.length) {
      setSteps(prev => prev.map((s, i) => 
        i === currentStepIndex ? { ...s, status: 'loading' } : s
      ));

      const timer = setTimeout(() => {
        setSteps(prev => prev.map((s, i) => 
          i === currentStepIndex ? { ...s, status: 'success' } : s
        ));
        setCurrentStepIndex(prev => prev + 1);
      }, simulationDelay + Math.random() * 800);

      return () => clearTimeout(timer);
    } else {
      const finalTimer = setTimeout(() => {
        onComplete();
      }, 800);
      return () => clearTimeout(finalTimer);
    }
  }, [currentStepIndex, onComplete, simulationDelay, steps.length]);

  return (
    <div className={cn("fixed inset-0 bg-ui-bg z-100 flex flex-col items-center justify-center", className)}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center max-w-sm w-full px-6"
      >
        <div className="relative mb-12">
          <div className="w-16 h-16 bg-ui-text rounded-2xl flex items-center justify-center text-ui-bg shadow-2xl shadow-ui-text/20 relative z-10">
            <Icon className="w-8 h-8 fill-current" />
          </div>
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-ui-text/20 rounded-2xl -z-0"
          />
        </div>

        <h2 className="text-xl font-black uppercase tracking-tight text-ui-text mb-12 text-center">
          {title}
        </h2>

        <div className="space-y-4 w-full">
          {steps.map((step) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ 
                opacity: step.status === 'pending' ? 0.3 : 1,
                x: 0,
              }}
              className={cn(
                "flex items-center gap-4 px-6 py-3 rounded-2xl transition-all duration-500",
                step.status === 'loading' ? "bg-ui-text/5 scale-[1.02]" : "bg-transparent"
              )}
            >
              <div className="w-6 h-6 flex items-center justify-center shrink-0">
                <AnimatePresence mode="wait">
                  {step.status === 'loading' ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0, rotate: -180 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                    >
                      <Loader2 className="w-5 h-5 text-ui-text animate-spin" />
                    </motion.div>
                  ) : step.status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.5, rotate: 45 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      className="bg-success rounded-full p-0.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-ui-bg" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="pending"
                      className="w-5 h-5 rounded-full border-2 border-ui-border"
                    />
                  )}
                </AnimatePresence>
              </div>
              
              <span className={cn(
                "text-[13px] font-bold tracking-tight transition-all duration-500",
                step.status === 'success' ? "text-ui-muted line-through opacity-40" : "text-ui-text",
              )}>
                {step.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
