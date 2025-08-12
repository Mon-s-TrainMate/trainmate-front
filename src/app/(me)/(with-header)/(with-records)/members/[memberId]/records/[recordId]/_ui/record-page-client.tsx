'use client';

import { useMemberRecord } from '@/features/workouts/hooks/use-member-record';
import { useEffect, useState } from 'react';
import { useWorkoutSets } from '../_hooks/use-workout-sets';
import { ExerciseSelect } from './record-exercise-select';
import { RecordFooter } from './record-footer';
import { WorkoutSetList } from './record-workout-set-list';

interface RecordPageClientProps {
  memberId: string;
  recordId: string;
}

export function RecordPageClient({
  memberId,
  recordId,
}: RecordPageClientProps) {
  const { data } = useMemberRecord(memberId, recordId);
  const [selectedExercise, setSelectedExercise] = useState<string>('');
  const {
    workoutSets,
    addWorkoutSet: addSet,
    removeWorkoutSet: removeSet,
    updateWorkoutSet: updateSet,
    toggleWorkoutSetTimer: toggleSetTimer,
    setWorkoutSets,
  } = useWorkoutSets([]);

  useEffect(() => {
    if (data == null) return;
    setSelectedExercise(data.exerciseName);
    setWorkoutSets(
      data.sets.map((set) => ({
        id: set.id,
        repetitions: set.repetitions,
        weightKg: set.weightKg,
        durationSec: set.durationSec,
      }))
    );
  }, [setWorkoutSets, data]);

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
