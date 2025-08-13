'use client';

import { getMemberRecordListQueryKey } from '@/lib/users/query-key';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNewWorkoutSet } from '../api/create-new-workout-set';

export function useCreateRecord(memberId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      sets: {
        bodyPart: string;
        equipment: string;
        exerciseName: string;
        repetitions: number;
        weightKg: number;
        durationSec: number;
      }[]
    ) => {
      return await Promise.all(
        sets.map((set) =>
          createNewWorkoutSet(memberId, {
            body_part: set.bodyPart,
            equipment: set.equipment,
            exercise_name: set.exerciseName,
            repetitions: set.repetitions,
            weight_kg: set.weightKg,
            duration_sec: set.durationSec,
            calories: 0,
          })
        )
      );
    },
    onSuccess: async (data) => {
      if (data.some((res) => res.success)) {
        await queryClient.invalidateQueries({
          queryKey: getMemberRecordListQueryKey(memberId),
        });
      }
    },
  });
}
