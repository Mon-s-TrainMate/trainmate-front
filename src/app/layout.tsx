import type { Metadata } from 'next';
import { AppSidebar } from './app-sidebar';
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
      <body>
        <Providers>
          <div className="grid grid-cols-[max-content_1fr] h-dvh overflow-clip">
            <AppSidebar />
            <main>{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
