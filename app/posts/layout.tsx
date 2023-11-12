import { getPostBySlug } from '../../utils/getAllPosts'
import { headers } from "next/headers";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const slug = headers().get("x-next-article-slug") as string;
  const post = await getPostBySlug(slug)

  return (
    <article className="prose py-6 prose-invert">
      <h1>{post.metadata.title}</h1>
      {post.metadata.description && <p className='mt-0 text-xl'>{post.metadata.description}</p>}
      <hr />
      {children}
    </article>
  )
}