import { useLiveQuery } from 'dexie-react-hooks';
import { useState } from 'react';
import { resumeService } from '../services/resumeService';
import { resumeStore } from '../storage/resumeStore';
import { Resume, ParsedResume } from '../types';

export interface UseResumeResult {
  resumes: Resume[];
  isLoading: boolean;
  error: Error | null;
  deleteResume: (id: string) => Promise<void>;
  replaceResume: (id: string, file: File) => Promise<void>;
  getParsedResume: (id: string) => Promise<ParsedResume | undefined>;
  updateResumeTitle: (id: string, title?: string) => Promise<void>;
}

export const useResume = (): UseResumeResult => {
  const [error, setError] = useState<Error | null>(null);

  // useLiveQuery handles reactive updates from IndexedDB
  const resumes = useLiveQuery(
    async () => {
      return resumeStore.getAll();
    },
    [],
    [] as Resume[]
  );

  const isLoading = resumes === undefined;

  const deleteResume = async (id: string) => {
    try {
      setError(null);
      await resumeService.deleteResume(id);
    } catch (err) {
      const errorObj = err as Error;
      setError(errorObj);
      throw errorObj;
    }
  };

  const replaceResume = async (id: string, file: File) => {
    try {
      setError(null);
      await resumeService.replaceResume(id, file);
    } catch (err) {
      const errorObj = err as Error;
      setError(errorObj);
      throw errorObj;
    }
  };

  const getParsedResume = async (id: string): Promise<ParsedResume | undefined> => {
    return resumeService.getParsedResume(id);
  };

  const updateResumeTitle = async (id: string, title?: string) => {
    try {
      setError(null);
      await resumeService.updateResumeTitle(id, title);
    } catch (err) {
      const errorObj = err as Error;
      setError(errorObj);
      throw errorObj;
    }
  };

  return {
    resumes: resumes || [],
    isLoading,
    error,
    deleteResume,
    replaceResume,
    getParsedResume,
    updateResumeTitle
  };
};
