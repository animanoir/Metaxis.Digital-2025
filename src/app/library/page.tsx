import BookList from "@/components/bookPosts/BookList";
import { Metadata } from 'next';
import styles from "./biblioteca.module.css"


export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),
  title: {
    default: 'Library',
    template: '%s | metaxis.digital',
  },
  description: 'Digital book library',
  openGraph: {
    type: 'website',
    locale: 'en_US',
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
          The <b>Great <span className={`${styles.title} font-[Karla] text-gray-800 font-bold`}>Library</span></b> of <b>metaxis.digital</b> (constantly updated)
          <span className={styles.typingDots}></span>
        </p>
        <BookList />
      </div>
    </div>
  )
}