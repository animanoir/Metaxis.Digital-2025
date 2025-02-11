import { getBookPostData, getSortedBookPostData } from "@/lib/bookPosts";

interface BibliotecaPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: { params: { slug: string } }) {

  const bookPosts = getSortedBookPostData();
  const { slug } = params;

  const bookPost = bookPosts.find(bookPost => bookPost.slug === slug);

  if (!bookPost) {
    return {
      title: "Post not found",
      description: "",
      image: "",
      twitterImage: ""
    };
  }

  return {
    title: bookPost.title,
    description: bookPost.description,
    image: bookPost.mainImage,
    mainImage: bookPost.mainImage
  }
}


export default async function BookPost({ params }: BibliotecaPageProps) {

  // const bookPost = getSortedPostData();
  const { slug } = params;
  console.info('slug', slug);
  //if (!bookPost.find(bookPost => bookPost.slug === slug)) { }

  const { title, publishedYear, contentHtml } = await getBookPostData(slug);
  return <div>
    <h1>{title}</h1>
    <h2>{publishedYear}</h2>
    <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
  </div>
}