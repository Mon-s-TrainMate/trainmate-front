'use client';

import { useIsSm } from '@/lib/hooks/use-is-mobile';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { AppHeader } from './app-header';

interface LayoutProps {
  children?: ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  const isSm = useIsSm();
  const pathname = usePathname();
  return (
    <div className="grid h-full grid-rows-[max-content_1fr]">
      {pathname === '/' || isSm ? <AppHeader /> : <div />}
      {children}
    </div>
  );
}
