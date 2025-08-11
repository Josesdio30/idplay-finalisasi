import React from 'react';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import { type Article } from '@/data/dummyData';
import { formatDate, getCategoryName } from '@/lib/articleUtils';

interface ArticleDetailHeaderProps {
  article: Article;
}

const ArticleDetailHeader: React.FC<ArticleDetailHeaderProps> = ({ article }) => {
  return (
    <header className="mb-8">
      <div className="mb-4">
        <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium">
          {getCategoryName(article.category_id)}
        </span>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
        {article.title}
      </h1>

      <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
        <div className="flex items-center gap-2">
          <FaCalendarAlt className="text-orange-500" />
          <span>{formatDate(article.publish_date)}</span>
        </div>
        {article.reading_time && (
          <div className="flex items-center gap-2">
            <FaClock className="text-orange-500" />
            <span>{article.reading_time} menit</span>
          </div>
        )}
        <div className="text-sm">
          <span className="font-medium">Penulis:</span>{' '}
          <span className="font-bold">{article.user.name || 'Admin IdPlay'}</span>
        </div>
      </div>

      {article.tags && article.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {article.tags.map((tag: string, index: number) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </header>
  );
};

export default ArticleDetailHeader;
