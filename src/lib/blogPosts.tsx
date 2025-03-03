import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
// import { remark } from 'remark';
// import html from 'remark-html';

interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  description: string;
  image: string;
  imageTwitter: string;
  content: string;
  slug: string;
  concepts: string[];
  authorContact?: string;
  featuredArticle?: boolean;
}

const blogPostsDirectory = path.join(process.cwd(), 'public', 'blogposts');
let slugToPathMap: Map<string, string> | null = null;

function buildSlugPathMap() {
  if (slugToPathMap) return slugToPathMap;

  slugToPathMap = new Map();
  const directories = fs.readdirSync(blogPostsDirectory);

  directories.forEach(dir => {
    const dirPath = path.join(blogPostsDirectory, dir);
    if (!fs.statSync(dirPath).isDirectory()) return;

    const files = fs.readdirSync(dirPath);
    const mdxFile = files.find(file => file.endsWith('.mdx'));
    if (!mdxFile) return;

    const fullPath = path.join(dirPath, mdxFile);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    if (data.slug) {
      slugToPathMap?.set(data.slug, fullPath);
    }
  });

  return slugToPathMap;
}

export function getSortedBlogPostsData(): BlogPost[] {
  const directories = fs.readdirSync(blogPostsDirectory);

  const allPostsData = directories.map(directory => {
    const directoryPath = path.join(blogPostsDirectory, directory);

    if (!fs.statSync(directoryPath).isDirectory()) return null;

    const files = fs.readdirSync(directoryPath);
    const mdxFile = files.find(file => file.endsWith('.mdx'));

    if (!mdxFile) return null;

    const getImagePath = (directory: string, imageName: string) => {
      return `/blogposts/${directory}/${imageName}`;
    };

    const image = files.find(file =>
      file.toLowerCase().endsWith('.jpg') &&
      !file.toLowerCase().includes('-tw.')
    ) || '';

    const twitterImage = files.find(file =>
      file.toLowerCase().includes('-tw.')
    ) || '';

    const fullPath = path.join(directoryPath, mdxFile);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const blogPost: BlogPost = {
      id: directory,
      title: matterResult.data.title,
      author: matterResult.data.author,
      date: new Date(matterResult.data.date).toISOString().split('T')[0],
      description: matterResult.data.description,
      concepts: matterResult.data.concepts,
      image: image ? getImagePath(directory, image) : '',
      imageTwitter: twitterImage ? getImagePath(directory, twitterImage) : '',
      content: matterResult.content,
      slug: matterResult.data.slug,
      authorContact: matterResult.data.authorContact,
      featuredArticle: matterResult.data.featuredArticle
    };

    return blogPost;
  }).filter((post): post is BlogPost => Boolean(post));

  return allPostsData.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export async function getBlogPostData(slug: string) {
  const pathMap = buildSlugPathMap();
  const fullPath = pathMap.get(slug);

  if (!fullPath) {
    throw new Error(`No post found for slug: ${slug}`);
  }

  const directoryPath = path.dirname(fullPath);
  const dirName = path.basename(directoryPath);

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  // const processedContent = await remark()
  //   .use(html)
  //   .process(matterResult.content);

  const { image, imageTwitter, ...otherData } = matterResult.data;

  const processedImage = image?.startsWith('./')
    ? `/blogposts/${dirName}/${image.slice(2)}`
    : image;
  const processedImageTwitter = imageTwitter?.startsWith('./')
    ? `/blogposts/${dirName}/${imageTwitter.slice(2)}`
    : imageTwitter;

  return {
    id: dirName,
    title: otherData.title,
    author: otherData.author,
    date: new Date(otherData.date).toISOString().split('T')[0],
    description: otherData.description,
    image: processedImage,
    imageTwitter: processedImageTwitter,
    // Return the raw content instead of HTML
    content: matterResult.content,
    // Keep contentHtml for backward compatibility if needed
    contentHtml: matterResult.content,
    slug: otherData.slug,
    concepts: otherData.concepts,
    authorContact: otherData.authorContact,
    featuredArticle: otherData.featuredArticle
  };
}