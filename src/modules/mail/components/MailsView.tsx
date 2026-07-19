import React, { useState } from 'react';
import { MailsList } from './MailsList';
import { MailFormModal } from './MailFormModal';
import { ConfirmDialog } from '@/shared/components/ConfirmDialog';
import { useMails } from '../hooks/useMails';
import { Mail } from '../types';
import { useToast } from '@/shared/hooks/useToast';

export const MailsView: React.FC = () => {
  const { addMail, updateMail, deleteMail } = useMails();
  const toast = useToast();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false);
  const [selectedMail, setSelectedMail] = useState<Mail | undefined>(undefined);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isActionLoading, setIsActionLoading] = useState(false);

  const handleAddClick = () => {
    setSelectedMail(undefined);
    setIsFormOpen(true);
  };

  const handleEditClick = (mail: Mail) => {
    setSelectedMail(mail);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (mail: Mail) => {
    setSelectedMail(mail);
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

  const handleFormSubmit = async (input: { id: string; email: string }) => {
    if (selectedMail) {
      await updateMail(selectedMail.id, input);
      toast.success('Email updated.');
    } else {
      await addMail(input);
      toast.success('Email added.');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedMail) return;
    try {
      setIsActionLoading(true);
      await deleteMail(selectedMail.id);
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(selectedMail.id);
        return next;
      });
      setIsDeleteOpen(false);
      toast.success('Email deleted.');
    } catch {
      toast.error('Failed to delete.');
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleBulkDeleteConfirm = async () => {
    try {
      setIsActionLoading(true);
      const idsArray = Array.from(selectedIds);
      for (const id of idsArray) {
        await deleteMail(id);
      }
      setSelectedIds(new Set());
      setIsBulkDeleteOpen(false);
      toast.success('Selected emails deleted.');
    } catch {
      toast.error('Failed to delete selected emails.');
    } finally {
      setIsActionLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col min-h-0">
      <MailsList
        onAdd={handleAddClick}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
        selectedIds={selectedIds}
        onSelectToggle={handleSelectToggle}
        onDeleteSelected={() => setIsBulkDeleteOpen(true)}
      />

      <MailFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        mail={selectedMail}
      />

      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Email"
        description={`Are you sure you want to delete "${selectedMail?.id}"? This action cannot be undone.`}
        confirmText="Delete"
        isDestructive
        isLoading={isActionLoading}
      />

      <ConfirmDialog
        isOpen={isBulkDeleteOpen}
        onClose={() => setIsBulkDeleteOpen(false)}
        onConfirm={handleBulkDeleteConfirm}
        title="Delete Selected Emails"
        description={`Are you sure you want to delete the ${selectedIds.size} selected emails? This action cannot be undone.`}
        confirmText="Delete Selected"
        isDestructive
        isLoading={isActionLoading}
      />
    </div>
  );
};
