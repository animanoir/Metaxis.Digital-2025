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

  const getRandomColor = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;

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
            style={{ backgroundColor: getRandomColor() }}
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