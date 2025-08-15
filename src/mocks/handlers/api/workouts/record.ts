import { MemberRecordResponse } from '@/features/workouts/api/get-member-record';
import { sumBy } from '@/lib/array/sum-by';
import { API_HOST } from '@/lib/consts';
import { users } from '@/mocks/data';
import { withAuthorization } from '@/mocks/utils';
import { http, HttpResponse } from 'msw';

export const mswMemberRecord = http.get<
  { memberId: string; recordId: string },
  never,
  MemberRecordResponse
>(
  API_HOST + '/api/workouts/:memberId/records/:recordId/sets',
  async ({ params, request }) => {
    const memberId = Number(params.memberId);
    const recordId = Number(params.recordId);
    const user = users.find((user) => user.id === memberId);
    if (user == null)
      return HttpResponse.json({ success: false }, { status: 404 });

    const payload = await withAuthorization(request);
    const me = users.find((user) => user.id === payload.user_id);
    if (me?.user_type !== 'trainer' && me?.id !== user.id)
      return HttpResponse.json({ success: false }, { status: 403 });

    const record = user.records.find((record) => record.record_id === recordId);

    if (record == null)
      return HttpResponse.json({ success: false }, { status: 404 });

    const total_duration_sec = sumBy(record.sets, 'duration');
    const total_calories = sumBy(record.sets, 'calories_burned');
    const total_sets = record.sets.length;

    return HttpResponse.json({
      success: true,
      data: {
        workout_exercise_id: record.record_id,
        body_part: '{{body-part}}',
        exercise_name: record.exercise_name,
        total_duration_sec,
        total_duration_display: '{{total-duration-display}}',
        total_calories,
        total_sets,
        sets: record.sets.map((set) => ({
          set_id: set.set_id,
          set_number: set.set_id,
          repetitions: set.repeat,
          weight_kg: set.kg,
          duration_sec: set.duration,
          duration_display: '{{duration-display}}',
          calories: set.calories_burned,
          is_completed: true,
          completed_at: '{{completed-at}}',
        })),
      },
    });
  }
);
