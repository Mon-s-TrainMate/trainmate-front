'use server';

import { decodeJwt } from 'jose';
import { getAccessToken } from '../server-session';

export type ClientUser = NonNullable<Awaited<ReturnType<typeof getUsersMe>>>;
export async function getUsersMe() {
  const token = await getAccessToken();
  if (token == null) return null;
  const claim = decodeJwt(token);
  return {
    id: claim.user_id as number,
    name: claim.name as string,
    userType: claim.user_type as 'trainer' | 'member',
    email: claim.email as string,
    thumbnail: undefined,
  };
}
