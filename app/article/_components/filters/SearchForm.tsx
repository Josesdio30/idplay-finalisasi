import React from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchFormProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({
  searchQuery,
  onSearchChange,
  onSubmit,
  isLoading
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full max-w-lg"
    >
      <div className="relative flex-1">
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="search"
          placeholder="Search articles, tags, or topics..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-l-xl focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-lg text-gray-900"
        />
      </div>
      <button
        type="submit"
        className="px-8 py-4 bg-blue-600 text-white rounded-r-xl hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 text-lg font-medium"
        disabled={isLoading}
      >
        {isLoading ? '...' : 'Search'}
      </button>
    </form>
  );
};

export default SearchForm;
