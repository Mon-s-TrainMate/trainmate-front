'use server';

import { getAccessToken } from '@/features/auth/server-session';
import { API_HOST } from '@/lib/consts';

export interface CreateNewWorkoutSetData {
  body_part: string;
  equipment: string;
  exercise_name: string;
  repetitions: number;
  weight_kg: number;
  duration_sec: number;
  calories: number;
}

export type CreateNewWorkoutSetResponse =
  | {
      success: true;
      message: string;
      data: {
        set_id: number;
        exercise_name: string;
        body_part: string;
        equipment: string;
        set_number: number;
        repetitions: number;
        weight_kg: number;
        duration_sec: number;
        calories: number;
        is_trainer_workout: boolean;
        workout_totals: {
          total_sets: number;
          total_duration_sec: number;
          total_calories: number;
        };
        daily_totals: {
          total_duration_sec: number;
          total_calories: number;
        };
      };
    }
  | {
      success: false;
      message?: string;
    };

export async function createNewWorkoutSet(
  memberId: string,
  data: CreateNewWorkoutSetData
) {
  const token = await getAccessToken();

  const res = await fetch(
    `${API_HOST}/api/workouts/${memberId}/workout-sets/`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  const body: CreateNewWorkoutSetResponse = await res.json();

  if (!body.success) {
    return body;
  }
  return {
    success: true as const,
    setId: body.data.set_id,
  };
}
