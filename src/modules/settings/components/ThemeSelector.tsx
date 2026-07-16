import React from 'react';
import { Palette } from 'lucide-react';
import { useSettings } from '../hooks/useSettings';

export const ThemeSelector: React.FC = () => {
  const { settings, updateTheme } = useSettings();

  return (
    <div className="p-3.5 bg-card border border-border rounded-medium shadow-card flex flex-col gap-3">
      <div className="flex items-center gap-2 text-xs font-semibold text-text-primary">
        <Palette className="w-4 h-4 text-text-secondary shrink-0" />
        <span>Appearance</span>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">
          Theme Mode
        </label>
        <div className="grid grid-cols-3 gap-2 bg-background-secondary p-1 rounded-medium border border-border/40">
          {(['light', 'dark', 'system'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => updateTheme(t)}
              className={`py-1.5 px-3 rounded-small text-xs font-medium capitalize transition-all focus:outline-none ${
                settings.theme === t
                  ? 'bg-card text-text-primary shadow-sm border border-border/60'
                  : 'text-text-secondary hover:text-text-primary hover:bg-card/40'
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
