'use server';

import { updateMemberProfile } from '@/features/member/api/update-member-profile';

export type ProfileUpdateState = {
  success?: boolean;
  message?: string;
  errors?: {
    phoneNumber?: string[];
    thumbnail?: string[];
  };
};

export async function updateProfile(
  _prevState: ProfileUpdateState | null,
  formData: FormData
): Promise<ProfileUpdateState> {
  try {
    const phoneNumber = formData.get('phoneNumber') as string;
    const thumbnailFile = formData.get('thumbnail') as File;

    // Basic validation
    if (
      phoneNumber &&
      phoneNumber.length > 0 &&
      !/^[0-9-+\s()]+$/.test(phoneNumber)
    ) {
      return {
        success: false,
        errors: {
          phoneNumber: ['Please enter a valid phone number'],
        },
      };
    }

    const updateData: Record<string, unknown> = {};

    if (phoneNumber && phoneNumber.trim()) {
      updateData.phone_number = phoneNumber.trim();
    }

    if (thumbnailFile && thumbnailFile.size > 0) {
      updateData.profile_image = thumbnailFile;
    }

    if (Object.keys(updateData).length === 0) {
      return {
        success: false,
        message: 'No changes to update',
      };
    }

    const result = await updateMemberProfile(updateData);

    if (!result.success) {
      return {
        success: false,
        message: result.message || 'Failed to update profile',
      };
    }

    return {
      success: true,
      message: 'Profile updated successfully',
    };
  } catch {
    return {
      success: false,
      message: 'An unexpected error occurred',
    };
  }
}
