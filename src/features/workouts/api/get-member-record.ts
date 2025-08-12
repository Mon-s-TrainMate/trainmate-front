'use server';

import { getAccessToken } from '@/features/auth/server-session';
import { API_HOST } from '@/lib/consts';

export type MemberRecordResponse =
  | {
      success: true;
      data: Data;
    }
  | {
      success: false;
    };

interface Data {
  workout_exercise_id: number;
  exercise_name: string;
  body_part: string;
  total_sets: number;
  total_duration_sec: number;
  total_duration_display: string;
  total_calories: number;
  sets: Set[];
}

interface Set {
  set_id: number;
  set_number: number;
  repetitions: number;
  weight_kg: number;
  duration_sec: number;
  duration_display: string;
  calories: number;
  is_completed: boolean;
  completed_at: string;
}

export async function getMemberRecord(memberId: string, recordId: string) {
  const token = await getAccessToken();
  const res = await fetch(
    `${API_HOST}/api/workouts/${memberId}/records/${recordId}/sets/`,
    {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const body: MemberRecordResponse = await res.json();
  if (!body.success) throw body;

  return {
    id: body.data.workout_exercise_id,
    exerciseName: body.data.exercise_name,
    bodyPart: body.data.body_part,
    sets: body.data.sets.map((set) => ({
      id: set.set_id,
      repetitions: set.repetitions,
      weightKg: set.weight_kg,
      durationSec: set.duration_sec,
      calories: set.calories,
      isCompleted: set.is_completed,
    })),
  };
}
