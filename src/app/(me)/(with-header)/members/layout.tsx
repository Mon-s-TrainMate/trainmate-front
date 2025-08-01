import { authGuard } from '@/features/auth/actions/auth-guard';
import { ReactNode } from 'react';
import { Sidebar } from './_ui/sidebar';

interface LayoutProps {
  children?: ReactNode;
}
export default async function Layout({ children }: LayoutProps) {
  await authGuard();
  return (
    <div className="grid grid-cols-[25rem_1fr] h-full min-h-0">
      <Sidebar />
      {children}
    </div>
  );
}
