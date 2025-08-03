import { useEffect, useRef } from 'react';
import { getSignUpFormSessionData } from '../_lib/session-data';
import { SignUpFormSchema } from '../schema';

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
