import { certificateStore } from '../storage/certificateStore';
import { validateCertificateFile } from '../validators/validateCertificate';
import { Certificate, CertificateMetadata } from '../types';

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

  updateMetadata: async (id: string, metadata?: CertificateMetadata): Promise<void> => {
    if (metadata) {
      if (!metadata.title || !metadata.title.trim()) {
        throw new CertificateServiceError('Certificate Title is required.');
      }
      if (metadata.verificationUrl && metadata.verificationUrl.trim()) {
        const url = metadata.verificationUrl.trim();
        if (!/^https?:\/\//i.test(url)) {
          throw new CertificateServiceError('Verification URL must start with http:// or https://');
        }
      }

      // Validate dates: Expiry Date must not be earlier than Issue Date
      if (metadata.issueDate && metadata.issueDate.trim() && metadata.expiryDate && metadata.expiryDate.trim()) {
        const issue = metadata.issueDate.trim();
        const expiry = metadata.expiryDate.trim();

        const issueVal = Date.parse(issue) || parseInt(issue, 10);
        const expiryVal = Date.parse(expiry) || parseInt(expiry, 10);

        if (!isNaN(issueVal) && !isNaN(expiryVal)) {
          if (expiryVal < issueVal) {
            throw new CertificateServiceError('Expiry Date cannot be earlier than Issue Date.');
          }
        }
      }
    }
    await certificateStore.updateMetadata(id, metadata);
  },

  deleteCertificate: async (id: string): Promise<void> => {
    await certificateStore.delete(id);
  }
};
export default certificateService;
