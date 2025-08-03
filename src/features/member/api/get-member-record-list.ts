'use server';

import { getAccessToken } from '@/features/auth/server-session';
import { API_HOST } from '@/lib/consts';

export type MemberRecordListResponse = {
  success: true;
  sets: {
    set_id: number;
    is_trainer: boolean;
    exercise_name: string;
    set_count: number;
    total_duration_sec: number;
    calories_burned: number;
  }[];
};

export async function getMemberRecordList(
  memberId: string,
  options?: {
    date?: string;
    page?: number;
    limit?: number;
  }
) {
  const token = await getAccessToken();
  const url = new URL(`${API_HOST}/api/members/${memberId}/records`);
  if (options?.date != null) url.searchParams.append('date', options.date);
  const res = await fetch(url, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const body: MemberRecordListResponse = await res.json();
  if (!res.ok) {
    if (res.status === 404) {
      return [];
    }
    throw res.status;
  }

  return body.sets.map((set) => ({
    id: set.set_id,
    isTrainer: set.is_trainer,
    exerciseName: set.exercise_name,
    setCount: set.set_count,
    totalDurationSec: set.total_duration_sec,
    caloriesBurned: set.calories_burned,
  }));
}
