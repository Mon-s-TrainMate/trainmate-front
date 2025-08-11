'use client';

import { Button } from '@/components/ui/button';
import { SelectBox } from '@/components/ui/select';
import { formatDuration } from '@/lib/time/format-duration';
import { PlayIcon, SquareIcon, TrashIcon } from 'lucide-react';
import React from 'react';

import { WorkoutSet } from '../_hooks/use-workout-sets';

const WEIGHT_OPTIONS = Array.from({ length: 50 }, (_, i) => ({
  label: `${(i + 1) * 5}`,
  value: (i + 1) * 5,
}));

const REPS_OPTIONS = Array.from({ length: 30 }, (_, i) => ({
  label: `${i + 1}`,
  value: i + 1,
}));

type WorkoutSetItemProps = {
  id: number;
  index: number;
  updateSet: <K extends keyof WorkoutSet>(
    id: number,
    field: K,
    value: WorkoutSet[K]
  ) => void;
  removeSet: (id: number) => void;
  toggleSetTimer: (id: number, initialDurationSec: number) => void;
  canRemove: boolean;
} & WorkoutSet;

export const WorkoutSetItem = React.memo(function ExerciseSetItem({
  id,
  weightKg,
  repetitions,
  durationSec,
  isPlaying,
  index,
  updateSet,
  removeSet,
  toggleSetTimer,
  canRemove,
}: WorkoutSetItemProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border-0 bg-white p-0">
      <div className="flex flex-1 items-center justify-between gap-4">
        <div className="text-base font-bold text-black">
          {String(index + 1).padStart(2, '0')}
        </div>
        <div className="flex w-full items-center gap-2.5">
          <SelectBox
            items={REPS_OPTIONS.map((option) => ({
              ...option,
              value: option.value.toString(),
            }))}
            placeholder="횟수"
            value={repetitions.toString()}
            onValueChange={(value) =>
              updateSet(id, 'repetitions', parseInt(value))
            }
            unit="회"
            className="w-40"
          />
          <SelectBox
            items={WEIGHT_OPTIONS.map((option) => ({
              ...option,
              value: option.value.toString(),
            }))}
            placeholder="무게"
            value={weightKg.toString()}
            onValueChange={(value) =>
              updateSet(id, 'weightKg', parseInt(value))
            }
            unit="kg"
            className="w-40"
          />
        </div>
      </div>
      <div className="flex flex-1 items-center justify-end gap-4">
        <div className="text-2xl font-normal break-keep whitespace-nowrap text-black">
          {formatDuration(durationSec)}
        </div>
        <div className="flex items-center gap-3">
          <Button
            className="h-12 w-12 rounded-full"
            onClick={() => {
              toggleSetTimer(id, durationSec);
            }}
          >
            {isPlaying ? <SquareIcon /> : <PlayIcon />}
          </Button>
          <Button
            onClick={() => removeSet(id)}
            variant="secondary"
            disabled={!canRemove}
            className="h-12 w-12 rounded-full"
          >
            <TrashIcon />
          </Button>
        </div>
      </div>
    </div>
  );
});
