import BookList from "@/components/bookPosts/BookList";
import { Metadata } from 'next';


export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),
  title: {
    default: 'Biblioteca | metaxis.digital',
    template: '%s | metaxis.digital',
  },
  description: 'Biblioteca digital de libros',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: '/',
    siteName: 'metaxis.digital',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@metaxis_digital',
  },
}


export default function Library() {
  return (
    <>
      <BookList />
    </>
  )
}