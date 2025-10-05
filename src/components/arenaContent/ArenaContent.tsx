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
  const offsets = ['0rem', '1rem', '-1rem', '2rem', '-2rem'] as const;
  return offsets[Math.floor(Math.random() * offsets.length)];
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
          No hay inspiración disponible en este momento.
        </p>
      );
    }

    return (
      <div id="inspiración" className={styles.container}>
        {arenaContent.map((content) => {
          const randomStyle = {
            transform: `translateX(${getRandomOffset()}) translateY(${getRandomOffset()})`,
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
                    width={100}
                    height={100}
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
        Hubo un error al cargar la inspiración: {message}
      </p>
    );
  }
}