import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Conteúdo sobre agentes de IA comerciais, automação de vendas, qualificação de leads e follow-up para empresas B2B.',
  alternates: { canonical: '/blog' },
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-ink-950">
      <Header />
      <main className="px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-medium tracking-tight text-ink-50 sm:text-5xl">Blog</h1>
          <p className="mt-4 text-lg text-ink-300">
            Conteúdo sobre agentes de IA comerciais, automação de vendas e qualificação de leads.
          </p>

          <div className="mt-12 space-y-6">
            {posts.map((post) => (
              <Link
                key={post.frontmatter.slug}
                href={`/blog/${post.frontmatter.slug}`}
                className="block rounded-xl border border-ink-800 bg-ink-900 p-6 transition hover:border-brand-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2"
              >
                <p className="text-xs uppercase tracking-wide text-ink-500">
                  {formatDate(post.frontmatter.publishedAt)}
                </p>
                <h2 className="mt-2 text-xl font-medium text-ink-50">{post.frontmatter.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-400">{post.frontmatter.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
