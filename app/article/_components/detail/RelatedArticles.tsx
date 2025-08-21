import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaCalendarAlt } from 'react-icons/fa';
import { dummyArticles, type Article } from '@/data/dummyData';
import { formatDate, getCategoryName } from '@/lib/articleUtils';

interface RelatedArticlesProps {
  currentArticle: Article;
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ currentArticle }) => {
  // related articles from same category
  const relatedArticles = dummyArticles
    .filter(
      (article: Article) =>
        article.category_id === currentArticle.category_id && article.id !== currentArticle.id
    )
    .slice(0, 3);

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Artikel Terkait</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {relatedArticles.map((article: Article) => (
          <Link
            key={article.id}
            href={`/article/${article.slug}`}
            // className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
            className="bg-white rounded-xl overflow-hidden group"
            // className="bg-white rounded-xl overflow-hidden group transform flex flex-col"
          >
            <div className="relative overflow-hidden">
              <Image
                src={article.image}
                alt={article.title}
                width={300}
                height={200}
                className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            {/* <div className="p-4"> */}
            <div className="pt-4 pb-6 flex flex-col flex-1">
              <div className="text-xs font-bold text-gray-700 mb-1">{getCategoryName(article.category_id)}</div>
              {/* <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors"> */}
              <h3 className="font-bold text-orange-500 mb-2 hover:underline line-clamp-2">
                {article.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2 mb-3">{article.description}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                {/* <FaCalendarAlt /> */}
                <span>{formatDate(article.publish_date)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedArticles;
