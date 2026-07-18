import { LinkRecord, MailRecord, CartRecord, CertificateMetadata, ParsedResumeRecord } from '@/types/database';

export interface SerializedFile {
  fileName: string;
  fileSize: number;
  mimeType: string;
  fileBase64: string; // Blobs are converted to base64 for JSON serialization
}

export interface SerializedResume {
  id: string;
  fileName: string;
  file: SerializedFile;
  uploadedAt: number;
  updatedAt: number;
  title?: string;
}

export interface SerializedCertificate {
  id: string;
  fileName: string;
  file: SerializedFile;
  mimeType: string;
  uploadedAt: number;
  updatedAt: number;
  metadata?: CertificateMetadata;
}

export interface BackupData {
  metadata: {
    version: string;
    exportedAt: number;
    app: string;
  };
  database: {
    resumes: SerializedResume[];
    parsedResumes: ParsedResumeRecord[];
    certificates: SerializedCertificate[];
    links: LinkRecord[];
    mails: MailRecord[];
    carts: CartRecord[];
  };
  settings: {
    theme?: 'light' | 'dark' | 'system';
    floatingButtonEnabled?: boolean;
  };
}
