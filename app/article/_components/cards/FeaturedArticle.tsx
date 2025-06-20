import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaClock } from 'react-icons/fa';
import { type Article } from '@/data/dummyData';
import { limitDescription, formatDate, getCategoryName } from '@/lib/articleUtils';

interface FeaturedArticleProps {
  article: Article;
}

const FeaturedArticle: React.FC<FeaturedArticleProps> = ({ article }) => {
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Article</h2>
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto">
        <div className="md:flex">
          <div className="md:w-1/2">
            <Image
              src={article.image}
              alt={article.title}
              width={600}
              height={400}
              className="w-full h-64 md:h-full object-cover"
            />
          </div>
          <div className="md:w-1/2 p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium">
                {getCategoryName(article.category_id)}
              </span>
              {article.reading_time && (
                <span className="text-gray-500 text-sm flex items-center gap-1">
                  <FaClock />
                  {article.reading_time} min read
                </span>
              )}
            </div>
            <Link href={`/article/${article.slug}`}>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors duration-200">
                {article.title}
              </h3>
            </Link>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {limitDescription(article.description, 150)}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {article.user.avatar && (
                  <Image
                    src={article.user.avatar}
                    alt={article.user.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <div>
                  <p className="font-medium text-gray-900">{article.user.name}</p>
                  <p className="text-sm text-gray-500">{formatDate(article.publish_date)}</p>
                </div>
              </div>
              <Link
                href={`/article/${article.slug}`}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Read More →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedArticle;
