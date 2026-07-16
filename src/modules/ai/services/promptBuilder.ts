import { RawAIContext } from '../context/aiContextBuilder';

export class PromptBuilder {
  static formatSystemInstruction(context: RawAIContext): string {
    const parts = [
      'You are Lative, a premium, privacy-first local career assistant.',
      'Your goal is to help the user complete their job applications by answering questions, summarizing their resume, comparing qualifications against job descriptions, or identifying missing skills.',
      'Provide concise, direct plain text responses without any markdown formatting. Never use bold (**), headers (#), lists with markdown symbols (*), or blockquotes.'
    ];

    if (context.parsedResume) {
      const parsed = context.parsedResume;
      parts.push(
        '',
        "Here is the context of the user's selected resume:",
        `[FULL RESUME TEXT]\n${parsed.fullText || ''}\n`,
        `[SKILLS]\n${(parsed.skills || []).join(', ')}\n`,
        `[PROJECTS]\n${(parsed.projects || []).join('\n')}\n`,
        `[EDUCATION]\n${(parsed.education || []).join('\n')}\n`,
        `[EXPERIENCE]\n${(parsed.experience || []).join('\n')}\n`,
        `[ACHIEVEMENTS]\n${(parsed.achievements || []).join('\n')}\n`
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
