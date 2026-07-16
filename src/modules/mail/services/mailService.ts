import { mailStore } from '../storage/mailStore';
import { validateMailInput, MailValidationError } from '../validators/validateMail';
import { CreateMailInput, UpdateMailInput, Mail } from '../types';

export class MailServiceError extends Error {
  errors: MailValidationError;
  constructor(message: string, errors: MailValidationError) {
    super(message);
    this.name = 'MailServiceError';
    this.errors = errors;
  }
}

export const mailService = {
  getMails: async (): Promise<Mail[]> => {
    return mailStore.getAll();
  },

  addMail: async (input: CreateMailInput): Promise<string> => {
    const existing = await mailStore.getAll();
    const validation = validateMailInput(input, existing);
    if (!validation.isValid) {
      throw new MailServiceError('Validation failed', validation.errors);
    }
    return mailStore.add(input);
  },

  updateMail: async (oldId: string, input: UpdateMailInput): Promise<void> => {
    const existing = await mailStore.getAll();
    const validation = validateMailInput(input, existing, true, oldId);
    if (!validation.isValid) {
      throw new MailServiceError('Validation failed', validation.errors);
    }
    await mailStore.update(oldId, input);
  },

  deleteMail: async (id: string): Promise<void> => {
    await mailStore.delete(id);
  }
};
