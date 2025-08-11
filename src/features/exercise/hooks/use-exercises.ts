'use client';

import { useQuery } from '@tanstack/react-query';
import { getExercises } from '../api/get-exercises';

export function useExercises() {
  return useQuery({
    queryKey: ['exercises'],
    queryFn: getExercises,
    staleTime: Infinity,
  });
}
