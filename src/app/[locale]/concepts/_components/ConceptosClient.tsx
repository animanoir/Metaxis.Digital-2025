'use client'

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import styles from '../conceptos.module.css';

interface Concept {
  fieldValue: string;
  totalCount: number;
}

interface ConceptosClientProps {
  group: Concept[];
}

// Define a stable color palette with ethereal and mystical tones
const COLORS = [
  '#7B6B9D', // Mystic purple
  '#9B8EA9', // Dusty lavender
  '#88A6B5', // Ethereal blue
  '#B4C5E4', // Celestial periwinkle
  '#C3DFE0', // Misty aqua
  '#A2B9BC', // Foggy sage
  '#D6E3F8', // Dream blue
  '#C8A2C8', // Soft lilac
  '#B4A0CD', // Twilight purple
  '#9CB4CC', // Ocean mist
  '#A5BECC', // Crystal blue
  '#B8B8D1', // Moonstone
  '#C5BAE0', // Evening haze
  '#B0C4DE', // Light steel blue
  '#A9C1D9'  // Morning fog
];

export default function ConceptosClient({ group }: ConceptosClientProps) {
  const t = useTranslations('concepts');
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredConcepts = useMemo(() => {
    return group.filter(({ fieldValue }) =>
      fieldValue.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, group]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  // Get a stable color based on the concept name
  const getStableColor = (conceptName: string) => {
    const index = conceptName.split('').reduce(
      (acc, char) => acc + char.charCodeAt(0), 0
    );
    return COLORS[index % COLORS.length];
  };

  return (
    <main className={styles.maincontainer}>
      <input
        ref={searchInputRef}
        type="text"
        placeholder={t('searchPlaceholder')}
        value={searchTerm}
        onChange={handleSearchChange}
        className={styles.searchbar}
      />
      <ul className={styles.container}>
        {filteredConcepts.map(({ fieldValue: conceptName, totalCount }) => (
          <Link
            key={conceptName}
            href={`/conceptos/${conceptName.toLowerCase()}`}
            className={styles.conceptcard}
            style={{ backgroundColor: getStableColor(conceptName) }}
          >
            <li className={styles.conceptTitle}>
              <span className={styles.conceptName}>{conceptName}</span> ({totalCount})
            </li>
          </Link>
        ))}
      </ul>
    </main>
  );
}