import { getBookPostData, getSortedBookPostData, BookPostData } from "@/lib/bookPosts";
import Image from 'next/image';
import styles from './BookPost.module.css';
import { Metadata } from 'next';

// Type for the params
type Props = {
  params: { slug: string }
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Await the params
  const { slug } = await params;
  const bookPosts = getSortedBookPostData();

  const bookPost = bookPosts.find(post => post.slug === slug);

  // console.info('Book Post:', bookPost);

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
      images: [bookPost.image],
    },
    twitter: {
      card: 'summary_large_image',
      images: [bookPost.twitterImage],
    },
  };
}


export default async function BookPost({ params }: Props) {
  try {
    const { slug } = await params;
    const bookPost: BookPostData = await getBookPostData(slug);

    // Convert relative image path to absolute path
    const imageUrl = bookPost.image.startsWith('./')
      ? `/bookposts/${slug}/${bookPost.image.slice(2)}`
      : bookPost.image;

    console.info(imageUrl);

    return (
      <div className="min-h-screen">
        <article className={`relative max-w-6xl mx-auto px-4 py-16 overflow-hidden ${styles.container}`}>
          {/* Rhizomatic Background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-zinc-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
            <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-zinc-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
          </div>

          {/* Book Info Container */}
          <div className={`${styles.infoContainer} mb-16`}>
            <div className={styles.bookCover}>
              <Image
                src={imageUrl}
                alt={`Cover of ${bookPost.title}`}
                width={600}
                height={900}
                priority
                className="rounded-lg shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Meta Sidebar */}
            <aside className="md:col-span-3 space-y-8 md:sticky md:top-8 h-fit">
              <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10 shadow-xl">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-zinc-200 to-white bg-clip-text text-transparent">
                  {bookPost.author}
                </h2>
                <p className="text-zinc-400 mt-2">{bookPost.publishedYear}</p>
                <div className={styles.downloadWrapper}>
                  <a
                    href="https://metaxis.digital"
                    className="mt-4 px-4 py-2 bg-zinc-800/50 hover:bg-zinc-700/50 rounded-lg text-zinc-300 transition-all duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Descargar
                  </a>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="md:col-span-9">
              <h1 className={`${styles.title} text-5xl md:text-7xl font-black mb-8 leading-tight bg-gradient-to-r from-zinc-100 via-white to-zinc-200 bg-clip-text text-transparent`}>
                {bookPost.title}
              </h1>

              <div className={`
                prose prose-invert prose-lg max-w-none
                prose-headings:font-bold prose-headings:text-zinc-100
                prose-p:text-zinc-300 prose-p:leading-relaxed ${styles.description}
                prose-a:text-zinc-400 prose-a:no-underline hover:prose-a:text-zinc-300
                prose-blockquote:border-l-zinc-500 
                prose-blockquote:rounded-lg
                prose-strong:text-zinc-200
                prose-code:text-zinc-300 prose-code:bg-zinc-800/50 prose-code:px-1 prose-code:rounded
                [&>*:first-child]:mt-0
              `}
                dangerouslySetInnerHTML={{ __html: bookPost.contentHtml }}
              />
            </main>
          </div>
        </article>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 to-black">
        <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-8 border border-white/10 shadow-2xl max-w-md w-full mx-4">
          <h1 className="text-3xl font-bold text-white mb-4">Post not found</h1>
          <p className="text-zinc-400">The requested post could not be found in the rhizome of knowledge.</p>
        </div>
      </div>
    );
  }
}