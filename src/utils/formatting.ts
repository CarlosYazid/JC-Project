/**
 * Date formatting utilities
 */
export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Text formatting utilities
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

/**
 * URL formatting utilities
 */
export const sanitizeImageUrl = (url: string): string => {
  try {
    return new URL(url).toString();
  } catch {
    return '';
  }
};