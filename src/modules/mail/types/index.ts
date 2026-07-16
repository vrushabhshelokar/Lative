import { MailRecord } from '@/types/database';

export type Mail = MailRecord;

export interface CreateMailInput {
  id: string; // The unique label/name of the email address (e.g., "Primary", "Academic")
  email: string;
}

export interface UpdateMailInput {
  id: string; // The new or existing label/name
  email: string;
}
