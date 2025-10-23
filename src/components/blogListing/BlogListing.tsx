import React from 'react';
import { getSortedBlogPostsData } from '@/lib/blogPosts';
import IndividualBlogPost from './IndividualBlogPost';
import NewsletterFormInPage from '../newsletterFormInPage/newsletterFormInPage';

const BlogListing = () => {
  const blogPosts = getSortedBlogPostsData();

  // Separate featured post from regular posts
  const featuredPost = blogPosts.find((post) => post.featuredArticle);
  const regularPosts = blogPosts.filter((post) => !post.featuredArticle);

  // Get the first 2 regular posts for the hero grid
  const heroRightPosts = regularPosts.slice(0, 2);
  const remainingPosts = regularPosts.slice(2);

  // Build remaining posts with newsletter forms
  const postsWithNewsletter: React.ReactNode[] = [];
  remainingPosts.forEach((post, index) => {
    postsWithNewsletter.push(
      <IndividualBlogPost
        featuredArticle={false}
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

    // Add newsletter form after every third post
    if ((index + 1) % 3 === 0) {
      postsWithNewsletter.push(
        <NewsletterFormInPage
          key={`newsletter-${index}`}
          hasTitle
          compactWidth
        />
      );
    }
  });

  return (
    <>
      {/* Hero Grid: Full viewport with Featured Post (left) + Latest 2 Posts (right) */}
      {(featuredPost || heroRightPosts.length > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
          {/* Featured Post - Left Side */}
          {featuredPost && (
            <div className="h-full">
              <IndividualBlogPost
                featuredArticle={true}
                isHeroPost={true}
                key={featuredPost.slug}
                slug={featuredPost.slug}
                title={featuredPost.title}
                image={featuredPost.image}
                date={featuredPost.date}
                description={featuredPost.description}
                author={featuredPost.author}
                concepts={featuredPost.concepts}
              />
            </div>
          )}

          {/* Latest 2 Posts - Right Side */}
          <div className="grid grid-rows-2 h-full">
            {heroRightPosts.map((post) => (
              <div key={post.slug} className="h-full">
                <IndividualBlogPost
                  featuredArticle={false}
                  isHeroPost={true}
                  slug={post.slug}
                  title={post.title}
                  image={post.image}
                  date={post.date}
                  description={post.description}
                  author={post.author}
                  concepts={post.concepts}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Remaining Posts with Newsletter Forms */}
      <div>{postsWithNewsletter}</div>
    </>
  );
};

export default BlogListing;