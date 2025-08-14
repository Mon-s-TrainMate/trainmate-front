'use client';

import { useIsSm } from '@/lib/hooks/use-is-mobile';
import { ReactNode } from 'react';
import { AppSidebar } from './app-sidebar';

interface AppProps {
  children?: ReactNode;
}
export function App({ children }: AppProps) {
  const isSm = useIsSm();

  return (
    <div className="grid h-full overflow-auto sm:grid-cols-[max-content_1fr]">
      {isSm && <AppSidebar />}
      <main className="h-full min-h-0 min-w-0 overflow-auto">{children}</main>
    </div>
  );
}
