'use server';

import { getAccessToken } from '@/features/auth/server-session';
import { API_HOST } from '@/lib/consts';

export type UpdateWorkoutSetData = Partial<{
  repetitions: number;
  weight_kg: number;
  duration_sec: number;
  calories: number;
}>;

export type UpdateWorkoutSetResponse =
  | {
      success: true;
      message: string;
      data: {
        set_id: number;
        exercise_name: string;
        set_number: number;
        repetitions: number;
        weight_kg: number;
        duration_sec: number;
        duration_display: string;
        calories: number;
        updated_fields: string[];
      };
    }
  | {
      success: false;
      message?: string;
    };

export async function updateWorkoutSet(
  memberId: string,
  recordId: string,
  setId: string,
  data: UpdateWorkoutSetData
) {
  const token = await getAccessToken();

  const res = await fetch(
    `${API_HOST}/api/workouts/${memberId}/records/${recordId}/sets/${setId}/`,
    {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  const body: UpdateWorkoutSetResponse = await res.json();

  return body;
}
