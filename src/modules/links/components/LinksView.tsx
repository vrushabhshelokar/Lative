import React, { useState } from 'react';
import { LinksList } from './LinksList';
import { LinkFormModal } from './LinkFormModal';
import { ConfirmDialog } from '@/shared/components/ConfirmDialog';
import { useLinks } from '../hooks/useLinks';
import { Link } from '../types';
import { useToast } from '@/shared/hooks/useToast';

export const LinksView: React.FC = () => {
  const { addLink, updateLink, deleteLink } = useLinks();
  const toast = useToast();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState<Link | undefined>(undefined);
  const [isActionLoading, setIsActionLoading] = useState(false);

  const handleAddClick = () => {
    setSelectedLink(undefined);
    setIsFormOpen(true);
  };

  const handleEditClick = (link: Link) => {
    setSelectedLink(link);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (link: Link) => {
    setSelectedLink(link);
    setIsDeleteOpen(true);
  };

  const handleFormSubmit = async (input: { id: string; url: string }) => {
    if (selectedLink) {
      await updateLink(selectedLink.id, input);
      toast.success('Link updated.');
    } else {
      await addLink(input);
      toast.success('Link added.');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedLink) return;
    try {
      setIsActionLoading(true);
      await deleteLink(selectedLink.id);
      setIsDeleteOpen(false);
      toast.success('Link deleted.');
    } catch {
      toast.error('Failed to delete.');
    } finally {
      setIsActionLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col min-h-0">
      <LinksList
        onAdd={handleAddClick}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      <LinkFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        link={selectedLink}
      />

      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Link"
        description={`Are you sure you want to delete "${selectedLink?.id}"? This action cannot be undone.`}
        confirmText="Delete"
        isDestructive
        isLoading={isActionLoading}
      />
    </div>
  );
};
