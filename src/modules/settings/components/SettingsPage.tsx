import React from 'react';
import { Info } from 'lucide-react';
import { useSettings } from '../hooks/useSettings';
import { ApiKeyInput } from './ApiKeyInput';
import { ThemeSelector } from './ThemeSelector';
import { FloatingButtonToggle } from './FloatingButtonToggle';
import { ExportSection } from './ExportSection';
import { ImportSection } from './ImportSection';
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

        {/* Backup Settings */}
        <ExportSection />

        {/* Restore Settings */}
        <ImportSection />

        {/* Data Wiping Operations */}
        <ClearDataButton />

        {/* Quick Fix Section */}
        <div className="p-3 bg-card border border-border rounded-medium flex items-start gap-2.5">
          <Info className="w-3.5 h-3.5 text-text-secondary mt-0.5 shrink-0" />
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-semibold text-text-primary leading-none">
              Quick Fix
            </span>
            <span className="text-[11px] text-text-secondary leading-normal mt-1">
              If some features are not working as expected, refresh the current webpage and try again.
            </span>
          </div>
        </div>

        {/* About & Support Links */}
        <AboutSection />
      </div>
    </div>
  );
};
export default SettingsPage;

