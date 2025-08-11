import React from 'react';
import { FaTags } from 'react-icons/fa';
import { dummyCategories, type Category } from '@/data/dummyData';

interface CategoryFilterProps {
  selectedCategory: number | null;
  onCategoryChange: (categoryId: number | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => onCategoryChange(null)}
        className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
          selectedCategory === null
            ? 'bg-orange-500 text-white shadow-lg transform scale-105'
            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
        }`}
      >
        All Categories
      </button>
      {dummyCategories.map((category: Category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedCategory === category.id
              ? 'bg-orange-500 text-white shadow-lg transform scale-105'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          <FaTags className="inline mr-2" />
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
