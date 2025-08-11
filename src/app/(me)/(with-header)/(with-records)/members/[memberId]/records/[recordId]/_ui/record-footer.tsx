'use client';

import { Button } from '@/components/ui/button';
import { DataValue } from '@/features/data-value/ui/data-value';
import { formatDuration } from '@/lib/time/format-duration';
import { WorkoutSet } from '../_hooks/use-workout-sets';

interface RecordFooterProps {
  sets: WorkoutSet[];
}

export function RecordFooter({ sets }: RecordFooterProps) {
  const totalDuration = sets.reduce((total, set) => total + set.durationSec, 0);
  const estimatedCalories = Math.floor((totalDuration / 60) * 5);

  return (
    <div className="flex flex-col justify-between gap-4 rounded-xl bg-white p-4 @md:px-10 @md:py-6 @3xl:flex-row @3xl:items-center">
      <div className="flex flex-wrap items-center justify-center gap-10">
        <DataValue
          size="md"
          label="set calories"
          value={estimatedCalories}
          unit="kcal"
        />
        <DataValue
          size="md"
          label="set time"
          value={formatDuration(totalDuration)}
        />
      </div>
      <Button className="rounded-md bg-primary px-6 py-4 text-base font-bold text-white shadow-[2px_4px_10px_0px_rgba(180,180,180,0.35)] hover:bg-primary/90 @3xl:w-48">
        세트 저장하기
      </Button>
    </div>
  );
}
