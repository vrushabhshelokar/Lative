import { getPdfJs } from '@/lib/pdf';
import { Certificate } from '../types';
import { MAX_CERTIFICATE_SIZE, ALLOWED_CERTIFICATE_TYPES } from '../constants';

export interface CertificateValidationError {
  file?: string;
}

/**
 * Validates uploaded certificate documents.
 * Verifies file presence, size limits (15MB), allowed formats (PDF, PNG, JPG, JPEG, WEBP),
 * duplicate detection (same filename AND same size), and checks image/PDF file integrity.
 */
export const validateCertificateFile = async (
  file: File,
  existingCertificates: Certificate[]
): Promise<{ isValid: boolean; errors: CertificateValidationError }> => {
  const errors: CertificateValidationError = {};

  if (!file) {
    errors.file = 'Please select a file to upload.';
    return { isValid: false, errors };
  }

  // 1. File size check
  if (file.size > MAX_CERTIFICATE_SIZE) {
    errors.file = 'File size exceeds the 15MB limit.';
    return { isValid: false, errors };
  }

  // 2. MIME type & extension checks
  const isAllowedType = ALLOWED_CERTIFICATE_TYPES.includes(file.type);
  const hasAllowedExtension = /\.(pdf|png|jpe?g|webp)$/i.test(file.name);
  if (!isAllowedType && !hasAllowedExtension) {
    errors.file = 'Only PDF, PNG, JPG, JPEG, and WEBP files are allowed.';
    return { isValid: false, errors };
  }

  // 3. Duplicate checks (Same filename AND same size)
  const isDuplicate = existingCertificates.some(
    (cert) =>
      cert.fileName.toLowerCase() === file.name.toLowerCase() &&
      cert.file.size === file.size
  );
  if (isDuplicate) {
    errors.file = 'This certificate has already been uploaded.';
    return { isValid: false, errors };
  }

  // 4. File integrity & corruption check
  const isPdf = file.type === 'application/pdf' || /\.pdf$/i.test(file.name);
  if (isPdf) {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfjs = await getPdfJs();
      const loadingTask = pdfjs.getDocument({
        data: new Uint8Array(arrayBuffer),
        disableRange: true,
        disableStream: true
      });

      loadingTask.onPassword = () => {
        throw new Error('This PDF file is password-protected. Please upload an unprotected file.');
      };

      const pdf = await loadingTask.promise;
      if (pdf.numPages === 0) {
        errors.file = 'The PDF file is empty or contains no readable pages.';
        return { isValid: false, errors };
      }
    } catch (err) {
      const error = err as Error;
      if (error.name === 'PasswordException' || error.message.includes('Password')) {
        errors.file = 'This PDF file is password-protected. Please upload an unprotected file.';
      } else {
        errors.file = 'The PDF file is unreadable or corrupted.';
      }
      return { isValid: false, errors };
    }
  } else {
    try {
      const bitmap = await createImageBitmap(file);
      bitmap.close();
    } catch {
      errors.file = 'The image file is unreadable or corrupted.';
      return { isValid: false, errors };
    }
  }

  return {
    isValid: true,
    errors
  };
};
