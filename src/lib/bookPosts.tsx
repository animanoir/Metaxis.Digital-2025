import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

interface BookPost {
  id: string;
  title: string;
  author: string;
  date: string;
  publishedYear: number;
  description: string;
  concepts: string[];
  mainImage: string;
  twitterImage: string;
  content: string;
  slug: string
}

const bookPostsDirectory = path.join(process.cwd(), 'public', 'bookposts');

export function getSortedBookPostData(): BookPost[] {
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
}

export async function getBookPostData(slug: string) {
  const fullPath = path.join(bookPostsDirectory, slug, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  const bookPostWithHtml: BookPost & { contentHtml: string } = {
    id: slug,
    title: matterResult.data.title,
    author: matterResult.data.author,
    date: new Date(matterResult.data.date).toISOString().split('T')[0],
    publishedYear: matterResult.data.publishedYear,
    description: matterResult.data.description,
    concepts: matterResult.data.concepts,
    mainImage: matterResult.data.mainImage,
    twitterImage: matterResult.data.twitterImage,
    content: matterResult.content,
    slug: matterResult.data.slug,
    contentHtml
  }

  return bookPostWithHtml;
}