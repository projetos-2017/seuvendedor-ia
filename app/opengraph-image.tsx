import { renderOgImage, OG_IMAGE_SIZE } from '@/lib/seo/ogImage';

export const size = OG_IMAGE_SIZE;
export const contentType = 'image/png';

export default function Image() {
  return renderOgImage(
    'Seu próximo vendedor pode começar agora.',
    'Agente comercial de IA para empresas B2B',
  );
}
