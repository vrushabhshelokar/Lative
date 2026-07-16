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
    <div className="w-[400px] h-[600px] flex flex-col bg-background text-text-primary overflow-hidden font-sans border border-border">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-accent flex items-center justify-center text-white font-bold text-xs select-none">
            L
          </div>
          <span className="font-bold text-base tracking-tight select-none">Lative</span>
        </div>
        <span className="text-[11px] font-medium text-text-secondary select-none">v1.0.0</span>
      </header>

      {/* Segmented Top Navigation */}
      <nav className="px-2 py-1.5 bg-background-secondary border-b border-border flex justify-between gap-1 overflow-x-auto no-scrollbar">
        {routes.map((route) => {
          const Icon = tabIcons[route.id];
          const isActive = activeTab === route.id;
          return (
            <button
              key={route.id}
              onClick={() => onTabChange(route.id)}
              className={`flex flex-col items-center justify-center flex-1 min-w-[48px] py-1 rounded-medium transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-accent ${
                isActive 
                  ? 'bg-card text-accent shadow-card border border-border/40 font-medium' 
                  : 'text-text-secondary hover:text-text-primary hover:bg-card/40'
              }`}
              title={route.label}
              aria-label={route.label}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[9px] mt-0.5 tracking-tight font-medium">
                {route.id === 'certificate' ? 'Certs' : route.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Active Tab Panel Content */}
      <main className="flex-1 overflow-y-auto p-4 bg-background scrollbar-thin">
        {children}
      </main>
    </div>
  );
};
