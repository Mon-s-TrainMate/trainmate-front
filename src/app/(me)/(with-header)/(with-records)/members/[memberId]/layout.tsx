import { ReactNode } from 'react';
import ClientLayout from './_ui/client-layout';

interface LayoutProps {
  params: Promise<{ memberId: string }>;
  children?: ReactNode;
}
export default async function Layout({ children, params }: LayoutProps) {
  const { memberId } = await params;

  return <ClientLayout memberId={memberId}>{children}</ClientLayout>;
}
