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
  const [styles, setStyles] = useState({
    fontSize: '1.5rem',
    fontWeight: '400',
    transform: 'rotate(0deg)',
    color: 'rgba(0, 0, 0, 0.7)',
  });

  useEffect(() => {
    // Random position within viewport
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 50);
    setPosition({ x, y });

    // Random duration for animation
    const randomDuration = 0.1 + Math.random() * 0.3;
    setDuration(randomDuration);

    // Generate random styles
    const randomStyles = {
      fontSize: `${Math.random() * 2 + 0.8}rem`, // Between 0.8rem and 2.8rem
      fontWeight: `${Math.floor(Math.random() * 4 + 3) * 100}`, // 300-700
      transform: `rotate(${Math.random() * 40 - 20}deg)`, // -20deg to +20deg
      color: `rgba(0, 0, 0, ${Math.random() * 0.5 + 0.3})`, // Random opacity
    };
    setStyles(randomStyles);

    // Trigger fade in after component mounts
    const fadeInTimer = setTimeout(() => {
      setMounted(true);
      setOpacity(1);
    }, 50);

    // Random fade out timing
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
      className='text-black z-1000'
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        opacity: mounted ? opacity : 0,
        transition: `opacity ${duration}s cubic-bezier(0.4, 0, 0.2, 1), transform ${duration}s cubic-bezier(0.4, 0, 0.2, 1), font-size ${duration}s cubic-bezier(0.4, 0, 0.2, 1)`,
        pointerEvents: 'none',
        zIndex: 1000,
        fontFamily: 'karla',
        ...styles,
      }}
    >
      {text}
    </div>
  );
}