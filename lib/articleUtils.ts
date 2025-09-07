import { type Category } from '@/types/article';

export const limitDescription = (text: string, limit: number): string => {
  const stripped = text.replace(/<[^>]+>/g, '');
  return stripped.length > limit ? `${stripped.slice(0, limit)}...` : stripped;
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('id-ID', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    // hour: '2-digit',
    // minute: '2-digit',
    // hour12: false
  });
};

export const getCategoryName = (categoryId: number, categories?: Category[]): string => {
  if (!categories || categories.length === 0) return 'Unknown';
  return categories.find((cat) => cat.id === categoryId)?.name || 'Unknown';
};

export const calculateReadTime = (content: string): string => {
  if (!content) return '1 min read';
  
  // Remove HTML tags and markdown syntax
  const cleanContent = content
    .replace(/<[^>]+>/g, '') // Remove HTML tags
    .replace(/[#*`_~\[\]]/g, '') // Remove markdown syntax
    .replace(/\n+/g, ' ') // Replace multiple newlines with single space
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim();
  
  // Count words (split by spaces and filter out empty strings)
  const wordCount = cleanContent
    .split(' ')
    .filter(word => word.length > 0).length;
  
  // Calculate reading time (average 200 words per minute)
  const wordsPerMinute = 200;
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  
  return `${minutes} min read`;
}; 