import Image from 'next/image';
import amalgalmasImg from '@/app/assets/images/amalgalmas.jpg';

export default function Home() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <Image
          src={amalgalmasImg}
          alt="Logo"
          width={300}
          height={300}
        />
      </div>
    </>
    /*     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            <Link href="/biblioteca">Biblioteca</Link>
            <Link href="/blog">Blog</Link>
          </main>
          <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          </footer>
        </div> */
  );
}
