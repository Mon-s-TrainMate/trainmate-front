'use server';

import { API_HOST } from '@/lib/consts';

type TokenRefreshResponse =
  | {
      refresh: string;
      access: string;
      code?: never;
      detail?: never;
    }
  | {
      refresh?: never;
      access?: never;
      detail: string;
      code: string;
    };

type TokenRefreshResult =
  | {
      success: true;
      refresh: string;
      access: string;
    }
  | {
      success: false;
      code: string;
      message: string;
    };

export async function refresh(refresh: string): Promise<TokenRefreshResult> {
  try {
    const res = await fetch(`${API_HOST}/auth/token/refresh/`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        refresh,
      }),
    });
    const body: TokenRefreshResponse = await res.json();
    if (body.code != null) {
      return { success: false as const, code: body.code, message: body.detail };
    }
    return {
      success: true as const,
      access: body.access,
      refresh: body.refresh,
    };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, code: error.name, message: error.message };
    }
    console.error(error);
    return { success: false, code: 'unknown', message: 'unexpected error' };
  }
}
