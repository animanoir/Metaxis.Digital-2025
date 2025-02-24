'use client';

import { DiscussionEmbed } from 'disqus-react';

interface DisqusCommentsProps {
  slug: string;
  title: string;
}

export default function DisqusComments({ slug, title }: DisqusCommentsProps) {
  const disqusConfig = {
    url: `https://your-domain.com/blog/${slug}`, // Replace with your actual domain
    identifier: slug,
    title: title,
    language: 'es_ES'
  };

  return (
    <div className="mt-8 bg-white dark:bg-gray-900 p-6 rounded-lg">
      <DiscussionEmbed
        shortname="your-shortname"
        config={disqusConfig}
      />
    </div>
  );
}