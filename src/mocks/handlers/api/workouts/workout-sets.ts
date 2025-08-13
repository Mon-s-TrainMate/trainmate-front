import {
  CreateNewWorkoutSetData,
  CreateNewWorkoutSetResponse,
} from '@/features/workouts/api/create-new-workout-set';
import { API_HOST } from '@/lib/consts';
import { users } from '@/mocks/data';
import { withAuthorization } from '@/mocks/utils';
import { formatISO } from 'date-fns';
import { http, HttpResponse } from 'msw';

interface ExerciseRecord {
  record_id: number;
  date: string;
  is_trainer: boolean;
  exercise_name: string;
  set_count: number;
  total_duration_sec: number;
  calories_burned: number;
  sets: ExerciseSet[];
}

interface ExerciseSet {
  set_id: number;
  repeat: number;
  duration: number;
  calories_burned: number;
  kg: number;
}

export const mswCreateNewWorkoutSet = http.post<
  { memberId: string },
  CreateNewWorkoutSetData,
  CreateNewWorkoutSetResponse
>(
  API_HOST + '/api/workouts/:memberId/workout-sets',
  async ({ params, request }) => {
    const memberId = Number(params.memberId);
    const requestData = await request.json();

    const payload = await withAuthorization(request);
    const user = users.find((user) => user.id === memberId);
    const me = users.find((user) => user.id === payload.user_id);

    if (!user) {
      return HttpResponse.json(
        { success: false, message: '해당 회원을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }
    if (me?.user_type !== 'trainer' && me?.id !== user.id) {
      return HttpResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 403 }
      );
    }

    const today = formatISO(new Date(), { representation: 'date' });
    const setId = Date.now();
    let existingRecord = user.records.find(
      (record: ExerciseRecord) =>
        record.date === today &&
        record.exercise_name === requestData.exercise_name
    );
    const newSet = {
      set_id: setId,
      repeat: requestData.repetitions,
      duration: requestData.duration_sec,
      calories_burned: requestData.calories,
      kg: requestData.weight_kg,
    };

    if (existingRecord) {
      existingRecord.sets.push(newSet);
      existingRecord.set_count = existingRecord.sets.length;
      existingRecord.total_duration_sec = existingRecord.sets.reduce(
        (sum: number, set: ExerciseSet) => sum + set.duration,
        0
      );
      existingRecord.calories_burned = existingRecord.sets.reduce(
        (sum: number, set: ExerciseSet) => sum + set.calories_burned,
        0
      );
    } else {
      existingRecord = {
        record_id: Date.now() + 1,
        date: today,
        is_trainer: me?.user_type === 'trainer',
        exercise_name: requestData.exercise_name,
        set_count: 1,
        total_duration_sec: requestData.duration_sec,
        calories_burned: requestData.calories,
        sets: [newSet],
      };
      user.records.push(existingRecord);
    }
    const exerciseRecords = user.records.filter(
      (record: ExerciseRecord) =>
        record.date === today &&
        record.exercise_name === requestData.exercise_name
    );

    const workoutTotals = {
      total_sets: exerciseRecords.reduce(
        (sum: number, record: ExerciseRecord) => sum + record.set_count,
        0
      ),
      total_duration_sec: exerciseRecords.reduce(
        (sum: number, record: ExerciseRecord) =>
          sum + record.total_duration_sec,
        0
      ),
      total_calories: exerciseRecords.reduce(
        (sum: number, record: ExerciseRecord) => sum + record.calories_burned,
        0
      ),
    };
    const dailyRecords = user.records.filter(
      (record: ExerciseRecord) => record.date === today
    );
    const dailyTotals = {
      total_duration_sec: dailyRecords.reduce(
        (sum: number, record: ExerciseRecord) =>
          sum + record.total_duration_sec,
        0
      ),
      total_calories: dailyRecords.reduce(
        (sum: number, record: ExerciseRecord) => sum + record.calories_burned,
        0
      ),
    };

    return HttpResponse.json({
      success: true,
      message: '운동 세트가 성공적으로 등록되었습니다.',
      data: {
        set_id: setId,
        exercise_name: requestData.exercise_name,
        body_part: requestData.body_part,
        equipment: requestData.equipment,
        set_number: existingRecord.set_count,
        repetitions: requestData.repetitions,
        weight_kg: requestData.weight_kg,
        duration_sec: requestData.duration_sec,
        calories: requestData.calories,
        is_trainer_workout: me?.user_type === 'trainer',
        workout_totals: workoutTotals,
        daily_totals: dailyTotals,
      },
    });
  }
);
