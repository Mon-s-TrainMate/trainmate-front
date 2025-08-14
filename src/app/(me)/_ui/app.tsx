'use client';

import { useIsSm } from '@/lib/hooks/use-is-mobile';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { AppSidebar } from './app-sidebar';

interface AppProps {
  children?: ReactNode;
}
export function App({ children }: AppProps) {
  const isSm = useIsSm();
  const pathname = usePathname();

  return (
    <div className="grid h-full grid-cols-[max-content_1fr] overflow-auto">
      {pathname === '/' || isSm ? <AppSidebar /> : <div />}
      <main className="h-full min-h-0 min-w-0 overflow-auto">{children}</main>
    </div>
  );
}
