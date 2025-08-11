import React from 'react';
import { FaShare, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { type Article } from '@/data/dummyData';
import { sharePlatforms, getShareUrl } from '@/lib/shareUtils';

interface ShareSectionProps {
  article: Article;
}

interface ShareButtonProps {
  platform: string;
  url: string;
  title: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ platform, url, title }) => {
  const platformConfig = sharePlatforms[platform];

  if (!platformConfig) return null;

  const getIcon = () => {
    switch (platform) {
      case 'facebook':
        return <FaFacebook />;
      case 'x':
        return <FaXTwitter />;
      case 'linkedin':
        return <FaLinkedin />;
      default:
        return <FaShare />;
    }
  };

  return (
    <a
      href={getShareUrl(platform, url, title)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors ${platformConfig.bgColor} ${platformConfig.hoverColor}`}
    >
      {getIcon()}
      <span className="capitalize">{platform}</span>
    </a>
  );
};

const ShareSection: React.FC<ShareSectionProps> = ({ article }) => {
  const articleUrl = `https://idplay.co.id/article/${article.slug}`;

  return (
    <div className="mt-12 bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <FaShare className="text-orange-500" />
        Bagikan Artikel
      </h3>
      <div className="flex gap-4">
        <ShareButton
          platform="facebook"
          url={articleUrl}
          title={article.title}
        />
        <ShareButton
          platform="x"
          url={articleUrl}
          title={article.title}
        />
        <ShareButton
          platform="linkedin"
          url={articleUrl}
          title={article.title}
        />
      </div>
    </div>
  );
};

export default ShareSection;
