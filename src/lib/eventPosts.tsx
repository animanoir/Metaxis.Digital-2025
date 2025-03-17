import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface EventPost {
  id: string;
  eventName: string;
  pubDate: string;
  description: string;
  image: string;
  imageTwitter: string;
  content: string;
  slug: string;
  concepts: string[];
  featuredArticle?: boolean;
  startDate?: string;
}

const eventPostsDirectory = path.join(process.cwd(), 'public', 'eventposts');
let slugToPathMap: Map<string, string> | null = null;

function buildSlugPathMap() {
  if (slugToPathMap) return slugToPathMap;

  slugToPathMap = new Map();
  const directories = fs.readdirSync(eventPostsDirectory);

  directories.forEach(dir => {
    const dirPath = path.join(eventPostsDirectory, dir);
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

export function getSortedEventsPostsData(): EventPost[] {
  const directories = fs.readdirSync(eventPostsDirectory);

  const allPostsData = directories.map(directory => {
    const directoryPath = path.join(eventPostsDirectory, directory);

    if (!fs.statSync(directoryPath).isDirectory()) return null;

    const files = fs.readdirSync(directoryPath);
    const mdxFile = files.find(file => file.endsWith('.mdx'));

    if (!mdxFile) return null;

    const getImagePath = (directory: string, imageName: string) => {
      return `/eventposts/${directory}/${imageName}`;
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

    const eventPost: EventPost = {
      id: directory,
      eventName: matterResult.data.eventName,
      pubDate: new Date(matterResult.data.pubDate).toISOString().split('T')[0],
      description: matterResult.data.description,
      concepts: matterResult.data.concepts,
      image: image ? getImagePath(directory, image) : '',
      imageTwitter: twitterImage ? getImagePath(directory, twitterImage) : '',
      content: matterResult.content,
      slug: matterResult.data.slug,
      featuredArticle: matterResult.data.featuredArticle,
      startDate: new Date(matterResult.data.startDate).toLocaleDateString('en-US', {
        weekday: 'long',  // Monday, Tuesday, etc.
        month: 'long',    // January, February, etc.
        day: 'numeric',   // 1, 2, etc.
        year: 'numeric',   // 2025
        timeZone: 'UTC'
      })
    };

    return eventPost;
  }).filter((post): post is EventPost => Boolean(post));

  return allPostsData.sort((a, b) => {
    return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
  });
}

export async function getEventPostData(slug: string) {
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
    ? `/eventposts/${dirName}/${image.slice(2)}`
    : image;
  const processedImageTwitter = imageTwitter?.startsWith('./')
    ? `/eventposts/${dirName}/${imageTwitter.slice(2)}`
    : imageTwitter;

  return {
    id: dirName,
    eventName: otherData.eventName, // Changed from otherData.title to otherData.eventName
    pubDate: new Date(otherData.pubDate).toISOString().split('T')[0],
    description: otherData.description,
    image: processedImage,
    imageTwitter: processedImageTwitter,
    content: matterResult.content,
    contentHtml: matterResult.content,
    slug: otherData.slug,
    concepts: otherData.concepts,
    featuredArticle: otherData.featuredArticle,
    startDate: new Date(otherData.startDate).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC'
    })
  };
}

