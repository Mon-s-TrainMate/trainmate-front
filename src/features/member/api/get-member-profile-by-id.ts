'use server';

import { getAccessToken } from '@/features/auth/server-session';
import { API_HOST } from '@/lib/consts';

export type MemberProfileResponse = {
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
};

export async function getMemberProfileById(memberId: string) {
  const token = await getAccessToken();
  const res = await fetch(`${API_HOST}/api/members/profile/${memberId}/`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const body: MemberProfileResponse = await res.json();

  return {
    id: body.user.id,
    name: body.user.name,
    email: body.user.email,
    userType: body.user.user_type,
    createdAt: new Date(body.user.created_at),
    profileImage: body.user.profile_image,
    age: body.user.age,
    heightCm: body.user.height_cm,
    weightKg: body.user.weight_kg,
    bodyFatPercentage: body.user.body_fat_percentage,
    muscleMassKg: body.user.muscle_mass_kg,
  };
}
