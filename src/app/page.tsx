import ArenaContent from '@/components/arenaContent/ArenaContent';
import BlogListing from '@/components/blogListing/BlogListing'

export default function Home() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <BlogListing />
      </div>
      <ArenaContent />
    </>
  );
}
