import { LinkRecord } from '@/types/database';

export type Link = LinkRecord;

export interface CreateLinkInput {
  id: string; // The unique label/title of the link (e.g., "LinkedIn", "GitHub", "Portfolio")
  url: string;
}

export interface UpdateLinkInput {
  id: string; // The new or existing label/title
  url: string;
}
