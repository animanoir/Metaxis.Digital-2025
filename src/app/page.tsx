import BlogListing from '@/components/blogListing/BlogListing'
import BooksSliderWrapper from '@/components/bookSlider';
import LatestEventsGrid from '@/components/latestEventsGrid/LatestEventsGrid';

export default function Home() {
  return (
    <div className="px-8 py-16 md:px-16 lg:px-32 xl:px-48 space-y-16 md:space-y-20 lg:space-y-24">
      <BlogListing />
      <BooksSliderWrapper />
      <LatestEventsGrid />
    </div>
  );
}
