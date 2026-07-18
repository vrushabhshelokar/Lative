import React from 'react';
import { Palette } from 'lucide-react';
import { useSettings } from '../hooks/useSettings';

export const ThemeSelector: React.FC = () => {
  const { settings, updateTheme } = useSettings();

  return (
    <div className="p-3.5 bg-card dark:bg-gradient-to-b dark:from-white/[0.06] dark:to-white/[0.01] border border-border dark:border-white/[0.06] rounded-large shadow-card dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)] flex flex-col gap-3">
      <div className="flex items-center gap-2 text-xs font-semibold text-text-primary">
        <Palette className="w-4 h-4 text-text-secondary shrink-0" />
        <span>Appearance</span>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">
          Theme Mode
        </label>
        <div className="grid grid-cols-3 gap-2 bg-background-secondary/50 dark:bg-white/[0.02] p-1 rounded-medium border border-border/40 dark:border-white/[0.06]">
          {(['light', 'dark', 'system'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => updateTheme(t)}
              className={`py-1.5 px-3 rounded-small text-xs font-medium capitalize transition-all duration-standard focus:outline-none focus:ring-1 focus:ring-accent ${
                settings.theme === t
                  ? 'bg-card text-text-primary shadow-sm border border-border/60 dark:bg-white/[0.08] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] dark:border-white/[0.08]'
                  : 'text-text-secondary hover:text-text-primary hover:bg-card/40 dark:hover:bg-white/[0.02]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
