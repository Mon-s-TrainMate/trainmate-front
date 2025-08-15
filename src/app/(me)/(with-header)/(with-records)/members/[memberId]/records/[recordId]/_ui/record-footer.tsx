'use client';

import { Button } from '@/components/ui/button';
import { DataValue } from '@/features/data-value/ui/data-value';
import { calculateCaloriesBurned } from '@/features/workouts/utils/calculate-calories-burned';
import { sum } from '@/lib/array/sum';
import { sumBy } from '@/lib/array/sum-by';
import { formatDuration } from '@/lib/time/format-duration';
import { WorkoutSet } from '../_hooks/use-workout-sets';

interface RecordFooterProps {
  sets: WorkoutSet[];
  pending: boolean;
  weightKg: number;
  onSave: () => void;
}

export function RecordFooter({
  sets,
  pending,
  weightKg,
  onSave,
}: RecordFooterProps) {
  const totalDuration = sumBy(sets, 'durationSec');
  const caloriesBurned = sum(
    sets.map((set) => calculateCaloriesBurned(3.5, weightKg, set.durationSec))
  );

  return (
    <div className="flex flex-col justify-between gap-4 rounded-xl bg-white p-4 @md:px-10 @md:py-6 @3xl:flex-row @3xl:items-center">
      <div className="flex flex-wrap items-center justify-center gap-10">
        <DataValue
          size="md"
          label="set calories"
          value={caloriesBurned}
          unit="kcal"
        />
        <DataValue
          size="md"
          label="set time"
          value={formatDuration(totalDuration)}
        />
      </div>
      <Button
        className="rounded-md bg-primary px-6 py-4 text-base font-bold text-white shadow-[2px_4px_10px_0px_rgba(180,180,180,0.35)] transition-none hover:bg-primary/90 @3xl:w-48"
        onClick={onSave}
        disabled={pending}
      >
        {pending ? '세트 저장 중' : '세트 저장하기'}
      </Button>
    </div>
  );
}
