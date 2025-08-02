'use server';
import { signIn } from '@/features/auth/api/sign-in';
import { signUp } from '@/features/auth/api/sign-up';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/features/auth/consts';
import { setServerSession } from '@/features/auth/server-session';
import type { FormSchema } from '../schema';

export async function createUser(data: FormSchema) {
  const signUpResponse = await signUp({
    name: data.name,
    email: data.email,
    password: data.password,
    confirm_password: data.confirm_password,
    user_type: data.user_type,
    terms_agreed: data.terms_agreed,
    privacy_agreed: data.privacy_agreed,
    marketing_agreed: data.marketing_agreed,
  });
  if (!signUpResponse.success) {
    return signUpResponse;
  }
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
