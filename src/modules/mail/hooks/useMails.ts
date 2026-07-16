import { useLiveQuery } from 'dexie-react-hooks';
import { useState } from 'react';
import { mailService } from '../services/mailService';
import { mailStore } from '../storage/mailStore';
import { Mail, CreateMailInput, UpdateMailInput } from '../types';

export interface UseMailsResult {
  mails: Mail[];
  isLoading: boolean;
  error: Error | null;
  addMail: (input: CreateMailInput) => Promise<void>;
  updateMail: (oldId: string, input: UpdateMailInput) => Promise<void>;
  deleteMail: (id: string) => Promise<void>;
}

export const useMails = (): UseMailsResult => {
  const [error, setError] = useState<Error | null>(null);

  // useLiveQuery reactively subscribes to Dexie database updates
  const mails = useLiveQuery(
    async () => {
      return mailStore.getAll();
    },
    [],
    [] as Mail[]
  );

  const isLoading = mails === undefined;

  const addMail = async (input: CreateMailInput) => {
    try {
      setError(null);
      await mailService.addMail(input);
    } catch (err) {
      const errorObj = err as Error;
      setError(errorObj);
      throw errorObj;
    }
  };

  const updateMail = async (oldId: string, input: UpdateMailInput) => {
    try {
      setError(null);
      await mailService.updateMail(oldId, input);
    } catch (err) {
      const errorObj = err as Error;
      setError(errorObj);
      throw errorObj;
    }
  };

  const deleteMail = async (id: string) => {
    try {
      setError(null);
      await mailService.deleteMail(id);
    } catch (err) {
      const errorObj = err as Error;
      setError(errorObj);
      throw errorObj;
    }
  };

  return {
    mails: mails || [],
    isLoading,
    error,
    addMail,
    updateMail,
    deleteMail
  };
};
