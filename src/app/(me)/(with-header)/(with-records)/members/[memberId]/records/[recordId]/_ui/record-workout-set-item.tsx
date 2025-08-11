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
    <div className="flex items-center justify-between rounded-xl border-0 bg-white p-0">
      <div className="flex w-[400px] items-center gap-14">
        <div className="text-base font-bold text-black">
          {String(index + 1).padStart(2, '0')}
        </div>
        <div className="flex w-80 items-center gap-2.5">
          <div className="w-[155px]">
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
              className="w-full"
            />
          </div>
          <div className="w-[155px]">
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
              className="w-full"
            />
          </div>
        </div>
      </div>
      <div className="text-[26px] font-normal text-black">
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
        {canRemove && (
          <Button
            onClick={() => removeSet(id)}
            variant="secondary"
            className="h-12 w-12 rounded-full"
          >
            <TrashIcon />
          </Button>
        )}
      </div>
    </div>
  );
});
