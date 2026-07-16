export const MAX_RESUME_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_RESUME_TYPES = ['application/pdf'];
export const PDF_WORKER_URL = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url
).toString();
