import React from 'react';
import { getSortedBlogPostsData } from '@/lib/blogPosts';
import IndividualBlogPost from './IndividualBlogPost';

const BlogListing = () => {
  const blogPosts = getSortedBlogPostsData();

  // const postsWithNewsletter = [];

  // posts.forEach((post, index) => {
  //   postsWithNewsletter.push(<Post key={post.id} {...post} />);
  //   if ((index + 1) % 3 === 0) {
  //     postsWithNewsletter.push(<NewsletterFormInPage compactWidth halfWidth key={`newsletter-${index}`} hasTitle />);
  //   }
  // });

  return (
    <div className={styles.blogListingContainer}>
      {
        blogPosts.map((post) => (
          <IndividualBlogPost
            featuredArticle={post.featuredArticle || false}
            key={post.slug}
            slug={post.slug}
            title={post.title}
            image={post.image}
            date={post.date}
            description={post.description}
            author={post.author}
          />
        ))
      }
    </div>
  );
};

export default BlogListing;