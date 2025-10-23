import ArenaContent from '@/components/arenaContent/ArenaContent';
import BlogListing from '@/components/blogListing/BlogListing'
import BooksSliderWrapper from '@/components/bookSlider';

export default function Home() {
  return (
    <>
      <BlogListing />
      <BooksSliderWrapper />
      <ArenaContent />
    </>
  );
}
