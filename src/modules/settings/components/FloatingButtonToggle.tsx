import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useSettings } from '../hooks/useSettings';

export const FloatingButtonToggle: React.FC = () => {
  const { settings, updateFloatingButtonEnabled } = useSettings();

  return (
    <div className="p-3.5 bg-card border border-border rounded-medium shadow-card flex flex-col gap-3">
      <div className="flex items-center gap-2 text-xs font-semibold text-text-primary">
        <ShoppingCart className="w-4 h-4 text-text-secondary shrink-0" />
        <span>Job Cart Features</span>
      </div>

      <div className="flex items-center justify-between py-1">
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-xs font-semibold text-text-primary leading-none">
            Floating Save Button
          </span>
          <span className="text-[11px] text-text-secondary leading-normal">
            Show a floating bookmark icon on active web pages
          </span>
        </div>
        <label className="relative inline-flex items-center cursor-pointer select-none">
          <input
            type="checkbox"
            checked={settings.floatingButtonEnabled}
            onChange={(e) => updateFloatingButtonEnabled(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-border/80 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accent" />
        </label>
      </div>

      <p className="text-[10px] text-text-secondary/80 leading-normal border-t border-border/30 pt-2.5">
        <strong>Tip:</strong> If the Floating Save Button doesn't appear after enabling it, reload the active tab webpage.
      </p>
    </div>
  );
};
