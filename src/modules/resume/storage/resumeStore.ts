import { db } from '@/database/db';
import { Resume, ParsedResume, CreateResumeInput, SaveParsedResumeInput } from '../types';

export const resumeStore = {
  getAll: async (): Promise<Resume[]> => {
    return db.resumes.toArray();
  },

  getById: async (id: string): Promise<Resume | undefined> => {
    return db.resumes.get(id);
  },

  getParsed: async (resumeId: string): Promise<ParsedResume | undefined> => {
    return db.parsedResumes.get(resumeId);
  },

  add: async (
    input: CreateResumeInput,
    parsed: Omit<SaveParsedResumeInput, 'resumeId'>
  ): Promise<string> => {
    const now = Date.now();
    const resumeId = Math.random().toString(36).substring(2, 9);
    
    const newResume: Resume = {
      id: resumeId,
      fileName: input.fileName.trim(),
      file: input.file,
      fileSize: input.fileSize,
      uploadedAt: now,
      updatedAt: now
    };

    const newParsed: ParsedResume = {
      resumeId,
      fullText: parsed.fullText,
      skills: parsed.skills,
      projects: parsed.projects,
      education: parsed.education,
      experience: parsed.experience,
      achievements: parsed.achievements,
      createdAt: now
    };

    await db.transaction('rw', [db.resumes, db.parsedResumes], async () => {
      await db.resumes.add(newResume);
      await db.parsedResumes.add(newParsed);
    });

    return resumeId;
  },

  replace: async (
    id: string,
    input: CreateResumeInput,
    parsed: Omit<SaveParsedResumeInput, 'resumeId'>
  ): Promise<void> => {
    const now = Date.now();
    
    await db.transaction('rw', [db.resumes, db.parsedResumes], async () => {
      const oldResume = await db.resumes.get(id);
      if (!oldResume) {
        throw new Error(`Resume not found: ${id}`);
      }

      await db.resumes.update(id, {
        fileName: input.fileName.trim(),
        file: input.file,
        fileSize: input.fileSize,
        updatedAt: now
      });

      await db.parsedResumes.put({
        resumeId: id,
        fullText: parsed.fullText,
        skills: parsed.skills,
        projects: parsed.projects,
        education: parsed.education,
        experience: parsed.experience,
        achievements: parsed.achievements,
        createdAt: oldResume.uploadedAt
      });
    });
  },

  updateTitle: async (id: string, title?: string): Promise<void> => {
    const now = Date.now();
    await db.resumes.update(id, {
      title: title?.trim() || undefined,
      updatedAt: now
    });
  },

  delete: async (id: string): Promise<void> => {
    await db.transaction('rw', [db.resumes, db.parsedResumes], async () => {
      await db.resumes.delete(id);
      await db.parsedResumes.delete(id);
    });
  }
};
