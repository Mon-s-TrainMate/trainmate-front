'use client';

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h2 className="text-2xl font-bold">오류 발생</h2>
      <Button variant="secondary" onClick={reset}>
        재시도
      </Button>
    </div>
  );
}
