import { renderOgImage, OG_IMAGE_SIZE } from '@/lib/seo/ogImage';
import { getAllPosts, getPostBySlug } from '@/lib/blog';

export const size = OG_IMAGE_SIZE;
export const contentType = 'image/png';

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.frontmatter.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return renderOgImage(post?.frontmatter.title ?? 'Blog', 'Seu Vendedor IA');
}
