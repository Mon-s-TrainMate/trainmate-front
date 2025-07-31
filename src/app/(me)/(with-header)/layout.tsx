import { ReactNode } from 'react';
import { AppHeader } from './app-header';

interface LayoutProps {
  children?: ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="grid grid-rows-[6.0625rem_1fr]">
      <AppHeader />
      {children}
    </div>
  );
}
