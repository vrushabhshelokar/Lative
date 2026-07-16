import React, { useRef, useState } from 'react';
import { Plus, Award } from 'lucide-react';
import { useCertificate } from '../hooks/useCertificate';
import { CertificateCard } from './CertificateCard';
import { Button } from '@/shared/components/Button';
import { Skeleton } from '@/shared/components/Skeleton';
import { EmptyState } from '@/shared/components/EmptyState';
import { useToast } from '@/shared/hooks/useToast';

export interface CertificateListProps {
  onDelete: (id: string) => void;
  onReplace: (id: string, file: File) => Promise<void>;
  onUpload: (file: File) => Promise<void>;
}

export const CertificateList: React.FC<CertificateListProps> = ({
  onDelete,
  onReplace,
  onUpload
}) => {
  const { certificates, isLoading } = useCertificate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const toast = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setIsUploading(true);
      try {
        await onUpload(files[0]);
        toast.success('Certificate uploaded successfully.');
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Upload failed.';
        toast.error(msg);
      } finally {
        setIsUploading(false);
      }
      e.target.value = '';
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3.5 p-4 font-sans select-none">
        <div className="flex justify-between items-center mb-1">
          <Skeleton variant="text" width={100} height={14} className="mb-0" />
          <Skeleton variant="rect" width={120} height={28} />
        </div>
        <Skeleton variant="rect" height={60} />
        <Skeleton variant="rect" height={60} />
        <Skeleton variant="rect" height={60} />
      </div>
    );
  }

  if (certificates.length === 0) {
    return (
      <div className="h-full select-none">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,.png,.jpg,.jpeg,.webp"
          className="hidden"
        />
        <EmptyState
          title="No certificates saved"
          description="Save certificates (PDF or images) to quickly access and view them during your job applications."
          icon={Award}
          actionText="Upload Certificate"
          onAction={triggerUpload}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden font-sans select-none">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,.png,.jpg,.jpeg,.webp"
        className="hidden"
      />

      {/* Toolbar header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/40 shrink-0">
        <span className="text-xs font-semibold text-text-secondary select-none">
          Saved Certificates ({certificates.length})
        </span>
        <Button
          variant="secondary"
          size="sm"
          onClick={triggerUpload}
          isLoading={isUploading}
          className="flex items-center gap-1 py-1 px-2.5 text-xs font-medium"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Upload Certificate</span>
        </Button>
      </div>

      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto px-4 py-3.5 flex flex-col gap-3 min-h-0">
        {certificates.map((cert) => (
          <CertificateCard
            key={cert.id}
            certificate={cert}
            onDelete={onDelete}
            onReplace={onReplace}
          />
        ))}
      </div>
    </div>
  );
};
