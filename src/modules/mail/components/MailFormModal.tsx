import React, { useState, useEffect } from 'react';
import { Modal } from '@/shared/components/Modal';
import { Input } from '@/shared/components/Input';
import { Button } from '@/shared/components/Button';
import { Mail, CreateMailInput } from '../types';
import { validateMailInput, MailValidationError } from '../validators/validateMail';
import { useMails } from '../hooks/useMails';
import { MailServiceError } from '../services/mailService';

export interface MailFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (input: CreateMailInput) => Promise<void>;
  mail?: Mail;
}

export const MailFormModal: React.FC<MailFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  mail
}) => {
  const { mails } = useMails();
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<MailValidationError>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (mail) {
        setId(mail.id);
        setEmail(mail.email);
      } else {
        setId('');
        setEmail('');
      }
      setErrors({});
      setIsLoading(false);
    }
  }, [isOpen, mail]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const validation = validateMailInput(
      { id, email },
      mails,
      !!mail,
      mail?.id
    );

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    try {
      setIsLoading(true);
      await onSubmit({ id, email });
      onClose();
    } catch (err) {
      if (err instanceof MailServiceError) {
        setErrors(err.errors);
      } else {
        const message = err instanceof Error ? err.message : 'An unexpected error occurred.';
        setErrors({ email: message });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isEdit = !!mail;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Email' : 'Add Email'}
      showCloseButton={!isLoading}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-sans select-none">
        <div className="flex flex-col gap-3">
          <Input
            label="Label"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="e.g., Primary, Personal, Work"
            error={errors.id}
            disabled={isLoading}
            autoFocus
          />

          <Input
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            error={errors.email}
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
            {isEdit ? 'Save Changes' : 'Add Email'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
