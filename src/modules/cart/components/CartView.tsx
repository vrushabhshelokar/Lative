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
  const [selectedItem, setSelectedItem] = useState<CartItem | undefined>(undefined);
  const [selectedId, setSelectedId] = useState<string | null>(null);
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
      setIsDeleteOpen(false);
      toast.success('Cart item deleted.');
    } catch {
      toast.error('Failed to delete cart item.');
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
    </div>
  );
};

export default CartView;
