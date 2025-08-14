'use client';

import { Button } from '@/components/ui/button';
import { useMemberRecordList } from '@/features/workouts/hooks/use-member-record-list';
import { sumBy } from '@/lib/array/sum-by';
import { formatDuration } from '@/lib/time/format-duration';
import { formatISO } from 'date-fns';
import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { MemberRecordSummary } from './member-record-summary';

interface MemberRecordWidgetProps {
  memberId: string;
}
export function MemberRecordWidget({ memberId }: MemberRecordWidgetProps) {
  const [date, setDate] = useState(() =>
    formatISO(new Date(), { representation: 'date' })
  );
  const { data: records = [] } = useMemberRecordList(memberId, date);

  const totalDurationSec = sumBy(records, 'totalDurationSec');
  const caloriesBurned = sumBy(records, 'caloriesBurned');
  return (
    <div className="flex flex-col gap-y-5.5">
      <div className="flex flex-wrap items-center justify-between font-light tracking-[-1.18px] text-black">
        <div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.currentTarget.value)}
          />
        </div>
        <div className="flex flex-wrap items-center gap-x-5">
          <div className="flex items-center gap-x-4 text-xs text-gray-2 @lg:text-base">
            time
            <div className="text-base text-gray-1 @lg:text-2xl">
              {formatDuration(totalDurationSec)}
            </div>
          </div>
          <div className="flex items-center gap-x-4 text-xs text-gray-2 @lg:text-base">
            total
            <div className="flex items-end gap-x-2 text-gray-1">
              <div className="text-base @lg:text-2xl">
                {caloriesBurned.toLocaleString()}
              </div>
              kcal
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        {records.map((record) => (
          <Link
            href={`/members/${memberId}/records/${record.id}`}
            key={record.id}
          >
            <MemberRecordSummary {...record} />
          </Link>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center py-6 @lg:px-6">
        <Button className="w-full @lg:max-w-80" asChild>
          <Link href={`/members/${memberId}/records/new`}>
            운동 관리하기
            <ChevronRightIcon />
          </Link>
        </Button>
      </div>
    </div>
  );
}
