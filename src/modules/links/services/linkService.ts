import { linkStore } from '../storage/linkStore';
import { validateLinkInput, LinkValidationError } from '../validators/validateLink';
import { CreateLinkInput, UpdateLinkInput, Link } from '../types';

export class LinkServiceError extends Error {
  errors: LinkValidationError;
  constructor(message: string, errors: LinkValidationError) {
    super(message);
    this.name = 'LinkServiceError';
    this.errors = errors;
  }
}

export const linkService = {
  getLinks: async (): Promise<Link[]> => {
    return linkStore.getAll();
  },

  addLink: async (input: CreateLinkInput): Promise<string> => {
    const existing = await linkStore.getAll();
    const validation = validateLinkInput(input, existing);
    if (!validation.isValid) {
      throw new LinkServiceError('Validation failed', validation.errors);
    }
    return linkStore.add(input);
  },

  updateLink: async (oldId: string, input: UpdateLinkInput): Promise<void> => {
    const existing = await linkStore.getAll();
    const validation = validateLinkInput(input, existing, true, oldId);
    if (!validation.isValid) {
      throw new LinkServiceError('Validation failed', validation.errors);
    }
    await linkStore.update(oldId, input);
  },

  deleteLink: async (id: string): Promise<void> => {
    await linkStore.delete(id);
  }
};
