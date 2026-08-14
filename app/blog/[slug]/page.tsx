import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { buildBlogPostingSchema } from '@/lib/seo/blogPostingSchema';
import { SITE_URL } from '@/app/layout';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.frontmatter.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    alternates: { canonical: `/blog/${post.frontmatter.slug}` },
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      type: 'article',
      publishedTime: post.frontmatter.publishedAt,
    },
    twitter: {
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
    },
  };
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const schema = buildBlogPostingSchema({
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    url: `${SITE_URL}/blog/${post.frontmatter.slug}`,
    datePublished: post.frontmatter.publishedAt,
  });

  return (
    <div className="min-h-screen bg-ink-950">
      <Header />
      <main className="px-6 py-24">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <article className="mx-auto max-w-3xl">
          <p className="text-xs uppercase tracking-wide text-ink-500">
            {formatDate(post.frontmatter.publishedAt)}
          </p>
          <h1 className="mt-2 text-4xl font-medium tracking-tight text-ink-50 sm:text-5xl">
            {post.frontmatter.title}
          </h1>
          <p className="mt-4 text-lg text-ink-300">{post.frontmatter.excerpt}</p>

          <div className="prose prose-invert mt-12 max-w-none prose-headings:font-medium prose-headings:text-ink-50 prose-p:text-ink-300 prose-a:text-brand-600 prose-strong:text-ink-100 prose-li:text-ink-300">
            <MDXRemote source={post.content} />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
