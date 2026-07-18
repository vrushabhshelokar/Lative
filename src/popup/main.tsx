import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from '@/app/App';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { ToastProvider } from '@/providers/ToastProvider';
import { SettingsProvider } from '@/modules/settings';
import { AiProvider } from '@/modules/ai';
import { ErrorBoundary } from '@/shared/components/ErrorBoundary';
import '@/styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <SettingsProvider>
        <ThemeProvider>
          <ToastProvider>
            <AiProvider>
              <App />
            </AiProvider>
          </ToastProvider>
        </ThemeProvider>
      </SettingsProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
