import type { Metadata } from 'next';
import './globals.css';
import Providers from './provider';

export const metadata: Metadata = {
  title: 'Trainmate',
  description: 'Trainmate',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="h-dvh overflow-clip bg-gray-5">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
