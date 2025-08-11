'use client';

import { useState } from 'react';
import { useWorkoutSets } from '../_hooks/use-workout-sets';
import { ExerciseSelect } from './record-exercise-select';
import { RecordFooter } from './record-footer';
import { WorkoutSetList } from './record-workout-set-list';

interface RecordPageClientProps {
  memberId: string;
}

export function RecordPageClient({}: RecordPageClientProps) {
  const [selectedExercise, setSelectedExercise] = useState<string>('');
  const {
    workoutSets,
    addWorkoutSet: addSet,
    removeWorkoutSet: removeSet,
    updateWorkoutSet: updateSet,
    toggleWorkoutSetTimer: toggleSetTimer,
  } = useWorkoutSets([]);

  return (
    <div className="flex flex-col gap-y-4">
      <ExerciseSelect
        selectedExercise={selectedExercise}
        onExerciseChange={setSelectedExercise}
      />
      <WorkoutSetList
        sets={workoutSets}
        addSet={addSet}
        removeSet={removeSet}
        updateSet={updateSet}
        toggleSetTimer={toggleSetTimer}
      />
      <RecordFooter sets={workoutSets} />
    </div>
  );
}
