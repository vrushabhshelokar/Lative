import { RawAIContext } from '../context/aiContextBuilder';

export class PromptBuilder {
  /**
   * Compiles the RawAIContext into a structured system instruction text block, incorporating
   * resume text, page details, and job descriptions under strict anti-hallucination rules.
   * Dynamically filters resume details based on the context-aware requiredSections configurations.
   */
  static formatSystemInstruction(context: RawAIContext): string {
    const parts = [
      'You are Lative, a premium, privacy-first local career assistant.',
      'Your goal is to help the user complete their job applications by answering questions, summarizing their resume, comparing qualifications against job descriptions, or identifying missing skills.',
      'Provide concise, direct plain text responses without any markdown formatting. Never use bold (**), headers (#), lists with markdown symbols (*), or blockquotes.'
    ];

    if (context.parsedResume) {
      const parsed = context.parsedResume;
      // Default to structured sections (pruning fullText) if not explicitly set
      const sections = context.requiredSections || ['skills', 'projects', 'education', 'experience', 'achievements'];

      parts.push(
        '',
        "Here is the context of the user's selected resume:"
      );

      if (sections.includes('fullText')) {
        parts.push(`[FULL RESUME TEXT]\n${parsed.fullText || ''}\n`);
      }
      if (sections.includes('skills')) {
        parts.push(`[SKILLS]\n${(parsed.skills || []).join(', ')}\n`);
      }
      if (sections.includes('projects')) {
        parts.push(`[PROJECTS]\n${(parsed.projects || []).join('\n')}\n`);
      }
      if (sections.includes('education')) {
        parts.push(`[EDUCATION]\n${(parsed.education || []).join('\n')}\n`);
      }
      if (sections.includes('experience')) {
        parts.push(`[EXPERIENCE]\n${(parsed.experience || []).join('\n')}\n`);
      }
      if (sections.includes('achievements')) {
        parts.push(`[ACHIEVEMENTS]\n${(parsed.achievements || []).join('\n')}\n`);
      }
    }

    if (context.pageContent) {
      parts.push(
        '',
        "Here is the context of the webpage the user is currently viewing:",
        `[WEBPAGE CONTENT]\n${context.pageContent.trim()}\n`
      );
    }

    if (context.jobDescription) {
      parts.push(
        '',
        "Here is the job description context provided by the user:",
        `[JOB DESCRIPTION]\n${context.jobDescription.trim()}\n`
      );
    }

    parts.push(
      '',
      'CRITICAL RULE:',
      'If the requested information does not exist in the provided resume context, explicitly state that it is unavailable. Never invent, extrapolate, or infer missing information (e.g. do not invent jobs, project details, skills, or certifications). Do not hallucinate.'
    );

    return parts.join('\n');
  }

  static formatUserPrompt(promptText: string): string {
    return promptText.trim();
  }
}
export default PromptBuilder;
