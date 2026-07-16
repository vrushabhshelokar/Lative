import React, { useState, useEffect } from 'react';
import { Key, Eye, EyeOff } from 'lucide-react';
import { useSettings } from '../hooks/useSettings';
import { Input } from '@/shared/components/Input';
import { Button } from '@/shared/components/Button';
import { useToast } from '@/shared/hooks/useToast';

export const ApiKeyInput: React.FC = () => {
  const { settings, updateApiKey } = useSettings();
  const [apiKeyInput, setApiKeyInput] = useState(settings.geminiApiKey);
  const [showKey, setShowKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    setApiKeyInput(settings.geminiApiKey);
  }, [settings.geminiApiKey]);

  const handleSaveApiKey = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await updateApiKey(apiKeyInput);
      toast.success('Gemini API Key saved.');
    } catch {
      toast.error('Failed to save API Key.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-3.5 bg-card border border-border rounded-medium shadow-card flex flex-col gap-3">
      <div className="flex items-center gap-2 text-xs font-semibold text-text-primary">
        <Key className="w-4 h-4 text-text-secondary shrink-0" />
        <span>AI Configuration</span>
      </div>

      <form onSubmit={handleSaveApiKey} className="flex flex-col gap-2.5">
        <div className="relative flex items-center">
          <Input
            label="Gemini API Key"
            value={apiKeyInput}
            onChange={(e) => setApiKeyInput(e.target.value)}
            placeholder="Enter your Gemini API Key"
            type={showKey ? 'text' : 'password'}
            className="w-full pr-10"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowKey(!showKey)}
            className="absolute right-3 top-[26px] text-text-secondary hover:text-text-primary focus:outline-none"
            aria-label={showKey ? 'Hide API key' : 'Show API key'}
          >
            {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        <Button
          type="submit"
          variant="primary"
          size="sm"
          isLoading={isLoading}
          className="self-end"
        >
          Save Key
        </Button>
      </form>
    </div>
  );
};
