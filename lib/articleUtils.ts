import { dummyCategories } from '@/data/dummyData';

export const limitDescription = (text: string, limit: number): string => {
  const stripped = text.replace(/<[^>]+>/g, '');
  return stripped.length > limit ? `${stripped.slice(0, limit)}...` : stripped;
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

export const getCategoryName = (categoryId: number): string => {
  return dummyCategories.find((cat) => cat.id === categoryId)?.name || 'Unknown';
};
