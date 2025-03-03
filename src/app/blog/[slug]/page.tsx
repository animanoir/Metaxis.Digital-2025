import { getBlogPostData, getSortedBlogPostsData } from "@/lib/blogPosts";
import Image from 'next/image';
import { Metadata } from 'next';
// import DisqusComments from '@/components/disqus/DisqusComments';
import { MDXRemote } from "next-mdx-remote/rsc";

export function generateStaticParams() {
  const blogPosts = getSortedBlogPostsData();

  return blogPosts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));
}

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const post = await getBlogPostData(params.slug);


  if (!post) {
    return {
      title: "Post not found",
      description: "The requested post could not be found",
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      images: [{ url: post.image }],
    },
    twitter: {
      card: 'summary_large_image',
      images: [{ url: post.imageTwitter }],
    },
  };
}

export default async function BlogPost(props: Props) {
  const params = await props.params;
  try {
    const post = await getBlogPostData(params.slug);

    const imageUrl = post.image.startsWith('./')
      ? `/blogposts/${params.slug}/${post.image.slice(2)}`
      : post.image;

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <article>
          {post.image && (
            <div className="mb-6 md:mb-8">
              <Image
                src={imageUrl}
                alt={post.title}
                width={800}
                height={400}
                className="rounded-lg shadow-lg w-full h-auto object-cover max-h-[500px]"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
              />
            </div>
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 leading-tight">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-6 md:mb-8 text-gray-600 text-sm sm:text-base">
            <span>{post.author}</span>
            <span className="hidden sm:inline">•</span>
            <time>{new Date(post.date).toLocaleDateString()}</time>
          </div>
          <div
            className="
                prose prose-invert prose-sm sm:prose-base lg:prose-lg max-w-none text-gray-800
                prose-headings:font-bold prose-headings:text-gray-100 prose-headings:mb-4 prose-headings:mt-8
                prose-h1:text-2xl sm:prose-h1:text-3xl prose-h2:text-xl sm:prose-h2:text-2xl
                prose-p:leading-relaxed prose-p:my-4 mdx-prose
                prose-a:text-gray-400 prose-a:no-underline hover:prose-a:text-gray-300
                prose-blockquote:border-l-gray-500 prose-blockquote:pl-4 
                prose-blockquote:rounded-lg prose-blockquote:py-1
                prose-strong:text-gray-200
                prose-code:text-gray-300 prose-code:bg-gray-800/50 prose-code:px-1 prose-code:rounded prose-code:text-sm
                prose-img:rounded-lg prose-img:mx-auto prose-img:my-6
                prose-ul:pl-5 prose-ol:pl-5
                [&>*:first-child]:mt-0
            "
          >
            <MDXRemote source={post.content} />

          </div>
        </article>
      </div>
    );
  } catch (err: unknown) {
    console.error('Error loading blog post:', err);
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full p-6 sm:p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">Post not found</h1>
          <p className="text-gray-600">
            {err instanceof Error
              ? err.message
              : 'The requested post could not be found.'}
          </p>
        </div>
      </div>
    );
  }
}