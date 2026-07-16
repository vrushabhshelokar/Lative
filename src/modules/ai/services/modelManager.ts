import { AIProvider } from '../providers/AIProvider';

export class ModelManager {
  /**
   * Selects preferred model according to ranking priorities.
   */
  static selectPreferredModel(models: string[]): string {
    const preferences = ['gemini-1.5-flash', 'gemini-2.0-flash-exp', 'gemini-1.5-pro'];
    for (const pref of preferences) {
      const found = models.find((m) => m.includes(pref));
      if (found) return found;
    }
    if (models.length > 0) {
      return models[0];
    }
    throw new Error('No compatible generative models found.');
  }

  /**
   * Discovers and selects the preferred model.
   */
  static async discoverAndSelectModel(apiKey: string, provider: AIProvider): Promise<string> {
    const models = await provider.discoverModels(apiKey);
    return this.selectPreferredModel(models);
  }

  /**
   * Handles model failure fallback, updates settings cache and returns new choice.
   */
  static async handleModelFailure(
    apiKey: string,
    provider: AIProvider,
    currentModel: string,
    updateAiConfig: (config: { selectedModel: string }) => Promise<void>
  ): Promise<string> {
    console.warn(`Model ${currentModel} failed. Executing fallback discovery...`);
    const models = await provider.discoverModels(apiKey);
    
    const activeModels = models.filter((m) => m !== currentModel);
    if (activeModels.length === 0) {
      throw new Error('No alternative generative models available.');
    }

    const nextPreferred = this.selectPreferredModel(activeModels);
    await updateAiConfig({ selectedModel: nextPreferred });
    return nextPreferred;
  }
}
