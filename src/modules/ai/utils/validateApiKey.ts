import { ProviderFactory } from '../providers/ProviderFactory';
import { ValidationResult } from '../providers/AIProvider';

/**
 * Validates the user-provided API key by calling the provider factory and validation checks.
 * Returns a ValidationResult with validation statuses and discovered models.
 */
export const validateApiKey = async (apiKey: string): Promise<ValidationResult> => {
  if (!apiKey || !apiKey.trim()) {
    return {
      valid: false,
      provider: 'google',
      selectedModel: '',
      availableModels: [],
      message: 'API Key cannot be empty.'
    };
  }

  try {
    const provider = ProviderFactory.createProvider('google');
    return await provider.validateApiKey(apiKey.trim());
  } catch (err: unknown) {
    console.warn('validateApiKey helper caught exception:', err);
    const errorObj = err as Error;
    return {
      valid: false,
      provider: 'google',
      selectedModel: '',
      availableModels: [],
      message: errorObj.message || 'Verification encountered an error.'
    };
  }
};
