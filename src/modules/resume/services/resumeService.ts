import { resumeStore } from '../storage/resumeStore';
import { validateResumeFile } from '../validators/validateResume';
import { extractRawText } from '../parser/textExtractor';
import { parseStructuredData } from '../parser/structuredData';
import { Resume, ParsedResume } from '../types';

export class ResumeServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ResumeServiceError';
  }
}

export const resumeService = {
  getResumes: async (): Promise<Resume[]> => {
    return resumeStore.getAll();
  },

  getParsedResume: async (resumeId: string): Promise<ParsedResume | undefined> => {
    return resumeStore.getParsed(resumeId);
  },

  processAndAddResume: async (file: File): Promise<string> => {
    const existing = await resumeStore.getAll();
    // Validate file presence, type, size, duplicates, and readability using validateResumeFile
    const validation = await validateResumeFile(file, existing);
    if (!validation.isValid) {
      throw new ResumeServiceError(validation.errors.file || 'Validation failed.');
    }

    const rawText = await extractRawText(file);
    const parsedData = parseStructuredData(rawText);

    return resumeStore.add(
      {
        fileName: file.name,
        file,
        fileSize: file.size
      },
      {
        fullText: rawText,
        ...parsedData
      }
    );
  },

  replaceResume: async (id: string, file: File): Promise<void> => {
    const existing = await resumeStore.getAll();
    const otherResumes = existing.filter((r) => r.id !== id);
    const validation = await validateResumeFile(file, otherResumes);
    if (!validation.isValid) {
      throw new ResumeServiceError(validation.errors.file || 'Validation failed.');
    }

    const rawText = await extractRawText(file);
    const parsedData = parseStructuredData(rawText);

    await resumeStore.replace(
      id,
      {
        fileName: file.name,
        file,
        fileSize: file.size
      },
      {
        fullText: rawText,
        ...parsedData
      }
    );
  },

  deleteResume: async (id: string): Promise<void> => {
    await resumeStore.delete(id);
  }
};
