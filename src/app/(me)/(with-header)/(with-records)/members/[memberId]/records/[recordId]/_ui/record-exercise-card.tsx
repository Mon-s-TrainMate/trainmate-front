'use client';

import { memo } from 'react';

interface ExerciseSelectProps {
  bodyPart: string;
  exerciseName: string;
}

export const ExerciseCard = memo(function ExerciseSelect({
  bodyPart,
  exerciseName,
}: ExerciseSelectProps) {
  return (
    <div className="shadow-sm rounded-xl bg-white p-4 @lg:p-6">
      <div>
        <div className="text-sm">{bodyPart}</div>
        <div className="font-bold">{exerciseName}</div>
      </div>
    </div>
  );
});
