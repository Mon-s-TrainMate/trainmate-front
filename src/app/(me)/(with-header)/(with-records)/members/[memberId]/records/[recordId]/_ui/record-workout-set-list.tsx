'use client';

import { Button } from '@/components/ui/button';
import { CirclePlusIcon } from 'lucide-react';

import { WorkoutSet } from '../_hooks/use-workout-sets';
import { WorkoutSetItem } from './record-workout-set-item';

interface WorkoutSetListProps {
  sets: WorkoutSet[];
  addSet: () => void;
  removeSet: (id: number) => void;
  updateSet: <K extends keyof WorkoutSet>(
    id: number,
    field: K,
    value: WorkoutSet[K]
  ) => void;
  toggleSetTimer: (id: number, initialDurationSec: number) => void;
}

export function WorkoutSetList({
  sets,
  addSet,
  removeSet,
  updateSet,
  toggleSetTimer,
}: WorkoutSetListProps) {
  return (
    <div className="shadow-sm rounded-xl bg-white p-6">
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-normal text-black">
            세트를 등록해주세요.
          </h3>
          <Button
            onClick={addSet}
            size="sm"
            variant="text"
            className="flex w-max items-center gap-2 text-base font-normal text-black"
          >
            <CirclePlusIcon className="h-6 w-6 text-black" />
            세트 추가하기
          </Button>
        </div>

        <div className="space-y-4">
          {sets.map((set, index) => (
            <WorkoutSetItem
              key={set.id}
              {...set}
              index={index}
              updateSet={updateSet}
              removeSet={removeSet}
              toggleSetTimer={toggleSetTimer}
              canRemove={sets.length > 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
