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
      <div className="flex flex-col gap-3 p-6">
        <div className="flex h-30 items-center justify-center text-center">
          <p className="self-center text-sm text-gray-2">
            등록된 운동이 없습니다.
            <br />
            새로운 운동을 등록해보세요.
          </p>
        </div>
        <div className="flex justify-between text-base font-light text-gray-2">
          <p className="flex items-center gap-4">
            time <span className="text-2xl text-main-2">00:00:00</span>
          </p>
          <p className="flex items-center gap-4 font-light">
            total{' '}
            <p className="text-2xl text-main-2">
              16,510 <span className="text-base text-gray-1">kcal</span>
            </p>
          </p>
        </div>
      </div>
      <div className="pt-3 pr-6 pb-3 pl-6">
        <Button>저장하기</Button>
      </div>
    </aside>
  );
}
