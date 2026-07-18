import { getPdfJs } from '@/lib/pdf';
import { Resume } from '../types';
import { MAX_RESUME_SIZE, ALLOWED_RESUME_TYPES } from '../constants';

export interface ResumeValidationError {
  file?: string;
}

/**
 * Validates uploaded resume documents.
 * Verifies file presence, size limits (10MB), PDF file types, duplicate filenames,
 * and checks the binary header for valid `%PDF` signature magic bytes.
 * Additionally performs dry-run document loading using pdf.js to detect corruption,
 * empty documents, or password locks at validation time.
 */
export const validateResumeFile = async (
  file: File,
  existingResumes: Resume[]
): Promise<{ isValid: boolean; errors: ResumeValidationError }> => {
  const errors: ResumeValidationError = {};

  if (!file) {
    errors.file = 'Please select a file to upload.';
    return { isValid: false, errors };
  }

  // 1. File size check
  if (file.size > MAX_RESUME_SIZE) {
    errors.file = 'File size exceeds the 10MB limit.';
    return { isValid: false, errors };
  }

  // 2. MIME type & extension checks
  const isAllowedType = ALLOWED_RESUME_TYPES.includes(file.type);
  const hasPdfExtension = /\.pdf$/i.test(file.name);
  if (!isAllowedType && !hasPdfExtension) {
    errors.file = 'Only PDF documents are allowed.';
    return { isValid: false, errors };
  }

  // 3. Duplicate name detection
  const nameExists = existingResumes.some(
    (resume) => resume.fileName.toLowerCase() === file.name.toLowerCase()
  );
  if (nameExists) {
    errors.file = 'A resume with this file name has already been uploaded.';
    return { isValid: false, errors };
  }

  // 4. Binary header signature magic check (%PDF)
  let arrayBuffer: ArrayBuffer;
  try {
    arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer.slice(0, 4));
    
    // Header `%PDF` resolves to [37, 80, 68, 70] (0x25, 0x50, 0x44, 0x46)
    const isPdfHeader =
      bytes[0] === 37 &&
      bytes[1] === 80 &&
      bytes[2] === 68 &&
      bytes[3] === 70;

    if (!isPdfHeader) {
      errors.file = 'Invalid file header signature. Please select a valid PDF file.';
      return { isValid: false, errors };
    }
  } catch {
    errors.file = 'Failed to verify file integrity.';
    return { isValid: false, errors };
  }

  // 5. PDF Readability and password-protection checking
  try {
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

  return {
    isValid: true,
    errors
  };
};
