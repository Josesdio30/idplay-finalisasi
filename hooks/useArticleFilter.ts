import { useMemo } from 'react';
import { dummyArticles, type Article } from '@/data/dummyData';

interface UseArticleFilterProps {
  searchQuery: string;
  selectedCategory: number | null;
}

interface UseArticleFilterReturn {
  filteredArticles: Article[];
  articlesByCategory: { [key: number]: Article[] };
  totalPages: number;
  paginatedArticles: Article[];
}

export const useArticleFilter = (
  { searchQuery, selectedCategory }: UseArticleFilterProps,
  currentPage: number,
  articlesPerPage: number
): UseArticleFilterReturn => {
  const filteredArticles = useMemo(() => {
    let filtered = dummyArticles;

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((article) => article.category_id === selectedCategory);
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  const articlesByCategory = useMemo(() => {
    const grouped: { [key: number]: Article[] } = {};

    filteredArticles.forEach((article) => {
      if (!grouped[article.category_id]) {
        grouped[article.category_id] = [];
      }
      grouped[article.category_id].push(article);
    });

    return grouped;
  }, [filteredArticles]);

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + articlesPerPage);

  return {
    filteredArticles,
    articlesByCategory,
    totalPages,
    paginatedArticles
  };
};
