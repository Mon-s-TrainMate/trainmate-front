'use server';
import { signIn } from '@/features/auth/api/sign-in';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/features/auth/consts';
import { setServerSession } from '@/features/auth/server-session';
import { SignInFormSchema } from '../schema';

export async function getUser(data: SignInFormSchema) {
  const signInResponse = await signIn({
    email: data.email,
    password: data.password,
  });
  if (!signInResponse.success) {
    return signInResponse;
  }

  await setServerSession(ACCESS_TOKEN_KEY, signInResponse.tokens.access);
  await setServerSession(REFRESH_TOKEN_KEY, signInResponse.tokens.refresh);

  return { success: true, user: signInResponse.user } as const;
}
