import React, { useState } from 'react';
import { Sparkles, AlertCircle, Send } from 'lucide-react';
import { useSettings } from '@/modules/settings';
import { ResumeSelector } from './ResumeSelector';
import { useResume } from '@/modules/resume';
import { Button } from '@/shared/components/Button';
import { EmptyState } from '@/shared/components/EmptyState';
import { useChat } from '../hooks/useChat';
import { ChatContainer } from './ChatContainer';

export const AiPanel: React.FC = () => {
  const { settings } = useSettings();
  const { resumes } = useResume();
  const { messages, isLoading, sendMessage } = useChat();
  const [promptInput, setPromptInput] = useState('');

  const isKeyMissing = !settings.aiConfig.apiKey || !settings.aiConfig.apiKey.trim();
  const hasNoResumes = resumes.length === 0;

  // Handle missing API Key state
  if (isKeyMissing) {
    return (
      <EmptyState
        title="AI Assistant Offline"
        description="Add your Gemini API Key in the Settings panel to enable AI-powered application assistance."
        icon={Sparkles}
      >
        <div className="mt-5 p-3 bg-card border border-border/60 dark:border-white/[0.06] rounded-large flex items-start gap-2.5 max-w-[280px] text-left">
          <AlertCircle className="w-3.5 h-3.5 text-text-secondary mt-0.5 shrink-0" />
          <span className="text-[11px] text-text-secondary leading-normal">
            Lative uses your personal API Key to communicate directly with Google Gemini. No resume data is ever shared with other servers.
          </span>
        </div>
      </EmptyState>
    );
  }

  const handleSendPrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim() || isLoading) return;
    const textToSend = promptInput.trim();
    setPromptInput('');
    await sendMessage(textToSend);
  };

  return (
    <div className="flex flex-col h-full font-sans select-none gap-3 min-h-0">
      {/* Selector Area */}
      <div className="shrink-0">
        <ResumeSelector />
      </div>

      {/* Beta Notice */}
      <div className="shrink-0 px-3 py-1.5 bg-accent/[0.04] border border-accent/10 dark:border-accent/15 rounded-medium flex items-start gap-2.5 text-left">
        <span className="text-[10.5px] font-bold text-accent shrink-0 uppercase tracking-wider mt-0.5">Beta</span>
        <span className="text-[10.5px] text-text-secondary leading-normal">
          AI responses may be inaccurate, and rate limits may apply. Please verify important information.
        </span>
      </div>

      {/* Chat Conversation Scroll Area */}
      <div className="flex-1 min-h-0 bg-background-secondary border border-border rounded-medium flex flex-col p-3.5">
        {hasNoResumes ? (
          <EmptyState
            title="No Resume Selected"
            description="Please upload a resume in the Resume tab to start using Lative's career AI assistant."
            icon={Sparkles}
          />
        ) : (
          <ChatContainer messages={messages} isLoading={isLoading} onSendMessage={sendMessage} />
        )}
      </div>

      {/* Prompt Form Input Area */}
      <form onSubmit={handleSendPrompt} className="shrink-0 flex gap-2 items-end pt-1">
        <div className="relative flex-1">
          <input
            type="text"
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            disabled={hasNoResumes || isLoading}
            placeholder={
              hasNoResumes
                ? 'Upload a resume to chat...'
                : isLoading
                  ? 'Waiting for AI response...'
                  : 'Ask about your resume...'
            }
            className="w-full h-10 pl-3.5 pr-10 text-xs rounded-medium bg-card border border-border text-text-primary placeholder:text-text-secondary/50 transition-all duration-standard focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          size="sm"
          disabled={hasNoResumes || !promptInput.trim() || isLoading}
          className="h-10 px-3 shrink-0"
          aria-label="Send prompt"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
};
export default AiPanel;
