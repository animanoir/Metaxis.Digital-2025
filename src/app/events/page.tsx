import * as React from 'react';
import { Metadata } from 'next';
import EventsPost from '@/components/eventPosts/EventPosts';
import amalgalmasImg from '@/app/assets/images/amalgalmas.jpg';

export const metadata: Metadata = {
  title: 'Study Groups & Workshops',
  description: 'Join our events for artistic & philosophy becoming. Connect with like-minded through study groups & collaborative workshops.',
  openGraph: {
    title: 'Study Groups & Workshops | metaxis.digital',
    description: 'Join our events for artistic & philosophy becoming. Connect with like-minded through study groups & collaborative workshops.',
    images: [{ url: amalgalmasImg.src }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Online Events | metaxis.digital',
    description: 'Join our community events for artistic & philosophy becoming..',
    images: [{ url: amalgalmasImg.src }]
  },
};

const ColaboraPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-8 sm:py-12 md:py-16 overflow-x-hidden w-full">
        <div className="w-full max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto px-4 sm:px-6 md:px-8 md:py-12">
          <h1 className="font-[Montserrat] text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-6 sm:mb-8 md:mb-5 break-words text-left sm:text-center">
            Events, Study Circles & Workshops
          </h1>
          <p className={`font-[Karla] text-gray-600 text-lg sm:text-xl md:text-2xl leading-relaxed mb-6 sm:mb-8 md:mb-10 break-words text-left sm:text-center`}>
            Join our events for <b>artistic & philosophy</b> becoming and <b>connect with like-minded</b> people through <b>study groups</b> & <b>collaborative workshops</b>.
          </p>
        </div>
        <EventsPost />
      </div>
    </>
  );
};

export default ColaboraPage;