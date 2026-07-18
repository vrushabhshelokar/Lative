import React, { useEffect, useState } from 'react';
import { AppLayout } from './AppLayout';
import { TabId } from './routes';
import { safeStorage } from '@/lib/chrome';
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

  useEffect(() => {
    const loadLastTab = async () => {
      try {
        const lastTab = await safeStorage.get('activeTab', 'links');
        setActiveTabState(lastTab as TabId);
      } catch (err) {
        console.error('Failed to load active tab from storage:', err);
      } finally {
        setLoading(false);
      }
    };
    loadLastTab();
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

  return (
    <AppLayout activeTab={activeTab} onTabChange={handleTabChange}>
      {renderContent()}
    </AppLayout>
  );
};
