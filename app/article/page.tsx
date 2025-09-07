'use client';

import React, { useState } from 'react';
import { useArticlesAPI } from '@/hooks/useArticlesAPI';
import { getFeaturedArticles } from '@/lib/services/articleService';
import { useEffect } from 'react';
import { type Article } from '@/types/article';
import BlogHeader from './_components/layout/BlogHeader';
import FeaturedArticle from './_components/cards/FeaturedArticle';
import ArticleGrid from './_components/layout/ArticleGrid';
import LoadingSkeleton from './_components/detail/LoadingSkeleton';
import LoadMoreButton from './_components/navigation/LoadMoreButton';
import EmptyState from './_components/layout/EmptyState';
import CategoryFilter from './_components/filters/CategoryFilter';

const Blog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [featuredArticle, setFeaturedArticle] = useState<Article | null>(null);
  const [hasInitialLoad, setHasInitialLoad] = useState(false);
  const articlesPerLoad = 9;

  const { 
    articles: filteredArticles,
    displayedArticles, 
    categories,
    articlesByCategory, 
    hasMore, 
    loadMore, 
    resetPagination,
    totalArticles,
    displayedCount,
    loading: apiLoading,
    error,
    refetch
  } = useArticlesAPI({
    searchQuery,
    selectedCategory,
    articlesPerLoad
  });

  // Track initial load completion
  useEffect(() => {
    if (!apiLoading && filteredArticles.length >= 0) {
      setHasInitialLoad(true);
    }
  }, [apiLoading, filteredArticles.length]);

  // Fetch featured article
  useEffect(() => {
    const fetchFeaturedArticle = async () => {
      try {
        const featured = await getFeaturedArticles(1);
        if (featured.length > 0) {
          setFeaturedArticle(featured[0]);
        }
      } catch (error) {
        console.error('Error fetching featured article:', error);
      }
    };

    fetchFeaturedArticle();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    resetPagination();
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleCategoryFilter = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    resetPagination();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 300);
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      loadMore();
      setIsLoading(false);
    }, 500);
  };

  const isAppLoading = isLoading || apiLoading;

  return (
    <div className="min-h-screen font-sans bg-white mb-24">
      <BlogHeader
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        filteredArticlesCount={filteredArticles.length}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearch}
        onCategoryChange={handleCategoryFilter}
        isLoading={isAppLoading}
      />

      <main>
        <section className="">
          <div className="container mx-auto px-4">
            {featuredArticle && (
              <FeaturedArticle article={featuredArticle} />
            )}
            
            {/* Category filter */}
            <div className="flex justify-start mb-8">
              <CategoryFilter
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryFilter}
                categories={categories}
              />
            </div>
            
            {!hasInitialLoad || (isAppLoading && displayedCount === 0) ? (
              <div className="space-y-16">
                <LoadingSkeleton />
              </div>
            ) : error ? (
              <div className="text-center py-16">
                <div className="text-red-600 mb-4">Error: {error}</div>
                <button
                  onClick={refetch}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Try Again
                </button>
              </div>
            ) : filteredArticles.length > 0 ? (
              <>
                <div className="space-y-16">
                  {/* show all articles */}
                  <ArticleGrid
                    articles={displayedArticles}
                    showCategory={true}
                  />
                </div>

                <LoadMoreButton
                  onLoadMore={handleLoadMore}
                  isLoading={isAppLoading}
                  hasMore={hasMore}
                  totalArticles={totalArticles}
                  displayedArticles={displayedCount}
                />
              </>
            ) : (
              <EmptyState
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
              />
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Blog;
