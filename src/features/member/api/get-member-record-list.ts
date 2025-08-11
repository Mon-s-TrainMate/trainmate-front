'use server';

import { getAccessToken } from '@/features/auth/server-session';
import { API_HOST } from '@/lib/consts';

export type MemberRecordListResponse =
  | {
      success: true;
      records: {
        id: number;
        is_trainer: boolean;
        exercise_name: string;
        set_count: number;
        total_duration_sec: number;
        calories_burned: number;
      }[];
    }
  | {
      success: false;
    };

export async function getMemberRecordList(
  memberId: string,
  options?: {
    date?: string;
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
  if (!body.success) throw body;

  return body.records.map((record) => ({
    id: record.id,
    isTrainer: record.is_trainer,
    exerciseName: record.exercise_name,
    setCount: record.set_count,
    totalDurationSec: record.total_duration_sec,
    caloriesBurned: record.calories_burned,
  }));
}
