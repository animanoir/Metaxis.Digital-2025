import type { Metadata } from "next";
import { Courier_Prime, Montserrat, Lora, Karla } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/footer/Footer";
import NewsletterForm from "@/app/components/newsletterForm/NewsletterForm";
import { ReactLenis } from "lenis/react";
import amalgalmasImg from '@/app/assets/images/amalgalmas.jpg';
import AdSense from "@/app/components/adSenseScript/AdSenseScript";
import { NextIntlClientProvider, Locale, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getTranslations, getMessages } from 'next-intl/server';

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const courierPrime = Courier_Prime({
  variable: "--font-courier-prime",
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),
  title: {
    default: 'metaxis.digital',
    template: '%s | metaxis.digital',
  },
  description: 'Curated digital library and thought-provoking journal exploring the intersection of arts, sciences, and philosophy with a forward-thinking perspective on modern consciousness and future possibilities.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'metaxis.digital',
    images: [{ url: amalgalmasImg.src }]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@metaxis_digital',
    images: [{ url: amalgalmasImg.src }],
  },
}

export default async function RootLayout({
  children, params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Get the messages for the client
  const messages = await getMessages();

  return (
    <html lang={locale}>
      {process.env.NEXT_PUBLIC_ADSENSE_PID && (
        <AdSense pId={process.env.NEXT_PUBLIC_ADSENSE_PID} />
      )}

      <body
        className={`${montserrat.variable} ${courierPrime.variable} ${lora.variable} ${karla.variable}  antialiased  bg-gray-50`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          <ReactLenis root >
            <div className="vertical-line-left border-black" />
            <div className="vertical-line-right border-black" />
            <main style={{
              transform: "translateY(-20px)"
            }}>
              {children}
            </main>
            <NewsletterForm />
            <Footer />
          </ReactLenis>
        </NextIntlClientProvider>
      </body>
    </html >
  );
}
