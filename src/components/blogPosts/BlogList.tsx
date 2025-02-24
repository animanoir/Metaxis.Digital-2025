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
            <article className="group relative overflow-hidden rounded-lg bg-800/50 p-4 backdrop-blur-xs transition-all duration-300 hover:bg-800/70 hover:translate-y-[-4px] shadow-md cursor-pointer hover:shadow-xl">
              <div className="aspect-2/3 overflow-hidden rounded-lg mb-4">
                {post.image && (
                  <Image
                    src={post.image}
                    alt={`Post: ${post.title}`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    width={600}
                    height={400}
                    className="object-cover w-full h-full transition-all duration-500 group-hover:scale-105"
                    loading="lazy"
                    quality={75}
                  />
                )}
              </div>
              <div className="space-y-2">
                <h2 className="text-xl text-gray-800 font-semibold tracking-tight line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 min-h-[3rem]">
                  {post.author || 'No description available.'}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogList;