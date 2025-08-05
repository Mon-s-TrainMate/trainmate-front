'use client';

import { formatDuration } from '@/lib/time/format-duration';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@radix-ui/react-collapsible';
import { cva } from 'class-variance-authority';
import {
  AlarmClockIcon,
  ChevronDownIcon,
  ListCheckIcon,
  ZapIcon,
} from 'lucide-react';
import { FC, useState } from 'react';

const triggerStyles = cva('w-full rounded-t-lg bg-white px-6 pt-6', {
  variants: {
    open: {
      false: 'rounded-b-lg',
    },
  },
});
const triggerContainerStyles = cva('flex items-center justify-between pb-6', {
  variants: {
    open: {
      true: 'border-b',
    },
  },
});
const triggerIconStyles = cva('text-black transition-all', {
  variants: {
    open: {
      true: 'rotate-180 text-primary',
    },
  },
});
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
  const [open, setOpen] = useState(false);
  return (
    <Collapsible
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
      }}
      className="shadow-level-1-light"
    >
      <CollapsibleTrigger asChild>
        <button className={triggerStyles({ open })}>
          <div className={triggerContainerStyles({ open })}>
            <div className="flex items-center gap-x-3">
              <div className={badgeStyles({ isTrainer })}></div>
              <div className="font-bold tracking-[-0.18px] text-black">
                {exerciseName}
              </div>
            </div>
            <div className="flex items-center gap-x-9">
              <div className="flex min-w-100 items-center justify-between gap-x-2">
                <Value
                  Icon={ListCheckIcon}
                  value={setCount}
                  unit="set"
                  isMuted={open}
                />
                <Value
                  Icon={AlarmClockIcon}
                  value={formatDuration(totalDurationSec)}
                  isMuted={open}
                />
                <Value
                  Icon={ZapIcon}
                  value={caloriesBurned.toLocaleString()}
                  unit="kcal"
                  primary
                  isMuted={open}
                />
              </div>
              <ChevronDownIcon
                className={triggerIconStyles({ open })}
                strokeWidth={1.5}
              />
            </div>
          </div>
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="rounded-b-lg bg-white p-6">
        로딩중...
      </CollapsibleContent>
    </Collapsible>
  );
}

const valueContainerStyles = cva(
  'flex items-end gap-2 font-light transition-colors',
  {
    variants: {
      isMuted: {
        true: 'text-gray-2',
        false: 'text-black',
      },
    },
  }
);
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
  isMuted: boolean;
}
function Value({ Icon, value, unit, primary = false, isMuted }: Props) {
  return (
    <div className="flex items-center gap-x-3 tracking-[-1.18px]">
      <div className="text-gray-2">
        <Icon />
      </div>
      <div className={valueContainerStyles({ isMuted })}>
        <div className={valueStyles({ primary: primary && !isMuted })}>
          {value}
        </div>
        {unit != null && <div>{unit}</div>}
      </div>
    </div>
  );
}
