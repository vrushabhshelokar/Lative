/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { safeStorage } from '@/lib/chrome';
import { useResume } from '@/modules/resume';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  errorType?: 'quota' | 'key' | 'network' | 'generic';
  rawPrompt?: string;
}

export interface AiContextType {
  selectedResumeId: string | null;
  setSelectedResumeId: (id: string | null) => Promise<void>;
  isLoading: boolean;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  isChatLoading: boolean;
  setIsChatLoading: (loading: boolean) => void;
}

const AiContext = createContext<AiContextType | undefined>(undefined);

export const AiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedResumeId, setSelectedResumeIdState] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const { resumes, isLoading: isResumesLoading } = useResume();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Load last selected resume ID from storage on initial mount
  useEffect(() => {
    const init = async () => {
      try {
        const stored = (await safeStorage.get('lastSelectedResumeId', null)) as string | null;
        setSelectedResumeIdState(stored);
      } catch (err) {
        console.error('Failed to load selected resume ID:', err);
      } finally {
        setIsInitializing(false);
      }
    };
    init();
  }, []);

  // Synchronize selection against list of available resumes
  useEffect(() => {
    if (isInitializing || isResumesLoading) return;

    if (resumes.length === 0) {
      if (selectedResumeId !== null) {
        setSelectedResumeIdState(null);
        safeStorage.set('lastSelectedResumeId', null);
      }
    } else {
      // If no selection exists or selected resume has been deleted, default to first available
      const exists = resumes.some((r) => r.id === selectedResumeId);
      if (!exists) {
        const defaultId = resumes[0].id;
        setSelectedResumeIdState(defaultId);
        safeStorage.set('lastSelectedResumeId', defaultId);
      }
    }
  }, [resumes, selectedResumeId, isInitializing, isResumesLoading]);

  // Clear conversation state when active resume changes
  useEffect(() => {
    setMessages([]);
    setIsChatLoading(false);
  }, [selectedResumeId]);

  const setSelectedResumeId = async (id: string | null) => {
    try {
      setSelectedResumeIdState(id);
      await safeStorage.set('lastSelectedResumeId', id);
    } catch (err) {
      console.error('Failed to save selected resume ID:', err);
    }
  };

  const isLoading = isInitializing || isResumesLoading;

  return (
    <AiContext.Provider
      value={{
        selectedResumeId,
        setSelectedResumeId,
        isLoading,
        messages,
        setMessages,
        isChatLoading,
        setIsChatLoading
      }}
    >
      {children}
    </AiContext.Provider>
  );
};

export const useAiContext = (): AiContextType => {
  const context = useContext(AiContext);
  if (!context) {
    throw new Error('useAiContext must be used within an AiProvider');
  }
  return context;
};
