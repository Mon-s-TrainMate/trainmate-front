'use client';

import { ChevronLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export function Sidebar() {
  const { memberId } = useParams();
  return (
    <aside className="bg-white">
      <header className="flex items-center border-b p-6">
        <Link href={`/members/${memberId}`}>
          <ChevronLeftIcon />
        </Link>
      </header>
    </aside>
  );
}
