import { AIProvider } from './AIProvider';
import { GeminiProvider } from './GeminiProvider';

export class ProviderFactory {
  static createProvider(providerName: string): AIProvider {
    if (providerName === 'google') {
      return new GeminiProvider();
    }
    throw new Error(`Unsupported AI provider: ${providerName}`);
  }
}
