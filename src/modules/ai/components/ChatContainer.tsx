import React, { useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import { Message } from '../hooks/useAiContext';
import { ChatMessage } from './ChatMessage';

export interface ChatContainerProps {
  messages: Message[];
  isLoading: boolean;
}

const LoadingBubble: React.FC = () => (
  <div className="flex w-full justify-start mb-3.5 select-none font-sans">
    <div className="bg-card border border-border text-text-secondary rounded-large rounded-bl-small px-3.5 py-2.5 shadow-card flex items-center gap-1">
      <div className="w-1.5 h-1.5 bg-text-secondary rounded-full animate-bounce [animation-delay:-0.3s]" />
      <div className="w-1.5 h-1.5 bg-text-secondary rounded-full animate-bounce [animation-delay:-0.15s]" />
      <div className="w-1.5 h-1.5 bg-text-secondary rounded-full animate-bounce" />
    </div>
  </div>
);

export const ChatContainer: React.FC<ChatContainerProps> = ({ messages, isLoading }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-6 select-none font-sans min-h-0">
        <Sparkles className="w-8 h-8 text-accent/60 mb-2.5 animate-pulse" />
        <h4 className="text-xs font-semibold text-text-primary leading-tight">
          Ready to Assist
        </h4>
        <p className="text-[11px] text-text-secondary max-w-[240px] mt-1.5 leading-normal">
          Ask questions about your resume, paste a job description to compare, or request key skills summaries.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto pr-1 select-text scrollbar-thin flex flex-col min-h-0">
      {messages.map((msg) => (
        <ChatMessage key={msg.id} message={msg} />
      ))}
      {isLoading && <LoadingBubble />}
      <div ref={bottomRef} />
    </div>
  );
};
