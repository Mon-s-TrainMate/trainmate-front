import { DeleteWorkoutSetResponse } from '@/features/workouts/api/delete-workout-set';
import { API_HOST } from '@/lib/consts';
import { users } from '@/mocks/data';
import { withAuthorization } from '@/mocks/utils';
import { http, HttpResponse } from 'msw';

export const mswDeleteWorkoutSet = http.delete<
  { memberId: string; recordId: string; setId: string },
  never,
  DeleteWorkoutSetResponse
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

    record.sets = record.sets.filter((set) => set.set_id !== setId);

    return HttpResponse.json({
      success: true,
      message: '세트가 성공적으로 삭제되었습니다.',
    });
  }
);
