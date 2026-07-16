import React, { useState } from 'react';
import { Sparkles, AlertCircle, Send } from 'lucide-react';
import { useSettings } from '@/modules/settings';
import { ResumeSelector } from './ResumeSelector';
import { useResume } from '@/modules/resume';
import { Button } from '@/shared/components/Button';
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
      <div className="flex flex-col items-center justify-center text-center p-6 min-h-[350px] select-none font-sans">
        <div className="w-12 h-12 rounded-full bg-background-secondary border border-border flex items-center justify-center text-accent mb-4 shrink-0 shadow-card animate-pulse">
          <Sparkles className="w-5 h-5 text-accent" />
        </div>
        <h3 className="text-sm font-semibold text-text-primary leading-tight tracking-tight">
          AI Assistant Offline
        </h3>
        <p className="text-xs text-text-secondary mt-2 max-w-[260px] leading-normal">
          Add your Gemini API Key in the Settings panel to enable AI-powered application assistance.
        </p>
        <div className="mt-5 p-3 bg-card border border-border rounded-medium flex items-start gap-2.5 max-w-[280px] text-left">
          <AlertCircle className="w-4 h-4 text-text-secondary mt-0.5 shrink-0" />
          <span className="text-[10px] text-text-secondary leading-normal">
            Lative uses your personal API Key to communicate directly with Google Gemini. No resume data is ever shared with other servers.
          </span>
        </div>
      </div>
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

      {/* Chat Conversation Scroll Area */}
      <div className="flex-1 min-h-0 bg-background-secondary border border-border rounded-medium flex flex-col p-3.5">
        {hasNoResumes ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
            <Sparkles className="w-8 h-8 text-text-secondary/40 mb-2.5" />
            <p className="text-xs font-medium text-text-secondary max-w-[220px] leading-normal">
              Please upload a resume in the Resume tab to start using the assistant.
            </p>
          </div>
        ) : (
          <ChatContainer messages={messages} isLoading={isLoading} />
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
