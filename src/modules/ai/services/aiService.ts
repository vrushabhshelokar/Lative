import { ProviderFactory } from '../providers/ProviderFactory';
import { GenerateOptions } from '../providers/AIProvider';
import { ModelManager } from './modelManager';

export interface AIServiceQueryOptions {
  providerName: string;
  apiKey: string;
  model: string;
  prompt: string;
  systemInstruction?: string;
  updateAiConfig?: (config: { selectedModel: string }) => Promise<void>;
}

export class AIService {
  /**
   * Coordinates text generation, supporting self-healing fallback retries exactly once on failure.
   */
  static async generateText(options: AIServiceQueryOptions): Promise<string> {
    const provider = ProviderFactory.createProvider(options.providerName);
    
    const generateOptions: GenerateOptions = {
      prompt: options.prompt,
      systemInstruction: options.systemInstruction,
      model: options.model
    };

    try {
      return await provider.generateText(generateOptions, options.apiKey);
    } catch (err: unknown) {
      console.warn('AIService primary query failed. Checking fallback rules...', err);
      const errorObj = err as Error;

      const isModelError = errorObj.message && (
        errorObj.message.includes('not found') || 
        errorObj.message.includes('404') || 
        errorObj.message.includes('model')
      );
      
      // Attempt self-healing discovery ONLY if it is a model availability failure and recovery configs are supplied
      if (isModelError && options.updateAiConfig) {
        try {
          const fallbackModel = await ModelManager.handleModelFailure(
            options.apiKey,
            provider,
            options.model,
            options.updateAiConfig
          );
          
          console.info(`AIService retrying query with new fallback model: ${fallbackModel}`);
          const retryOptions: GenerateOptions = {
            ...generateOptions,
            model: fallbackModel
          };
          
          return await provider.generateText(retryOptions, options.apiKey);
        } catch (fallbackErr: unknown) {
          console.error('AIService self-healing recovery failed:', fallbackErr);
          const fallbackErrObj = fallbackErr as Error;
          throw new Error(`Self-healing failed: ${fallbackErrObj.message || fallbackErr}`);
        }
      }

      throw err;
    }
  }
}
export default AIService;
