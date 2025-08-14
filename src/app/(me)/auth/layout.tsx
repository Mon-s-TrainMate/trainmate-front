'use client';

import { ArrowLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

interface LayoutProps {
  children?: ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  return (
    <>
      <button
        className="fixed top-5 left-5 flex size-12 items-center justify-center rounded-full bg-white hover:text-primary active:text-main-1"
        onClick={() => {
          router.back();
        }}
      >
        <ArrowLeftIcon />
      </button>
      {children}
    </>
  );
}
