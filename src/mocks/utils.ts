import { type JWTPayload, jwtVerify, SignJWT } from 'jose';
import { JWSInvalid } from 'jose/errors';
import { HttpResponse } from 'msw';

interface UserPayload extends JWTPayload {
  user_id: number;
  name: string;
  email: string;
  user_type: string;
}

const secret = new Uint8Array([1, 2, 3]);
export async function signJwt(
  payload: UserPayload,
  exp: number | string | Date
) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(exp)
    .sign(secret);
}

export async function withAuthorization(request: Request) {
  const authorization = request.headers.get('Authorization');
  if (!authorization?.startsWith('Bearer '))
    throw HttpResponse.json(
      {
        detail: 'Authentication credentials were not provided.',
      },
      { status: 401 }
    );

  const token = authorization.slice(7);
  try {
    const result = await jwtVerify(token, secret);
    return result.payload as UserPayload;
  } catch (error) {
    if (error instanceof JWSInvalid) {
      throw HttpResponse.json(
        {
          detail: error.message,
          code: 'token_not_valid',
          messages: [
            {
              token_class: 'AccessToken',
              token_type: 'access',
              message: error.message,
            },
          ],
        },
        { status: 401 }
      );
    }
    console.error(error);
    throw HttpResponse.json({}, { status: 500 });
  }
}
