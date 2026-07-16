import { useLiveQuery } from 'dexie-react-hooks';
import { useState } from 'react';
import { cartService } from '../services/cartService';
import { cartStore } from '../storage/cartStore';
import { CartItem, CreateCartItemInput, UpdateCartItemInput } from '../types';

export interface UseCartResult {
  cartItems: CartItem[];
  isLoading: boolean;
  error: Error | null;
  addCartItem: (input: CreateCartItemInput) => Promise<void>;
  updateCartItem: (id: string, input: UpdateCartItemInput) => Promise<void>;
  deleteCartItem: (id: string) => Promise<void>;
  clearError: () => void;
}

export const useCart = (): UseCartResult => {
  const [error, setError] = useState<Error | null>(null);

  // useLiveQuery reactively subscribes to Dexie database changes
  const cartItems = useLiveQuery(
    async () => {
      return cartStore.getAll();
    },
    [],
    [] as CartItem[]
  );

  const isLoading = cartItems === undefined;

  const addCartItem = async (input: CreateCartItemInput) => {
    try {
      setError(null);
      await cartService.addCartItem(input);
    } catch (err) {
      const errorObj = err as Error;
      setError(errorObj);
      throw errorObj;
    }
  };

  const updateCartItem = async (id: string, input: UpdateCartItemInput) => {
    try {
      setError(null);
      await cartService.updateCartItem(id, input);
    } catch (err) {
      const errorObj = err as Error;
      setError(errorObj);
      throw errorObj;
    }
  };

  const deleteCartItem = async (id: string) => {
    try {
      setError(null);
      await cartService.deleteCartItem(id);
    } catch (err) {
      const errorObj = err as Error;
      setError(errorObj);
      throw errorObj;
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    cartItems: cartItems || [],
    isLoading,
    error,
    addCartItem,
    updateCartItem,
    deleteCartItem,
    clearError
  };
};
