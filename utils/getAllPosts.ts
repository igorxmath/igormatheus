import { Metadata } from "next";

export type Post = {
  slug: string;
  metadata: Metadata & {
    slug: string;
    date?: string;
    image?: string;
  };
  component: any;
  readingTime: string;
};

const importAll = (r): Promise<Post[]> =>
  Promise.all(
    r.keys().map(async (fileName) => {
      const module = r(fileName);
      const slug = fileName.substr(2).replace(/\/page\.mdx$/, "");

      return {
        slug,
        metadata: module?.metadata,
        component: module?.default,
        readingTime: module?.metadata_readingTime,
      } satisfies Post;
    })
  );

export const getAllPosts = async (): Promise<Post[]> =>
  importAll(
    //@ts-ignore
    require.context("../app/posts/", true, /^\.\/[^\/]+\/page\.mdx$/)
  );

export const getPostBySlug = async (slug: string): Promise<Post> => {
  const module = require(`../app${slug}/page.mdx`);

  return {
    slug,
    component: module?.default,
    metadata: module?.metadata,
    readingTime: module?.metadata_readingTime,
  };
};