import { getSortedBlogPostsData } from '@/lib/blogPosts';
import Image from 'next/image';
import Link from 'next/link';

const BlogList = () => {
  const blogPosts = getSortedBlogPostsData();

  return (
    <div className="mt-4 min-h-screen bg-900 text-100 p-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        {blogPosts.map((post) => post && (
          <Link href={`/blog/${post.slug}`} key={post.slug}>
            <article className="group relative overflow-hidden rounded-lg transition-all duration-300 hover:translate-y-[-4px] shadow-md cursor-pointer hover:shadow-xl">
              <div className="relative h-80 overflow-hidden rounded-lg">
                {post.image && (
                  <Image
                    src={post.image}
                    alt={`Post: ${post.title}`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    width={600}
                    height={800}
                    className="object-cover w-full h-full"
                    loading="lazy"
                    quality={90}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
                  <h2 className="text-xl text-white font-semibold tracking-tight line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-200">
                    {post.author || 'No description available.'}
                  </p>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogList;