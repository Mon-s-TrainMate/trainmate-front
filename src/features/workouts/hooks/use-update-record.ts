'use client';

import { getMemberRecordQueryKey } from '@/lib/users/query-key';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createWorkoutSet } from '../api/create-workout-set';
import { deleteWorkoutSet } from '../api/delete-workout-set';
import { updateWorkoutSet } from '../api/update-workout-set';

export function useUpdateRecord(memberId: string, recordId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      oldSets,
      newSets,
    }: {
      oldSets: Set[];
      newSets: Set[];
    }) => {
      const plan = diff(oldSets, newSets);
      return await Promise.all([
        ...plan.creates.map((set) =>
          createWorkoutSet(memberId, recordId, {
            repetitions: set.repetitions,
            weight_kg: set.weightKg,
            duration_sec: set.durationSec,
            calories: 0,
          })
        ),
        ...plan.deletes.map((set) =>
          deleteWorkoutSet(memberId, recordId, String(set.id))
        ),
        ...plan.updates.map((set) =>
          updateWorkoutSet(memberId, recordId, String(set.id), {
            repetitions: set.repetitions,
            weight_kg: set.weightKg,
            duration_sec: set.durationSec,
            calories: 0,
          })
        ),
      ]);
    },
    onSuccess: async (data) => {
      if (data.some((res) => res.success)) {
        await queryClient.invalidateQueries({
          queryKey: getMemberRecordQueryKey(memberId, recordId),
        });
      }
    },
  });
}

interface Set {
  id: number;
  weightKg: number;
  repetitions: number;
  durationSec: number;
}

function diff(oldSets: Set[], newSets: Set[]) {
  const oldSetIds = new Set(oldSets.map((set) => set.id));
  const newSetMap = new Map(newSets.map((set) => [set.id, set]));

  const creates: Omit<Set, 'id'>[] = newSets
    .filter((newSet) => !oldSetIds.has(newSet.id))
    .map((set) => ({
      durationSec: set.durationSec | 0,
      repetitions: set.repetitions | 0,
      weightKg: set.weightKg | 0,
    }));
  const deletes: Pick<Set, 'id'>[] = oldSets
    .filter((oldSet) => !newSetMap.has(oldSet.id))
    .map((set) => ({
      id: set.id,
    }));
  const updates: (Partial<Set> & Pick<Set, 'id'>)[] = oldSets.reduce(
    (acc, oldSet) => {
      const newSet = newSetMap.get(oldSet.id);
      if (newSet == null) return acc;
      const changes = [];
      for (const [key, oldValue] of Object.entries(oldSet) as [
        keyof Set,
        Set[keyof Set],
      ][]) {
        const newValue = newSet[key];
        if (oldValue !== newValue) {
          changes.push([key, newValue | 0]);
        }
      }
      if (changes.length > 0) {
        changes.push(['id', oldSet.id]);
        acc.push(Object.fromEntries(changes));
      }
      return acc;
    },
    [] as (Partial<Set> & Pick<Set, 'id'>)[]
  );

  return {
    creates,
    deletes,
    updates,
  };
}
