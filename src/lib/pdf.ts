import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

export const getPdfJs = async () => {
  const pdfjs = await import('pdfjs-dist');
  pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
  return pdfjs;
};

export type { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist';
export type { TextContent, TextItem } from 'pdfjs-dist/types/src/display/api';
