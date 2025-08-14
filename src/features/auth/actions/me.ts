'use server';

import { decodeJwt } from 'jose';
import { getAccessToken } from '../server-session';

export async function getUsersMe() {
  const token = await getAccessToken();
  if (token == null) return null;
  const claim = decodeJwt(token);
  return {
    id: claim.user_id as number,
    userType: claim.user_type as 'trainer' | 'member',
  };
}
