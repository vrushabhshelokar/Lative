/**
 * Truncates text content to a maximum number of characters,
 * ensuring it doesn't break in the middle of a word.
 */
export function trimTextToLimit(text: string, maxChars: number = 8000): string {
  if (!text || text.length <= maxChars) {
    return text;
  }

  // Truncate at maxChars
  let truncated = text.substring(0, maxChars);

  // Find last space to not break a word in the last 20% of the slice
  const lastSpace = truncated.lastIndexOf(' ');
  if (lastSpace > maxChars * 0.8) {
    truncated = truncated.substring(0, lastSpace);
  }

  return `${truncated.trim()}\n\n... [truncated for context limit]`;
}

export default trimTextToLimit;
