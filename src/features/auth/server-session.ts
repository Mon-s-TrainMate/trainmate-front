'use server';

import { decodeJwt } from 'jose';
import { cookies } from 'next/headers';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from './consts';

export async function setServerSession(key: string, token: string) {
  const cookieStore = await cookies();
  const claims = decodeJwt(token);
  const maxAge = (claims.exp ?? 0) - (claims.iat ?? 0);
  cookieStore.set(key, token, {
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: maxAge,
  });
}

async function getServerSession(key: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get(key)?.value ?? null;
  return token;
}

export async function getAccessToken() {
  const accessToken = await getServerSession(ACCESS_TOKEN_KEY);
  if (accessToken != null) return accessToken;
  const refreshToken = await getServerSession(REFRESH_TOKEN_KEY);
  if (refreshToken == null) return null;

  // TODO: refresh logic

  return null;
}
