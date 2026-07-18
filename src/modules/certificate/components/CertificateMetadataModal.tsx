import React, { useState, useEffect } from 'react';
import { Modal } from '@/shared/components/Modal';
import { Input } from '@/shared/components/Input';
import { Button } from '@/shared/components/Button';
import { CertificateMetadata } from '../types';

interface CertificateMetadataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (metadata?: CertificateMetadata) => Promise<void>;
  currentMetadata?: CertificateMetadata;
  defaultTitle: string;
}

export const CertificateMetadataModal: React.FC<CertificateMetadataModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  currentMetadata,
  defaultTitle
}) => {
  const [title, setTitle] = useState('');
  const [organization, setOrganization] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [credentialId, setCredentialId] = useState('');
  const [verificationUrl, setVerificationUrl] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize fields on open
  useEffect(() => {
    if (isOpen) {
      setTitle(currentMetadata?.title || defaultTitle || '');
      setOrganization(currentMetadata?.organization || '');
      setIssueDate(currentMetadata?.issueDate || '');
      setExpiryDate(currentMetadata?.expiryDate || '');
      setCredentialId(currentMetadata?.credentialId || '');
      setVerificationUrl(currentMetadata?.verificationUrl || '');
      setErrors({});
    }
  }, [isOpen, currentMetadata, defaultTitle]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = 'Certificate Title is required.';
    }

    if (verificationUrl.trim() && !/^https?:\/\//i.test(verificationUrl.trim())) {
      newErrors.verificationUrl = 'Verification URL must start with http:// or https://';
    }

    if (issueDate.trim() && expiryDate.trim()) {
      const issue = issueDate.trim();
      const expiry = expiryDate.trim();

      const issueVal = Date.parse(issue) || parseInt(issue, 10);
      const expiryVal = Date.parse(expiry) || parseInt(expiry, 10);

      if (!isNaN(issueVal) && !isNaN(expiryVal)) {
        if (expiryVal < issueVal) {
          newErrors.expiryDate = 'Expiry Date cannot be earlier than Issue Date.';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      await onSubmit({
        title: title.trim(),
        organization: organization.trim() || undefined,
        issueDate: issueDate.trim() || undefined,
        expiryDate: expiryDate.trim() || undefined,
        credentialId: credentialId.trim() || undefined,
        verificationUrl: verificationUrl.trim() || undefined
      });
      onClose();
    } catch (err) {
      const error = err as Error;
      setErrors({ global: error.message || 'Failed to update metadata.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearMetadata = async () => {
    try {
      setIsSubmitting(true);
      await onSubmit(undefined);
      onClose();
    } catch (err) {
      const error = err as Error;
      setErrors({ global: error.message || 'Failed to clear metadata.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Certificate Details">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full select-none font-sans">
        <div className="flex flex-col gap-3">
          <Input
            label="Certificate Title *"
            placeholder="e.g. AWS Certified Solutions Architect"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={errors.title}
            disabled={isSubmitting}
            required
          />

          <Input
            label="Awarding Organization"
            placeholder="e.g. Amazon Web Services"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            disabled={isSubmitting}
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Issue Date / Year"
              placeholder="e.g. 2024 or Oct 2024"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
              disabled={isSubmitting}
            />
            <Input
              label="Expiry Date / Year"
              placeholder="e.g. 2027 or Oct 2027"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              error={errors.expiryDate}
              disabled={isSubmitting}
            />
          </div>

          <Input
            label="Credential / Verification ID"
            placeholder="e.g. AWS-123456"
            value={credentialId}
            onChange={(e) => setCredentialId(e.target.value)}
            disabled={isSubmitting}
          />

          <Input
            label="Public Verification URL"
            placeholder="e.g. https://aws.amazon.com/verify/..."
            value={verificationUrl}
            onChange={(e) => setVerificationUrl(e.target.value)}
            error={errors.verificationUrl}
            disabled={isSubmitting}
          />
        </div>

        {errors.global && (
          <span className="text-[11px] font-medium text-danger">
            {errors.global}
          </span>
        )}

        <div className="flex justify-between items-center gap-2 mt-2 shrink-0">
          {currentMetadata ? (
            <Button
              variant="danger"
              size="sm"
              type="button"
              onClick={handleClearMetadata}
              disabled={isSubmitting}
            >
              Clear Details
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
export default CertificateMetadataModal;
