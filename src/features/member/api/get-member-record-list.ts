'use server';

import { getAccessToken } from '@/features/auth/server-session';

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
  await getAccessToken();
  const body: MemberRecordListResponse = {
    success: true,
    sets: [
      {
        set_id: 1,
        is_trainer: false,
        exercise_name: '숨쉬기 운동',
        set_count: 5,
        total_duration_sec: 65536,
        calories_burned: 0,
      },
      {
        set_id: 2,
        is_trainer: true,
        exercise_name: '로잉 머신',
        set_count: 3,
        total_duration_sec: 1024,
        calories_burned: 1510,
      },
      {
        set_id: 3,
        is_trainer: true,
        exercise_name: '머신 랫 풀 다운',
        set_count: 2,
        total_duration_sec: 512,
        calories_burned: 1610,
      },
      {
        set_id: 4,
        is_trainer: true,
        exercise_name: '덤벨 로우',
        set_count: 1,
        total_duration_sec: 32,
        calories_burned: 810,
      },
    ],
  };
  return body.sets.map((set) => ({
    id: set.set_id,
    isTrainer: set.is_trainer,
    exerciseName: set.exercise_name,
    setCount: set.set_count,
    totalDurationSec: set.total_duration_sec,
    caloriesBurned: set.calories_burned,
  }));
}
