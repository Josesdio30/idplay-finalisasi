import React from 'react';
import { notFound } from 'next/navigation';
import { dummyArticles, type Article } from '../../../data/dummyData';
import BackNavigation from '../_components/navigation/BackNavigation';
import ArticleDetailHeader from '../_components/detail/ArticleDetailHeader';
import ArticleContent from '../_components/detail/ArticleContent';
import ShareSection from '../_components/detail/ShareSection';
import RelatedArticles from '../_components/detail/RelatedArticles';

interface ArticleDetailProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ArticleDetail({ params }: ArticleDetailProps) {
  const { slug } = await params;
  const article = dummyArticles.find((a: Article) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    // <div className="min-h-screen bg-gray-50 font-sans">
    <div className="min-h-screen font-sans bg-white">
      {/* <BackNavigation /> */}

      <article className="max-w-4xl mx-auto px-4 py-8">
        <ArticleDetailHeader article={article} />
        <ArticleContent article={article} />
        <ShareSection article={article} />
        <RelatedArticles currentArticle={article} />
      </article>
    </div>
  );
}

export async function generateMetadata({ params }: ArticleDetailProps) {
  const { slug } = await params;
  const article = dummyArticles.find((a: Article) => a.slug === slug);

  if (!article) {
    return {
      title: 'Artikel Tidak Ditemukan - IdPlay'
    };
  }

  return {
    title: `${article.title} - IdPlay Blog`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      images: [article.image],
      type: 'article'
    }
  };
}

export async function generateStaticParams() {
  return dummyArticles.map((article: Article) => ({
    slug: article.slug
  }));
}
