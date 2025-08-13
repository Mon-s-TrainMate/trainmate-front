import {
  CreateWorkoutSetData,
  CreateWorkoutSetResponse,
} from '@/features/workouts/api/create-workout-set';
import { API_HOST } from '@/lib/consts';
import { createExerciseRecordSet, users } from '@/mocks/data';
import { withAuthorization } from '@/mocks/utils';
import { http, HttpResponse } from 'msw';

export const mswCreateWorkoutSet = http.post<
  { memberId: string; recordId: string },
  CreateWorkoutSetData,
  CreateWorkoutSetResponse
>(
  API_HOST + '/api/workouts/:memberId/records/:recordId/sets/',
  async ({ params, request }) => {
    const memberId = Number(params.memberId);
    const recordId = Number(params.recordId);

    const user = users.find((user) => user.id === memberId);
    if (user == null)
      return HttpResponse.json(
        { success: false, message: 'no user' },
        { status: 404 }
      );

    const payload = await withAuthorization(request);
    const me = users.find((user) => user.id === payload.user_id);
    if (me?.user_type !== 'trainer' && me?.id !== user.id)
      return HttpResponse.json(
        { success: false, message: 'no auth' },
        { status: 403 }
      );

    const record = user.records.find((record) => record.record_id === recordId);

    if (record == null)
      return HttpResponse.json(
        { success: false, message: 'no record' },
        { status: 404 }
      );

    const body = await request.json();
    const set = createExerciseRecordSet({
      calories_burned: body.calories,
      duration: body.duration_sec,
      repeat: body.repetitions,
      kg: body.weight_kg,
    });
    record.sets.push(set);

    return HttpResponse.json({
      success: true,
      message: '세트가 성공적으로 생성되었습니다.',
      // data: {
      //   set_id: set.set_id,
      //   set_number: set.set_id,
      //   repetitions: set.repeat,
      //   weight_kg: set.kg,
      //   duration_sec: set.duration,
      //   duration_display: '{{duration-display}}',
      //   calories: set.calories_burned,
      //   exercise_name: record.exercise_name,
      //   updated_fields: [],
      // },
    });
  }
);
