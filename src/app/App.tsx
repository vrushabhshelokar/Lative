import React, { useEffect, useState } from 'react';
import { AppLayout } from './AppLayout';
import { TabId } from './routes';
import { safeStorage } from '@/lib/chrome';
import { LinksView } from '@/modules/links';
import { MailsView } from '@/modules/mail';
import { ResumeView } from '@/modules/resume';

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
        return <div className="text-sm text-text-secondary">Certificate Module (Unimplemented)</div>;
      case 'ai':
        return <div className="text-sm text-text-secondary">AI Module (Unimplemented)</div>;
      case 'cart':
        return <div className="text-sm text-text-secondary">Cart Module (Unimplemented)</div>;
      case 'settings':
        return <div className="text-sm text-text-secondary">Settings Module (Unimplemented)</div>;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="w-[400px] h-[600px] flex items-center justify-center bg-background text-text-secondary">
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
