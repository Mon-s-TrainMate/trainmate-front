import { useCallback, useState } from 'react';

export interface WorkoutSet {
  id: number;
  weightKg: number;
  repetitions: number;
  durationSec: number;
}

export function useWorkoutSets(initialSets: WorkoutSet[]) {
  const [workoutSets, setWorkoutSets] = useState<WorkoutSet[]>(initialSets);

  const addWorkoutSet = useCallback(() => {
    const newSet: WorkoutSet = {
      id: Date.now(),
      weightKg: 0,
      repetitions: 0,
      durationSec: 0,
    };
    setWorkoutSets((prev) => [...prev, newSet]);
  }, []);

  const removeWorkoutSet = useCallback((id: number) => {
    setWorkoutSets((prev) => prev.filter((set) => set.id !== id));
  }, []);

  const updateWorkoutSet = useCallback(
    <K extends keyof WorkoutSet>(
      id: number,
      field: K,
      value: WorkoutSet[K]
    ) => {
      setWorkoutSets((prev) =>
        prev.map((set) => (set.id === id ? { ...set, [field]: value } : set))
      );
    },
    []
  );

  return {
    workoutSets,
    addWorkoutSet,
    removeWorkoutSet,
    updateWorkoutSet,
  };
}
