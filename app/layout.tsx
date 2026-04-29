import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ROTOTO BEBE — 전사 대시보드 허브',
  description: '로토토베베 팀별 대시보드 통합 링크 페이지',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
