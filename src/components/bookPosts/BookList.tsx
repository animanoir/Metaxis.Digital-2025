import { getSortedPostData } from '@/lib/bookPosts';
import Image from 'next/image';
import styles from "./BookList.module.css";

const BookList = () => {
  const posts = getSortedPostData();

  return (
    <div className="min-h-screen bg-900 text-100 p-8 max-w-6xl mx-auto">
      <h1 className={styles.title}>
        Biblioteca de metaxis.digital
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => post && (
          <article
            key={post.id}
            className="group relative overflow-hidden rounded-lg bg-800/50 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-800/70 hover:scale-[1.02]"
          >
            <div className="aspect-[2/3] overflow-hidden rounded-lg mb-4">
              {post.mainImage && (
                <Image
                  src={post.mainImage}
                  alt={`Libro: ${post.title} escrito por ${post.author}`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"  // Responsive sizing
                  width={600}
                  height={800}
                  className="object-contain w-full h-full transition-all duration-500 group-hover:scale-110"
                  loading="lazy"
                  quality={75}
                />
              )}
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold tracking-tight line-clamp-2">
                {post.title}
              </h2>

              <p className="text-sm text-zinc-400  min-h-[3rem]">
                {post.description || 'No description available'}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BookList;