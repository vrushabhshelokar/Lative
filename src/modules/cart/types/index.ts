import { CartRecord } from '@/types/database';

export type CartItem = CartRecord;

export interface CreateCartItemInput {
  title: string;
  url: string;
}

export interface UpdateCartItemInput {
  title: string;
  url: string;
}
