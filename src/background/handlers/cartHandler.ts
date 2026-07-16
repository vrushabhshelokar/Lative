import { cartService } from '@/modules/cart/services/cartService';
import { CreateCartItemInput } from '@/modules/cart/types';

export interface MessageResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export const handleCartAddCurrentPage = async (
  payload: unknown
): Promise<MessageResponse<string>> => {
  if (!payload || typeof payload !== 'object') {
    return { success: false, error: 'Invalid message payload.' };
  }

  const { title, url } = payload as { title?: unknown; url?: unknown };

  if (typeof title !== 'string' || typeof url !== 'string') {
    return { success: false, error: 'Title and URL are required and must be strings.' };
  }

  try {
    const input: CreateCartItemInput = {
      title: title.trim(),
      url: url.trim()
    };
    const id = await cartService.addCartItem(input);
    return { success: true, data: id };
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : 'Failed to add item to Cart.';
    return { success: false, error: errMsg };
  }
};

export const handleCartDelete = async (
  payload: unknown
): Promise<MessageResponse<void>> => {
  if (!payload || typeof payload !== 'object') {
    return { success: false, error: 'Invalid message payload.' };
  }

  const { id } = payload as { id?: unknown };

  if (typeof id !== 'string') {
    return { success: false, error: 'ID is required and must be a string.' };
  }

  try {
    await cartService.deleteCartItem(id);
    return { success: true };
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : 'Failed to delete item from Cart.';
    return { success: false, error: errMsg };
  }
};
