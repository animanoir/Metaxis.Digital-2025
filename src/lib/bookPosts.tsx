import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { cache } from 'react';

interface BookPost {
  id: string;
  title: string;
  author: string;
  date: string;
  publishedYear: number;
  description: string;
  concepts: string[];
  image: string;
  twitterImage: string;
  content: string;
  slug: string
}

const bookPostsDirectory = path.join(process.cwd(), 'public', 'bookposts');

const buildSlugPathMap = cache(() => {
  const map = new Map<string, string>();
  const directories = fs.readdirSync(bookPostsDirectory);

  directories.forEach(dir => {
    const dirPath = path.join(bookPostsDirectory, dir);
    if (!fs.statSync(dirPath).isDirectory()) return;

    const files = fs.readdirSync(dirPath);
    const mdxFile = files.find(file => file.endsWith('.mdx'));
    if (!mdxFile) return;

    const fullPath = path.join(dirPath, mdxFile);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    if (data.slug) {
      map.set(data.slug, fullPath);
    }
  });

  return map;
});

export const getSortedBookPostData = cache((): BookPost[] => {
  // Get directories under /bookposts
  const directories = fs.readdirSync(bookPostsDirectory);

  const allPostsData = directories.map(directory => {
    const directoryPath = path.join(bookPostsDirectory, directory);

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
    const image = files.find(file =>
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
      concepts: matterResult.data.concepts ?? matterResult.data.conceptos ?? [],
      image: image ? getImagePath(directory, image) : '',
      twitterImage: twitterImage ? getImagePath(directory, twitterImage) : '',
      content: matterResult.content,
      slug: matterResult.data.slug
    }

    return bookPost;
  }).filter((post): post is BookPost => Boolean(post)); // Remove null entries

  // Sort posts by date with non-null assertion
  return allPostsData.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;  // Sort in descending order (newest first)
  });
});

// ...existing code...

export const getBookPostData = cache(async (slug: string) => {
  const pathMap = buildSlugPathMap();
  const fullPath = pathMap.get(slug);

  if (!fullPath) {
    throw new Error(`No post found for slug: ${slug}`);
  }

  // Get the directory name from the full path
  const directoryPath = path.dirname(fullPath);
  const dirName = path.basename(directoryPath);

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  // Process the image paths
  const { image, imageTwitter, title, description, author, date, publishedYear, concepts, ...otherData } = matterResult.data;
  const resolvedConcepts = concepts ?? matterResult.data.conceptos ?? [];

  // Convert relative paths to absolute
  const processedImage = image && image.startsWith('./') ? `/bookposts/${dirName}/${image.slice(2)}` : image;
  const processedImageTwitter = imageTwitter && imageTwitter.startsWith('./') ? `/bookposts/${dirName}/${imageTwitter.slice(2)}` : imageTwitter;

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  return {
    ...otherData,
    image: processedImage,
    imageTwitter: processedImageTwitter,
    contentHtml: processedContent.toString(),
    slug,
    title,
    description,
    author,
    date,
    publishedYear,
    concepts: resolvedConcepts
  };
});
