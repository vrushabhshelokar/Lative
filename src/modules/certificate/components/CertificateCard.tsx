import React, { useRef, useState } from 'react';
import { Award, Eye, Copy, RefreshCw, Trash2, Tag, Globe } from 'lucide-react';
import { Certificate, CertificateMetadata } from '../types';
import { useToast } from '@/shared/hooks/useToast';
import { CertificateMetadataModal } from './CertificateMetadataModal';

export interface CertificateCardProps {
  certificate: Certificate;
  onDelete: (id: string) => void;
  onReplace: (id: string, file: File) => Promise<void>;
  onUpdateMetadata: (id: string, metadata?: CertificateMetadata) => Promise<void>;
  isSelected?: boolean;
  onSelectToggle?: () => void;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({
  certificate,
  onDelete,
  onReplace,
  onUpdateMetadata,
  isSelected = false,
  onSelectToggle
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenFile = () => {
    try {
      const fileUrl = URL.createObjectURL(certificate.file);
      window.open(fileUrl, '_blank');
      // Revoke after 1 minute to release memory resources
      setTimeout(() => URL.revokeObjectURL(fileUrl), 60000);
    } catch {
      toast.error('Failed to open certificate file.');
    }
  };

  const handleCopyFilename = async () => {
    try {
      await navigator.clipboard.writeText(certificate.fileName);
      toast.success('Copied filename!');
    } catch {
      toast.error('Failed to copy filename.');
    }
  };

  const handleCopyCredentialId = async () => {
    if (!certificate.metadata?.credentialId) return;
    try {
      await navigator.clipboard.writeText(certificate.metadata.credentialId);
      toast.success('Credential ID copied!');
    } catch {
      toast.error('Failed to copy credential ID.');
    }
  };

  const formatBytes = (bytes: number, decimals = 1) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      try {
        await onReplace(certificate.id, files[0]);
        toast.success('Certificate replaced successfully.');
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Replacement failed.';
        toast.error(msg);
      }
      e.target.value = '';
    }
  };

  const handleMetadataSubmit = async (metadata?: CertificateMetadata) => {
    try {
      await onUpdateMetadata(certificate.id, metadata);
      toast.success('Certificate details updated.');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to update details.';
      toast.error(msg);
      throw err; // rethrow for the modal error state handler
    }
  };

  const hasMetadata = !!certificate.metadata;

  return (
    <div 
      className={`flex items-center gap-3 p-3.5 border rounded-large shadow-card dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)] transition-all select-none font-sans group ${
        isSelected
          ? 'bg-accent/[0.04] border-accent/40 dark:bg-accent/[0.08] dark:border-accent/40 shadow-[0_0_8px_rgba(94,106,210,0.05)]'
          : 'bg-card dark:bg-gradient-to-b dark:from-white/[0.06] dark:to-white/[0.01] border-border dark:border-white/[0.06] hover:border-border/80 dark:hover:border-white/[0.12]'
      }`}
    >
      {onSelectToggle && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelectToggle();
          }}
          className={`w-3.5 h-3.5 rounded border flex items-center justify-center cursor-pointer shrink-0 transition-all focus:outline-none focus:ring-1 focus:ring-accent ${
            isSelected
              ? 'bg-accent border-accent text-white'
              : 'bg-card border-border hover:border-border-hover dark:bg-white/[0.03] dark:border-white/[0.12] dark:hover:border-white/[0.20]'
          }`}
          aria-checked={isSelected}
          role="checkbox"
        >
          {isSelected && (
            <svg
              className="w-2.5 h-2.5 stroke-current text-white shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </button>
      )}

      <div className="flex-1 min-w-0 flex flex-col gap-2.5">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,.png,.jpg,.jpeg,.webp"
          className="hidden"
        />

