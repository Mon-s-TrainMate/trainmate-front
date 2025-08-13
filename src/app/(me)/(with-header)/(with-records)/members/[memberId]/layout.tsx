import { ReactNode } from 'react';
import { Sidebar } from '../../_ui/sidebar';

interface LayoutProps {
  params: Promise<{ memberId: string }>;
  children?: ReactNode;
}
export default async function Layout({ children, params }: LayoutProps) {
  const { memberId } = await params;
  return (
    <div className="grid h-full min-h-0 grid-cols-[25rem_1fr]">
      <Sidebar memberId={memberId} />
      {children}
    </div>
  );
}
