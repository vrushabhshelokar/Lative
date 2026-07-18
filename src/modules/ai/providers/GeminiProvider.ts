import { AIProvider, GenerateOptions, ValidationResult, HealthResult } from './AIProvider';
import { GoogleGenAI } from '@google/genai';

interface ModelInfo {
  name: string;
  supportedGenerationMethods?: string[];
}

export class GeminiProvider implements AIProvider {
  private getClient(apiKey: string): GoogleGenAI {
    return new GoogleGenAI({ apiKey });
  }

  async validateApiKey(apiKey: string): Promise<ValidationResult> {
    try {
      const models = await this.discoverModels(apiKey);
      if (models.length === 0) {
        return {
          valid: false,
          provider: 'google',
          selectedModel: '',
          availableModels: [],
          message: 'No generative models supported for this API Key.'
        };
      }

      // Rank and select preferred model
      const preferences = ['gemini-1.5-flash', 'gemini-2.0-flash-exp', 'gemini-1.5-pro'];
      let selectedModel = '';
      for (const pref of preferences) {
        const found = models.find((m) => m.includes(pref));
        if (found) {
          selectedModel = found;
          break;
        }
      }
      if (!selectedModel && models.length > 0) {
        selectedModel = models[0];
      }

      return {
        valid: true,
        provider: 'google',
        selectedModel,
        availableModels: models
      };
    } catch (err: unknown) {
      console.warn('API Key validation failed:', err);
      const errorObj = err as Error;
      let message = errorObj.message || 'Key validation failed.';
      if (err instanceof TypeError && errorObj.message.includes('Failed to fetch')) {
        message = 'Network error. Please check your connection and host permissions.';
      }
      return {
        valid: false,
        provider: 'google',
        selectedModel: '',
        availableModels: [],
        message
      };
    }
  }

  async discoverModels(apiKey: string): Promise<string[]> {
    const url = `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 400 || response.status === 403) {
        throw new Error('Invalid API Key. Access denied.');
      }
      throw new Error(`API error (status ${response.status})`);
    }
    const data = await response.json();
    if (!data.models || !Array.isArray(data.models)) {
      return [];
    }
    return (data.models as ModelInfo[])
      .filter((m) => m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent'))
      .map((m) => m.name.replace('models/', ''));
  }

  async generateText(options: GenerateOptions, apiKey: string): Promise<string> {
    try {
      const ai = this.getClient(apiKey);
      const response = await ai.models.generateContent({
        model: options.model,
        contents: options.prompt,
        config: options.systemInstruction ? { systemInstruction: options.systemInstruction } : undefined
      });

      const text = response.text;
      if (!text) {
        throw new Error('Empty response received from Google Gemini.');
      }
      return text;
    } catch (err: unknown) {
      console.error('Gemini text generation failure:', err);
      const errorObj = err as Error;
      
      if (err instanceof TypeError && errorObj.message.includes('Failed to fetch')) {
        throw new Error('Network error. Please check your internet connection.');
      }
      const apiErr = err as {
        status?: number;
        statusCode?: number;
        message?: string;
        reason?: string;
        errorDetails?: Array<{ reason?: string; metadata?: Record<string, string> }>;
        response?: Response;
        headers?: Headers | Record<string, string>;
      };
      const status = apiErr.status || apiErr.statusCode;
      if (status) {
        if (status === 400 || status === 403) {
          throw new Error('Invalid API Key. Access denied.');
        }
        if (status === 404) {
          throw new Error(`Unsupported model error: ${options.model} not found.`);
        }
        if (status === 429) {
          // 1. Try structured SDK reason
          const reason = apiErr.reason || apiErr.errorDetails?.[0]?.reason;
          
          let isRateLimit = false;
          let isQuotaExhausted = false;

          if (reason) {
            if (reason === 'RATE_LIMIT_EXCEEDED' || reason === 'RESOURCE_EXHAUSTED') {
              isRateLimit = true;
            } else if (reason === 'QUOTA_EXCEEDED' || reason === 'USER_LIMIT_EXCEEDED') {
              isQuotaExhausted = true;
            }
          }

          // 2. Fallback to message parsing
          if (!isRateLimit && !isQuotaExhausted) {
            const errMsg = (apiErr.message || '').toLowerCase();
            if (errMsg.includes('queries per minute') || errMsg.includes('rate limit') || errMsg.includes('resource_exhausted')) {
              isRateLimit = true;
            } else {
              isQuotaExhausted = true;
            }
          }

          // 3. Extract Retry-After if provided
          let retryAfter: string | null = null;
          if (apiErr.response && typeof apiErr.response.headers?.get === 'function') {
            retryAfter = apiErr.response.headers.get('retry-after');
          } else if (apiErr.headers) {
            if (typeof (apiErr.headers as Headers).get === 'function') {
              retryAfter = (apiErr.headers as Headers).get('retry-after');
            } else {
              retryAfter = (apiErr.headers as Record<string, string>)['retry-after'] ||
                           (apiErr.headers as Record<string, string>)['Retry-After'] || null;
            }
          }

          if (isRateLimit) {
            if (retryAfter) {
              throw new Error(`Rate limit reached. Please wait ${retryAfter} seconds before trying again.`);
            }
            throw new Error('Rate limit reached. Please wait before trying again.');
          }

          throw new Error('Quota limits exceeded. Please check your Gemini API account limits.');
        }
        throw new Error(`API error (status ${status}): ${apiErr.message}`);
      }
      throw new Error(errorObj.message || 'Gemini text generation failed.');
    }
  }

  async healthCheck(apiKey: string, model: string): Promise<HealthResult> {
    const result: HealthResult = {
      authentication: false,
      connectivity: false,
      modelAvailability: false,
      quotaStatus: false
    };

    try {
      const discoverResponse = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`);
      result.connectivity = true;
      
      if (discoverResponse.status === 400 || discoverResponse.status === 403) {
        return result;
      }
      if (discoverResponse.ok) {
        result.authentication = true;
      }
      
      const ai = this.getClient(apiKey);
      await ai.models.generateContent({
        model,
        contents: 'ping'
      });
      
      result.modelAvailability = true;
      result.quotaStatus = true;
    } catch (err: unknown) {
      console.warn('Health check encounter:', err);
      const apiErr = err as { status?: number; statusCode?: number };
      const status = apiErr.status || apiErr.statusCode;
      if (status) {
        if (status !== 400 && status !== 403) {
          result.authentication = true;
        }
        if (status === 429) {
          result.modelAvailability = true;
          result.quotaStatus = false;
        }
        if (status === 404) {
          result.modelAvailability = false;
          result.quotaStatus = true;
        }
      }
    }

    return result;
  }
}
export default GeminiProvider;
