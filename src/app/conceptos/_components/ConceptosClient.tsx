'use client'

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import styles from '../conceptos.module.css';

interface Concept {
  fieldValue: string;
  totalCount: number;
}

interface ConceptosClientProps {
  group: Concept[];
}

// Define a stable color palette
const COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD',
  '#D4A5A5', '#9B6B6B', '#77A1D3', '#79CBCA', '#E684AE'
];

export default function ConceptosClient({ group }: ConceptosClientProps) {
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
        placeholder="Buscar concepto..."
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