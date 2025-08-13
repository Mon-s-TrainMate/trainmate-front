import {
  UpdateWorkoutSetData,
  UpdateWorkoutSetResponse,
} from '@/features/workouts/api/update-workout-set';
import { API_HOST } from '@/lib/consts';
import { users } from '@/mocks/data';
import { withAuthorization } from '@/mocks/utils';
import { http, HttpResponse } from 'msw';

export const mswUpdateWorkoutSet = http.patch<
  { memberId: string; recordId: string; setId: string },
  UpdateWorkoutSetData,
  UpdateWorkoutSetResponse
>(
  API_HOST + '/api/workouts/:memberId/records/:recordId/sets/:setId',
  async ({ params, request }) => {
    const memberId = Number(params.memberId);
    const recordId = Number(params.recordId);
    const setId = Number(params.setId);

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

    const set = record.sets.find((set) => set.set_id === setId);

    if (set == null)
      return HttpResponse.json(
        { success: false, message: 'no set' },
        { status: 404 }
      );

    const body = await request.json();
    if (body.calories) set.calories_burned = body.calories;
    if (body.duration_sec) set.duration = body.duration_sec;
    if (body.repetitions) set.repeat = body.repetitions;
    if (body.weight_kg) set.kg = body.weight_kg;

    return HttpResponse.json({
      success: true,
      message: '세트가 성공적으로 수정되었습니다.',
      data: {
        set_id: set.set_id,
        set_number: set.set_id,
        repetitions: set.repeat,
        weight_kg: set.kg,
        duration_sec: set.duration,
        duration_display: '{{duration-display}}',
        calories: set.calories_burned,
        exercise_name: record.exercise_name,
        updated_fields: [],
      },
    });
  }
);
