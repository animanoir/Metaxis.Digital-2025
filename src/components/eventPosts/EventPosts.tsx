import { getSortedEventsPostsData } from '@/lib/eventPosts';
import Image from 'next/image';
import Link from 'next/link';

const EventPosts = () => {
  const blogPosts = getSortedEventsPostsData();

  return (
    <div className="min-h-screen bg-900 text-100 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-16">
        {blogPosts.map((post) => post && (
          <Link href={`/events/${post.slug}`} key={post.slug}>
            <article className="group relative overflow-hidden rounded-lg bg-800/50 p-4 backdrop-blur-xs transition-all duration-300 hover:bg-800/70 hover:translate-y-[-4px] cursor-pointer hover:shadow-xl">
              <div className="h-150 overflow-hidden rounded-lg mb-4">
                {post.image && (
                  <Image
                    src={post.image}
                    alt={`Event: ${post.eventName}`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    width={600}
                    height={800}
                    className="object-contain w-full h-full transition-all duration-500 group-hover:scale-105"
                    loading="lazy"
                    quality={90}
                  />
                )}
              </div>
              <div className="space-y-2 mb-4">
                <h2 className="font-[Montserrat] text-3xl text-gray-800 font-bold tracking-normal">
                  {post.eventName}
                </h2>
              </div>
              <div className="mb-4">
                <p className="text-xl text-gray-600 tracking-tight line-clamp-2">
                  <b>Start date: {post.startDate}</b>
                </p>
              </div>
              <div>
                <p className="text-xl text-gray-600 tracking-tight">
                  {post.description}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EventPosts;