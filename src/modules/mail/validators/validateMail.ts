import { Mail } from '../types';

export interface MailValidationInput {
  id: string; // The unique label/name of the email address (e.g., "Primary", "Work")
  email: string;
}

export interface MailValidationError {
  id?: string;
  email?: string;
}

// RFC 5322 compliant simplified email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

/**
 * Validates email labels and format values.
 * Trims spaces, verifies email RFC syntax, and validates duplicates.
 */
export const validateMailInput = (
  input: MailValidationInput,
  existingMails: Mail[],
  isEditing = false,
  originalId?: string
): { isValid: boolean; errors: MailValidationError } => {
  const errors: MailValidationError = {};
  const trimmedId = input.id.trim();
  const trimmedEmail = input.email.trim();

  // 1. Validate label/name (ID)
  if (!trimmedId) {
    errors.id = 'Label is required.';
  } else if (trimmedId.length > 50) {
    errors.id = 'Label must be 50 characters or less.';
  } else {
    const labelExists = existingMails.some(
      (mail) =>
        mail.id.toLowerCase() === trimmedId.toLowerCase() &&
        (!isEditing || mail.id !== originalId)
    );
    if (labelExists) {
      errors.id = 'An email with this label already exists.';
    }
  }

  // 2. Validate email address format and duplicates
  if (!trimmedEmail) {
    errors.email = 'Email address is required.';
  } else if (!EMAIL_REGEX.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address.';
  } else {
    const emailExists = existingMails.some(
      (mail) =>
        mail.email.toLowerCase() === trimmedEmail.toLowerCase() &&
        (!isEditing || mail.id !== originalId)
    );
    if (emailExists) {
      errors.email = 'This email address has already been saved.';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
