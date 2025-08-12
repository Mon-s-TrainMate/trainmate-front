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
        <section className="flex h-30 items-center justify-center text-center">
          <h2 className="sr-only">저장된 운동</h2>
          <p className="self-center text-sm text-gray-2">
            등록된 운동이 없습니다.
            <br />
            새로운 운동을 등록해보세요.
          </p>
        </section>
        <section className="flex justify-between text-base font-light text-gray-2">
          <h2 className="sr-only">총 운동 시간 및 칼로리</h2>
          <p className="flex items-center gap-4">
            time <span className="text-2xl text-main-2">0000</span>
          </p>
          <p className="flex items-center gap-4 font-light">
            total{' '}
            <span className="text-2xl text-main-2">
              0000
              <span className="text-base text-gray-1"> kcal</span>
            </span>
          </p>
        </section>
      </div>
      <div className="pt-3 pr-6 pb-3 pl-6">
        <Button>저장하기</Button>
      </div>
    </aside>
  );
}
