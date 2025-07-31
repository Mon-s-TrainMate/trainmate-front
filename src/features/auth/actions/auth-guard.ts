import { redirect } from 'next/navigation';
import { getUsersMe } from './me';

export async function authGuard() {
  const me = await getUsersMe();
  if (me == null) redirect('/auth/sign-in');
  return me;
}
