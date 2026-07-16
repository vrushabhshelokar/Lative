import { ParsedResume } from '@/modules/resume/types';

export interface RawAIContext {
  parsedResume?: ParsedResume;
  pageContent?: string;
}

export class AIContextBuilder {
  static buildContext(parsedResume?: ParsedResume, pageContent?: string): RawAIContext {
    return { parsedResume, pageContent };
  }
}
