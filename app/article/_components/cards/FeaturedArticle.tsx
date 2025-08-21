import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaClock } from 'react-icons/fa';
import { type Article } from '@/data/dummyData';
import { limitDescription, formatDate, getCategoryName } from '@/lib/articleUtils';
import { Dot } from 'lucide-react';

interface FeaturedArticleProps {
  article: Article;
}

const FeaturedArticle: React.FC<FeaturedArticleProps> = ({ article }) => {
  return (
    <div className="mb-16">
      {/* <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Article</h2> */}
      <div className="bg-white rounded-2xl  overflow-hidden">
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
          {/* <div className="md:w-1/2 p-8"> */}
          <div className="md:w-1/2 p-10 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              {/* <span className="bg-blue-100 text-blue-800 text-md px-3 py-1 rounded-full font-medium"> */}
              <span className="text-md rounded-full font-bold">
                {getCategoryName(article.category_id)}
              </span>
            </div>
            <Link href={`/article/${article.slug}`}>
              <h3 className="text-4xl font-bold text-orange-500 mb-2 hover:underline line-clamp-2">
                {article.title}
              </h3>
            </Link>
            <p className="text-gray-600 mb-6 leading-relaxed text-xl">
              {limitDescription(article.description, 150)}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {article.user.avatar ? (
                  <Image
                    src={article.user.avatar}
                    alt={article.user.name}
                    width={40}
                    height={40}
                    className="rounded-full bg-gray-200"
                  />
                ) : (
                  <div className="w-15 h-15 rounded-full bg-gray-200 flex items-center justify-center">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" fill="#bdbdbd"/><rect x="6" y="16" width="12" height="4" rx="2" fill="#bdbdbd"/></svg>
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900 text-md leading-none">{article.user.name}</span>
                  <div className="flex items-center gap-2 text-gray-500 mt-1">
                    <span className="text-md">{formatDate(article.publish_date)}</span>
                    <span className="flex items-center align-middle">
                      <Dot size={30} className="mx-1 text-black" />
                    </span>
                    <span className="text-md">{article.reading_time ? `${article.reading_time} min read` : ''}</span>
                  </div>
                </div>
              </div>
              {/* <Link
                href={`/article/${article.slug}`}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Read More
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedArticle;
