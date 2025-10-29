import BlogListing from '@/components/blogListing/BlogListing'
import BooksSliderWrapper from '@/components/bookSlider';
import LatestEventsGrid from '@/components/latestEventsGrid/LatestEventsGrid';

export default function Home() {
  return (
    <div className="px-6 py-12 md:px-12 lg:px-24 xl:px-32 space-y-16 md:space-y-20 lg:space-y-24">
      <BlogListing />
      <BooksSliderWrapper />
      <LatestEventsGrid />
    </div>
  );
}
