import Link from 'next/link';

export default function BlogPage() {
  return (
    <div>
      <h1>Blog</h1>
      <p>Welcome to my blog!</p>
      <ol>
        <li>
          <Link href="/blog/mudando-de-gatsby-para-nextjs">
            <p>Hello World</p>
          </Link>
        </li>
        <li>
          <Link href="/blog/another-post">
            <p>Another Post</p>
          </Link>
        </li>
      </ol>
    </div>
  );
}