'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import styles from './Navbar.module.css'
import Link from "next/link";
import { throttle } from 'lodash'
import dynamic from 'next/dynamic';

const Navbar = () => {
  const tesisWords: string[] = [
    'filosofía',
    'arte',
    'fantasmas',
    'meta',
    'tesis',
    'sol',
    'vida',
    'muerte',
    'ser',
    'meditaciones',
    'simbolismo',
    'surrealismo',
    'conciencia',
    'antimateria',
    'materia',
    'capitalismo',
    'tú',
    'ying',
    'posthumanos',
    'amor',
    'blanco',
    'unos',
    'existencialismo',
    'creatividad',
    'leyendas',
    'ultraterrenal',
    'investigación',
    'estrellas',
    'existencia',
    'renacimiento',
    'alma',
    'contemplaciones',
    'analogías',
    'onirismo',
    'percepción',
    'energía oscura',
    'esencia',
    'individualismo',
    'equilibrio',
    'transhumanismo',
    'pasión',
    'claridad',
    'pluralidad',
    'sublimación',
    'catalizador',
    'espíritu',
    'navegación',
    'infinito',
    'horizonte',
    'iluminación',
    'célula',
    'ecosistema',
    'destello',
    'sinestesia',
    'metáfora',
    'renovación',
    'vínculo',
    'universalidad',
    'concatenación',
    'origen',
    'transición',
    'expansión',
    'resiliencia',
    'introspección',
    'horizonte',
    '0',
  ]
  const antitesisWords: string[] = [
    'computación',
    'psicología',
    'matemáticas',
    'antitesis',
    'antimateria',
    'máquinas',
    'socialismo',
    'luna',
    'antimateria',
    'nada',
    'metamorfosis',
    'yo',
    'yang',
    'capitalismo',
    'amor',
    'negro',
    'ceros',
    'cibernética',
    'neurociencia',
    'lógica',
    'contraposición',
    'partículas',
    'robots',
    'comunismo',
    'galaxias',
    'vacío',
    'transformación',
    'ego',
    'dualidad',
    'tecnocracia',
    'ontología',
    'oscuridad',
    'singularidad',
    'fragmentación',
    'confinamiento',
    'vacío existencial',
    'desconexión',
    'finito',
    'horizonte',
    'anulación',
    'partícula',
    'aislamiento',
    'obscuridad',
    'desintegración',
    'paradoja',
    'recesión',
    'análisis',
    'restrictividad',
    'limitación',
    'disolución',
    'saturación',
    'contradicción',
    'fusión',
    'temporalidad',
    'dispersión',
    '1',
  ]

  const getRandomWord = (words: string[]) => {
    return words[Math.floor(Math.random() * words.length)]
  }

  const [tesisAntitesis, setTesisAntitesis] = useState({
    tesis: getRandomWord(tesisWords),
    antitesis: getRandomWord(antitesisWords),
  })
  const [scrollY, setScrollY] = useState(0)
  const [isDispersed, setIsDispersed] = useState(false) // New state variable
  const navRef = useRef(null);
  const dispartionRadius = 50;

  const updateScrollPosition = useCallback(
    throttle(() => {
      setScrollY(window.pageYOffset)
    }, 50),
    []
  )

  const handleKeydown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'p') {
      setIsDispersed((prev) => !prev)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', updateScrollPosition)
    window.addEventListener('keydown', handleKeydown) // Add event listener
    return () => {
      window.removeEventListener('scroll', updateScrollPosition)
      window.removeEventListener('keydown', handleKeydown) // Remove event listener
    }
  }, [updateScrollPosition, handleKeydown])

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
    <nav className={styles.container} ref={navRef} style={isDispersed ? {
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
      <div style={isDispersed ? {
        position: 'absolute',
        top: `${Math.random() * dispartionRadius}vh`,
        left: `${Math.random() * dispartionRadius}vw`,
        transform: `rotate(${Math.random() * 360}deg)`,
      } : {}}>
        <Link href="/">
          <h1 className={styles.title}>
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
      <ul className={styles.menulist} style={isDispersed ? {
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
          <Link href="/acerca">
            Acerca
          </Link>
        </li>
        <li style={isDispersed ? {
          position: 'absolute',
          top: `${Math.random() * dispartionRadius}vh`,
          left: `${Math.random() * dispartionRadius}vw`,
          transform: `rotate(${Math.random() * 360}deg)`,
        } : {}}>
          <Link href="/colaborar">
            <b>¡Colabora!</b>
          </Link>
        </li>
        <li style={isDispersed ? {
          position: 'absolute',
          top: `${Math.random() * dispartionRadius}vh`,
          left: `${Math.random() * dispartionRadius}vw`,
          transform: `rotate(${Math.random() * 360}deg)`,
        } : {}}>
          <Link href="/Biblioteca">
            <b>Biblioteca</b>
          </Link>
        </li>
        <li style={isDispersed ? {
          position: 'absolute',
          top: `${Math.random() * dispartionRadius}vh`,
          left: `${Math.random() * dispartionRadius}vw`,
          transform: `rotate(${Math.random() * 360}deg)`,
        } : {}}>
          <Link href="/Conceptos">
            Conceptos
          </Link>
        </li>
        <li style={isDispersed ? {
          position: 'absolute',
          top: `${Math.random() * dispartionRadius}vh`,
          left: `${Math.random() * dispartionRadius}vw`,
          transform: `rotate(${Math.random() * 360}deg)`,
        } : {}}>
          <Link href="/Eventos">
            Eventos
          </Link>
        </li>
        <li id={styles.suscribirseBoletin} style={isDispersed ? {
          position: 'absolute',
          top: `${Math.random() * dispartionRadius}vh`,
          left: `${Math.random() * dispartionRadius}vw`,
          transform: `rotate(${Math.random() * 360}deg)`,
        } : {}}>
          <Link href="/SuscribirseBoletin">
            {/* <img src={boletinSvg} alt="Suscríbete a nuestro boletín." /> */}
            <span className={styles.glowText}>¡Suscríbete al boletín!</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });