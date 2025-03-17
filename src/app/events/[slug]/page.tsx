import { getEventPostData, getSortedEventsPostsData } from "@/lib/eventPosts";
import Image from 'next/image';
import { Metadata } from 'next';
// import DisqusComments from '@/components/disqus/DisqusComments';
import { MDXRemote } from "next-mdx-remote/rsc";

export function generateStaticParams() {
  const eventPosts = getSortedEventsPostsData();

  return eventPosts.map((post) => ({
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
  const post = await getEventPostData(params.slug);

  if (!post) {
    return {
      title: "Event not found",
      description: "The requested event could not be found",
    };
  }

  const imageUrl = post.image.startsWith('./')
    ? `/eventposts/${params.slug}/${post.image.slice(2)}`
    : post.image;

  const twitterImageUrl = post.imageTwitter?.startsWith('./')
    ? `/eventposts/${params.slug}/${post.imageTwitter.slice(2)}`
    : post.imageTwitter || imageUrl;

  console.log(post.eventName)

  return {
    title: post.eventName,
    description: post.description,
    openGraph: {
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: 'summary_large_image',
      images: [{ url: twitterImageUrl }],
    },
  };
}

export default async function EventPost(props: Props) {
  const params = await props.params;
  try {
    const post = await getEventPostData(params.slug);

    const imageUrl = post.image.startsWith('./')
      ? `/eventposts/${params.slug}/${post.image.slice(2)}`
      : post.image;

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <article>
          {post.image && (
            <div className="mb-6 md:mb-8">
              <a href={imageUrl} target="_blank" rel="noopener noreferrer">
                <Image
                  src={imageUrl}
                  alt={`Study circle at metaxis.digital of ${post.eventName}`}
                  width={800}
                  height={1000}
                  className="w-full h-auto object-contain max-h-[700px] cursor-pointer hover:opacity-90 transition-opacity"
                  priority
                  quality={100}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
                />
              </a>
            </div>
          )}
          <h1 className="text-3xl sm:text-6xl lg:text-6xl font-bold mb-3 md:mb-4 text-gray-800">{post.eventName}</h1>
          {/* <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-6 md:mb-8 text-gray-600 text-sm sm:text-base justify-end">
            <time>{new Date(post.pubDate).toLocaleDateString()}</time>
          </div> */}
          <div
            className="
              prose prose-sm sm:prose-base lg:prose-lg max-w-none text-black
              prose-headings:font-bold prose-headings:text-black prose-headings:mb-4 prose-headings:mt-8
              prose-h1:text-2xl sm:prose-h1:text-3xl prose-h2:text-xl sm:prose-h2:text-2xl
              prose-p:leading-relaxed prose-p:my-4 prose-p:text-black mdx-prose
              prose-a:text-gray-700 prose-a:no-underline hover:prose-a:text-black
              prose-blockquote:border-l-gray-700 prose-blockquote:pl-4 
              prose-blockquote:rounded-lg prose-blockquote:py-1
              prose-strong:text-black
              prose-code:text-gray-800 prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded prose-code:text-sm
              prose-img:rounded-lg prose-img:mx-auto prose-img:my-6
              prose-ul:pl-5 prose-ol:pl-5 prose-li:text-black
              [&>*:first-child]:mt-0
              "
          >
            <MDXRemote source={post.content} />
          </div>
        </article>
      </div>
    );
  } catch (err: unknown) {
    console.error('Error loading event post:', err);
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full p-6 sm:p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">Event not found</h1>
          <p className="text-gray-600">
            {err instanceof Error
              ? err.message
              : 'The requested event could not be found.'}
          </p>
        </div>
      </div>
    );
  }
}