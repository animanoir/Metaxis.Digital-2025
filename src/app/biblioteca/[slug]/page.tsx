import { getBookPostData, getSortedBookPostData } from "@/lib/bookPosts";
import Image from 'next/image';
import styles from './BookPost.module.css';
import { Metadata } from 'next';

export function generateStaticParams() {
  const bookPosts = getSortedBookPostData();

  return bookPosts.map((bookPost) => ({
    params: {
      slug: bookPost.slug,
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
  const bookPost = await getBookPostData(params.slug);

  if (!bookPost) {
    return {
      title: "Post not found",
      description: "The requested post could not be found",
    };
  }

  return {
    title: bookPost.title,
    description: bookPost.description,
    openGraph: {
      images: [{ url: bookPost.image }],
    },
    twitter: {
      card: 'summary_large_image',
      images: [{ url: bookPost.imageTwitter }],
    },
  };
}


export default async function BookPost(props: Props) {
  const params = await props.params;
  try {
    const bookPost = await getBookPostData(params.slug);

    const imageUrl = bookPost.image.startsWith('./')
      ? `/bookposts/${params.slug}/${bookPost.image.slice(2)}`
      : bookPost.image;

    return (
      <article className="mx-auto w-3xl max-w-2xl">
        <div className="min-h-screen flex items-center justify-center flex-col md:flex-row">
          <Image
            src={imageUrl}
            alt={`Portada del libro ${bookPost.title}`}
            width={500}
            height={750}
            priority
            className={styles.bookCover}
          />
          <div className={styles.metaInfo}>
            <h1 className={styles.title}>
              <b>{bookPost.title}</b>
              <span style={{ fontWeight: 'normal' }}>, {bookPost.author}</span>
            </h1>
            {bookPost.publishedYear && (
              <h3 className={styles.title} style={{ fontSize: '2rem' }}>
                <b>{bookPost.publishedYear}</b>
              </h3>
            )}
            <h4 className={styles.description}>{bookPost.description}</h4>
            <div className={styles.downloadWrapper}>
              <a
                href="https://t.me/+DULTIj9jMLgzNTUx"
                className="px-4 py-2 hover:scale-150 transition-all duration-200 text-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.downloadIcon}>📥</span>
              </a>
            </div>
          </div>
        </div>

        <div className={`
                w-3xl
                prose prose-invert prose-lg max-w-none
                prose-headings:font-bold prose-headings:text-gray-100
                prose-p:prose-p:leading-relaxed mdx-prose
                prose-a:text-gray-400 prose-a:no-underline hover:prose-a
                prose-blockquote:border-l-gray-500 
                prose-blockquote:rounded-lg
                prose-strong:text-gray-200
                prose-code:text-gray-300 prose-code:bg-gray-800/50 prose-code:px-1 prose-code:rounded
                [&>*:first-child]:mt-0
              `}
          dangerouslySetInnerHTML={{ __html: bookPost.contentHtml }}
        />
      </article>
    );
  } catch (err: unknown) {
    // Log the error for debugging
    console.error('Error loading book post:', err);

    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br to-black">
        <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-8 border border-white/10 shadow-2xl max-w-md w-full mx-4">
          <h1 className="text-3xl font-bold text-white mb-4">Post not found</h1>
          <p className="text-gray-400">
            {err instanceof Error
              ? err.message
              : 'The requested post could not be found in the rhizome of knowledge.'}
          </p>
        </div>
      </div>
    );
  }
}