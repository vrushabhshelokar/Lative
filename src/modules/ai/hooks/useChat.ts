import { useAiContext, Message } from './useAiContext';
import { useSettings } from '@/modules/settings';
import { useResume } from '@/modules/resume';
import { AIService, AIContextBuilder, PromptBuilder } from '../../ai';
import { useToast } from '@/shared/hooks/useToast';

export const useChat = () => {
  const { messages, setMessages, isChatLoading, setIsChatLoading, selectedResumeId } = useAiContext();
  const { settings, updateAiConfig } = useSettings();
  const { getParsedResume } = useResume();
  const toast = useToast();

  const clearChat = () => {
    setMessages([]);
    setIsChatLoading(false);
  };

  const sendMessage = async (
    text: string,
    promptOverride?: string,
    requiredSectionsOverride?: ('fullText' | 'skills' | 'projects' | 'education' | 'experience' | 'achievements')[],
    pageContent?: string
  ) => {
    if (!text || !text.trim()) return;

    const trimmedPrompt = text.trim();
    const userMessageId = Math.random().toString(36).substring(7);
    const userMsg: Message = {
      id: userMessageId,
      role: 'user',
      content: trimmedPrompt,
      timestamp: Date.now()
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsChatLoading(true);

    try {
      if (!settings.aiConfig.apiKey || !settings.aiConfig.apiKey.trim()) {
        throw new Error('Missing API Key. Please add a key in Settings.');
      }

      if (!selectedResumeId) {
        throw new Error('Please select a resume context for the AI session.');
      }

      const parsed = await getParsedResume(selectedResumeId);
      if (!parsed) {
        throw new Error('Failed to retrieve the parsed resume content.');
      }

      // Determine required resume sections context-awarely
      let requiredSections = requiredSectionsOverride;

      if (!requiredSections) {
        requiredSections = ['skills', 'projects', 'education', 'experience', 'achievements'];
        if (promptOverride) {
          // Resume vs JD comparison tasks / Page Analysis → experience, skills, and projects
          if (
            promptOverride.includes('[JOB DESCRIPTION]') ||
            promptOverride.includes('missing') ||
            promptOverride.includes('Advisor') ||
            promptOverride.includes('Analyze the visible text content')
          ) {
            requiredSections = ['experience', 'skills', 'projects'];
          }
        }
      }

      // Build context
      const rawContext = AIContextBuilder.buildContext(parsed, pageContent, undefined, requiredSections);

      // Build instructions and user prompts
      const systemInstruction = PromptBuilder.formatSystemInstruction(rawContext);
      const userPrompt = PromptBuilder.formatUserPrompt(promptOverride || trimmedPrompt);

      // Generate text with fallback support
      const aiResponse = await AIService.generateText({
        providerName: settings.aiConfig.provider,
        apiKey: settings.aiConfig.apiKey,
        model: settings.aiConfig.selectedModel,
        prompt: userPrompt,
        systemInstruction,
        updateAiConfig: async (config) => {
          await updateAiConfig(config);
        }
      });

      const assistantMsg: Message = {
        id: Math.random().toString(36).substring(7),
        role: 'assistant',
        content: aiResponse,
        timestamp: Date.now()
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      const error = err as Error;
      toast.error(error.message || 'Failed to complete query.');
      
      const errorMsg: Message = {
        id: Math.random().toString(36).substring(7),
        role: 'assistant',
        content: `Error: ${error.message || 'AI content generation failed.'}`,
        timestamp: Date.now()
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return {
    messages,
    isLoading: isChatLoading,
    sendMessage,
    clearChat
  };
};
export default useChat;
