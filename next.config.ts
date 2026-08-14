import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import { SEGMENTS } from "./lib/segments";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
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

const withMDX = createMDX({});

export default withMDX(nextConfig);
