'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { useUsersMe } from '../hooks/use-me';

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { data, isFetched } = useUsersMe();
  const router = useRouter();
  useEffect(() => {
    if (!isFetched || data != null) return;
    router.replace('/auth/sign-in');
  }, [data, isFetched, router]);
  if (data == null) <></>;
  return children;
}
