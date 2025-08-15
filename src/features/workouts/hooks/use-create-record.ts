'use client';

import { getEntireMemberRecordListQueryKey } from '@/lib/users/query-key';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNewWorkoutSet } from '../api/create-new-workout-set';
import { calculateCaloriesBurned } from '../utils/calculate-calories-burned';

export function useCreateRecord(memberId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      weightKg,
      sets,
    }: {
      weightKg: number;
      sets: {
        bodyPart: string;
        equipment: string;
        exerciseName: string;
        repetitions: number;
        weightKg: number;
        durationSec: number;
      }[];
    }) => {
      return await Promise.all(
        sets.map((set) =>
          createNewWorkoutSet(memberId, {
            body_part: set.bodyPart,
            equipment: set.equipment,
            exercise_name: set.exerciseName,
            repetitions: set.repetitions,
            weight_kg: set.weightKg,
            duration_sec: set.durationSec,
            calories: calculateCaloriesBurned(3.5, weightKg, set.durationSec),
          })
        )
      );
    },
    onSuccess: async (data) => {
      if (data.some((res) => res.success)) {
        await queryClient.invalidateQueries({
          queryKey: getEntireMemberRecordListQueryKey(memberId),
        });
      }
    },
  });
}
