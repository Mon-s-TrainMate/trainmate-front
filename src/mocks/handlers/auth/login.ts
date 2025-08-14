import { API_HOST } from '@/lib/consts';
import { http, HttpResponse } from 'msw';
import { users } from '../../data';
import { signJwt } from '../../utils';

export const mswLogin = http.post<never, { email: string }>(
  API_HOST + '/auth/login/',
  async ({ request }) => {
    const body = await request.json();

    const user = users.find((user) => user.email === body.email);
    if (user == null)
      return HttpResponse.json(
        {
          success: false,
          message: '로그인에 실패했습니다.',
          errors: {
            non_field_errors: ['이메일 또는 비밀번호가 올바르지 않습니다.'],
          },
        },
        {
          status: 404,
        }
      );

    const payload = {
      user_id: user.id,
      user_type: user.user_type,
    };

    const refresh = await signJwt(payload, '2d');
    const access = await signJwt(payload, '1h');
    return HttpResponse.json({
      success: true,
      message: '로그인이 완료 되었습니다.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        user_type: user.user_type,
      },
      tokens: {
        refresh,
        access,
      },
    });
  }
);
