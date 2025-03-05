import BookList from "@/components/bookPosts/BookList";
import { Metadata } from 'next';
import styles from "./biblioteca.module.css"


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
    <div className={styles.container}>
      <div className={styles.contentContainer}>

        <p className={`${styles.text} font-[Karla] text-gray-800 font-bold`}>
          La <b>Gran <span className={`${styles.title} font-[Karla] text-gray-800 font-bold`}>Biblioteca</span></b> de <b>metaxis.digital</b> (en constante actualización)
          <span className={styles.typingDots}></span>
        </p>
        <BookList />
      </div>
    </div>
  )
}