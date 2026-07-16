import React, { useState } from 'react';
import { ResumeList } from './ResumeList';
import { ConfirmDialog } from '@/shared/components/ConfirmDialog';
import { useResume } from '../hooks/useResume';
import { useToast } from '@/shared/hooks/useToast';

export const ResumeView: React.FC = () => {
  const { deleteResume, replaceResume } = useResume();
  const toast = useToast();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);
  const [isActionLoading, setIsActionLoading] = useState(false);

  const handleDeleteClick = (id: string) => {
    setSelectedResumeId(id);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedResumeId) return;
    try {
      setIsActionLoading(true);
      await deleteResume(selectedResumeId);
      setIsDeleteOpen(false);
      toast.success('Resume deleted.');
    } catch {
      toast.error('Failed to delete resume.');
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleReplace = async (id: string, file: File) => {
    await replaceResume(id, file);
  };

  return (
    <div className="h-full flex flex-col min-h-0">
      <ResumeList
        onDelete={handleDeleteClick}
        onReplace={handleReplace}
      />

      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Resume"
        description="Are you sure you want to delete this resume? This will also remove all parsed profile categories."
        confirmText="Delete"
        isDestructive
        isLoading={isActionLoading}
      />
    </div>
  );
};
export default ResumeView;
