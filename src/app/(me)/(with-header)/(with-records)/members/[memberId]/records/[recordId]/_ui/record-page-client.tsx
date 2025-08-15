'use client';

import { useMemberProfile } from '@/features/member/hooks/use-member-profile';
import { useMemberRecord } from '@/features/workouts/hooks/use-member-record';
import { useUpdateRecord } from '@/features/workouts/hooks/use-update-record';
import { useEffect, useRef, useState } from 'react';
import { InternalWorkoutSet, useWorkoutSets } from '../_hooks/use-workout-sets';
import { RecordErrorDialog, useRecordError } from './record-alert-dialog';
import { ExerciseCard } from './record-exercise-card';
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
  const [error, setError] = useRecordError();
  const { data } = useMemberRecord(memberId, recordId);
  const [selectedExercise, setSelectedExercise] = useState<{
    bodyPart: string;
    exerciseName: string;
  }>({ bodyPart: '', exerciseName: '' });
  const {
    workoutSets,
    addWorkoutSet: addSet,
    removeWorkoutSet: removeSet,
    updateWorkoutSet: updateSet,
    toggleWorkoutSetTimer: toggleSetTimer,
    setWorkoutSets,
  } = useWorkoutSets([]);
  const initialSetsRef = useRef<InternalWorkoutSet[]>([]);
  const { data: profile } = useMemberProfile(memberId);
  const memberWeightKg = profile?.weightKg ?? 70;
  const mutation = useUpdateRecord(memberId, recordId);

  useEffect(() => {
    if (data == null) return;
    setSelectedExercise({
      bodyPart: data.bodyPart,
      exerciseName: data.exerciseName,
    });
    const sets = data.sets.map((set) => ({
      id: set.id,
      repetitions: set.repetitions,
      weightKg: set.weightKg,
      durationSec: set.durationSec,
    }));
    setWorkoutSets(sets);
    initialSetsRef.current = sets;
  }, [setWorkoutSets, data]);

  return (
    <div className="flex flex-col gap-y-4">
      <ExerciseCard {...selectedExercise} />
      <WorkoutSetList
        sets={workoutSets}
        addSet={addSet}
        removeSet={removeSet}
        updateSet={updateSet}
        toggleSetTimer={toggleSetTimer}
      />
      <RecordFooter
        sets={workoutSets}
        pending={mutation.isPending}
        weightKg={memberWeightKg}
        onSave={async () => {
          const responses = await mutation.mutateAsync({
            weightKg: memberWeightKg,
            oldSets: initialSetsRef.current,
            newSets: workoutSets,
          });
          const errors = responses.filter((res) => !res.success);
          if (errors.length > 0) {
            setError({
              title: '일부 정보가 저장되지 않았습니다.',
              description: '관리자에게 문의해주세요.',
            });
            console.error(errors);
          }
        }}
      />
      <RecordErrorDialog error={error} setError={setError} />
    </div>
  );
}
