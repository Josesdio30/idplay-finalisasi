import React from 'react';
import { getCategoryName } from '@/lib/articleUtils';

interface EmptyStateProps {
  searchQuery: string;
  selectedCategory: number | null;
  onClearFilters: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  searchQuery,
  selectedCategory,
  onClearFilters
}) => {
  return (
    <div className="text-center py-20">
      <div className="text-8xl text-gray-300 mb-6">📝</div>
      <h3 className="text-3xl font-bold text-gray-900 mb-4">No articles found</h3>
      <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
        {searchQuery
          ? `No articles match your search "${searchQuery}"`
          : selectedCategory
            ? `No articles found in ${getCategoryName(selectedCategory)}`
            : 'No articles available at the moment'}
      </p>
      {(searchQuery || selectedCategory) && (
        <button
          onClick={onClearFilters}
          className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          Clear Filters & Browse All
        </button>
      )}
    </div>
  );
};

export default EmptyState;
