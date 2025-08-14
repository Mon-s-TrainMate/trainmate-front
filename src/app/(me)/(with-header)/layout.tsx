import { ReactNode } from 'react';
import { AppHeader } from './app-header';

interface LayoutProps {
  children?: ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="grid h-full grid-rows-[max-content_1fr]">
      <AppHeader />
      {children}
    </div>
  );
}
