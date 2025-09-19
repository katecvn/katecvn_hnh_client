'use client';

import { Facebook, Twitter, Linkedin, Mail, Pin } from 'lucide-react';
import Tooltip from './ui/tooltip';

interface ShareButtonsProps {
  url: string;
  title: string;
  media?: string;
  isLine?: boolean;
  align?: string;
}

const shareButtons = [
  {
    name: 'Facebook',
    url: (encodedUrl: string) =>
      `https://www.facebook.com/sharer.php?u=${encodedUrl}`,
    color: 'hover:bg-blue-600 hover:text-white',
    Icon: Facebook,
    tooltip: 'Chia sẻ Facebook',
  },
  {
    name: 'Twitter',
    url: (encodedUrl: string) => `https://twitter.com/share?url=${encodedUrl}`,
    color: 'hover:bg-sky-500 hover:text-white',
    Icon: Twitter,
    tooltip: 'Chia sẻ Twitter',
  },
  {
    name: 'Email',
    url: (_: string, encodedTitle: string, url: string) =>
      `mailto:?subject=${encodedTitle}&body=Check this out: ${url}`,
    color: 'hover:bg-red-500 hover:text-white',
    Icon: Mail,
    tooltip: 'Gửi qua Email',
    noPopup: true, // email không cần window.open
  },
  {
    name: 'Pinterest',
    url: (encodedUrl: string, encodedTitle: string, media?: string) =>
      `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${
        media || ''
      }&description=${encodedTitle}`,
    color: 'hover:bg-red-600 hover:text-white',
    Icon: Pin,
    tooltip: 'Lưu trên Pinterest',
  },
  {
    name: 'LinkedIn',
    url: (encodedUrl: string, encodedTitle: string) =>
      `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
    color: 'hover:bg-blue-700 hover:text-white',
    Icon: Linkedin,
    tooltip: 'Chia sẻ LinkedIn',
  },
];

export default function BlogShare({
  url,
  title,
  media,
  align = 'center',
  isLine = true,
}: ShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="blog-share text-center">
      {isLine && <div className="h-1 w-10 bg-gray-200 mx-auto mb-4"></div>}

      <div className={`flex justify-${align} gap-3`}>
        {shareButtons.map(
          ({ name, url: buildUrl, color, Icon, tooltip, noPopup }) => {
            const href = buildUrl(encodedUrl, encodedTitle, media ?? '');

            return (
              <Tooltip key={name} content={tooltip}>
                <a
                  href={href}
                  onClick={(e) => {
                    if (noPopup) return; // Email mở mặc định
                    e.preventDefault();
                    window.open(
                      href,
                      `Share on ${name}`,
                      'width=500,height=500,top=20,left=300'
                    );
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Share on ${name}`}
                  className={`flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 transition ${color}`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              </Tooltip>
            );
          }
        )}
      </div>
    </div>
  );
}
