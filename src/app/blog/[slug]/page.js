export default async function BlogPostPage(props) {
  const params = await props.params;
  return (
    <div>
      <h2>Blog Post</h2>
      <h1>{params.slug}</h1>
    </div>
  )
}