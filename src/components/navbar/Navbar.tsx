'use client'

import { useState, useEffect, useCallback } from 'react'
import styles from './Navbar.module.css'
import Link from "next/link";
// import boletinSvg from '@/assets/svg/boletinSvg.svg'
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

  const updateScrollPosition = useCallback(
    throttle(() => {
      setScrollY(window.pageYOffset)
    }, 50),
    []
  )

  useEffect(() => {
    window.addEventListener('scroll', updateScrollPosition)
    return () => {
      window.removeEventListener('scroll', updateScrollPosition)
    }
  }, [updateScrollPosition])

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
    <nav className={styles.container}>
      <div>
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
      <ul className={styles.menulist}>
        <li>
          <Link href="/Acerca">
            Acerca
          </Link>
        </li>
        <li>
          <Link href="/Colabora">
            <b>¡Colabora!</b>
          </Link>
        </li>
        <li>
          <Link href="/Biblioteca">
            <b>Biblioteca</b>
          </Link>
        </li>
        <li>
          <Link href="/Conceptos">
            Conceptos
          </Link>
        </li>
        <li>
          <Link href="/Eventos">
            Eventos
          </Link>
        </li>
        <li id={styles.suscribirseBoletin}>
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

