import type { Metadata } from 'next';
import { AppSidebar } from './app-sidebar';
import './globals.css';

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
      <body className="grid grid-cols-[max-content_1fr] h-dvh overflow-clip">
        <AppSidebar />
        <main>{children}</main>
      </body>
    </html>
  );
}
