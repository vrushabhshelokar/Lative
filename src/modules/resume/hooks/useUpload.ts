import { useState, DragEvent, ChangeEvent } from 'react';
import { useToast } from '@/shared/hooks/useToast';
import { resumeService } from '../services/resumeService';

export interface UseUploadResult {
  isDragging: boolean;
  isUploading: boolean;
  error: string | null;
  dragHandlers: {
    onDragOver: (e: DragEvent<HTMLDivElement>) => void;
    onDragLeave: (e: DragEvent<HTMLDivElement>) => void;
    onDrop: (e: DragEvent<HTMLDivElement>) => void;
  };
  handleFileSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  clearError: () => void;
}

export const useUpload = (onSuccess?: () => void): UseUploadResult => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const processFile = async (file: File) => {
    setError(null);
    setIsUploading(true);

    try {
      // Coordinate processing via resumeService
      await resumeService.processAndAddResume(file);
      toast.success('Resume uploaded successfully.');
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : 'Upload failed.';
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setIsUploading(false);
    }
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
      e.target.value = '';
    }
  };

  const clearError = () => setError(null);

  return {
    isDragging,
    isUploading,
    error,
    dragHandlers: {
      onDragOver,
      onDragLeave,
      onDrop
    },
    handleFileSelect,
    clearError
  };
};
