import { db } from '@/database/db';
import { Link, CreateLinkInput, UpdateLinkInput } from '../types';

export const linkStore = {
  getAll: async (): Promise<Link[]> => {
    return db.links.toArray();
  },

  getById: async (id: string): Promise<Link | undefined> => {
    return db.links.get(id);
  },

  add: async (input: CreateLinkInput): Promise<string> => {
    const now = Date.now();
    const newLink: Link = {
      id: input.id.trim(),
      url: input.url.trim(),
      createdAt: now,
      updatedAt: now
    };
    return db.links.add(newLink);
  },

  update: async (oldId: string, input: UpdateLinkInput): Promise<void> => {
    const now = Date.now();
    const trimmedOldId = oldId.trim();
    const trimmedNewId = input.id.trim();
    const trimmedUrl = input.url.trim();

    if (trimmedOldId === trimmedNewId) {
      await db.links.update(trimmedOldId, {
        url: trimmedUrl,
        updatedAt: now
      });
    } else {
      await db.transaction('rw', db.links, async () => {
        const oldRecord = await db.links.get(trimmedOldId);
        if (!oldRecord) {
          throw new Error(`Link not found: ${trimmedOldId}`);
        }
        await db.links.delete(trimmedOldId);
        await db.links.add({
          id: trimmedNewId,
          url: trimmedUrl,
          createdAt: oldRecord.createdAt,
          updatedAt: now
        });
      });
    }
  },

  delete: async (id: string): Promise<void> => {
    await db.links.delete(id);
  }
};
