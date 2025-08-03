import { API_HOST } from '@/lib/consts';
import { users } from '@/mocks/data';
import { withAuthorization } from '@/mocks/utils';
import { http, HttpResponse } from 'msw';

export const mswMemberProfile = http.get<{ memberId: string }>(
  API_HOST + '/api/members/profile/:memberId',
  async ({ params, request }) => {
    const payload = await withAuthorization(request);
    const me = users.find((user) => user.id === payload.user_id);
    if (me?.user_type !== 'trainer')
      return HttpResponse.json({}, { status: 403 });

    const id = Number(params.memberId);
    const user = users.find((user) => user.id === id);
    if (user == null) return HttpResponse.json({}, { status: 404 });

    return HttpResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        user_type: user.user_type,
        profile_image: user.profile_image,
        age: user.age,
        height_cm: user.height_cm,
        weight_kg: user.weight_kg,
        body_fat_percentage: user.body_fat_percentage,
        muscle_mass_kg: user.muscle_mass_kg,
        created_at: user.created_at,
      },
    });
  }
);
