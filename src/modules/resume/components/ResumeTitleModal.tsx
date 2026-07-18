import React, { useState, useEffect } from 'react';
import { Modal } from '@/shared/components/Modal';
import { Input } from '@/shared/components/Input';
import { Button } from '@/shared/components/Button';

interface ResumeTitleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title?: string) => Promise<void>;
  currentTitle?: string;
  defaultTitle: string;
}

export const ResumeTitleModal: React.FC<ResumeTitleModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  currentTitle,
  defaultTitle
}) => {
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setTitle(currentTitle || defaultTitle || '');
      setError('');
    }
  }, [isOpen, currentTitle, defaultTitle]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setError('');
      await onSubmit(title.trim() || undefined);
      onClose();
    } catch (err) {
      const errorObj = err as Error;
      setError(errorObj.message || 'Failed to save title.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = async () => {
    try {
      setIsSubmitting(true);
      setError('');
      await onSubmit(undefined);
      onClose();
    } catch (err) {
      const errorObj = err as Error;
      setError(errorObj.message || 'Failed to clear title.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Resume Title">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full select-none font-sans">
        <Input
          label="Resume Title"
          placeholder="e.g. Frontend Developer, AI Engineer"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isSubmitting}
        />

        {error && (
          <span className="text-[11px] font-medium text-danger">
            {error}
          </span>
        )}

        <div className="flex justify-between items-center gap-2 mt-2 shrink-0">
          {currentTitle ? (
            <Button
              variant="danger"
              size="sm"
              type="button"
              onClick={handleClear}
              disabled={isSubmitting}
            >
              Clear Title
            </Button>
          ) : (
            <div />
          )}

          <div className="flex gap-2">
            <Button variant="secondary" size="sm" type="button" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" isLoading={isSubmitting}>
              Save
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
export default ResumeTitleModal;
