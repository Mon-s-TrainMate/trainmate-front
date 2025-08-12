'use client';

import { ChevronLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function Sidebar() {
  const { memberId } = useParams();
  return (
    <aside className="bg-white">
      <header className="flex items-center border-b p-6">
        <Link href={`/members/${memberId}`}>
          <ChevronLeftIcon />
        </Link>
      </header>
      <div className="flex h-30 items-center justify-center p-6 text-center">
        <p className="text-sm text-gray-2">
          등록된 운동이 없습니다.
          <br />
          새로운 운동을 등록해보세요.
        </p>
      </div>
      <div className="pt-3 pr-6 pb-3 pl-6">
        <Button className="">저장하기</Button>
      </div>
    </aside>
  );
}
