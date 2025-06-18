'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { FaEdit, FaCalendarAlt } from 'react-icons/fa';

const dummyCategories = [
  { id: 1, name: 'Technology' },
  { id: 2, name: 'Lifestyle' },
];

const dummyArticles: { [key: number]: any[] } = {
  1: [
    {
      id: 1,
      slug: 'tech-article-1',
      title: 'The Future of AI',
      description:
        'Artificial Intelligence is transforming industries with innovative solutions. This article explores the latest advancements and their impact on various sectors, from healthcare to finance.',
      image: 'https://picsum.photos/600/400?random=1',
      user: { name: 'John Doe' },
      publish_date: '2025-06-01',
    },
    {
      id: 2,
      slug: 'tech-article-2',
      title: 'Quantum Computing Basics',
      description: 'An introduction to the world of quantum computing and its potential to revolutionize technology.',
      image: 'https://picsum.photos/150/100?random=2',
      user: { name: 'Jane Smith' },
      publish_date: '2025-06-02',
    },
  ],
  2: [
    {
      id: 3,
      slug: 'lifestyle-article-1',
      title: 'Minimalist Living',
      description: 'Embracing a simpler lifestyle with less clutter and more freedom.',
      image: 'https://picsum.photos/600/400?random=3',
      user: { name: 'Alice Brown' },
      publish_date: '2025-06-03',
    },
  ],
};

interface Category {
  id: number;
  name: string;
}

interface Article {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  user: { name: string };
  publish_date: string;
}


const Blog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const limitDescription = (text: string, limit: number) => {
    const stripped = text.replace(/<[^>]+>/g, '');
    return stripped.length > limit ? `${stripped.slice(0, limit)}...` : stripped;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center mb-8">
            <div className="md:w-11/12 mt-4 md:mt-0">
              <h1 className="text-3xl font-bold">Blog</h1>
              <p className="text-gray-600 mt-2">
                Explore our latest articles and insights.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <form onSubmit={handleSearch} className="flex w-full max-w-md">
              <input
                type="search"
                name="searching"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                required
                className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Main Blog Section */}
      <main>
        <section className="py-12">
          <div className="container mx-auto px-4">
            {dummyCategories.length > 0 ? (
              dummyCategories.map((category: Category) => (
                <div key={category.id} className="mb-12">
                  {/* Category Heading */}
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-semibold">{category.name}</h2>
                    <div className="w-16 h-1 bg-blue-500 mx-auto mt-2"></div>
                  </div>

                  {/* Articles */}
                  {dummyArticles[category.id] &&
                  dummyArticles[category.id].length > 0 ? (
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Featured Article (Left) */}
                      {dummyArticles[category.id][0] && (
                        <div className="md:w-1/2">
                          <div className="bg-white shadow-md rounded-lg overflow-hidden">
                            <div className="p-4">
                              <img
                                src={dummyArticles[category.id][0].image}
                                alt={dummyArticles[category.id][0].title}
                                className="w-full h-64 object-cover"
                              />
                              <Link href={`/detail/${dummyArticles[category.id][0].slug}`}>
                                <p className="text-xl font-semibold mt-4 hover:text-blue-500">
                                  {dummyArticles[category.id][0].title}
                                </p>
                              </Link>
                              <p className="text-gray-600 mt-2">
                                {limitDescription(
                                  dummyArticles[category.id][0].description,
                                  230
                                )}
                              </p>
                              <p className="text-sm text-gray-500 mt-2">
                                <FaEdit className="inline mr-1" />{' '}
                                {dummyArticles[category.id][0].user?.name || '-'}
                                  
                                <FaCalendarAlt className="inline mr-1" />{' '}
                                {formatDate(
                                  dummyArticles[category.id][0].publish_date
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Other Articles (Right) */}
                      <div className="md:w-1/2">
                        {dummyArticles[category.id]
                          .slice(1)
                          .map((article: Article) => (
                            <div
                              key={article.id}
                              className="bg-white shadow-md rounded-lg overflow-hidden mb-4"
                            >
                              <div className="p-4 flex">
                                <div className="w-1/4">
                                  <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-20 object-cover"
                                  />
                                </div>
                                <div className="w-3/4 pl-4">
                                  <Link href={`/detail/${article.slug}`}>
                                    <p className="text-lg font-semibold hover:text-blue-500">
                                      {article.title}
                                    </p>
                                  </Link>
                                  <p className="text-gray-600 text-sm mt-1">
                                    {limitDescription(article.description, 100)}
                                  </p>
                                  <p className="text-sm text-gray-500 mt-1">
                                    <FaEdit className="inline mr-1" />{' '}
                                    {article.user?.name || '-'}   
                                    <FaCalendarAlt className="inline mr-1" />{' '}
                                    {formatDate(article.publish_date)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        <Link
                          href={`/category/${category.id}`}
                          className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          See More
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p>No articles found for this category.</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center">No categories found.</p>
            )}

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <nav className="inline-flex rounded-md shadow">
                <Link
                  href="#"
                  className="px-3 py-2 bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 rounded-l-md"
                >
                  Previous
                </Link>
                <Link
                  href="#"
                  className="px-3 py-2 bg-white border border-gray-300 text-blue-500 hover:bg-gray-100"
                >
                  1
                </Link>
                <Link
                  href="#"
                  className="px-3 py-2 bg-white border border-gray-300 text-gray-500 hover:bg-gray-100"
                >
                  2
                </Link>
                <Link
                  href="#"
                  className="px-3 py-2 bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 rounded-r-md"
                >
                  Next
                </Link>
              </nav>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Blog;