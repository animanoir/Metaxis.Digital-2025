import { getSortedBookPostData } from '@/lib/bookPosts';
import BooksSlider from './BooksSlider';

const BooksSliderWrapper = () => {
  const allBooks = getSortedBookPostData();

  // Get the latest 10 books
  const latestBooks = allBooks.slice(0, 10).map(book => ({
    id: book.id,
    title: book.title,
    author: book.author,
    description: book.description,
    image: book.image,
    slug: book.slug,
  }));

  return <BooksSlider books={latestBooks} />;
};

export default BooksSliderWrapper;
