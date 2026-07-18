import { db } from '@/database/db';
import { Certificate, CreateCertificateInput, CertificateMetadata } from '../types';

export const certificateStore = {
  getAll: async (): Promise<Certificate[]> => {
    return db.certificates.toArray();
  },

  getById: async (id: string): Promise<Certificate | undefined> => {
    return db.certificates.get(id);
  },

  add: async (input: CreateCertificateInput): Promise<string> => {
    const now = Date.now();
    const id = Math.random().toString(36).substring(2, 9);
    
    const newCertificate: Certificate = {
      id,
      fileName: input.fileName.trim(),
      file: input.file,
      mimeType: input.mimeType,
      uploadedAt: now,
      updatedAt: now
    };

    await db.certificates.add(newCertificate);
    return id;
  },

  replace: async (id: string, input: CreateCertificateInput): Promise<void> => {
    const now = Date.now();
    
    const oldCertificate = await db.certificates.get(id);
    if (!oldCertificate) {
      throw new Error(`Certificate not found: ${id}`);
    }

    await db.certificates.update(id, {
      fileName: input.fileName.trim(),
      file: input.file,
      mimeType: input.mimeType,
      updatedAt: now
    });
  },

  updateMetadata: async (id: string, metadata?: CertificateMetadata): Promise<void> => {
    const now = Date.now();
    await db.certificates.update(id, {
      metadata,
      updatedAt: now
    });
  },

  delete: async (id: string): Promise<void> => {
    await db.certificates.delete(id);
  }
};
