import { useLiveQuery } from 'dexie-react-hooks';
import { useState } from 'react';
import { linkService } from '../services/linkService';
import { linkStore } from '../storage/linkStore';
import { Link, CreateLinkInput, UpdateLinkInput } from '../types';

export interface UseLinksResult {
  links: Link[];
  isLoading: boolean;
  error: Error | null;
  addLink: (input: CreateLinkInput) => Promise<void>;
  updateLink: (oldId: string, input: UpdateLinkInput) => Promise<void>;
  deleteLink: (id: string) => Promise<void>;
}

export const useLinks = (): UseLinksResult => {
  const [error, setError] = useState<Error | null>(null);

  // useLiveQuery reactively subscribes to Dexie changes
  const links = useLiveQuery(
    async () => {
      return linkStore.getAll();
    },
    [],
    [] as Link[]
  );

  const isLoading = links === undefined;

  const addLink = async (input: CreateLinkInput) => {
    try {
      setError(null);
      await linkService.addLink(input);
    } catch (err) {
      const errorObj = err as Error;
      setError(errorObj);
      throw errorObj;
    }
  };

  const updateLink = async (oldId: string, input: UpdateLinkInput) => {
    try {
      setError(null);
      await linkService.updateLink(oldId, input);
    } catch (err) {
      const errorObj = err as Error;
      setError(errorObj);
      throw errorObj;
    }
  };

  const deleteLink = async (id: string) => {
    try {
      setError(null);
      await linkService.deleteLink(id);
    } catch (err) {
      const errorObj = err as Error;
      setError(errorObj);
      throw errorObj;
    }
  };

  return {
    links: links || [],
    isLoading,
    error,
    addLink,
    updateLink,
    deleteLink
  };
};
