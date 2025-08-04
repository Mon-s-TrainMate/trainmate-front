'use server';

import { getAccessToken } from '@/features/auth/server-session';
import { API_HOST } from '@/lib/consts';

export type UpdateMemberProfileData = {
  name?: string;
  profile_image?: string | null;
  age?: number | null;
  height_cm?: number | null;
  weight_kg?: number | null;
  body_fat_percentage?: number | null;
  muscle_mass_kg?: number | null;
};

export type UpdateMemberProfileResponse =
  | {
      success: true;
      user: {
        id: number;
        name: string;
        email: string;
        user_type: 'trainer' | 'member';
        created_at: string;
        profile_image: string | null;
        age: number | null;
        height_cm: number | null;
        weight_kg: number | null;
        body_fat_percentage: number | null;
        muscle_mass_kg: number | null;
      };
    }
  | {
      success: false;
      detail?: string;
      message?: string;
      code?: string;
      messages?: Array<{
        token_class?: string;
        token_type?: string;
        message: string;
      }>;
      errors?: Record<string, string[]>;
    };

export async function updateMemberProfile(
  data: UpdateMemberProfileData
): Promise<UpdateMemberProfileResponse> {
  const token = await getAccessToken();

  if (!token) {
    return {
      success: false,
      message: 'Authentication required',
    };
  }

  try {
    const res = await fetch(`${API_HOST}/api/members/profile/`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const body = await res.json();

    if (!res.ok) {
      return {
        success: false,
        detail: body.detail,
        message: body.message || body.detail || 'Failed to update profile',
        code: body.code,
        messages: body.messages,
        errors: body.errors || body.error,
      };
    }

    return body;
  } catch {
    return {
      success: false,
      message: 'Network error occurred',
    };
  }
}
