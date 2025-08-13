'use server';

import { getAccessToken } from '@/features/auth/server-session';
import { API_HOST } from '@/lib/consts';

export interface CreateWorkoutSetData {
  repetitions: number;
  weight_kg: number;
  duration_sec: number;
  calories: number;
}

export type CreateWorkoutSetResponse =
  | {
      success: true;
      message: string;
    }
  | {
      success: false;
      message?: string;
    };

export async function createWorkoutSet(
  memberId: string,
  recordId: string,
  data: CreateWorkoutSetData
) {
  const token = await getAccessToken();

  const res = await fetch(
    `${API_HOST}/api/workouts/${memberId}/records/${recordId}/sets/add/`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  const body: CreateWorkoutSetResponse = await res.json();

  return body;
}
