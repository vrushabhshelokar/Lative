import React from 'react';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { CartCard } from './CartCard';
import { CartItem } from '../types';
import { AddButton } from '@/shared/components/AddButton';
import { Button } from '@/shared/components/Button';
import { Skeleton } from '@/shared/components/Skeleton';
import { EmptyState } from '@/shared/components/EmptyState';

export interface CartListProps {
  onAdd: () => void;
  onEdit: (item: CartItem) => void;
  onDelete: (id: string) => void;
  selectedIds: Set<string>;
  onSelectToggle: (id: string) => void;
  onDeleteSelected: () => void;
}

export const CartList: React.FC<CartListProps> = ({ 
  onAdd, 
  onEdit, 
  onDelete,
  selectedIds,
  onSelectToggle,
  onDeleteSelected
}) => {
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
        <AddButton
          label="Add Item"
          onClick={onAdd}
        />
      </div>

      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto px-4 py-3.5 flex flex-col gap-3 min-h-0">
        {cartItems.map((item, index) => (
          <div key={item.id} className={`animate-fade-in-up stagger-${Math.min(index + 1, 8)}`}>
            <CartCard
              cartItem={item}
              onEdit={onEdit}
              onDelete={onDelete}
              isSelected={selectedIds.has(item.id)}
              onSelectToggle={() => onSelectToggle(item.id)}
            />
          </div>
        ))}
      </div>

      {/* Bulk Action Bar */}
      {selectedIds.size > 0 && (
        <div className="shrink-0 p-3 border-t border-border/40 dark:border-white/[0.08] bg-background/95 dark:bg-background-secondary/95 backdrop-blur-md flex items-center justify-between gap-3 animate-fade-in-up">
          <span className="text-[11px] font-medium text-text-primary">
            {selectedIds.size} {selectedIds.size === 1 ? 'item' : 'items'} selected
          </span>
          <Button
            variant="danger"
            size="sm"
            onClick={onDeleteSelected}
            leftIcon={<Trash2 className="w-3.5 h-3.5" />}
          >
            Delete Selected
          </Button>
        </div>
      )}
    </div>
  );
};
