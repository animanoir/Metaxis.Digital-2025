import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ConceptosClient from './_components/ConceptosClient';

interface Concept {
  fieldValue: string;
  totalCount: number;
}

export default async function ConceptosPage() {
  const postsDirectory = path.join(process.cwd(), 'public', 'bookposts');
  const filePaths: string[] = [];

  async function getAllFiles(dirPath: string) {
    const files = await fs.readdir(dirPath);

    for (const file of files) {
      const joinedPath = path.join(dirPath, file);
      const stats = await fs.stat(joinedPath);

      if (stats.isDirectory()) {
        await getAllFiles(joinedPath);
      } else if (file.endsWith('.mdx')) {
        filePaths.push(joinedPath);
      }
    }
  }

  await getAllFiles(postsDirectory);

  const conceptsMap: { [key: string]: Concept } = {};

  for (const filePath of filePaths) {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const { data } = matter(fileContent);

    if (Array.isArray(data.concepts)) {
      data.concepts.forEach((concept: string) => {
        const conceptLower = concept.toLowerCase();
        conceptsMap[conceptLower] = conceptsMap[conceptLower] || {
          fieldValue: concept,
          totalCount: 0,
        };
        conceptsMap[conceptLower].totalCount++;
      });
    }
  }

  const group = Object.values(conceptsMap);

  return <ConceptosClient group={group} />;
}