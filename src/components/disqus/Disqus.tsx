import React from 'react'
import { DiscussionEmbed } from 'disqus-react'

interface DisqusProps {
  url: string;
  identifier?: string;
  title: string;
}
interface Post {
  slug: string;
  title: string;
}

export default function DisqusComments(props: { post: Post }) {

  const post = props.post

  const disqusConfig: DisqusProps = {
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    identifier: post.slug,
    title: post.title,
  }
  return (
    <DiscussionEmbed
      shortname="metaxisdigital"
      config={disqusConfig}
    />
  )
}