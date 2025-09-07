import { useState, useEffect, useCallback } from 'react';
import { getArticles, type ArticleFilters } from '@/lib/services/articleService';
import { getCategories } from '@/lib/services/categoryService';
import { type Article, type Category } from '@/types/article';

interface UseArticlesAPIProps {
  searchQuery: string;
  selectedCategory: number | null;
  articlesPerLoad?: number;
}

interface UseArticlesAPIReturn {
  articles: Article[];
  displayedArticles: Article[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  resetPagination: () => void;
  totalArticles: number;
  displayedCount: number;
  refetch: () => void;
  articlesByCategory: { [key: number]: Article[] };
}

export const useArticlesAPI = ({
  searchQuery,
  selectedCategory,
  articlesPerLoad = 9
}: UseArticlesAPIProps): UseArticlesAPIReturn => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [displayedCount, setDisplayedCount] = useState(articlesPerLoad);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalArticles, setTotalArticles] = useState(0);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  }, []);

  // Fetch articles from API
  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const filters: ArticleFilters = {
        limit: 12,
      };

      // Add search filter
      if (searchQuery.trim()) {
        filters.search = searchQuery.trim();
      }

      // For category filtering, we need to find the category slug
      if (selectedCategory && categories.length > 0) {
        const category = categories.find(cat => cat.id === selectedCategory);
        if (category && (category as any).slug) {
          filters.category = (category as any).slug;
        }
      }
      
      const response = await getArticles(filters);
      let fetchedArticles = response.data;

      // Client-side category filtering as fallback (if API filtering didn't work)
      if (selectedCategory && !filters.category) {
        fetchedArticles = fetchedArticles.filter((article: Article) => {
          const categoryId = (article as any).category?.id || (article as any).categoryId;
          return categoryId === selectedCategory;
        });
      }

      setArticles(fetchedArticles);
      setTotalArticles(fetchedArticles.length);
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError('Failed to load articles');
      setArticles([]);
      setTotalArticles(0);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedCategory, categories]);

  // Reset pagination when filters change
  const resetPagination = useCallback(() => {
    setDisplayedCount(articlesPerLoad);
  }, [articlesPerLoad]);

  // Load more articles
  const loadMore = useCallback(() => {
    setDisplayedCount(prev => Math.min(prev + articlesPerLoad, articles.length));
  }, [articlesPerLoad, articles.length]);

  // Refetch articles
  const refetch = useCallback(() => {
    fetchArticles();
  }, [fetchArticles]);

  // Get displayed articles
  const displayedArticles = articles.slice(0, displayedCount);
  const hasMore = displayedCount < articles.length;

  // Group articles by category
  const articlesByCategory = articles.reduce((acc: { [key: number]: Article[] }, article) => {
    const categoryId = (article as any).category?.id || (article as any).categoryId;
    if (categoryId) {
      if (!acc[categoryId]) {
        acc[categoryId] = [];
      }
      acc[categoryId].push(article);
    }
    return acc;
  }, {});

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Fetch articles when categories are loaded or filters change
  useEffect(() => {
    if (categories.length > 0 || !selectedCategory) {
      fetchArticles();
    }
  }, [fetchArticles, categories.length]);

  // Reset pagination when filters change
  useEffect(() => {
    resetPagination();
  }, [searchQuery, selectedCategory, resetPagination]);

  return {
    articles,
    displayedArticles,
    categories,
    loading,
    error,
    hasMore,
    loadMore,
    resetPagination,
    totalArticles,
    displayedCount: displayedArticles.length,
    refetch,
    articlesByCategory
  };
};
