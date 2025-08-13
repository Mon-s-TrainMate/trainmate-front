'use server';

import { getAccessToken } from '@/features/auth/server-session';
import { API_HOST } from '@/lib/consts';

export type DeleteWorkoutSetResponse =
  | {
      success: true;
      message: string;
    }
  | {
      success: false;
      message?: string;
    };

export async function deleteWorkoutSet(
  memberId: string,
  recordId: string,
  setId: string
) {
  const token = await getAccessToken();

  const res = await fetch(
    `${API_HOST}/api/workouts/${memberId}/records/${recordId}/sets/${setId}/`,
    {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const body: DeleteWorkoutSetResponse = await res.json();

  return body;
}
