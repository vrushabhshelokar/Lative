// Schema definitions for Lative IndexedDB tables (Dexie format)

export const dbSchema = {
  resumes: 'id, fileName, uploadedAt',
  parsedResumes: 'resumeId',
  certificates: 'id, fileName',
  links: 'id',
  mails: 'id',
  cart: 'id, url, createdAt',
  settings: 'key'
};
