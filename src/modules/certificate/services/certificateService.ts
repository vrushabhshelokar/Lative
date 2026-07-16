import { certificateStore } from '../storage/certificateStore';
import { validateCertificateFile } from '../validators/validateCertificate';
import { Certificate } from '../types';

export class CertificateServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CertificateServiceError';
  }
}

export const certificateService = {
  getCertificates: async (): Promise<Certificate[]> => {
    return certificateStore.getAll();
  },

  uploadCertificate: async (file: File): Promise<string> => {
    const existing = await certificateStore.getAll();
    const validation = await validateCertificateFile(file, existing);
    if (!validation.isValid) {
      throw new CertificateServiceError(validation.errors.file || 'Validation failed.');
    }

    let mimeType = file.type;
    if (!mimeType) {
      if (/\.pdf$/i.test(file.name)) mimeType = 'application/pdf';
      else if (/\.png$/i.test(file.name)) mimeType = 'image/png';
      else if (/\.webp$/i.test(file.name)) mimeType = 'image/webp';
      else if (/\.jpe?g$/i.test(file.name)) mimeType = 'image/jpeg';
      else mimeType = 'application/octet-stream';
    }

    return certificateStore.add({
      fileName: file.name,
      file,
      mimeType
    });
  },

  replaceCertificate: async (id: string, file: File): Promise<void> => {
    const existing = await certificateStore.getAll();
    const otherCertificates = existing.filter((c) => c.id !== id);
    const validation = await validateCertificateFile(file, otherCertificates);
    if (!validation.isValid) {
      throw new CertificateServiceError(validation.errors.file || 'Validation failed.');
    }

    let mimeType = file.type;
    if (!mimeType) {
      if (/\.pdf$/i.test(file.name)) mimeType = 'application/pdf';
      else if (/\.png$/i.test(file.name)) mimeType = 'image/png';
      else if (/\.webp$/i.test(file.name)) mimeType = 'image/webp';
      else if (/\.jpe?g$/i.test(file.name)) mimeType = 'image/jpeg';
      else mimeType = 'application/octet-stream';
    }

    await certificateStore.replace(id, {
      fileName: file.name,
      file,
      mimeType
    });
  },

  deleteCertificate: async (id: string): Promise<void> => {
    await certificateStore.delete(id);
  }
};
