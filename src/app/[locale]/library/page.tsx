import BookList from "@/app/components/bookPosts/BookList";
import { Metadata } from 'next';
import styles from "./biblioteca.module.css"
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),
  title: {
    default: 'Library | metaxis.digital',
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
  const t = useTranslations('library');

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>

        <p className={`${styles.text} font-[Karla] text-gray-800 font-bold`}>
          {t('intro')} <b>{t('great')} <span className={`${styles.title} font-[Karla] text-gray-800 font-bold`}>{t('title')}</span></b> {t('of')} <b>{t('brand')}</b>
          ({t('updating')})
          <span className={styles.typingDots}></span>
        </p>
        <BookList />
      </div>
    </div>
  )
}