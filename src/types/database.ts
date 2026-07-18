export interface ResumeRecord {
  id: string;
  fileName: string;
  file: Blob;
  fileSize: number;
  uploadedAt: number;
  updatedAt: number;
  title?: string;
}

export interface ParsedResumeRecord {
  resumeId: string;
  fullText: string;
  skills: string[];
  projects: string[];
  education: string[];
  experience: string[];
  achievements: string[];
  createdAt: number;
}

export interface CertificateMetadata {
  title: string;
  organization?: string;
  issueDate?: string;
  expiryDate?: string;
  credentialId?: string;
  verificationUrl?: string;
}

export interface CertificateRecord {
  id: string;
  fileName: string;
  file: Blob;
  mimeType: string;
  uploadedAt: number;
  updatedAt: number;
  metadata?: CertificateMetadata;
}

export interface LinkRecord {
  id: string;
  url: string;
  createdAt: number;
  updatedAt: number;
}

export interface MailRecord {
  id: string;
  email: string;
  createdAt: number;
  updatedAt: number;
}

export interface CartRecord {
  id: string;
  title: string;
  url: string;
  createdAt: number;
}

export interface SettingRecord {
  key: string;
  value: unknown;
}
