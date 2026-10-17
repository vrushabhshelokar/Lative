/**
 * Copyright (C) 2026 [Your Name or Company Name]
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <https://gnu.org>.
 */

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
