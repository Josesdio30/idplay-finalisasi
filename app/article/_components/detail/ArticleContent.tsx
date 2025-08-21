import React from 'react';
import Image from 'next/image';
import { type Article } from '@/data/dummyData';
import { GeneratedContent } from './GeneratedContent';

interface ArticleContentProps {
  article: Article;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ article }) => {
  return (
    <>
      <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
        <Image
          src={article.image}
          alt={article.title}
          width={800}
          height={400}
          className="w-full h-96 object-cover"
          priority
        />
      </div>

      <div className="prose prose-lg max-w-none">
        <div className="bg-white rounded-xl p-8 shadow-sm">
          {/* <div className="text-xl text-gray-700 leading-relaxed mb-8 font-medium border-l-4 border-orange-500 pl-6">
            {article.description}
          </div> */}

          <div className="space-y-6 text-gray-800 leading-relaxed">
            <GeneratedContent article={article} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleContent;
