import { useCallback, useRef } from 'react';

export function useEvent<Args extends unknown[], Return>(
  callback: (...args: Args) => Return
) {
  const callbackRef = useRef<(...args: Args) => Return>(null!);
  callbackRef.current = callback;
  return useCallback((...args: Args): Return => {
    return callbackRef.current(...args);
  }, []);
}
