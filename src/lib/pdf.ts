import * as pdfjs from 'pdfjs-dist';

// Import the worker build as a static URL using Vite's ?url suffix.
// This is the extension-compliant way to bundle and load workers without violating CSP guidelines.
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export { pdfjs };
export type { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist';
export type { TextContent, TextItem } from 'pdfjs-dist/types/src/display/api';
