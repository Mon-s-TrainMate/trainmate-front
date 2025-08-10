'use client';

import { Button } from '@/components/ui/button';
import { useMemberRecordList } from '@/features/member/hooks/use-member-record-list';
import { formatDuration } from '@/lib/time/format-duration';
import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { MemberRecordSummary } from './member-record-summary';

interface MemberRecordWidgetProps {
  memberId: string;
}
export function MemberRecordWidget({ memberId }: MemberRecordWidgetProps) {
  const [date, setDate] = useState('2025-08-05');
  const { data: records = [] } = useMemberRecordList(memberId, date);

  const totalDurationSec = records.reduce(
    (acc, record) => acc + record.totalDurationSec,
    0
  );
  const caloriesBurned = records.reduce(
    (acc, record) => acc + record.caloriesBurned,
    0
  );
  return (
    <div className="flex flex-col gap-y-5.5">
      <div className="flex items-center justify-between font-light tracking-[-1.18px] text-black">
        <div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.currentTarget.value)}
          />
        </div>
        <div className="flex items-center gap-x-5">
          <div className="flex items-center gap-x-4">
            time
            <div className="text-2xl">{formatDuration(totalDurationSec)}</div>
          </div>
          <div className="flex items-center gap-x-4">
            total
            <div className="flex items-end gap-x-2">
              <div className="text-2xl">{caloriesBurned.toLocaleString()}</div>
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
      <div className="flex flex-col items-center justify-center p-6">
        <Button className="w-full max-w-80">
          운동 관리하기
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  );
}
