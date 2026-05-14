import React from 'react';
import { Zap } from 'lucide-react';
import { SteppedLoader, type Step } from '@/components/ui/SteppedLoader';

interface OnboardingLoaderProps {
  onComplete: () => void;
}

const ONBOARDING_STEPS: Omit<Step, 'status'>[] = [
  { id: 'org', label: 'Preparing your organization' },
  { id: 'env', label: 'Setting up your environment' },
  { id: 'channels', label: 'Configuring notification channels' },
  { id: 'inbox', label: 'Getting your inbox ready' }
];

export const OnboardingLoader: React.FC<OnboardingLoaderProps> = ({ onComplete }) => {
  return (
    <SteppedLoader
      title="Setting up your workspace"
      icon={Zap}
      steps={ONBOARDING_STEPS}
      onComplete={onComplete}
      simulationDelay={1200}
    />
  );
};
