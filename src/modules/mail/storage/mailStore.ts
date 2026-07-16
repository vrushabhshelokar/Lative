import { db } from '@/database/db';
import { Mail, CreateMailInput, UpdateMailInput } from '../types';

export const mailStore = {
  getAll: async (): Promise<Mail[]> => {
    return db.mails.toArray();
  },

  getById: async (id: string): Promise<Mail | undefined> => {
    return db.mails.get(id);
  },

  add: async (input: CreateMailInput): Promise<string> => {
    const now = Date.now();
    const newMail: Mail = {
      id: input.id.trim(),
      email: input.email.trim(),
      createdAt: now,
      updatedAt: now
    };
    return db.mails.add(newMail);
  },

  update: async (oldId: string, input: UpdateMailInput): Promise<void> => {
    const now = Date.now();
    const trimmedOldId = oldId.trim();
    const trimmedNewId = input.id.trim();
    const trimmedEmail = input.email.trim();

    if (trimmedOldId === trimmedNewId) {
      await db.mails.update(trimmedOldId, {
        email: trimmedEmail,
        updatedAt: now
      });
    } else {
      await db.transaction('rw', db.mails, async () => {
        const oldRecord = await db.mails.get(trimmedOldId);
        if (!oldRecord) {
          throw new Error(`Mail record not found: ${trimmedOldId}`);
        }
        await db.mails.delete(trimmedOldId);
        await db.mails.add({
          id: trimmedNewId,
          email: trimmedEmail,
          createdAt: oldRecord.createdAt,
          updatedAt: now
        });
      });
    }
  },

  delete: async (id: string): Promise<void> => {
    await db.mails.delete(id);
  }
};
