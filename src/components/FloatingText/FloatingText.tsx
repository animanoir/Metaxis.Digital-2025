'use client'

import { useEffect, useState } from 'react';

interface FloatingTextProps {
  text: string;
}

export default function FloatingText({ text }: FloatingTextProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [duration, setDuration] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Random position within viewport
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 50);
    setPosition({ x, y });

    const randomDuration = 0.1 + Math.random() * 0.5;
    setDuration(randomDuration);

    // Trigger fade in after component mounts
    const fadeInTimer = setTimeout(() => {
      setMounted(true);
      setOpacity(1);
    }, 50);

    // Random fade out timing between 1000ms and 2500ms
    const fadeOutTimer = setTimeout(() => {
      setOpacity(0);
    }, Math.random() * 1500 + 1000);

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(fadeOutTimer);
    };
  }, []);

  return (
    <div
      className='text-black'
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        opacity: mounted ? opacity : 0,
        transition: `opacity ${duration}s cubic-bezier(0.4, 0, 0.2, 1)`,
        pointerEvents: 'none',
        zIndex: 50,
        fontSize: '1.5rem',
        fontFamily: 'karla',
      }}
    >
      {text}
    </div>
  );
}