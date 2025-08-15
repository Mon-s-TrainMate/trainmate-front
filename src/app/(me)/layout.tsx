import { getUsersMe } from '@/features/auth/actions/me';
import { getMyProfile } from '@/features/member/api/get-my-profile';
import { getMyProfileQueryKey, getUsersQueryKey } from '@/lib/query-key';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { ReactNode } from 'react';
import { App } from './_ui/app';

interface LayoutProps {
  children?: ReactNode;
}
export default async function Layout({ children }: LayoutProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: getUsersQueryKey('me'),
    queryFn: getUsersMe,
  });
  await queryClient.prefetchQuery({
    queryKey: getMyProfileQueryKey(),
    queryFn: getMyProfile,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <App>{children}</App>
    </HydrationBoundary>
  );
}
