import { getPdfJs } from '@/lib/pdf';

/**
 * Extracts all raw text characters page-by-page from a pre-validated PDF document.
 * Assumes the document has already passed structural readability and password-protection audits.
 */
export const extractRawText = async (file: Blob): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdfjs = await getPdfJs();
    
    const pdf = await pdfjs.getDocument({
      data: new Uint8Array(arrayBuffer),
      disableRange: true,
      disableStream: true
    }).promise;

    let fullText = '';

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      
      const pageText = textContent.items
        .map((item) => {
          if ('str' in item) {
            return item.str;
          }
          return '';
        })
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();

      if (pageText) {
        fullText += pageText + '\n';
      }
    }

    return fullText.trim();
  } catch (err) {
    const error = err as Error;
    throw new Error(error.message || 'Failed to extract text from the PDF document.');
  }
};
