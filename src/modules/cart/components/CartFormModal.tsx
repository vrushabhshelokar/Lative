import React, { useState, useEffect } from 'react';
import { Modal } from '@/shared/components/Modal';
import { Input } from '@/shared/components/Input';
import { Button } from '@/shared/components/Button';
import { CartItem, CreateCartItemInput } from '../types';
import { validateCartInput, CartValidationError } from '../validators/validateCart';
import { useCart } from '../hooks/useCart';
import { CartServiceError } from '../services/cartService';

export interface CartFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (input: CreateCartItemInput) => Promise<void>;
  cartItem?: CartItem;
}

export const CartFormModal: React.FC<CartFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  cartItem
}) => {
  const { cartItems } = useCart();
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [errors, setErrors] = useState<CartValidationError>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (cartItem) {
        setTitle(cartItem.title);
        setUrl(cartItem.url);
      } else {
        setTitle('');
        setUrl('');
      }
      setErrors({});
      setIsLoading(false);
    }
  }, [isOpen, cartItem]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const validation = validateCartInput(
      { title, url },
      cartItems,
      !!cartItem,
      cartItem?.id
    );

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    try {
      setIsLoading(true);
      await onSubmit({ title, url });
      onClose();
    } catch (err) {
      if (err instanceof CartServiceError) {
        setErrors(err.errors);
      } else {
        const message = err instanceof Error ? err.message : 'An unexpected error occurred.';
        setErrors({ url: message });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isEdit = !!cartItem;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Cart Item' : 'Add Cart Item'}
      showCloseButton={!isLoading}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-sans select-none">
        <div className="flex flex-col gap-3">
          <Input
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Software Engineer at Google, Microsoft Careers"
            error={errors.title}
            disabled={isLoading}
            autoFocus
          />

          <Input
            label="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/jobs"
            error={errors.url}
            disabled={isLoading}
          />
        </div>

        <div className="flex items-center justify-end gap-2 mt-2 pt-2 border-t border-border/40">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            isLoading={isLoading}
          >
            {isEdit ? 'Save Changes' : 'Add Item'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
