import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export interface PostFrontmatter {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
}

export interface Post {
  frontmatter: PostFrontmatter;
  content: string;
}

function readPostFile(filename: string): Post {
  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf-8');
  const { data, content } = matter(raw);
  return { frontmatter: data as PostFrontmatter, content };
}

export function getAllPosts(): Post[] {
  const filenames = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));
  const posts = filenames.map(readPostFile);
  return posts.sort(
    (a, b) => new Date(b.frontmatter.publishedAt).getTime() - new Date(a.frontmatter.publishedAt).getTime(),
  );
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.frontmatter.slug === slug);
}
