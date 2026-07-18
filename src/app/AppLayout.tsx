import React from 'react';
import { 
  Link2, 
  Mail, 
  FileText, 
  Award, 
  Sparkles, 
  Bookmark, 
  Settings 
} from 'lucide-react';
import { TabId, routes } from './routes';

interface AppLayoutProps {
  activeTab: TabId;
  onTabChange: (tabId: TabId) => void;
  children: React.ReactNode;
}

const tabIcons: Record<TabId, React.ComponentType<{ className?: string }>> = {
  links: Link2,
  mail: Mail,
  resume: FileText,
  certificate: Award,
  ai: Sparkles,
  cart: Bookmark,
  settings: Settings
};

export const AppLayout: React.FC<AppLayoutProps> = ({
  activeTab,
  onTabChange,
  children
}) => {
  return (
    <div className="w-[380px] h-[600px] flex flex-col bg-background text-text-primary overflow-hidden font-sans border border-border/60 dark:border-white/[0.08] relative">
      {/* Cinematic Ambient Light Pools */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
        <div className="absolute -top-[80px] -left-[40px] w-[200px] h-[200px] rounded-full bg-accent/10 dark:bg-accent/[0.06] blur-[60px] animate-float-blob" />
        <div className="absolute -bottom-[60px] -right-[60px] w-[180px] h-[180px] rounded-full bg-purple-500/5 blur-[50px] animate-float-blob" style={{ animationDelay: '-4s' }} />
      </div>

      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-border/40 bg-card/75 dark:bg-card/40 backdrop-blur-md select-none z-10 relative shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-accent flex items-center justify-center text-white font-semibold text-xs shadow-[0_0_8px_rgba(94,106,210,0.3)]">
            L
          </div>
          <span className="font-bold text-sm tracking-tight">Lative</span>
        </div>
        <span className="text-[11px] font-medium text-text-secondary">v1.0.0</span>
      </header>

      {/* Segmented Top Navigation */}
      <nav className="px-2.5 py-1.5 bg-background-secondary/40 border-b border-border/40 flex justify-between gap-1 overflow-x-auto no-scrollbar select-none z-10 relative shrink-0">
        {routes.map((route) => {
          const Icon = tabIcons[route.id];
          const isActive = activeTab === route.id;
          return (
            <button
              key={route.id}
              onClick={() => onTabChange(route.id)}
              className={`flex flex-col items-center justify-center flex-1 min-w-[42px] py-1 rounded-medium transition-all duration-standard focus:outline-none focus:ring-1 focus:ring-accent ${
                isActive 
                  ? 'bg-card text-accent shadow-card border border-border/60 dark:bg-white/[0.08] dark:text-text-primary dark:border-white/[0.08] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] font-semibold' 
                  : 'text-text-secondary hover:text-text-primary hover:bg-card/40 dark:hover:bg-white/[0.03]'
              }`}
              title={route.label}
              aria-label={route.label}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="text-[9px] mt-0.5 tracking-tight font-medium">
                {route.id === 'certificate' ? 'Certs' : route.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Active Tab Panel Content */}
      <main className="flex-1 overflow-y-auto p-4 bg-transparent z-10 relative">
        {children}
      </main>
    </div>
  );
};
