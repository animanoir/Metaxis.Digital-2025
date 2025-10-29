'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import styles from './Navbar.module.css'
import Link from "next/link";
import dynamic from 'next/dynamic';

const tesisWords: string[] = [
  'philosophy',
  'art',
  'ghosts',
  'meta',
  'thesis',
  'sun',
  'life',
  'death',
  'being',
  'meditations',
  'symbolism',
  'surrealism',
  'consciousness',
  'antimatter',
  'matter',
  'capitalism',
  'you',
  'ying',
  'posthumans',
  'love',
  'white',
  'ones',
  'existentialism',
  'creativity',
  'legends',
  'otherworldly',
  'research',
  'stars',
  'existence',
  'rebirth',
  'soul',
  'contemplations',
  'analogies',
  'oneirism',
  'perception',
  'dark energy',
  'essence',
  'individualism',
  'balance',
  'transhumanism',
  'passion',
  'clarity',
  'plurality',
  'becoming',
  'sublimation',
  'catalyst',
  'spirit',
  'navigation',
  'infinite',
  'horizon',
  'illumination',
  'cell',
  'ecosystem',
  'spark',
  'synesthesia',
  'metaphor',
  'renewal',
  'bond',
  'universality',
  'concatenation',
  'origin',
  'transition',
  'expansion',
  'resilience',
  'introspection',
  'horizon',
  '0',
];

const antitesisWords: string[] = [
  'computation',
  'psychology',
  'mathematics',
  'antithesis',
  'antimatter',
  'machines',
  'socialism',
  'moon',
  'antimatter',
  'nothing',
  'metamorphosis',
  'I',
  'yang',
  'capitalism',
  'love',
  'black',
  'zeros',
  'cybernetics',
  'neuroscience',
  'logic',
  'contraposition',
  'particles',
  'robots',
  'communism',
  'galaxies',
  'void',
  'transformation',
  'ego',
  'duality',
  'technocracy',
  'ontology',
  'darkness',
  'singularity',
  'fragmentation',
  'confinement',
  'existential void',
  'disconnection',
  'finite',
  'horizon',
  'annulment',
  'particle',
  'isolation',
  'darkness',
  'disintegration',
  'paradox',
  'recession',
  'analysis',
  'restrictiveness',
  'limitation',
  'dissolution',
  'saturation',
  'contradiction',
  'fusion',
  'temporality',
  'dispersion',
  '1',
];

const throttle = <T extends (...args: unknown[]) => void>(fn: T, wait: number) => {
  let lastTime = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastTime >= wait) {
      lastTime = now;
      fn(...args);
    }
  };
};

