'use server';

import { API_HOST } from '../consts';
import { User } from '../types';

export interface SignInBody {
  email: string;
  password: string;
}
export type SignInResponse =
  | {
      success: true;
      message: string;
      user: User;
      tokens: {
        refresh: string;
        access: string;
      };
    }
  | {
      success: false;
      message: string;
      errors: Record<string, string[]>;
    };

export async function signIn(data: SignInBody): Promise<SignInResponse> {
  const res = await fetch(`${API_HOST}/api/accounts/login/`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  });
  return await res.json();
}
