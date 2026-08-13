import type { MetadataRoute } from 'next';
import { SEGMENTS } from '@/lib/segments';

const SITE_URL = 'https://seuvendedorai.com.br';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

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
  ];
}
