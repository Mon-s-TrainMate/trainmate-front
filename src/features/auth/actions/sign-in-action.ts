'use server';
import { signIn } from '../api/sign-in';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../consts';
import { SignInFormSchema } from '../schema';
import { setServerSession } from '../server-session';

export async function signInAction(data: SignInFormSchema) {
  const signInResponse = await signIn({
    email: data.email,
    password: data.password,
  });
  if (!signInResponse.success) {
    return signInResponse;
  }

  await setServerSession(ACCESS_TOKEN_KEY, signInResponse.tokens.access);
  await setServerSession(REFRESH_TOKEN_KEY, signInResponse.tokens.refresh);

  return { success: true as const, user: signInResponse.user };
}
