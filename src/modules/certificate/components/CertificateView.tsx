import React, { useState } from 'react';
import { CertificateList } from './CertificateList';
import { ConfirmDialog } from '@/shared/components/ConfirmDialog';
import { useCertificate } from '../hooks/useCertificate';
import { useToast } from '@/shared/hooks/useToast';
import { CertificateMetadata } from '../types';

export const CertificateView: React.FC = () => {
  const { deleteCertificate, replaceCertificate, uploadCertificate, updateCertificateMetadata } = useCertificate();
  const toast = useToast();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedCertificateId, setSelectedCertificateId] = useState<string | null>(null);
  const [isActionLoading, setIsActionLoading] = useState(false);

  const handleDeleteClick = (id: string) => {
    setSelectedCertificateId(id);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedCertificateId) return;
    try {
      setIsActionLoading(true);
      await deleteCertificate(selectedCertificateId);
      setIsDeleteOpen(false);
      toast.success('Certificate deleted.');
    } catch {
      toast.error('Failed to delete certificate.');
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleReplace = async (id: string, file: File) => {
    await replaceCertificate(id, file);
  };

  const handleUpload = async (file: File) => {
    await uploadCertificate(file);
  };

  const handleUpdateMetadata = async (id: string, metadata?: CertificateMetadata) => {
    await updateCertificateMetadata(id, metadata);
  };

  return (
    <div className="h-full flex flex-col min-h-0">
      <CertificateList
        onDelete={handleDeleteClick}
        onReplace={handleReplace}
        onUpload={handleUpload}
        onUpdateMetadata={handleUpdateMetadata}
      />

      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Certificate"
        description="Are you sure you want to delete this certificate? This action cannot be undone."
        confirmText="Delete"
        isDestructive
        isLoading={isActionLoading}
      />
    </div>
  );
};

export default CertificateView;
