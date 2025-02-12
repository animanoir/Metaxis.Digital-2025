import Image from 'next/image';
import amalgalmasImg from '@/app/assets/images/amalgalmas.jpg';
import ArenaContent from '@/components/arenaContent/ArenaContent';

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
      <ArenaContent />
    </>
  );
}
