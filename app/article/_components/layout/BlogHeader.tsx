import React from 'react';
import SearchForm from '../filters/SearchForm';
import CategoryFilter from '../filters/CategoryFilter';
import { getCategoryName } from '@/lib/articleUtils';

interface BlogHeaderProps {
  searchQuery: string;
  selectedCategory: number | null;
  filteredArticlesCount: number;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  onCategoryChange: (categoryId: number | null) => void;
  isLoading: boolean;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({
  searchQuery,
  selectedCategory,
  filteredArticlesCount,
  onSearchChange,
  onSearchSubmit,
  onCategoryChange,
  isLoading
}) => {
  return (
    <section className="py-16 ">
      <div className="container mx-auto px-4">
        <div className="mb-8 mt-8 text-left">
          <h1 className="text-8xl font-medium text-gray-900 mb-4">Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
            Cek berita terbaru kita!
          </p>
        </div>

        {/* <div className="flex flex-col  gap-6 items-center justify-center mb-8">
          <SearchForm
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
            onSubmit={onSearchSubmit}
            isLoading={isLoading}
          />

          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={onCategoryChange}
          />
        </div>

        {(searchQuery || selectedCategory) && (
          <div className="text-center mb-8">
            <p className="text-gray-600">
              {filteredArticlesCount} articles found
              {searchQuery && ` for "${searchQuery}"`}
              {selectedCategory && ` in ${getCategoryName(selectedCategory)}`}
            </p>
          </div>
        )} */}
      </div>
    </section>
  );
};

export default BlogHeader;
