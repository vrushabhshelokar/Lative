import React from 'react';
import { Message } from '../hooks/useAiContext';
import { AlertCircle, Key, WifiOff, RefreshCw, Compass } from 'lucide-react';

export interface ChatMessageProps {
  message: Message;
  onRetry?: (text: string) => Promise<void>;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onRetry }) => {
  const isUser = message.role === 'user';
  const isError = message.content.startsWith('Error:') || !!message.errorType;

  if (isUser) {
    return (
      <div className="flex w-full justify-end mb-3.5 select-text font-sans">
        <div className="max-w-[85%] rounded-large px-3.5 py-2.5 text-xs shadow-card leading-relaxed whitespace-pre-wrap select-text break-words bg-accent text-white rounded-br-small">
          {message.content}
        </div>
      </div>
    );
  }

  if (isError) {
    const errorType = message.errorType || 'generic';
    
    // Setup type-specific content parameters
    let title = 'AI Request Failed';
    let description = 'The assistant could not complete your request due to an unexpected error.';
    let Icon = AlertCircle;
    let iconColor = 'text-danger';
    let showSettingsAction = false;

    if (errorType === 'key') {
      title = 'Invalid API Key';
      description = 'Gemini refused connection. Your API key might be inactive, unauthorized, or missing.';
      Icon = Key;
      iconColor = 'text-amber-500';
      showSettingsAction = true;
    } else if (errorType === 'quota') {
      title = 'Rate Limit Exceeded';
      description = 'You have hit the Google Gemini API limits (typically 15 requests per minute on the free tier). Please wait a moment.';
      Icon = Compass;
      iconColor = 'text-accent';
    } else if (errorType === 'network') {
      title = 'Network Connection Failed';
      description = 'A network timeout occurred. Please check your internet connectivity and try again.';
      Icon = WifiOff;
      iconColor = 'text-danger';
    }

    const handleSwitchToSettings = () => {
      window.dispatchEvent(new CustomEvent('lative-switch-tab', { detail: 'settings' }));
    };

    return (
      <div className="flex w-full justify-start mb-3.5 select-text font-sans">
        <div className="max-w-[85%] rounded-large bg-danger/5 border border-danger/20 p-3.5 text-xs shadow-card leading-relaxed select-text rounded-bl-small flex flex-col gap-2 w-full">
          {/* Header Row */}
          <div className="flex items-center gap-2">
            <Icon className={`w-4 h-4 ${iconColor} shrink-0`} />
            <span className="font-semibold text-text-primary leading-tight tracking-tight select-none">
              {title}
            </span>
          </div>

          {/* User-friendly Description */}
          <p className="text-[11px] text-text-secondary leading-normal select-none">
            {description}
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-2 mt-1 select-none">
            {message.rawPrompt && onRetry && (
              <button
                type="button"
                onClick={() => onRetry(message.rawPrompt!)}
                className="flex items-center gap-1 py-1 px-2.5 rounded-small bg-danger/10 hover:bg-danger/20 text-danger text-[10px] font-semibold border border-danger/10 transition-colors focus:outline-none focus:ring-1 focus:ring-danger"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Retry Query</span>
              </button>
            )}
            
            {showSettingsAction && (
              <button
                type="button"
                onClick={handleSwitchToSettings}
                className="flex items-center gap-1 py-1 px-2.5 rounded-small bg-accent/10 hover:bg-accent/20 text-accent text-[10px] font-semibold border border-accent/10 transition-colors focus:outline-none focus:ring-1 focus:ring-accent"
              >
                Configure Key
              </button>
            )}
          </div>

          {/* Technical Collapsible block */}
          <details className="mt-1.5 group select-none">
            <summary className="text-[10px] text-text-secondary font-semibold cursor-pointer hover:text-text-primary tracking-wider uppercase flex items-center gap-0.5">
              Technical Details
            </summary>
            <div className="mt-1.5 p-2 bg-background-secondary border border-border/40 dark:border-white/[0.04] rounded-medium font-mono text-[9px] text-text-secondary select-text break-all max-h-[85px] overflow-y-auto leading-normal">
              {message.content}
            </div>
          </details>
        </div>
      </div>
    );
  }

  // Assistant success message
  return (
    <div className="flex w-full justify-start mb-3.5 select-text font-sans">
      <div className="max-w-[85%] rounded-large px-3.5 py-2.5 text-xs shadow-card leading-relaxed whitespace-pre-wrap select-text break-words bg-card border border-border text-text-primary rounded-bl-small">
        {message.content}
      </div>
    </div>
  );
};
