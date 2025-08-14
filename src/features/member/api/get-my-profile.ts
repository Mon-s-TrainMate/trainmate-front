'use server';

import { getAccessToken } from '@/features/auth/server-session';
import { API_HOST } from '@/lib/consts';
import { MemberProfileResponse } from './get-member-profile-by-id';

export async function getMyProfile() {
  const token = await getAccessToken();
  const res = await fetch(`${API_HOST}/api/members/profile/`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const body: MemberProfileResponse = await res.json();

  if (body.user == null) return null;

  return {
    id: body.user.id,
    name: body.user.name,
    email: body.user.email,
    userType: body.user.user_type,
    createdAt: new Date(body.user.created_at),
    profileImage: body.user.profile_image ?? undefined,
    phone: body.user.phone ?? undefined,
    age: body.user.age ?? undefined,
    heightCm: body.user.height_cm ?? undefined,
    weightKg: body.user.weight_kg ?? undefined,
    bodyFatPercentage: body.user.body_fat_percentage ?? undefined,
    muscleMassKg: body.user.muscle_mass_kg ?? undefined,
  };
}
