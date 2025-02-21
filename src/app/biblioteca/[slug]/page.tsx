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

    // Convert relative image path to absolute path
    const imageUrl = bookPost.image.startsWith('./')
      ? `/bookposts/${params.slug}/${bookPost.image.slice(2)}`
      : bookPost.image;

    console.info(imageUrl);

    return (
      <div>
        <article className={`relative max-w-5xl mx-auto px-4`}>
          {/* Rhizomatic Background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
            <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-gray-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
          </div>
          <div className='mb-16'>
            <div className={`flex justify-center items-center h-screen`}>
              <Image
                src={imageUrl}
                alt={`Portada del libro ${bookPost.title}`}
                width={600}
                height={900}
                priority
                className="rounded-lg shadow-2xl max-h-full object-cover"
              />
            </div>
          </div>
          {/* Main Content Grid */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 min-h-screen">
            <aside className="md:col-span-3 space-y-8 sticky md:top-20 self-start h-fit">
              <div className="backdrop-blur-xs rounded-2xl p-6 border border-white/10 shadow-xl">
                <h2 className="text-2xl font-bold bg-linear-to-r to-white bg-clip-text text-gray-800">
                  {bookPost.author}
                </h2>
                <p className="text-gray-400 mt-2">{bookPost.publishedYear}</p>
                <div className={styles.downloadWrapper}>
                  <a
                    href="https://metaxis.digital"
                    className="px-4 py-2 hover:scale-150 rounded-lg transition-all duration-200 text-lg"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className={styles.downloadIcon}>📥</span>
                  </a>
                </div>
                <div>
                  {bookPost.description}
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="md:col-span-9">
              <h1 className={`
                      book-title
                      text-5xl md:text-7xl 
                      font-black 
                      mb-8 
                      leading-tight 
                      bg-gradient-to-r via-black to-gray-800 
                      bg-clip-text text-transparent
                      transform 
                      transition-transform
                      duration-300
                      mt-8
                      [text-shadow:_2px_2px_2px_rgb(0_0_0_/_20%),_4px_4px_4px_rgb(0_0_0_/_10%)]
                    `}>
                {bookPost.title}
              </h1>
              <div className={`
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
            </main>
          </div>
        </article>
      </div>
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