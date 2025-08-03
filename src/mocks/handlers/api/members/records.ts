import { API_HOST } from '@/lib/consts';
import { users } from '@/mocks/data';
import { withAuthorization } from '@/mocks/utils';
import { http, HttpResponse } from 'msw';

export const mswMemberRecords = http.get(
  API_HOST + '/api/members/:member_id/records',
  async ({ params, request }) => {
    const memberId = Number(params.memberId);
    const user = users.find((user) => user.id === memberId);
    if (user == null) return HttpResponse.json({}, { status: 404 });

    const payload = await withAuthorization(request);
    const me = users.find((user) => user.id === payload.user_id);
    if (me?.user_type !== 'trainer' || me.id !== user.id)
      return HttpResponse.json({}, { status: 403 });

    const url = new URL(request.url);
    const date = url.searchParams.get('date');

    const record = user.records.find((record) =>
      date == null ? true : record.date === date
    );
    if (record == null) return HttpResponse.json({}, { status: 404 });
    return HttpResponse.json(record);
  }
);
