import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import { type Article } from '@/data/dummyData';
import { limitDescription, formatDate, getCategoryName } from '@/lib/articleUtils';

interface ArticleCardProps {
  article: Article;
  showCategory?: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, showCategory = false }) => {
  return (
    <article className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          width={400}
          height={250}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {showCategory && (
          <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
            {getCategoryName(article.category_id)}
          </div>
        )}
        {article.reading_time && (
          <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
            <FaClock />
            {article.reading_time} min
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {article.tags?.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className={`text-xs px-2 py-1 rounded-full ${
                showCategory ? 'bg-gray-100 text-gray-700' : 'bg-blue-100 text-blue-800'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        <Link href={`/article/${article.slug}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors duration-200 line-clamp-2">
            {article.title}
          </h3>
        </Link>

        <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
          {limitDescription(article.description, 120)}
        </p>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            {article.user.avatar && (
              <Image
                src={article.user.avatar}
                alt={article.user.name}
                width={24}
                height={24}
                className="rounded-full"
              />
            )}
            <span className="text-gray-700 font-medium">{article.user.name}</span>
          </div>

          <div className="flex items-center gap-1 text-gray-500">
            <FaCalendarAlt className="text-xs" />
            <span>{formatDate(article.publish_date)}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
