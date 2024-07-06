import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        My Portfolio
      </h1>
      <p className="mb-4">
        {`I'm a professional with a degree in Nutrition and experience in healthcare management. 
        Passionate about human physiology and technology, bringing a unique blend of scientific knowledge and leadership abilities to drive organizational success and innovation.
        `}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
