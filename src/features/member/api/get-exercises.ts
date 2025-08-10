'use server';

import { getAccessToken } from '@/features/auth/server-session';
import { API_HOST } from '@/lib/consts';
interface ExerciseApiResponse {
  id: number;
  exercise_name: string;
  body_part: string;
  equipment: string;
  measurement_unit: '회' | null;
  weight_unit: 'kg' | null;
  met_value: number;
  is_active: boolean;
  created_at: string;
}
export interface Exercise {
  id: number;
  exerciseName: string;
  bodyPart: string;
  equipment: string;
  measurementUnit: '회' | null;
  weightUnit: 'kg' | null;
  metValue: number;
  isActive: boolean;
  createdAt: string;
}

// Transform server data to client format
function transformExercise(apiExercise: ExerciseApiResponse): Exercise {
  return {
    id: apiExercise.id,
    exerciseName: apiExercise.exercise_name,
    bodyPart: apiExercise.body_part,
    equipment: apiExercise.equipment,
    measurementUnit: apiExercise.measurement_unit,
    weightUnit: apiExercise.weight_unit,
    metValue: apiExercise.met_value,
    isActive: apiExercise.is_active,
    createdAt: apiExercise.created_at,
  };
}

export type GetExercisesResponse =
  | {
      success: true;
      exercises: ExerciseApiResponse[];
    }
  | {
      success: false;
    };

export async function getExercises(): Promise<Exercise[]> {
  const token = await getAccessToken();

  const res = await fetch(`${API_HOST}/api/exercises`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const body: GetExercisesResponse = await res.json();

  if (!body.success) {
    throw body;
  }

  return body.exercises.map(transformExercise);
}
