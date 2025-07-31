import { ReactNode } from 'react';
import { Sidebar } from './_ui/sidebar';

interface LayoutProps {
  children?: ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="grid grid-cols-[25rem_1fr] bg-gray-0.5">
      <Sidebar />
      {children}
    </div>
  );
}
