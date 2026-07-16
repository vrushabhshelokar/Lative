import React from 'react';
import { useSettings } from '../hooks/useSettings';
import { ApiKeyInput } from './ApiKeyInput';
import { ThemeSelector } from './ThemeSelector';
import { FloatingButtonToggle } from './FloatingButtonToggle';
import { ClearDataButton } from './ClearDataButton';
import { AboutSection } from './AboutSection';

export const SettingsPage: React.FC = () => {
  const { isLoading } = useSettings();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 p-4 font-sans select-none animate-pulse">
        <div className="h-8 bg-background-secondary rounded-medium w-1/3" />
        <div className="h-24 bg-background-secondary rounded-medium" />
        <div className="h-24 bg-background-secondary rounded-medium" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden font-sans select-none">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/40 shrink-0">
        <span className="text-xs font-semibold text-text-secondary select-none">
          Preferences & Configuration
        </span>
      </div>

      {/* Scrollable container */}
      <div className="flex-1 overflow-y-auto px-4 py-3.5 flex flex-col gap-4 min-h-0 pb-6">
        {/* API Key Panel */}
        <ApiKeyInput />

        {/* Theme Settings */}
        <ThemeSelector />

        {/* Features Settings */}
        <FloatingButtonToggle />

        {/* Data & Backup Settings */}
        <ClearDataButton />

        {/* About & Support Links */}
        <AboutSection />
      </div>
    </div>
  );
};
export default SettingsPage;

