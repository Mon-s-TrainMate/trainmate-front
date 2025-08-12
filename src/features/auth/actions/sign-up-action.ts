'use server';
import { signUp } from '../api/sign-up';
import type { SignUpFormSchema } from '../schema';
import { signInAction } from './sign-in-action';

export async function signUpAction(data: SignUpFormSchema) {
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
  return await signInAction({
    userType: 'trainer',
    email: data.email,
    password: data.password,
    keepLogin: false,
  });
}
