import { CartItem } from '../types';

export interface CartValidationInput {
  title: string;
  url: string;
}

export interface CartValidationError {
  title?: string;
  url?: string;
}

/**
 * Validates manual Cart bookmarked job items input.
 * Ensures fields are non-empty, checks for correct HTTP/HTTPS protocols,
 * and audits for duplicate URLs.
 */
export const validateCartInput = (
  input: CartValidationInput,
  existingItems: CartItem[],
  isEditing = false,
  excludeId?: string
): { isValid: boolean; errors: CartValidationError } => {
  const errors: CartValidationError = {};
  const trimmedTitle = input.title.trim();
  const trimmedUrl = input.url.trim();

  // 1. Validate title
  if (!trimmedTitle) {
    errors.title = 'Title is required.';
  } else if (trimmedTitle.length > 100) {
    errors.title = 'Title must be 100 characters or less.';
  }

  // 2. Validate URL
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
        const urlExists = existingItems.some(
          (item) =>
            item.url.toLowerCase() === trimmedUrl.toLowerCase() &&
            (!isEditing || item.id !== excludeId)
        );
        if (urlExists) {
          errors.url = 'This URL has already been saved to the Cart.';
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
