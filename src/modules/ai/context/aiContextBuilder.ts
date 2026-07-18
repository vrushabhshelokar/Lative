import { ParsedResume } from '@/modules/resume/types';

export type ResumeSection = 'fullText' | 'skills' | 'projects' | 'education' | 'experience' | 'achievements';

export interface RawAIContext {
  parsedResume?: ParsedResume;
  pageContent?: string;
  jobDescription?: string;
  requiredSections?: ResumeSection[];
}

export class AIContextBuilder {
  /**
   * Compiles ParsedResume, active Page Contents, Job Descriptions, and section parameters into a unified raw context.
   */
  static buildContext(
    parsedResume?: ParsedResume,
    pageContent?: string,
    jobDescription?: string,
    requiredSections?: ResumeSection[]
  ): RawAIContext {
    return {
      parsedResume,
      pageContent,
      jobDescription,
      requiredSections
    };
  }
}
export default AIContextBuilder;
