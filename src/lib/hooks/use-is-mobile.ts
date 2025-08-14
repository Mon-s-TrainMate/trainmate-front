import { useEffect, useState } from 'react';

export function useIsSm() {
  return useMediaQuery('(width >= 40rem)');
}
export function useIsMd() {
  return useMediaQuery('(width >= 48rem)');
}
export function useIsLg() {
  return useMediaQuery('(width >= 64rem)');
}
export function useIsXl() {
  return useMediaQuery('(width >= 80rem)');
}
export function useIs2xl() {
  return useMediaQuery('(width >= 96rem)');
}

function useMediaQuery(query: string) {
  const [isMatched, setIsMatched] = useState(false);
  useEffect(() => {
    const mql = matchMedia(query);
    setIsMatched(mql.matches);
    mql.addEventListener('change', handler);
    return () => {
      mql.removeEventListener('change', handler);
    };

    function handler(event: MediaQueryListEvent) {
      setIsMatched(event.matches);
    }
  }, [query]);
  return isMatched;
}
