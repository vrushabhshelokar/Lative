import { Link } from '../types';

export interface LinkValidationInput {
  id: string;
  url: string;
}

export interface LinkValidationError {
  id?: string;
  url?: string;
}

/**
 * Validates link label and URL inputs.
 * Ensures fields are non-empty, checks valid HTTP/HTTPS protocol schemes,
 * detects spaces in URLs, and checks for duplicates against saved records.
 */
export const validateLinkInput = (
  input: LinkValidationInput,
  existingLinks: Link[],
  isEditing = false,
  originalId?: string
): { isValid: boolean; errors: LinkValidationError } => {
  const errors: LinkValidationError = {};
  const trimmedId = input.id.trim();
  const trimmedUrl = input.url.trim();

  // 1. Validate label/name (ID)
  if (!trimmedId) {
    errors.id = 'Label is required.';
  } else if (trimmedId.length > 50) {
    errors.id = 'Label must be 50 characters or less.';
  } else {
    const labelExists = existingLinks.some(
      (link) => 
        link.id.toLowerCase() === trimmedId.toLowerCase() && 
        (!isEditing || link.id !== originalId)
    );
    if (labelExists) {
      errors.id = 'A link with this label already exists.';
    }
  }

  // 2. Validate URL value
  if (!trimmedUrl) {
    errors.url = 'URL is required.';
  } else if (/\s/.test(trimmedUrl)) {
    errors.url = 'URL cannot contain spaces.';
  } else {
    // Protocol scheme validation (must start with http:// or https://)
    const hasValidProtocol = /^https?:\/\//i.test(trimmedUrl);
    if (!hasValidProtocol) {
      errors.url = 'URL must start with http:// or https://';
    } else {
      try {
        new URL(trimmedUrl);
        const urlExists = existingLinks.some(
          (link) => 
            link.url.toLowerCase() === trimmedUrl.toLowerCase() && 
            (!isEditing || link.id !== originalId)
        );
        if (urlExists) {
          errors.url = 'This URL has already been saved.';
        }
      } catch {
        errors.url = 'Please enter a valid URL.';
      }
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
