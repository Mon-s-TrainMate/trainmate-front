'use server';

import { API_HOST } from '@/lib/consts';
import { User } from '../types';

export interface SignUpBody {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  user_type: string;
  terms_agreed: boolean;
  privacy_agreed: boolean;
  marketing_agreed: boolean;
}
export type SignUpResponse =
  | {
      success: true;
      message: string;
      user: User;
    }
  | {
      success: false;
      message: string;
      errors: Record<string, string[]>;
    };
export async function signUp(data: SignUpBody): Promise<SignUpResponse> {
  const res = await fetch(`${API_HOST}/api/accounts/signup/`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password,
      confirm_password: data.confirm_password,
      user_type: data.user_type,
      terms_agreed: data.terms_agreed,
      privacy_agreed: data.privacy_agreed,
      marketing_agreed: data.marketing_agreed,
    }),
  });
  const body = await res.json();
  if (!body.success && Object.hasOwn(body, 'error')) {
    return {
      ...body,
      errors: body.error,
    };
  }
  return body;
}
