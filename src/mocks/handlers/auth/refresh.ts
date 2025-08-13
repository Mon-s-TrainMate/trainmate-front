import { API_HOST } from '@/lib/consts';
import { http, HttpResponse } from 'msw';
import { users } from '../../data';
import { signJwt, verifyJwt } from '../../utils';

export const mswRefresh = http.post<never, { refresh: string }>(
  API_HOST + '/auth/token/refresh/',
  async ({ request }) => {
    const body = await request.json();

    const refreshTokenPayload = await verifyJwt(body.refresh);

    const user = users.find((user) => user.email === refreshTokenPayload.email);
    if (user == null)
      return HttpResponse.json(
        {
          detail: 'Token has wrong type',
          code: 'token_not_valid',
        },
        {
          status: 404,
        }
      );

    const payload = {
      user_id: user.id,
      name: user.name,
      email: user.email,
      user_type: user.user_type,
    };

    const refresh = await signJwt(payload, '2d');
    const access = await signJwt(payload, '1h');
    return HttpResponse.json({
      refresh,
      access,
    });
  }
);
