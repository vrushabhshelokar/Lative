import React from 'react';
import { HelpCircle, Info, ExternalLink } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <>
      {/* Support & Links */}
      <div className="p-3.5 bg-card border border-border rounded-medium shadow-card flex flex-col gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-text-primary">
          <HelpCircle className="w-4 h-4 text-text-secondary shrink-0" />
          <span>Resources & Support</span>
        </div>

        <div className="flex flex-col gap-2.5">
          <a
            href="https://tally.so/r/lative-feedback"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between text-xs text-text-primary hover:text-accent font-medium py-0.5 group"
          >
            <span>Submit Feedback Form</span>
            <ExternalLink className="w-3.5 h-3.5 text-text-secondary group-hover:text-accent" />
          </a>
          <a
            href="https://youtube.com/lative-tutorial"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between text-xs text-text-primary hover:text-accent font-medium py-0.5 group"
          >
            <span>Watch Video Tutorial</span>
            <ExternalLink className="w-3.5 h-3.5 text-text-secondary group-hover:text-accent" />
          </a>
        </div>
      </div>

      {/* About Info */}
      <div className="flex flex-col items-center justify-center py-2 text-center text-text-secondary">
        <div className="flex items-center gap-1.5 text-[11px] select-none font-bold uppercase tracking-wider">
          <Info className="w-3.5 h-3.5" />
          <span>Lative v1.0.0-alpha.2</span>
        </div>
        <span className="text-[10px] text-text-secondary/80 mt-0.5">
          Privacy-first local career manager
        </span>
      </div>
    </>
  );
};
