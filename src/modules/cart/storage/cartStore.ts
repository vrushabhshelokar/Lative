import { db } from '@/database/db';
import { CartItem, CreateCartItemInput, UpdateCartItemInput } from '../types';

export const cartStore = {
  getAll: async (): Promise<CartItem[]> => {
    // Sort by createdAt descending (newest bookmarks first)
    return db.cart.orderBy('createdAt').reverse().toArray();
  },

  getById: async (id: string): Promise<CartItem | undefined> => {
    return db.cart.get(id);
  },

  getByUrl: async (url: string): Promise<CartItem | undefined> => {
    return db.cart.where('url').equals(url.trim()).first();
  },

  add: async (input: CreateCartItemInput): Promise<string> => {
    const now = Date.now();
    const id = Math.random().toString(36).substring(2, 9);

    const newItem: CartItem = {
      id,
      title: input.title.trim(),
      url: input.url.trim(),
      createdAt: now
    };

    await db.cart.add(newItem);
    return id;
  },

  update: async (id: string, input: UpdateCartItemInput): Promise<void> => {
    await db.cart.update(id, {
      title: input.title.trim(),
      url: input.url.trim()
    });
  },

  delete: async (id: string): Promise<void> => {
    await db.cart.delete(id);
  }
};
