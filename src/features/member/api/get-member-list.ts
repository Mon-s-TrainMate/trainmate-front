'use server';

import { getAccessToken } from '@/features/auth/server-session';
import { API_HOST } from '@/lib/consts';

export type MemberListResponse =
  | {
      success: true;
      data: {
        trainer_profile: {
          profile_image: string | null;
          name: string;
          email: string;
          updated_at: string;
          is_my_profile: boolean;
          member_count: number;
        };
        members: {
          id: number;
          profile_image: string;
          name: string;
          email: string;
          updated_at: string;
          is_my_profile: boolean;
          profile_completed: boolean;
        }[];
        total_count: number;
      };
    }
  | {
      success: false;
    };
export async function getMemberList() {
  const token = await getAccessToken();
  const res = await fetch(`${API_HOST}/api/members/`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const body: MemberListResponse = await res.json();
  if (!body.success) throw body;
  return body.data.members.map((member) => ({
    id: member.id,
    profileImage: member.profile_image,
    name: member.name,
    email: member.email,
    updatedAt: new Date(member.updated_at),
    isMyProfile: member.is_my_profile,
    profileCompleted: member.profile_completed,
  }));
}
