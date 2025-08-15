'use client';

import { useExercises } from '@/features/exercise/hooks/use-exercises';
import { useMemberProfile } from '@/features/member/hooks/use-member-profile';
import { useCreateRecord } from '@/features/workouts/hooks/use-create-record';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useWorkoutSets } from '../_hooks/use-workout-sets';
import { RecordErrorDialog, useRecordError } from './record-alert-dialog';
import { ExerciseSelect } from './record-exercise-select';
import { RecordFooter } from './record-footer';
import { WorkoutSetList } from './record-workout-set-list';

interface RecordNewPageProps {
  memberId: string;
}

export function RecordNewPage({ memberId }: RecordNewPageProps) {
  const [error, setError] = useRecordError();
  const { data: exercises = [] } = useExercises();
  const [selectedExercise, setSelectedExercise] = useState<string>('');
  const {
    workoutSets,
    addWorkoutSet: addSet,
    removeWorkoutSet: removeSet,
    updateWorkoutSet: updateSet,
    toggleWorkoutSetTimer: toggleSetTimer,
  } = useWorkoutSets([]);
  const { data: profile } = useMemberProfile(memberId);
  const memberWeightKg = profile?.weightKg ?? 70;
  const mutation = useCreateRecord(memberId);
  const router = useRouter();

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
      <RecordFooter
        sets={workoutSets}
        pending={mutation.isPending}
        weightKg={memberWeightKg}
        onSave={async () => {
          const exerciseType = exercises.find(
            (exercise) => exercise.exerciseName === selectedExercise
          );
          if (exerciseType == null) {
            setError({
              title: '운동을 선택해주세요.',
              description: '일치하는 운동이 없습니다.',
            });
            return;
          }
          const sets = workoutSets.map((set) => ({
            bodyPart: exerciseType.bodyPart,
            equipment: exerciseType.equipment,
            exerciseName: exerciseType.exerciseName,
            durationSec: set.durationSec,
            repetitions: set.repetitions,
            weightKg: set.weightKg,
          }));
          if (sets.length === 0) {
            setError({
              title: '세트를 추가해주세요.',
              description: '',
            });
            return;
          }
          const responses = await mutation.mutateAsync({
            weightKg: memberWeightKg,
            sets,
          });
          const errors = responses.filter((res) => !res.success);
          if (errors.length > 0) {
            setError({
              title: '일부 정보가 저장되지 않았습니다.',
              description: '관리자에게 문의해주세요.',
            });
            console.error(errors);
          }
          router.push(`/members/${memberId}`);
        }}
      />
      <RecordErrorDialog error={error} setError={setError} />
    </div>
  );
}
