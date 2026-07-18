/**
 * Extracts visible main text content from the active document,
 * filtering out scripts, stylesheets, navigation, and header/footer elements.
 */
export function extractPageText(): string {
  const body = document.body;
  if (!body) return '';

  // Create a deep copy of the body so we can prune it without impacting the live DOM
  const clone = body.cloneNode(true) as HTMLElement;

  // Selectors for elements we want to purge
  const elementsToRemove = clone.querySelectorAll(
    'script, style, noscript, svg, iframe, header, footer, nav, aside'
  );
  elementsToRemove.forEach((el) => el.remove());

  // Get raw text content
  const rawText = clone.innerText || clone.textContent || '';

  // Clean up whitespace: collapse spaces/tabs to single space,
  // and multiple consecutive line breaks to double line breaks.
  const cleanedText = rawText
    .replace(/[ \t]+/g, ' ') // Collapse multiple spaces
    .replace(/\n\s*\n+/g, '\n\n') // Collapse consecutive line breaks
    .trim();

  return cleanedText;
}

export default extractPageText;
