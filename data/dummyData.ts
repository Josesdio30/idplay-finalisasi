export interface Category {
  id: number;
  name: string;
}

export interface User {
  name: string;
  avatar?: string;
}

export interface Article {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  user: User;
  publish_date: string;
  category_id: number;
  reading_time?: number;
  tags?: string[];
}

export const dummyCategories: Category[] = [
  { id: 1, name: 'Technology' },
  { id: 2, name: 'Lifestyle' },
  { id: 3, name: 'Business' },
  { id: 4, name: 'Health' }
];

export const dummyArticles: Article[] = [
  {
    id: 1,
    slug: 'tech-article-1',
    title: 'The Future of AI: Transforming Industries',
    description:
      'Artificial Intelligence is transforming industries with innovative solutions. This article explores the latest advancements and their impact on various sectors, from healthcare to finance, and what the future holds.',
    image: 'https://picsum.photos/600/400?random=1',
    user: {
      name: 'John Doe',
      avatar: 'https://picsum.photos/40/40?random=1'
    },
    publish_date: '2025-06-01',
    category_id: 1,
    reading_time: 5,
    tags: ['AI', 'Technology', 'Future', 'Innovation']
  },
  {
    id: 2,
    slug: 'tech-article-2',
    title: 'Quantum Computing: The Next Frontier',
    description:
      'An introduction to the world of quantum computing and its potential to revolutionize technology, exploring current developments and future possibilities.',
    image: 'https://picsum.photos/600/400?random=2',
    user: {
      name: 'Jane Smith',
      avatar: 'https://picsum.photos/40/40?random=2'
    },
    publish_date: '2025-06-02',
    category_id: 1,
    reading_time: 7,
    tags: ['Quantum', 'Computing', 'Science', 'Technology']
  },
  {
    id: 3,
    slug: 'blockchain-revolution',
    title: 'Blockchain Beyond Cryptocurrency',
    description:
      'Exploring how blockchain technology is being used beyond cryptocurrencies to solve real-world problems and make lifestyle with less clutter and more freedom.',
    image: 'https://picsum.photos/600/400?random=10',
    user: {
      name: 'Alex Chen',
      avatar: 'https://picsum.photos/40/40?random=10'
    },
    publish_date: '2025-06-10',
    category_id: 1,
    reading_time: 6,
    tags: ['Blockchain', 'Technology', 'Innovation']
  },
  {
    id: 4,
    slug: 'lifestyle-article-1',
    title: 'Minimalist Living: Less is More',
    description:
      'Embracing a simpler lifestyle with less clutter and more freedom. Learn how minimalism can improve your mental health and overall well-being.',
    image: 'https://picsum.photos/600/400?random=3',
    user: {
      name: 'Alice Brown',
      avatar: 'https://picsum.photos/40/40?random=3'
    },
    publish_date: '2025-06-03',
    category_id: 2,
    reading_time: 4,
    tags: ['Lifestyle', 'Minimalism', 'Wellness', 'Mental Health']
  },
  {
    id: 5,
    slug: 'sustainable-living',
    title: 'Sustainable Living in 2025',
    description:
      'Practical tips for living more sustainably and reducing your environmental impact in everyday life.',
    image: 'https://picsum.photos/600/400?random=11',
    user: {
      name: 'Emma Green',
      avatar: 'https://picsum.photos/40/40?random=11'
    },
    publish_date: '2025-06-11',
    category_id: 2,
    reading_time: 5,
    tags: ['Sustainability', 'Environment', 'Lifestyle']
  },
  {
    id: 6,
    slug: 'business-growth',
    title: 'Scaling Your Startup: From Idea to Enterprise',
    description:
      'Essential strategies for growing your startup from idea to enterprise. Learn from successful entrepreneurs and avoid common pitfalls.',
    image: 'https://picsum.photos/600/400?random=4',
    user: {
      name: 'Mike Johnson',
      avatar: 'https://picsum.photos/40/40?random=4'
    },
    publish_date: '2025-06-04',
    category_id: 3,
    reading_time: 8,
    tags: ['Business', 'Startup', 'Growth', 'Entrepreneurship']
  },
  {
    id: 7,
    slug: 'remote-work-culture',
    title: 'Building Strong Remote Work Culture',
    description:
      'How to create and maintain a positive remote work culture that drives productivity and employee satisfaction.',
    image: 'https://picsum.photos/600/400?random=12',
    user: {
      name: 'Sarah Wilson',
      avatar: 'https://picsum.photos/40/40?random=12'
    },
    publish_date: '2025-06-12',
    category_id: 3,
    reading_time: 6,
    tags: ['Remote Work', 'Culture', 'Business', 'Management']
  },
  {
    id: 8,
    slug: 'mental-health-tips',
    title: 'Mental Health in the Digital Age',
    description:
      'How to maintain mental wellness while navigating our connected world. Practical strategies for digital detox and mindfulness.',
    image: 'https://picsum.photos/600/400?random=5',
    user: {
      name: 'Dr. Sarah Wilson',
      avatar: 'https://picsum.photos/40/40?random=5'
    },
    publish_date: '2025-06-05',
    category_id: 4,
    reading_time: 6,
    tags: ['Health', 'Mental Health', 'Wellness', 'Digital Wellness']
  },
  {
    id: 9,
    slug: 'nutrition-myths',
    title: 'Common Nutrition Myths Debunked',
    description: 'Separating fact from fiction in the world of nutrition and healthy eating.',
    image: 'https://picsum.photos/600/400?random=13',
    user: {
      name: 'Dr. Mark Thompson',
      avatar: 'https://picsum.photos/40/40?random=13'
    },
    publish_date: '2025-06-13',
    category_id: 4,
    reading_time: 7,
    tags: ['Nutrition', 'Health', 'Wellness', 'Diet']
  }
];
