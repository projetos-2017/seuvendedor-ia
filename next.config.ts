import type { NextConfig } from "next";
import { SEGMENTS } from "./lib/segments";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Cobre quem tenta acessar a URL do segmento sem o prefixo /segmentos/.
      ...SEGMENTS.map((segment) => ({
        source: `/${segment.slug}`,
        destination: `/segmentos/${segment.slug}`,
        permanent: true,
      })),
      // Alias curto observado nos logs de acesso.
      {
        source: "/seguranca",
        destination: "/segmentos/seguranca-eletronica",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
