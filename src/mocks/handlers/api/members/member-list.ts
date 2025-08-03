import { MemberListResponse } from '@/features/member/api/get-member-list';
import { API_HOST } from '@/lib/consts';
import { users } from '@/mocks/data';
import { withAuthorization } from '@/mocks/utils';
import { http, HttpResponse } from 'msw';

export const mswMemberList = http.get<never, never, MemberListResponse>(
  API_HOST + '/api/members/',
  async ({ request }) => {
    const payload = await withAuthorization(request);
    const me = users.find((user) => user.id === payload.user_id);
    if (me?.user_type !== 'trainer')
      return HttpResponse.json(
        {
          success: false,
        },
        { status: 403 }
      );

    // mock은 모든 멤버를 다 가져오는 식으로 구현
    const members = users
      .filter((user) => user.user_type === 'member')
      .map((user) => ({
        id: user.id,
        profile_image: user.profile_image,
        name: user.name,
        email: user.email,
        updated_at: user.updated_at,
        is_my_profile: false,
        profile_completed: false,
      }));

    return HttpResponse.json({
      success: true,
      data: {
        trainer_profile: {
          profile_image: me.profile_image,
          name: me.name,
          email: me.email,
          updated_at: me.updated_at,
          is_my_profile: true,
          member_count: members.length,
        },
        members,
        total_count: members.length,
      },
    });
  }
);
