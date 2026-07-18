import React, { useEffect, useState } from 'react';
import { AppLayout } from './AppLayout';
import { TabId } from './routes';
import { safeStorage } from '@/lib/chrome';
import { db } from '@/database/db';
import { Database, RefreshCw } from 'lucide-react';
import { Button } from '@/shared/components/Button';
import { LinksView } from '@/modules/links';
import { MailsView } from '@/modules/mail';
import { ResumeView } from '@/modules/resume';
import { CertificateView } from '@/modules/certificate';
import { CartView } from '@/modules/cart';
import { SettingsView } from '@/modules/settings';
import { AiPanel } from '@/modules/ai';

export const App: React.FC = () => {
  const [activeTab, setActiveTabState] = useState<TabId>('links');
  const [loading, setLoading] = useState(true);
  const [storageError, setStorageError] = useState<string | null>(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // 1. Verify IndexedDB database accessibility
        const storageCheck = await db.verifyStorageAccess();
        if (!storageCheck.ok) {
          setStorageError(storageCheck.error || 'IndexedDB is blocked or disabled.');
          setLoading(false);
          return;
        }

        // 2. Load last selected tab index
        const lastTab = await safeStorage.get('activeTab', 'links');
        setActiveTabState(lastTab as TabId);
      } catch (err) {
        console.error('Failed to initialize Lative core:', err);
      } finally {
        setLoading(false);
      }
    };
    initializeApp();
  }, []);

  useEffect(() => {
    const handleSwitchTab = (e: Event) => {
      const customEvent = e as CustomEvent<TabId>;
      if (customEvent.detail) {
        handleTabChange(customEvent.detail);
      }
    };
    window.addEventListener('lative-switch-tab', handleSwitchTab);
    return () => window.removeEventListener('lative-switch-tab', handleSwitchTab);
  }, []);

  const handleTabChange = async (tabId: TabId) => {
    setActiveTabState(tabId);
    try {
      await safeStorage.set('activeTab', tabId);
    } catch (err) {
      console.error('Failed to save active tab to storage:', err);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'links':
        return <LinksView />;
      case 'mail':
        return <MailsView />;
      case 'resume':
        return <ResumeView />;
      case 'certificate':
        return <CertificateView />;
      case 'ai':
        return <AiPanel />;
      case 'cart':
        return <CartView />;
      case 'settings':
        return <SettingsView />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="w-[380px] h-[600px] flex items-center justify-center bg-background text-text-secondary">
        <span className="text-xs">Loading Lative...</span>
      </div>
    );
  }

  if (storageError) {
    return (
      <div className="w-[380px] h-[600px] flex flex-col items-center justify-center p-6 bg-background text-text-primary overflow-hidden font-sans select-none border border-border/60 dark:border-white/[0.08] relative">
        {/* Ambient visual light pools */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
          <div className="absolute -top-[80px] -left-[40px] w-[200px] h-[200px] rounded-full bg-accent/10 dark:bg-accent/[0.06] blur-[60px]" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-[320px] bg-card dark:bg-gradient-to-b dark:from-white/[0.06] dark:to-white/[0.01] border border-border dark:border-white/[0.06] p-5 rounded-large shadow-card dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
          {/* Database Icon Container */}
          <div className="w-10 h-10 rounded-xl bg-danger/10 border border-danger/20 flex items-center justify-center text-danger mb-4 shrink-0 shadow-[0_0_12px_rgba(239,68,68,0.1)]">
            <Database className="w-5 h-5 stroke-[2]" />
          </div>

          {/* Title */}
          <h3 className="text-sm font-semibold text-text-primary leading-tight tracking-tight select-none">
            Storage Access Blocked
          </h3>

          {/* Description */}
          <p className="text-[11px] text-text-secondary mt-2 leading-relaxed select-none">
            Lative is unable to access local IndexedDB storage. This usually occurs under strict private browsing (Incognito) settings or if storage permissions are disabled.
          </p>

          {/* Recovery Instructions */}
          <div className="w-full mt-4 p-3 bg-background-secondary border border-border/60 dark:border-white/[0.06] rounded-medium text-left flex flex-col gap-2">
            <h4 className="text-[10px] font-bold text-text-primary uppercase tracking-wider select-none">
              How to resolve:
            </h4>
            <ul className="list-disc list-inside text-[10px] text-text-secondary flex flex-col gap-1 select-none leading-normal">
              <li>Allow local cookies/site data in browser settings.</li>
              <li>Disable third-party cookie blocking for this extension.</li>
              <li>Try opening the extension popup in a normal tab.</li>
            </ul>
          </div>

          {/* Error Details */}
          <div className="w-full mt-2.5 text-[9px] text-text-secondary/80 font-mono text-center truncate select-all">
            Code: {storageError}
          </div>

          {/* Retry Connection CTA */}
          <Button
            variant="primary"
            onClick={() => window.location.reload()}
            className="mt-4.5 !h-8 !px-4 !text-xs !font-semibold !gap-1.5 !rounded-md"
            leftIcon={<RefreshCw className="w-3.5 h-3.5 stroke-[2.5]" />}
          >
            Retry Connection
          </Button>
        </div>
      </div>
    );
  }

  return (
    <AppLayout activeTab={activeTab} onTabChange={handleTabChange}>
      {renderContent()}
    </AppLayout>
  );
};
