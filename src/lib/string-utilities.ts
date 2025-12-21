/**
 * Removes all HTML tags from a string.
 */
export function stripHtmlTags(input: string): string {
  return input.replaceAll(/[<>]/g, '')
}
