import type { MetadataRoute } from 'next';
import { SEGMENTS } from '@/lib/segments';
import { getAllPosts } from '@/lib/blog';

const SITE_URL = 'https://seuvendedorai.com.br';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const posts = getAllPosts();

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...SEGMENTS.map((segment) => ({
      url: `${SITE_URL}/segmentos/${segment.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.frontmatter.slug}`,
      lastModified: new Date(post.frontmatter.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
