'use client';

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import styles from './ArenaContent.module.css';

const getTime = () => {
  const date = new Date();
  const currentTime = [date.getHours(), date.getMinutes(), date.getSeconds()].map((a) =>
    a < 10 ? '0' + a : a
  );
  return currentTime.join(' : ');
};

const ArenaContent = () => {
  interface Content {
    id: number;
    title: string;
    image?: {
      square: {
        url: string;
      };
      original: {
        url: string;
      };
    };
    source?: {
      url: string;
    };
  }

  const [arenaContent, setArenaContent] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);
  const [time, setTime] = useState(getTime());

  const handleMouseOver = useCallback(() => {
    setHovering(true);
  }, []);

  const handleMouseOut = useCallback(() => {
    setHovering(false);
  }, []);

  const fetchUrl = useMemo(() =>
    'https://api.are.na/v2/channels/metaxis-digital/contents?per=19&sort=position&direction=desc',
    []
  );

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    const fetchData = async () => {
      try {
        const response = await fetch(fetchUrl);
        if (!response.ok) {
          throw new Error(`No se pudieron obtener las imágenes por alguna extraña razón..: ${response.status}`);
        }
        const data = await response.json();
        const { contents } = data;
        setArenaContent(contents);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [fetchUrl]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <p className={styles.loading}>~·:| ⡷⠂ cargando inspiración ⠐⢾ |:·~</p>;
  }

  if (error) {
    return <p>Hubo un error al cargar la inspiración: {error}</p>;
  }

  return (
    <div id="inspiración" className={styles.container}>
      <h2 className={styles.title}>
        <a
          href="https://www.are.na/degrees-degrees-bullet-period/metaxis-digital"
          target="_blank"
          rel="noopener noreferrer"
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onFocus={handleMouseOver}
          onBlur={handleMouseOut}
        >
          {hovering ? '++++++++++' : '( are.na)'}
        </a>
        <p className={styles.time}>{time}</p>
      </h2>
      {arenaContent.map((content) => {
        return (
          <div key={content.id}>
            {content.image ? (
              <a
                href={content.source?.url ? content.source.url : content.image.original.url}
                target="_blank"
                rel="noreferrer"
                aria-label="Enlace a inspiración"
              >
                <img
                  className={styles.image}
                  src={content.image.square.url}
                  alt={content.title}
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
};

export default ArenaContent;