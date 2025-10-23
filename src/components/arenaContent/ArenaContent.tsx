import styles from './ArenaContent.module.css';
import Image from 'next/image';

type ArenaContentItem = {
  id: number;
  title: string;
  image?: {
    square: { url: string };
    original: { url: string };
  };
  source?: { url: string };
};

const ARENA_ENDPOINT = 'https://api.are.na/v2/channels/metaxis-digital/contents?per=19&sort=position&direction=desc';

const getRandomOffset = () => {
  const offsets = ['0rem', '2rem', '-2rem', '3rem', '-3rem', '4rem', '-4rem'] as const;
  return offsets[Math.floor(Math.random() * offsets.length)];
};

const getRandomRotation = () => {
  const rotations = ['-2deg', '-1deg', '0deg', '1deg', '2deg'] as const;
  return rotations[Math.floor(Math.random() * rotations.length)];
};

export default async function ArenaContent() {
  try {
    const response = await fetch(ARENA_ENDPOINT, {
      next: { revalidate: 60 * 60 },
    });

    if (!response.ok) {
      throw new Error(`No se pudieron obtener las imágenes por alguna extraña razón..: ${response.status}`);
    }

    const data: { contents?: ArenaContentItem[] } = await response.json();
    const arenaContent = data.contents ?? [];

    if (!arenaContent.length) {
      return (
        <p className="flex justify-center items-center min-h-screen font-mono text-lg text-gray-600">
          There's no inspiration to show at the moment.
        </p>
      );
    }

    return (
      <div id="inspiración" className={styles.container}>
        {arenaContent.map((content) => {
          const randomStyle = {
            transform: `translateX(${getRandomOffset()}) translateY(${getRandomOffset()}) rotate(${getRandomRotation()})`,
          } as const;

          return (
            <div key={content.id} className={styles.imageContainer} style={randomStyle}>
              {content.image ? (
                <a
                  href={content.source?.url ? content.source.url : content.image.original.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Enlace a inspiración"
                >
                  <Image
                    width={200}
                    height={200}
                    className={styles.image}
                    src={content.image.square.url}
                    alt={content.title}
                    loading="lazy"
                    quality={90}
                  />
                </a>
              ) : (
                <p className={styles.title}>{content.title}</p>
              )}
            </div>
          );
        })}
      </div>
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return (
      <p className="flex justify-center items-center min-h-screen font-mono text-lg text-gray-600">
        There was an error loading the inspiration! ({message})
      </p>
    );
  }
}