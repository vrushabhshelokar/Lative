import React, { useState } from 'react';
import { ResumeList } from './ResumeList';
import { ConfirmDialog } from '@/shared/components/ConfirmDialog';
import { useResume } from '../hooks/useResume';
import { useToast } from '@/shared/hooks/useToast';

export const ResumeView: React.FC = () => {
  const { deleteResume, replaceResume, updateResumeTitle } = useResume();
  const toast = useToast();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false);
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isActionLoading, setIsActionLoading] = useState(false);

  const handleDeleteClick = (id: string) => {
    setSelectedResumeId(id);
    setIsDeleteOpen(true);
  };

  const handleSelectToggle = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleDeleteConfirm = async () => {
    if (!selectedResumeId) return;
    try {
      setIsActionLoading(true);
      await deleteResume(selectedResumeId);
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(selectedResumeId);
        return next;
      });
      setIsDeleteOpen(false);
      toast.success('Resume deleted.');
    } catch {
      toast.error('Failed to delete resume.');
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleBulkDeleteConfirm = async () => {
    try {
      setIsActionLoading(true);
      const idsArray = Array.from(selectedIds);
      for (const id of idsArray) {
        await deleteResume(id);
      }
      setSelectedIds(new Set());
      setIsBulkDeleteOpen(false);
      toast.success('Selected resumes deleted.');
    } catch {
      toast.error('Failed to delete selected resumes.');
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleReplace = async (id: string, file: File) => {
    await replaceResume(id, file);
  };

  const handleUpdateTitle = async (id: string, title?: string) => {
    await updateResumeTitle(id, title);
  };

  return (
    <div className="h-full flex flex-col min-h-0">
      <ResumeList
        onDelete={handleDeleteClick}
        onReplace={handleReplace}
        onUpdateTitle={handleUpdateTitle}
        selectedIds={selectedIds}
        onSelectToggle={handleSelectToggle}
        onDeleteSelected={() => setIsBulkDeleteOpen(true)}
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

      <ConfirmDialog
        isOpen={isBulkDeleteOpen}
        onClose={() => setIsBulkDeleteOpen(false)}
        onConfirm={handleBulkDeleteConfirm}
        title="Delete Selected Resumes"
        description={`Are you sure you want to delete the ${selectedIds.size} selected resumes? This action cannot be undone.`}
        confirmText="Delete Selected"
        isDestructive
        isLoading={isActionLoading}
      />
    </div>
  );
};
export default ResumeView;
