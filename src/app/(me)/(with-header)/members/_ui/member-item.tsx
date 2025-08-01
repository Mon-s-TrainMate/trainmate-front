'use client';
import { UserAvatar } from '@/features/user/ui/user-avatar';
import { cva } from 'class-variance-authority';
import { format, isToday } from 'date-fns';
import { ChevronRightIcon } from 'lucide-react';

const memberItemStyles = cva('flex items-center p-3 pr-2 gap-x-4 rounded-lg', {
  variants: {
    active: {
      true: 'bg-primary-foreground',
    },
  },
});
const memberItemIconStyles = cva('', {
  variants: {
    active: {
      true: 'text-primary',
    },
  },
});
interface Props {
  name: string;
  email: string;
  thumbnail: string;
  recentRecordTime?: Date;
  active?: boolean;
}
export function MemberItem({
  name,
  email,
  thumbnail,
  recentRecordTime,
  active = false,
}: Props) {
  return (
    <div className={memberItemStyles({ active })}>
      <UserAvatar size="sm" src={thumbnail} />
      <div className="flex-1">
        <div className="font-bold text-gray-8">{name}</div>
        <div className="text-xs text-gray-5">{email}</div>
      </div>
      <div className="flex items-center text-gray-8 gap-2">
        {recentRecordTime && <Time time={recentRecordTime} />}
        <ChevronRightIcon
          className={memberItemIconStyles({ active })}
          strokeWidth={1.25}
        />
      </div>
    </div>
  );
}

const timeStyles = cva('text-xs text-gray-8', {
  variants: {
    today: {
      true: 'text-primary',
    },
  },
});
interface TimeProps {
  time: Date;
  className?: string;
}
function Time({ time, className }: TimeProps) {
  const today = isToday(time);
  return (
    <time
      dateTime={time.toISOString()}
      className={timeStyles({ today, className })}
    >
      {format(time, 'L월 d일')}
    </time>
  );
}
