import { getBlogPostData, getSortedBlogPostsData } from "@/lib/blogPosts";
import Image from 'next/image';
import { Metadata } from 'next';
// import DisqusComments from '@/components/disqus/DisqusComments';


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
      <div className="max-w-4xl w-3xl mx-auto px-4 py-12">
        <article >
          {post.image && (
            <div className="mb-8">
              <Image
                src={imageUrl}
                alt={post.title}
                width={800}
                height={400}
                className="rounded-lg shadow-lg"
                priority
              />
            </div>
          )}
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center space-x-4 mb-8 text-gray-600">
            <span>{post.author}</span>
            <span>•</span>
            <time>{new Date(post.date).toLocaleDateString()}</time>
          </div>
          <div
            className="
                prose prose-invert prose-lg max-w-none text-gray-800 text-sm
                prose-headings:font-bold prose-headings:text-gray-100
                prose-p:prose-p:leading-relaxed mdx-prose
                prose-a:text-gray-400 prose-a:no-underline hover:prose-a
                prose-blockquote:border-l-gray-500 
                prose-blockquote:rounded-lg
                prose-strong:text-gray-200
                prose-code:text-gray-300 prose-code:bg-gray-800/50 prose-code:px-1 prose-code:rounded
                [&>*:first-child]:mt-0
            "
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </article>
        {/* <DisqusComments
          slug={post.slug}
          title={post.title}
        /> */}
      </div>
    );
  } catch (err: unknown) {
    console.error('Error loading blog post:', err);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Post not found</h1>
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