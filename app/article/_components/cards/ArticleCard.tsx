import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import { type Article } from '@/data/dummyData';
import { limitDescription, formatDate, getCategoryName } from '@/lib/articleUtils';
import { Dot } from 'lucide-react'; 

interface ArticleCardProps {
  article: Article;
  showCategory?: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, showCategory = false }) => {
  return (
    <article className="bg-white rounded-xl overflow-hidden group transform flex flex-col">
      <div className="relative overflow-hidden flex items-center justify-center" style={{ minHeight: 180 }}>
        {article.image ? (
          <Image
            src={article.image}
            alt={article.title}
            width={400}
            height={250}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
            <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#e5e7eb"/><path d="M7 17l3-4 2 3 3-4 4 6H5l2-3z" fill="#bdbdbd"/><circle cx="8.5" cy="8.5" r="2.5" fill="#bdbdbd"/></svg>
          </div>
        )}
      </div>

      <div className="pt-4 pb-6 flex flex-col flex-1">

        {/* Category */}
        <div className="text-s font-bold text-gray-700 mb-1">{getCategoryName(article.category_id)}</div>

        {/* Title */}
        <Link href={`/article/${article.slug}`}>
          <h3 className="text-2xl font-bold text-orange-500 mb-2 hover:underline line-clamp-2">
            {article.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-gray-700 mb-4 text-sm leading-relaxed line-clamp-3">
          {limitDescription(article.description, 120)}
        </p>

        {/* Author, Date, Reading Time */}
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-3">
            {article.user.avatar ? (
              <Image
                src={article.user.avatar}
                alt={article.user.name}
                width={45}
                height={45}
                className="rounded-full bg-gray-200"
              />
            ) : (
              <div className="w-[45px] h-[45px] rounded-full bg-gray-200 flex items-center justify-center">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" fill="#bdbdbd"/><rect x="6" y="16" width="12" height="4" rx="2" fill="#bdbdbd"/></svg>
              </div>
            )}
            <div className="flex-col">
              <span className="font-medium text-gray-900 text-sm leading-none">{article.user.name}</span>
              <div className="flex items-center text-gray-500 ">
                <span className="text-sm">{formatDate(article.publish_date)}</span>
                <Dot size={30} className="mx-1 text-black" />
                <span className="text-sm">{article.reading_time ? `${article.reading_time} min read` : ''}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
