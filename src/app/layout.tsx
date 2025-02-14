import type { Metadata } from "next";
import { Geist, Geist_Mono, Courier_Prime, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import NewsletterForm from "@/components/newsletterForm/NewsetterForm";


const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: 'swap',
});

const courierPrime = Courier_Prime({
  variable: "--font-courier-prime",
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${courierPrime.variable} ${spaceGrotesk.variable} antialiased  bg-gray-50`}
      >
        <Navbar />
        <main className="mt-8 mb-48" >
          <div className="vertical-line-left" />
          {children}
          <div className="vertical-lline-right" />

        </main>
        <NewsletterForm />
        <Footer />
      </body>
    </html>
  );
}
