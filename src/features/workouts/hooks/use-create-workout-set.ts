'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createWorkoutSet,
  CreateWorkoutSetData,
} from '../api/create-workout-set';
import { getMemberRecordListQueryKey } from '@/lib/users/query-key';

interface UseCreateWorkoutSetOptions {
  memberId: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useCreateWorkoutSet({
  memberId,
  onSuccess,
  onError,
}: UseCreateWorkoutSetOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateWorkoutSetData) =>
      createWorkoutSet(memberId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getMemberRecordListQueryKey(memberId),
      });

      onSuccess?.();
    },
    onError,
  });
}
