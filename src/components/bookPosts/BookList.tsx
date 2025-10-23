import { getSortedBookPostData } from '@/lib/bookPosts';
import Image from 'next/image';
// import styles from "./BookList.module.css";
import Link from 'next/link';

const BookList = () => {
  const bookPosts = getSortedBookPostData();

  return (
    <div className="mt-4 min-h-screen bg-900 text-100 p-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        {bookPosts.map((bookPost) => bookPost && (
          <Link href={`/library/${bookPost.slug}`} key={bookPost.slug}>
            <article
              key={bookPost.slug}
              className="group relative overflow-hidden rounded-lg transition-all duration-300 hover:translate-y-[-4px] shadow-md cursor-pointer hover:shadow-xl"
            >
              <div className="relative aspect-2/3 overflow-hidden rounded-lg">
                {bookPost.image && (
                  <Image
                    src={bookPost.image}
                    alt={`Libro: ${bookPost.title} escrito por ${bookPost.author}`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"  // Responsive sizing
                    width={600}
                    height={800}
                    className="object-contain w-full h-full"
                    loading="lazy"
                    quality={75}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
                  <h2 className="text-xl text-white font-semibold tracking-tight line-clamp-2">
                    {bookPost.title}
                  </h2>
                  <p className="text-sm text-gray-300 font-medium">
                    {bookPost.author}
                  </p>
                  <p className="text-sm text-gray-200 line-clamp-4">
                    {bookPost.description || 'No hay una discrepción disponible.'}
                  </p>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div >
  );
};

export default BookList;