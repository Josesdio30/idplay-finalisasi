import React from 'react';
import Image from 'next/image';
import { Dot } from 'lucide-react';
import { type Article } from '@/data/dummyData';
import { formatDate, getCategoryName } from '@/lib/articleUtils';

interface ArticleDetailHeaderProps {
  article: Article;
}

const ArticleDetailHeader: React.FC<ArticleDetailHeaderProps> = ({ article }) => {
  return (
    <header className="mb-8 text-left">
      <div className="mb-6">
        <span className="text-[color:#278440] text-lg font-medium">
          {getCategoryName(article.category_id)}
        </span>
      </div>

      <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
        {article.title}
      </h1>

      {article.description && (
        <p className="text-2xl text-gray-700 mb-8 leading-relaxed">
          {article.description}
        </p>
      )}

      {/* Author, Date, Reading Time (from ArticleCard) */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-3">
          {article.user.avatar ? (
            <Image
              src={article.user.avatar}
              alt={article.user.name}
              width={52}
              height={52}
              className="rounded-full bg-gray-200"
            />
          ) : (
            <div className="w-[52px] h-[52px] rounded-full bg-gray-200 flex items-center justify-center">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" fill="#bdbdbd"/><rect x="6" y="16" width="12" height="4" rx="2" fill="#bdbdbd"/></svg>
            </div>
          )}
          <div className="flex-col">
            <span className="font-bold text-gray-900 text-lg block">
              {article.user.name || 'Admin IdPlay'}
            </span>
            <div className="flex items-center text-gray-500 ">
              <span className="text-base">
                {article.user.interest}
              </span>
              <Dot size={24} className="mx-1 text-black" />
              <span className="text-base">
                {formatDate(article.publish_date)}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="text-lg text-gray-700 mb-2">
        {formatDate(article.publish_date)}
      </div> */}
    </header>
  );
};

export default ArticleDetailHeader;
