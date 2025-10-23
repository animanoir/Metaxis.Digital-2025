import ArenaContent from '@/components/arenaContent/ArenaContent';
import BlogListing from '@/components/blogListing/BlogListing'
import BooksSliderWrapper from '@/components/bookSlider';
import LatestEventsGrid from '@/components/latestEventsGrid/LatestEventsGrid';

export default function Home() {
  return (
    <>
      <BlogListing />
      <BooksSliderWrapper />
      <LatestEventsGrid />
      <ArenaContent />
    </>
  );
}
