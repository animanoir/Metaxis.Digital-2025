'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type BookPost = {
  id: string;
  title: string;
  author: string;
  description: string;
  image: string;
  slug: string;
};

type BooksSliderProps = {
  books: BookPost[];
};

const BooksSlider = ({ books }: BooksSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % books.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, books.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + books.length) % books.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % books.length);
    setIsAutoPlaying(false);
  };

  if (books.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No books available at the moment.
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-8">Latest books added to the library:</h2>

      <div className="relative">
        {/* Main Slider */}
        <div className="relative h-96 md:h-[500px] overflow-hidden rounded-lg bg-gray-900">
          {books.map((book, index) => (
            <div
              key={book.slug}
              className={`absolute inset-0 transition-opacity duration-700 ${index === currentIndex ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
            >
              <Link href={`/library/${book.slug}`} className="block h-full">
                <div className="relative h-full">
                  {book.image && (
                    <Image
                      src={book.image}
                      alt={`${book.title} by ${book.author}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                      priority={index === 0}
                    />
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent"></div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 space-y-3">
                    <h3 className="text-xl md:text-2xl text-white font-bold line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-300 font-medium">
                      {book.author}
                    </p>
                    <p className="text-xs md:text-sm text-gray-200 line-clamp-3">
                      {book.description}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all backdrop-blur-sm z-10"
          aria-label="Previous book"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all backdrop-blur-sm z-10"
          aria-label="Next book"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {books.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${index === currentIndex
                ? 'bg-white w-8'
                : 'bg-gray-500 hover:bg-gray-400'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BooksSlider;
