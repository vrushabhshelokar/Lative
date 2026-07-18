import { CertificateRecord, CertificateMetadata } from '@/types/database';

export type Certificate = CertificateRecord;
export type { CertificateMetadata };

export interface CreateCertificateInput {
  fileName: string;
  file: Blob;
  mimeType: string;
}
