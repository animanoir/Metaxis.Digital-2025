export default function BlogPostPage({ params }) {
  return (
    <div>
      <h2>Blog Post</h2>
      <h1>{params.slug}</h1>
    </div>
  )
}