        {/* Rows Container */}
        <div className="flex flex-col gap-1.5">
        {/* Row 1: File icon + Title */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-background-secondary/60 border border-border dark:bg-white/[0.04] dark:border-white/[0.08] flex items-center justify-center text-text-secondary group-hover:text-accent transition-colors shrink-0">
            <Award className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0 flex-1">
            <h4
              className="text-xs font-semibold text-text-primary truncate select-none leading-tight"
              title={hasMetadata ? certificate.metadata?.title : certificate.fileName}
            >
              {hasMetadata ? certificate.metadata?.title : certificate.fileName}
            </h4>
          </div>
        </div>

        {/* Row 2: Metadata (Size, Date, Original filename if applicable) */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-text-secondary select-none leading-none pl-[38px] -mt-0.5">
          <span>{formatBytes(certificate.file.size)}</span>
          <span className="w-1 h-1 rounded-full bg-border/40" />
          <span>Uploaded {formatDate(certificate.uploadedAt)}</span>
          {hasMetadata && (
            <>
              <span className="w-1 h-1 rounded-full bg-border/40" />
              <span className="truncate max-w-[120px] italic" title={certificate.fileName}>
                {certificate.fileName}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Row 3: Action buttons */}
      <div className="flex items-center justify-end gap-1.5 border-t border-border/40 dark:border-white/[0.04] pt-2.5 mt-0.5">
        <button
          type="button"
          onClick={handleOpenFile}
          className="text-text-secondary hover:text-text-primary p-1.5 rounded-small hover:bg-background-secondary dark:hover:bg-white/[0.05] transition-colors focus:outline-none focus:ring-1 focus:ring-accent"
          title="Open certificate file"
          aria-label={`Open certificate file of ${certificate.fileName}`}
        >
          <Eye className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={handleCopyFilename}
          className="text-text-secondary hover:text-text-primary p-1.5 rounded-small hover:bg-background-secondary dark:hover:bg-white/[0.05] transition-colors focus:outline-none focus:ring-1 focus:ring-accent"
          title="Copy original filename"
          aria-label={`Copy filename of ${certificate.fileName}`}
        >
          <Copy className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className={`p-1.5 rounded-small hover:bg-background-secondary dark:hover:bg-white/[0.05] transition-colors focus:outline-none focus:ring-1 focus:ring-accent
            ${hasMetadata ? 'text-accent dark:bg-accent/10 dark:text-accent' : 'text-text-secondary hover:text-text-primary'}`}
          title="Edit certificate details"
          aria-label={`Edit details for ${certificate.fileName}`}
        >
          <Tag className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="text-text-secondary hover:text-text-primary p-1.5 rounded-small hover:bg-background-secondary dark:hover:bg-white/[0.05] transition-colors focus:outline-none focus:ring-1 focus:ring-accent"
          title="Replace certificate file"
          aria-label={`Replace ${certificate.fileName}`}
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onDelete(certificate.id)}
          className="text-text-secondary hover:text-danger p-1.5 rounded-small hover:bg-danger/10 transition-colors focus:outline-none focus:ring-1 focus:ring-danger"
          title="Delete certificate"
          aria-label={`Delete ${certificate.fileName}`}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Expanded Metadata Block (Row 4) */}
      {hasMetadata && certificate.metadata && (
        <div className="pt-2.5 border-t border-border/40 dark:border-white/[0.04] flex flex-col gap-1.5 text-[11px] text-text-secondary select-none">
          {certificate.metadata.organization && (
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-text-primary min-w-[80px]">Organization:</span>
              <span>{certificate.metadata.organization}</span>
            </div>
          )}
          {(certificate.metadata.issueDate || certificate.metadata.expiryDate) && (
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-text-primary min-w-[80px]">Validity:</span>
              <span>
                {certificate.metadata.issueDate || 'N/A'}
                {certificate.metadata.expiryDate ? ` - ${certificate.metadata.expiryDate}` : ' (No Expiry)'}
              </span>
            </div>
          )}
          {certificate.metadata.credentialId && (
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-text-primary min-w-[80px]">Credential ID:</span>
              <code className="bg-background-secondary border border-border px-1 py-0.5 rounded-small font-mono text-[10px]">
                {certificate.metadata.credentialId}
              </code>
              <button
                type="button"
                onClick={handleCopyCredentialId}
                className="text-text-secondary hover:text-text-primary p-0.5 rounded-small hover:bg-background-secondary transition-colors focus:outline-none focus:ring-1 focus:ring-accent ml-1"
                title="Copy Credential ID"
                aria-label={`Copy Credential ID: ${certificate.metadata.credentialId}`}
              >
                <Copy className="w-2.5 h-2.5" />
              </button>
            </div>
          )}
          {certificate.metadata.verificationUrl && (
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-text-primary min-w-[80px]">Verification:</span>
              <a
                href={certificate.metadata.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline flex items-center gap-0.5 font-medium"
              >
                <span>View Verification Page</span>
                <Globe className="w-2.5 h-2.5" />
              </a>
            </div>
          )}
        </div>
      )}

      </div>

      <CertificateMetadataModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleMetadataSubmit}
        currentMetadata={certificate.metadata}
        defaultTitle={certificate.fileName.substring(0, certificate.fileName.lastIndexOf('.')) || certificate.fileName}
      />
    </div>
  );
};
export default CertificateCard;
