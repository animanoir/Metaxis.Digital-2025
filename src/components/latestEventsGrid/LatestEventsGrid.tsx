import { getSortedEventsPostsData } from '@/lib/eventPosts';
import Image from 'next/image';
import Link from 'next/link';

const LatestEventsGrid = () => {
  const allEvents = getSortedEventsPostsData();
  const latestEvents = allEvents.slice(0, 3);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 font-karla">
        Upcoming Events
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestEvents.map((event) => (
          <Link href={`/events/${event.slug}`} key={event.slug}>
            <article className="group relative overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:translate-y-[-4px] cursor-pointer">
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                {event.image && (
                  <Image
                    src={event.image}
                    alt={`Event: ${event.eventName}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-all duration-500 group-hover:scale-110"
                    loading="lazy"
                    quality={90}
                  />
                )}
              </div>

              {/* Text Content at Bottom */}
              <div className="p-6 space-y-3">
                <h3 className="font-karla text-xl text-gray-800 font-bold tracking-tight line-clamp-2">
                  {event.eventName}
                </h3>

                <p className="text-xs md:text-sm text-gray-600 font-lora line-clamp-3">
                  {event.description}
                </p>

                {event.startDate && (
                  <p className="text-xs text-gray-500 font-medium pt-2">
                    {event.startDate}
                  </p>
                )}
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LatestEventsGrid;
