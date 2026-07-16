import { cartStore } from '../storage/cartStore';
import { validateCartInput, CartValidationError } from '../validators/validateCart';
import { CartItem, CreateCartItemInput, UpdateCartItemInput } from '../types';

export class CartServiceError extends Error {
  errors: CartValidationError;
  constructor(message: string, errors: CartValidationError) {
    super(message);
    this.name = 'CartServiceError';
    this.errors = errors;
  }
}

export const cartService = {
  getCartItems: async (): Promise<CartItem[]> => {
    return cartStore.getAll();
  },

  addCartItem: async (input: CreateCartItemInput): Promise<string> => {
    const existing = await cartStore.getAll();
    const validation = validateCartInput(input, existing);
    if (!validation.isValid) {
      throw new CartServiceError('Validation failed.', validation.errors);
    }
    return cartStore.add(input);
  },

  updateCartItem: async (id: string, input: UpdateCartItemInput): Promise<void> => {
    const existing = await cartStore.getAll();
    const validation = validateCartInput(input, existing, true, id);
    if (!validation.isValid) {
      throw new CartServiceError('Validation failed.', validation.errors);
    }
    await cartStore.update(id, input);
  },

  deleteCartItem: async (id: string): Promise<void> => {
    await cartStore.delete(id);
  }
};
