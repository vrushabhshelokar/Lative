import React from 'react';
import { Message } from '../hooks/useAiContext';

export interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const isError = message.content.startsWith('Error:');

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-3.5 select-text font-sans`}>
      <div
        className={`max-w-[85%] rounded-large px-3.5 py-2.5 text-xs shadow-card leading-relaxed whitespace-pre-wrap select-text break-words
          ${
            isUser
              ? 'bg-accent text-white rounded-br-small'
              : isError
                ? 'bg-danger/10 border border-danger/20 text-danger rounded-bl-small'
                : 'bg-card border border-border text-text-primary rounded-bl-small'
          }`}
      >
        {message.content}
      </div>
    </div>
  );
};
