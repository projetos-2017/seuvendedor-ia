import { renderOgImage, OG_IMAGE_SIZE } from '@/lib/seo/ogImage';
import { SEGMENTS, getSegmentBySlug } from '@/lib/segments';

export const size = OG_IMAGE_SIZE;
export const contentType = 'image/png';

export function generateStaticParams() {
  return SEGMENTS.map((segment) => ({ slug: segment.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const segment = getSegmentBySlug(slug);

  return renderOgImage(
    segment?.headline ?? 'Seu próximo vendedor pode começar agora.',
    segment ? `Agente comercial de IA para ${segment.shortName}` : 'Agente comercial de IA para empresas B2B',
  );
}
