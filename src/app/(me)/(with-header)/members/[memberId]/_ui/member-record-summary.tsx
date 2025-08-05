'use client';

import { formatDuration } from '@/lib/time/format-duration';
import { cva } from 'class-variance-authority';
import {
  AlarmClockIcon,
  ChevronRightIcon,
  ListCheckIcon,
  ZapIcon,
} from 'lucide-react';
import { FC } from 'react';

const badgeStyles = cva('size-2 min-w-2 rounded-full', {
  variants: {
    isTrainer: {
      true: 'bg-primary',
      false: 'bg-gray-2',
    },
  },
  defaultVariants: {
    isTrainer: false,
  },
});
interface MemberRecordSummaryProps {
  isTrainer: boolean;
  exerciseName: string;
  setCount: number;
  totalDurationSec: number;
  caloriesBurned: number;
}
export function MemberRecordSummary({
  isTrainer,
  exerciseName,
  setCount,
  totalDurationSec,
  caloriesBurned,
}: MemberRecordSummaryProps) {
  return (
    <div className="flex w-full items-center justify-between rounded-t-lg rounded-b-lg bg-white px-6 pt-6 pb-6 shadow-level-1-light">
      <div className="flex items-center gap-x-3">
        <div className={badgeStyles({ isTrainer })}></div>
        <div className="font-bold tracking-[-0.18px] text-black">
          {exerciseName}
        </div>
      </div>
      <div className="flex items-center gap-x-9">
        <div className="flex min-w-100 items-center justify-between gap-x-2">
          <Value Icon={ListCheckIcon} value={setCount} unit="set" />
          <Value
            Icon={AlarmClockIcon}
            value={formatDuration(totalDurationSec)}
          />
          <Value
            Icon={ZapIcon}
            value={caloriesBurned.toLocaleString()}
            unit="kcal"
            primary
          />
        </div>
        <ChevronRightIcon className="text-black" strokeWidth={1.5} />
      </div>
    </div>
  );
}

const valueStyles = cva('text-2xl', {
  variants: {
    primary: {
      true: 'text-primary',
    },
  },
});

interface Props {
  Icon: FC;
  value: number | string;
  unit?: string;
  primary?: boolean;
}
function Value({ Icon, value, unit, primary = false }: Props) {
  return (
    <div className="flex items-center gap-x-3 tracking-[-1.18px]">
      <div className="text-gray-2">
        <Icon />
      </div>
      <div className="flex items-end gap-2 font-light text-black">
        <div className={valueStyles({ primary })}>{value}</div>
        {unit != null && <div>{unit}</div>}
      </div>
    </div>
  );
}
