import { ResumeRecord, ParsedResumeRecord } from '@/types/database';

export type Resume = ResumeRecord;
export type ParsedResume = ParsedResumeRecord;

export interface CreateResumeInput {
  fileName: string;
  file: Blob;
  fileSize: number;
}

export interface SaveParsedResumeInput {
  resumeId: string;
  fullText: string;
  skills: string[];
  projects: string[];
  education: string[];
  experience: string[];
  achievements: string[];
}
