'use server';

import { getAccessToken } from '@/features/auth/server-session';
import { API_HOST } from '@/lib/consts';
interface ExerciseApiResponse {
  id: number;
  equipment: string;
  exercise_name: string;
  measurement_unit: string;
  weight_unit: string;
}
export interface Exercise {
  id: string;
  exerciseName: string;
  bodyPart: string;
  equipment: string;
  measurementUnit: string | null;
  weightUnit: string | null;
}

export type GetExercisesResponse =
  | {
      success: true;
      data: Record<string, ExerciseApiResponse[]>;
    }
  | {
      success: false;
    };

export async function getExercises(): Promise<Exercise[]> {
  const token = await getAccessToken();

  const res = await fetch(`${API_HOST}/api/workouts/exercises`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const body: GetExercisesResponse = await res.json();

  if (!body.success) {
    throw body;
  }

  return Object.entries(body.data).flatMap(([bodyPart, exercises]) =>
    exercises.map((exercise) => ({
      id: String(exercise.id),
      exerciseName: exercise.exercise_name,
      bodyPart,
      equipment: exercise.equipment,
      measurementUnit: noneToNull(exercise.measurement_unit),
      weightUnit: noneToNull(exercise.weight_unit),
    }))
  );
}

type NoneToNull<T extends string> = T extends 'none' ? null : T;
function noneToNull<T extends string>(s: T): NoneToNull<T> {
  return (s === 'none' ? null : s) as NoneToNull<T>;
}
