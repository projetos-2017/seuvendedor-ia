import { ImageResponse } from 'next/og';

export const OG_IMAGE_SIZE = { width: 1200, height: 630 };

export function renderOgImage(headline: string, badge: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#ffffff',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 32, fontWeight: 600, color: '#18181f' }}>
          Seu Vendedor<span style={{ color: '#4f46e5' }}>IA</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              display: 'flex',
              alignSelf: 'flex-start',
              fontSize: 22,
              color: '#8a8a97',
              border: '1px solid #d5d5dd',
              borderRadius: 999,
              padding: '8px 20px',
            }}
          >
            {badge}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 56,
              fontWeight: 600,
              color: '#18181f',
              lineHeight: 1.15,
              maxWidth: 980,
            }}
          >
            {headline}
          </div>
        </div>
      </div>
    ),
    { ...OG_IMAGE_SIZE },
  );
}
