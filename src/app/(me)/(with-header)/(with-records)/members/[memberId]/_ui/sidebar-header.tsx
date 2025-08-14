'use client';

import { Button } from '@/components/ui/button';
import { useDepth } from '@/lib/hooks/use-depth';
import { ChevronLeftIcon, PlusCircleIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRecordDate } from '../_hooks/use-record-date';

interface RecordSidebarHeaderProps {
  memberId: string;
}

export function RecordSidebarHeader({ memberId }: RecordSidebarHeaderProps) {
  const { date, setDate } = useRecordDate();
  const router = useRouter();
  const { depth, prev, goto } = useDepth();
  return (
    <header className="flex items-center justify-between border-b bg-white p-6">
      <div className="flex items-center">
        <Button
          variant="icon"
          size="icon"
          onClick={() => {
            if (depth === 0) router.push(`/members/${memberId}`);
            else prev();
          }}
        >
          <ChevronLeftIcon />
        </Button>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.currentTarget.value)}
        />
      </div>
      <div className="flex gap-3">
        <Button variant="icon" size="icon" asChild>
          <Link
            href={`/members/${memberId}/records/new`}
            onClick={() => {
              goto(1);
            }}
          >
            <PlusCircleIcon />
          </Link>
        </Button>
        <Button className="hidden" variant="icon" size="icon" disabled>
          <TrashIcon />
        </Button>
      </div>
    </header>
  );
}
