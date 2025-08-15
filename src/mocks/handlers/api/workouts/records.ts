import { MemberRecordListResponse } from '@/features/workouts/api/get-member-record-list';
import { sumBy } from '@/lib/array/sum-by';
import { API_HOST } from '@/lib/consts';
import { users } from '@/mocks/data';
import { withAuthorization } from '@/mocks/utils';
import { http, HttpResponse } from 'msw';

export const mswMemberRecords = http.get<
  { memberId: string },
  never,
  MemberRecordListResponse
>(API_HOST + '/api/workouts/:memberId/records', async ({ params, request }) => {
  const memberId = Number(params.memberId);
  const user = users.find((user) => user.id === memberId);
  if (user == null)
    return HttpResponse.json({ success: false }, { status: 404 });

  const payload = await withAuthorization(request);
  const me = users.find((user) => user.id === payload.user_id);
  if (me?.user_type !== 'trainer' && me?.id !== user.id)
    return HttpResponse.json({ success: false }, { status: 403 });

  const url = new URL(request.url);
  const date = url.searchParams.get('date');

  const records = user.records
    .filter((record) => (date == null ? true : record.date === date))
    .map((record) => ({
      id: record.record_id,
      is_trainer: record.is_trainer,
      exercise_name: record.exercise_name,
      set_count: record.sets.length,
      total_duration_sec: sumBy(record.sets, 'duration'),
      calories_burned: sumBy(record.sets, 'calories_burned'),
    }));

  return HttpResponse.json({
    success: true,
    records,
  });
});