const Navbar = () => {
  const getRandomWord = (words: string[]) => {
    return words[Math.floor(Math.random() * words.length)]
  }

  const [tesisAntitesis, setTesisAntitesis] = useState({
    tesis: getRandomWord(tesisWords),
    antitesis: getRandomWord(antitesisWords),
  })
  const [scrollY, setScrollY] = useState(0)
  const [isDispersed, setIsDispersed] = useState(false) // New state variable
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navRef = useRef(null);
  const dispartionRadius = 50;

  const handleKeydown = useCallback((event: KeyboardEvent) => {
    if (event.key === '<') {
      setIsDispersed((prev) => !prev)
    }
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  }

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }

  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrollY(window.pageYOffset)
    }, 50)

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('keydown', handleKeydown) // Add event listener
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('keydown', handleKeydown) // Remove event listener
    }
  }, [handleKeydown])

  useEffect(() => {
    const generateUniqueAntitesis = (tesis: string) => {
      let antitesis = getRandomWord(antitesisWords);
      while (antitesis === tesis) {
        antitesis = getRandomWord(antitesisWords);
      }
      return antitesis;
    };

    const selectedTesis = getRandomWord(tesisWords);
    const selectedAntitesis = generateUniqueAntitesis(selectedTesis);

    setTesisAntitesis({ tesis: selectedTesis, antitesis: selectedAntitesis });
  }, [scrollY]);

  return (
    <nav className={`${styles.container} text-gray-800`} ref={navRef} style={isDispersed ? {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'space-around',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      padding: '2rem',
    } : {}}>
      <div className={styles.mobileMenuButton} onClick={toggleMobileMenu}>
        <div className={`${styles.hamburgerLine} ${mobileMenuOpen ? styles.active : ''}`}></div>
        <div className={`${styles.hamburgerLine} ${mobileMenuOpen ? styles.active : ''}`}></div>
        <div className={`${styles.hamburgerLine} ${mobileMenuOpen ? styles.active : ''}`}></div>
      </div>

      <div className={styles.logoContainer} style={isDispersed ? {
        position: 'absolute',
        top: `${Math.random() * dispartionRadius}vh`,
        left: `${Math.random() * dispartionRadius}vw`,
        transform: `rotate(${Math.random() * 360}deg)`,
      } : {}}>
        <Link href="/">
          <h1 className={`${styles.title} text-[#dc143c]`}>
            <span className={styles.antitesis} style={{ fontWeight: 'normal' }}>
              {' '}
              {tesisAntitesis.tesis} — {tesisAntitesis.antitesis} |{' '}
            </span>
            <span>
              <b>metaxis.digital</b>
            </span>{' '}
          </h1>
        </Link>
      </div>
      <ul className={`${styles.menulist} ${mobileMenuOpen ? styles.menuOpen : ''}`} style={isDispersed ? {
        position: 'absolute',
        top: `${Math.random() * dispartionRadius}vh`,
        left: `${Math.random() * dispartionRadius}vw`,
        transform: `rotate(${Math.random() * 360}deg)`,
        flexDirection: 'column',
      } : {}}>
        <li style={isDispersed ? {
          position: 'absolute',
          top: `${Math.random() * dispartionRadius}vh`,
          left: `${Math.random() * dispartionRadius}vw`,
          transform: `rotate(${Math.random() * 360}deg)`,
        } : {}}>
          <Link href="/about" onClick={handleLinkClick}>
            About
          </Link>
        </li>
        {/* <li style={isDispersed ? {
          position: 'absolute',
          top: `${Math.random() * dispartionRadius}vh`,
          left: `${Math.random() * dispartionRadius}vw`,
          transform: `rotate(${Math.random() * 360}deg)`,
        } : {}}>
          <Link href="/collaborate" onClick={handleLinkClick}>
            Collaborate!
          </Link>
        </li> */}
        {/* <li style={isDispersed ? {
          position: 'absolute',
          top: `${Math.random() * dispartionRadius}vh`,
          left: `${Math.random() * dispartionRadius}vw`,
          transform: `rotate(${Math.random() * 360}deg)`,
        } : {}}>
          <Link href="/concepts" onClick={handleLinkClick}>
            Concepts
          </Link>
        </li> */}
        <li style={isDispersed ? {
          position: 'absolute',
          top: `${Math.random() * dispartionRadius}vh`,
          left: `${Math.random() * dispartionRadius}vw`,
          transform: `rotate(${Math.random() * 360}deg)`,
        } : {}}>
          <Link href="/blog" onClick={handleLinkClick}>
            <b>Custom writing</b>
          </Link>
        </li>
        <li style={isDispersed ? {
          position: 'absolute',
          top: `${Math.random() * dispartionRadius}vh`,
          left: `${Math.random() * dispartionRadius}vw`,
          transform: `rotate(${Math.random() * 360}deg)`,
        } : {}}>
          <Link href="/events" onClick={handleLinkClick}>
            <b>Events</b>
          </Link>
        </li>
        <li style={isDispersed ? {
          position: 'absolute',
          top: `${Math.random() * dispartionRadius}vh`,
          left: `${Math.random() * dispartionRadius}vw`,
          transform: `rotate(${Math.random() * 360}deg)`,
        } : {}}>
          <Link href="/library" onClick={handleLinkClick}>
            <b>Library</b>
          </Link>
        </li>
        <li style={isDispersed ? {
          position: 'absolute',
          top: `${Math.random() * dispartionRadius}vh`,
          left: `${Math.random() * dispartionRadius}vw`,
          transform: `rotate(${Math.random() * 360}deg)`,
        } : {}}>
          <Link href="#newsletter" onClick={(e) => {
            e.preventDefault();
            handleLinkClick();
            const newsletterSection = document.getElementById('newsletter');
            if (newsletterSection) {
              newsletterSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }
          }}>
            <span className={styles.glowText}><b>Subscribe to the Newsletter!</b></span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });

