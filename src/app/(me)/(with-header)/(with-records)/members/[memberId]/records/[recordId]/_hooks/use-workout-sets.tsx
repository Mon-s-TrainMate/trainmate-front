import { useEvent } from '@/lib/hooks/use-event';
import { useCallback, useEffect, useRef, useState } from 'react';

export interface WorkoutSet {
  id: number;
  weightKg: number;
  repetitions: number;
  durationSec: number;
  isPlaying: boolean;
}

export type InternalWorkoutSet = Omit<WorkoutSet, 'isPlaying'>;

export function useWorkoutSets(initialSets: InternalWorkoutSet[]) {
  const [workoutSets, setWorkoutSets] =
    useState<InternalWorkoutSet[]>(initialSets);
  const {
    stateRef: timerStateRef,
    toggle: toggleTimer,
    stop: stopTimer,
    stopAll: stopAllTimer,
  } = useWorkoutTimer({
    onChange({ workoutSetId, durationSec }) {
      setWorkoutSets((sets) =>
        sets.map((set) =>
          set.id === workoutSetId ? { ...set, durationSec } : set
        )
      );
    },
  });

  const addWorkoutSet = useCallback(() => {
    const newSet: InternalWorkoutSet = {
      id: Date.now(),
      weightKg: 0,
      repetitions: 0,
      durationSec: 0,
    };
    setWorkoutSets((prev) => [...prev, newSet]);
  }, []);

  const removeWorkoutSet = useCallback(
    (id: number) => {
      setWorkoutSets((prev) => prev.filter((set) => set.id !== id));
      stopTimer(id);
    },
    [stopTimer]
  );

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
    workoutSets: workoutSets.map((set) => ({
      ...set,
      isPlaying: set.id === timerStateRef.current?.workoutSetId,
    })),
    addWorkoutSet,
    removeWorkoutSet,
    updateWorkoutSet,
    toggleWorkoutSetTimer: toggleTimer,
    stopAllWorkoutSetTimer: stopAllTimer,
    setWorkoutSets,
  };
}

export function useWorkoutTimer(options: {
  onChange: (options: { workoutSetId: number; durationSec: number }) => void;
}) {
  const stateRef = useRef<{
    workoutSetId: number;
    durationSec: number;
    startedAt: number;
  } | null>(null);

  const play = useEvent((workoutSetId: number, initialDurationSec: number) => {
    if (stateRef.current != null) {
      stop(stateRef.current.workoutSetId);
    }
    stateRef.current = {
      workoutSetId,
      durationSec: initialDurationSec,
      startedAt: Date.now(),
    };
    queueMicrotask(() => {
      options.onChange({ workoutSetId, durationSec: initialDurationSec });
    });
  });

  const stop = useEvent((workoutSetId: number) => {
    if (stateRef.current?.workoutSetId !== workoutSetId) return;
    const durationSec =
      stateRef.current.durationSec +
      (Date.now() - stateRef.current.startedAt) / 1000;
    queueMicrotask(() => {
      options.onChange({ workoutSetId, durationSec });
    });
    stateRef.current = null;
  });

  const stopAll = useEvent(() => {
    if (stateRef.current == null) return;
    const workoutSetId = stateRef.current.workoutSetId;
    stop(workoutSetId);
  });

  const toggle = useEvent(
    (workoutSetId: number, initialDurationSec: number) => {
      if (stateRef.current?.workoutSetId === workoutSetId) {
        stop(workoutSetId);
      } else {
        play(workoutSetId, initialDurationSec);
      }
    }
  );

  const startTimer = useEvent(() => {
    const id = setInterval(() => {
      if (stateRef.current == null) return;
      const { workoutSetId } = stateRef.current;
      const durationSec =
        stateRef.current.durationSec +
        (Date.now() - stateRef.current.startedAt) / 1000;
      queueMicrotask(() => {
        options.onChange({ workoutSetId, durationSec });
      });
    }, 999);
    return () => {
      clearInterval(id);
    };
  });

  const isSomethingPlaying = stateRef.current != null;
  useEffect(() => {
    if (!isSomethingPlaying) return;
    return startTimer();
  }, [isSomethingPlaying, startTimer]);

  return { stateRef, toggle, stop, stopAll };
}
