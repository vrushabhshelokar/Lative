import { CertificateRecord } from '@/types/database';

export type Certificate = CertificateRecord;

export interface CreateCertificateInput {
  fileName: string;
  file: Blob;
  mimeType: string;
}
