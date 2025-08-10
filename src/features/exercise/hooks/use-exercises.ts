'use client';

import { useQuery } from '@tanstack/react-query';
import { getExercises } from '../../member/api/get-exercises';

export function useExercises() {
  return useQuery({
    queryKey: ['exercises'],
    queryFn: getExercises,
  });
}
