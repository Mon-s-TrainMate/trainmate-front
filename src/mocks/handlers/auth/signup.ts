import { signUpFormSchema } from '@/app/(me)/auth/sign-up/schema';
import { API_HOST } from '@/lib/consts';
import { http, HttpResponse } from 'msw';
import { ZodError } from 'zod';
import { createUser, users } from '../../data';

export const mswSignup = http.post(
  API_HOST + '/auth/sign-up/',
  async ({ request }) => {
    try {
      const body = signUpFormSchema.parse(await request.json());
      const existsUser = users.find((user) => user.email === body.email);
      if (existsUser != null) {
        return HttpResponse.json(
          {
            success: false,
            message: '회원가입에 실패했습니다.',
            errors: {
              email: ['이미 사용 중인 이메일입니다.'],
            },
          },
          { status: 400 }
        );
      }

      const user = createUser(body.name, body.email, body.user_type);
      users.push(user);

      return HttpResponse.json(
        {
          success: true,
          message: '회원가입이 완료되었습니다.',
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            user_type: user.user_type,
          },
        },
        { status: 201 }
      );
    } catch (error) {
      if (error instanceof ZodError) {
        return HttpResponse.json(
          {
            success: false,
            message: '회원가입에 실패했습니다.',
            errors: Object.fromEntries(
              error.issues.map((issue) => [
                issue.path.join('.'),
                [issue.message],
              ])
            ),
          },
          { status: 400 }
        );
      }
    }
  }
);
