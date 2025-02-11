import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface BookPost {
  id: string;
  title: string;
  author: string;
  date: string;
  publishedYear: number;
  description: string;
  concepts: string[];
  mainImage: string;      // Changed from images array to single main image
  twitterImage: string;   // Added Twitter image
  content: string;
}

const postsDirectory = path.join(process.cwd(), 'public', 'bookposts');

export function getSortedPostData() {
  // Get directories under /bookposts
  const directories = fs.readdirSync(postsDirectory);

  const allPostsData = directories.map(directory => {
    const directoryPath = path.join(postsDirectory, directory);

    // Skip if not a directory
    if (!fs.statSync(directoryPath).isDirectory()) return null;

    // Find the MDX file in the directory
    const files = fs.readdirSync(directoryPath);
    const mdxFile = files.find(file => file.endsWith('.mdx'));

    if (!mdxFile) return null;

    // Modify the image handling part
    const getImagePath = (directory: string, imageName: string) => {
      return `/bookposts/${directory}/${imageName}`;
    };

    // Find specific images
    const mainImage = files.find(file =>
      file.toLowerCase().endsWith('.jpg') &&
      !file.toLowerCase().includes('-tw.')
    ) || '';

    const twitterImage = files.find(file =>
      file.toLowerCase().includes('-tw.jpg')
    ) || '';

    // Read MDX file as string
    const fullPath = path.join(directoryPath, mdxFile);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Create post object with specific images
    const bookPost: BookPost = {
      id: directory,
      title: matterResult.data.title,
      author: matterResult.data.author,
      date: new Date(matterResult.data.date).toISOString().split('T')[0],
      publishedYear: matterResult.data.publishedYear,
      description: matterResult.data.description,
      concepts: matterResult.data.conceptos,
      mainImage: mainImage ? getImagePath(directory, mainImage) : '',
      twitterImage: twitterImage ? getImagePath(directory, twitterImage) : '',
      content: matterResult.content
    }

    return bookPost;
  }).filter(Boolean); // Remove null entries

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}