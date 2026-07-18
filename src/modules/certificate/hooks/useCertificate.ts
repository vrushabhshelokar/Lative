import { useLiveQuery } from 'dexie-react-hooks';
import { useState } from 'react';
import { certificateService } from '../services/certificateService';
import { certificateStore } from '../storage/certificateStore';
import { Certificate, CertificateMetadata } from '../types';

export interface UseCertificateResult {
  certificates: Certificate[];
  isLoading: boolean;
  error: Error | null;
  uploadCertificate: (file: File) => Promise<string>;
  replaceCertificate: (id: string, file: File) => Promise<void>;
  deleteCertificate: (id: string) => Promise<void>;
  updateCertificateMetadata: (id: string, metadata?: CertificateMetadata) => Promise<void>;
  clearError: () => void;
}

export const useCertificate = (): UseCertificateResult => {
  const [error, setError] = useState<Error | null>(null);

  // useLiveQuery reactively subscribes to Dexie database changes
  const certificates = useLiveQuery(
    async () => {
      return certificateStore.getAll();
    },
    [],
    [] as Certificate[]
  );

  const isLoading = certificates === undefined;

  const uploadCertificate = async (file: File): Promise<string> => {
    try {
      setError(null);
      return await certificateService.uploadCertificate(file);
    } catch (err) {
      const errorObj = err as Error;
      setError(errorObj);
      throw errorObj;
    }
  };

  const replaceCertificate = async (id: string, file: File): Promise<void> => {
    try {
      setError(null);
      await certificateService.replaceCertificate(id, file);
    } catch (err) {
      const errorObj = err as Error;
      setError(errorObj);
      throw errorObj;
    }
  };

  const deleteCertificate = async (id: string): Promise<void> => {
    try {
      setError(null);
      await certificateService.deleteCertificate(id);
    } catch (err) {
      const errorObj = err as Error;
      setError(errorObj);
      throw errorObj;
    }
  };

  const updateCertificateMetadata = async (id: string, metadata?: CertificateMetadata): Promise<void> => {
    try {
      setError(null);
      await certificateService.updateMetadata(id, metadata);
    } catch (err) {
      const errorObj = err as Error;
      setError(errorObj);
      throw errorObj;
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    certificates: certificates || [],
    isLoading,
    error,
    uploadCertificate,
    replaceCertificate,
    deleteCertificate,
    updateCertificateMetadata,
    clearError
  };
};
export default useCertificate;
