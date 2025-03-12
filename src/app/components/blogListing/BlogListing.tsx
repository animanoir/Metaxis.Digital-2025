import React from 'react';
import { getSortedBlogPostsData } from '@/lib/blogPosts';
import IndividualBlogPost from './IndividualBlogPost';
import NewsletterFormInPage from '../newsletterFormInPage/newsletterFormInPage';

const BlogListing = () => {
  const blogPosts = getSortedBlogPostsData();

  const postsWithNewsletter: React.ReactNode[] = [];

  blogPosts.forEach((post, index) => {
    postsWithNewsletter.push(
      <IndividualBlogPost
        featuredArticle={post.featuredArticle || false}
        key={post.slug}
        slug={post.slug}
        title={post.title}
        image={post.image}
        date={post.date}
        description={post.description}
        author={post.author}
        concepts={post.concepts}
      />
    );

    // Add newsletter form after every third post (except featured posts)
    if (!post.featuredArticle && (index + 1) % 3 === 0) {
      postsWithNewsletter.push(
        <NewsletterFormInPage
          key={`newsletter-${index}`}
          hasTitle
          compactWidth
        />
      );
    }
  });

  return <div>{postsWithNewsletter}</div>;
};

export default BlogListing;