import React from 'react';
import { Plus, ShoppingCart } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { CartCard } from './CartCard';
import { CartItem } from '../types';
import { Button } from '@/shared/components/Button';
import { Skeleton } from '@/shared/components/Skeleton';
import { EmptyState } from '@/shared/components/EmptyState';

export interface CartListProps {
  onAdd: () => void;
  onEdit: (item: CartItem) => void;
  onDelete: (id: string) => void;
}

export const CartList: React.FC<CartListProps> = ({ onAdd, onEdit, onDelete }) => {
  const { cartItems, isLoading } = useCart();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3.5 p-4 font-sans select-none">
        <div className="flex justify-between items-center mb-1">
          <Skeleton variant="text" width={100} height={14} className="mb-0" />
          <Skeleton variant="rect" width={82} height={28} />
        </div>
        <Skeleton variant="rect" height={60} />
        <Skeleton variant="rect" height={60} />
        <Skeleton variant="rect" height={60} />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <EmptyState
        title="No items in Cart"
        description="Save job postings or application links to your Cart. They will be easily accessible for copy/fill actions during your job search."
        icon={ShoppingCart}
        actionText="Add Item"
        onAction={onAdd}
      />
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden font-sans select-none">
      {/* Toolbar header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/40 shrink-0">
        <span className="text-xs font-semibold text-text-secondary select-none">
          Cart Items ({cartItems.length})
        </span>
        <Button
          variant="secondary"
          size="sm"
          onClick={onAdd}
          className="flex items-center gap-1 py-1 px-2.5 text-xs font-medium"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Item</span>
        </Button>
      </div>

      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto px-4 py-3.5 flex flex-col gap-3 min-h-0">
        {cartItems.map((item) => (
          <CartCard
            key={item.id}
            cartItem={item}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};
