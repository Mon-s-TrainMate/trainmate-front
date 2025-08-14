'use client';
import { Button } from '@/components/ui/button';
import { useMemberRecordList } from '@/features/workouts/hooks/use-member-record-list';
import { sumBy } from '@/lib/array/sum-by';
import { useDepth } from '@/lib/hooks/use-depth';
import { formatDuration } from '@/lib/time/format-duration';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { useRecordDate } from '../_hooks/use-record-date';

interface SidebarProps {
  memberId: string;
}
export function Sidebar({ memberId }: SidebarProps) {
  const { date } = useRecordDate();
  const { data: records = [] } = useMemberRecordList(memberId, date);

  const totalTime = sumBy(records, 'totalDurationSec');
  const totalCalories = sumBy(records, 'caloriesBurned');

  return (
    <aside className="bg-white">
      <div className="flex flex-col gap-3 p-6">
        <section className="flex items-center justify-center text-center">
          <h2 className="sr-only">저장된 운동</h2>
          {records.length === 0 ? (
            <p className="self-center pt-12 pb-12 text-sm text-gray-2">
              등록된 운동이 없습니다.
              <br />
              새로운 운동을 등록해보세요.
            </p>
          ) : (
            <div className="flex w-full flex-col gap-y-3">
              {records.map((record) => (
                <NavLink
                  key={record.id}
                  href={`/members/${memberId}/records/${record.id}`}
                >
                  <div className="flex items-center gap-2">
                    {record.isTrainer ? (
                      <div className="size-1 rounded-full bg-main-2"></div>
                    ) : (
                      <div className="size-1 rounded-full bg-gray-2"></div>
                    )}
                    <p className="text-lg font-normal text-black">
                      {record.exerciseName}
                    </p>
                  </div>
                  <p className="text-2xl font-light text-black">
                    {record.caloriesBurned}{' '}
                    <span className="text-sm font-light text-gray-1">kcal</span>
                  </p>
                </NavLink>
              ))}
            </div>
          )}
        </section>
        <section className="flex justify-between py-3 text-base font-light text-gray-2">
          <h2 className="sr-only">총 운동 시간 및 칼로리</h2>
          <p className="flex items-center gap-4">
            time
            <span className="text-2xl text-main-2">
              {formatDuration(totalTime)}
            </span>
          </p>
          <p className="flex items-center gap-4 font-light">
            total
            <span className="text-2xl text-main-2">
              {totalCalories}
              <span className="text-base text-gray-1"> kcal</span>
            </span>
          </p>
        </section>
      </div>
      <div className="pt-3 pr-6 pb-3 pl-6">
        <Button disabled>저장하기</Button>
      </div>
    </aside>
  );
}

interface NavLinkProps {
  href: string;
  children?: ReactNode;
}
function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const { next } = useDepth();
  return (
    <Link
      href={href}
      data-active={pathname.startsWith(href)}
      className="flex w-full items-center justify-between rounded-md border border-gray-3 p-5 data-[active=true]:border-transparent data-[active=true]:bg-main-5"
      onClick={() => {
        next();
      }}
    >
      {children}
    </Link>
  );
}
