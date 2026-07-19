import React, { useState } from 'react';
import { CartList } from './CartList';
import { CartFormModal } from './CartFormModal';
import { ConfirmDialog } from '@/shared/components/ConfirmDialog';
import { useCart } from '../hooks/useCart';
import { CartItem } from '../types';
import { useToast } from '@/shared/hooks/useToast';

export const CartView: React.FC = () => {
  const { addCartItem, updateCartItem, deleteCartItem } = useCart();
  const toast = useToast();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CartItem | undefined>(undefined);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isActionLoading, setIsActionLoading] = useState(false);

  const handleAddClick = () => {
    setSelectedItem(undefined);
    setIsFormOpen(true);
  };

  const handleEditClick = (item: CartItem) => {
    setSelectedItem(item);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
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

  const handleFormSubmit = async (input: { title: string; url: string }) => {
    if (selectedItem) {
      await updateCartItem(selectedItem.id, input);
      toast.success('Cart item updated.');
    } else {
      await addCartItem(input);
      toast.success('Cart item added.');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedId) return;
    try {
      setIsActionLoading(true);
      await deleteCartItem(selectedId);
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(selectedId);
        return next;
      });
      setIsDeleteOpen(false);
      toast.success('Cart item deleted.');
    } catch {
      toast.error('Failed to delete cart item.');
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleBulkDeleteConfirm = async () => {
    try {
      setIsActionLoading(true);
      const idsArray = Array.from(selectedIds);
      for (const id of idsArray) {
        await deleteCartItem(id);
      }
      setSelectedIds(new Set());
      setIsBulkDeleteOpen(false);
      toast.success('Selected cart items deleted.');
    } catch {
      toast.error('Failed to delete selected cart items.');
    } finally {
      setIsActionLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col min-h-0">
      <CartList
        onAdd={handleAddClick}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
        selectedIds={selectedIds}
        onSelectToggle={handleSelectToggle}
        onDeleteSelected={() => setIsBulkDeleteOpen(true)}
      />

      <CartFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        cartItem={selectedItem}
      />

      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Cart Item"
        description="Are you sure you want to delete this cart item? This action cannot be undone."
        confirmText="Delete"
        isDestructive
        isLoading={isActionLoading}
      />

      <ConfirmDialog
        isOpen={isBulkDeleteOpen}
        onClose={() => setIsBulkDeleteOpen(false)}
        onConfirm={handleBulkDeleteConfirm}
        title="Delete Selected Cart Items"
        description={`Are you sure you want to delete the ${selectedIds.size} selected cart items? This action cannot be undone.`}
        confirmText="Delete Selected"
        isDestructive
        isLoading={isActionLoading}
      />
    </div>
  );
};

export default CartView;
