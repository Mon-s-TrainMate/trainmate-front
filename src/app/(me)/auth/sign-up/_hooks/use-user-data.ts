import type { SignUpFormSchema } from '@/features/auth/schema';
import { useEffect, useRef } from 'react';
import { getSignUpFormSessionData } from '../_lib/session-data';

export function useUserDataGuard(
  fn: (...args: unknown[]) => unknown,
  keys: (keyof SignUpFormSchema)[]
) {
  const isLoadedRef = useRef(false);
  useEffect(() => {
    if (isLoadedRef.current) return;
    isLoadedRef.current = true;
    const data = getSignUpFormSessionData();
    if (keys.some((k) => data[k] == null)) fn(data as SignUpFormSchema);
  }, [fn, keys]);
}
