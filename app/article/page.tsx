'use client';

import React, { useState } from 'react';
import { dummyArticles } from '../../data/dummyData';
import { useArticleFilter } from '@/hooks/useArticleFilter';
import BlogHeader from './_components/layout/BlogHeader';
import FeaturedArticle from './_components/cards/FeaturedArticle';
import ArticleGrid from './_components/layout/ArticleGrid';
import ArticlesByCategory from './_components/layout/ArticlesByCategory';
import LoadingSkeleton from './_components/detail/LoadingSkeleton';
import Pagination from './_components/navigation/Pagination';
import EmptyState from './_components/layout/EmptyState';

const Blog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  const { filteredArticles, articlesByCategory, totalPages, paginatedArticles } = useArticleFilter(
    {
      searchQuery,
      selectedCategory
    },
    currentPage,
    articlesPerPage
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setCurrentPage(1);
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleCategoryFilter = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 300);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <BlogHeader
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        filteredArticlesCount={filteredArticles.length}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearch}
        onCategoryChange={handleCategoryFilter}
        isLoading={isLoading}
      />

      <main>
        <section className="py-16">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="space-y-16">
                <LoadingSkeleton />
              </div>
            ) : filteredArticles.length > 0 ? (
              <>
                {currentPage === 1 && !selectedCategory && !searchQuery && (
                  <FeaturedArticle article={dummyArticles[0]} />
                )}

                <div className="space-y-16">
                  {selectedCategory || searchQuery ? (
                    <ArticleGrid
                      articles={paginatedArticles}
                      showCategory={true}
                    />
                  ) : (
                    <ArticlesByCategory
                      articlesByCategory={articlesByCategory}
                      onCategoryFilter={handleCategoryFilter}
                    />
                  )}
                </div>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <EmptyState
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
                onClearFilters={handleClearFilters}
              />
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Blog;
