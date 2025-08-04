import { API_HOST } from '@/lib/consts';
import { users } from '@/mocks/data';
import { withAuthorization } from '@/mocks/utils';
import { http, HttpResponse } from 'msw';

// GET /api/members/profile/ - Get current user's profile
export const mswMyProfile = http.get(
  API_HOST + '/api/members/profile/',
  async ({ request }) => {
    const payload = await withAuthorization(request);
    const user = users.find((user) => user.id === payload.user_id);

    if (user == null) {
      return HttpResponse.json(
        {
          success: false,
          message: '사용자를 찾을 수 없습니다.',
        },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        user_type: user.user_type,
        profile_image: user.profile_image,
        age: user.age,
        height_cm: user.height_cm,
        weight_kg: user.weight_kg,
        body_fat_percentage: user.body_fat_percentage,
        muscle_mass_kg: user.muscle_mass_kg,
        created_at: user.created_at,
      },
    });
  }
);

// PUT /api/members/profile/ - Full profile update
export const mswUpdateMyProfile = http.put(
  API_HOST + '/api/members/profile/',
  async ({ request }) => {
    const payload = await withAuthorization(request);
    const body = await request.json();

    const userIndex = users.findIndex((user) => user.id === payload.user_id);
    if (userIndex === -1) {
      return HttpResponse.json(
        {
          success: false,
          message: '사용자를 찾을 수 없습니다.',
        },
        { status: 404 }
      );
    }

    // Update user data
    const user = users[userIndex];
    if (body.profile_image !== undefined)
      user.profile_image = body.profile_image;
    if (body.age !== undefined) user.age = body.age;
    if (body.height_cm !== undefined) user.height_cm = body.height_cm;
    if (body.weight_kg !== undefined) user.weight_kg = body.weight_kg;
    if (body.body_fat_percentage !== undefined)
      user.body_fat_percentage = body.body_fat_percentage;
    if (body.muscle_mass_kg !== undefined)
      user.muscle_mass_kg = body.muscle_mass_kg;
    user.updated_at = new Date().toISOString();

    return HttpResponse.json({
      success: true,
      message: '프로필이 수정되었습니다.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        user_type: user.user_type,
        profile_image: user.profile_image,
        age: user.age,
        height_cm: user.height_cm,
        weight_kg: user.weight_kg,
        body_fat_percentage: user.body_fat_percentage,
        muscle_mass_kg: user.muscle_mass_kg,
        created_at: user.created_at,
      },
    });
  }
);

// PATCH /api/members/profile/ - Partial profile update
export const mswPatchMyProfile = http.patch(
  API_HOST + '/api/members/profile/',
  async ({ request }) => {
    const payload = await withAuthorization(request);
    const body = await request.json();

    const userIndex = users.findIndex((user) => user.id === payload.user_id);
    if (userIndex === -1) {
      return HttpResponse.json(
        {
          success: false,
          message: '사용자를 찾을 수 없습니다.',
        },
        { status: 404 }
      );
    }

    // Update user data (same logic as PUT for partial updates)
    const user = users[userIndex];
    if (body.profile_image !== undefined)
      user.profile_image = body.profile_image;
    if (body.age !== undefined) user.age = body.age;
    if (body.height_cm !== undefined) user.height_cm = body.height_cm;
    if (body.weight_kg !== undefined) user.weight_kg = body.weight_kg;
    if (body.body_fat_percentage !== undefined)
      user.body_fat_percentage = body.body_fat_percentage;
    if (body.muscle_mass_kg !== undefined)
      user.muscle_mass_kg = body.muscle_mass_kg;
    user.updated_at = new Date().toISOString();

    return HttpResponse.json({
      success: true,
      message: '프로필이 수정되었습니다.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        user_type: user.user_type,
        profile_image: user.profile_image,
        age: user.age,
        height_cm: user.height_cm,
        weight_kg: user.weight_kg,
        body_fat_percentage: user.body_fat_percentage,
        muscle_mass_kg: user.muscle_mass_kg,
        created_at: user.created_at,
      },
    });
  }
);
