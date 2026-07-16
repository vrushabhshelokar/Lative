import React, { useState, useEffect } from 'react';
import { Modal } from '@/shared/components/Modal';
import { Input } from '@/shared/components/Input';
import { Button } from '@/shared/components/Button';
import { Link, CreateLinkInput } from '../types';
import { validateLinkInput, LinkValidationError } from '../validators/validateLink';
import { useLinks } from '../hooks/useLinks';
import { LinkServiceError } from '../services/linkService';

export interface LinkFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (input: CreateLinkInput) => Promise<void>;
  link?: Link;
}

export const LinkFormModal: React.FC<LinkFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  link
}) => {
  const { links } = useLinks();
  const [id, setId] = useState('');
  const [url, setUrl] = useState('');
  const [errors, setErrors] = useState<LinkValidationError>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (link) {
        setId(link.id);
        setUrl(link.url);
      } else {
        setId('');
        setUrl('');
      }
      setErrors({});
      setIsLoading(false);
    }
  }, [isOpen, link]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const validation = validateLinkInput(
      { id, url },
      links,
      !!link,
      link?.id
    );

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    try {
      setIsLoading(true);
      await onSubmit({ id, url });
      onClose();
    } catch (err) {
      if (err instanceof LinkServiceError) {
        setErrors(err.errors);
      } else {
        const message = err instanceof Error ? err.message : 'An unexpected error occurred.';
        setErrors({ url: message });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isEdit = !!link;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Link' : 'Add Link'}
      showCloseButton={!isLoading}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-sans select-none">
        <div className="flex flex-col gap-3">
          <Input
            label="Label"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="e.g., LinkedIn, GitHub, Portfolio"
            error={errors.id}
            disabled={isLoading}
            autoFocus
          />

          <Input
            label="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            error={errors.url}
            disabled={isLoading}
          />
        </div>

        <div className="flex items-center justify-end gap-2 mt-2 pt-2 border-t border-border/40">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            isLoading={isLoading}
          >
            {isEdit ? 'Save Changes' : 'Add Link'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
