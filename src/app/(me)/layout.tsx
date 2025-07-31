import { getUsersMe } from '@/features/auth/actions/me';
import { getUsersQueryKey } from '@/lib/users/query-key';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { ReactNode } from 'react';
import { AppSidebar } from './_app-sidebar';

interface LayoutProps {
  children?: ReactNode;
}
export default async function Layout({ children }: LayoutProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: getUsersQueryKey('me'),
    queryFn: getUsersMe,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="grid grid-cols-[max-content_1fr] h-full overflow-clip">
        <AppSidebar />
        <main>{children}</main>
      </div>
    </HydrationBoundary>
  );
}
