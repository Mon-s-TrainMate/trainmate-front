import { ageSchema, nameSchema } from '@/lib/schema';
import z from 'zod';

export type UpdatingProfileSchema = z.infer<typeof updatingProfileSchema>;
export const updatingProfileSchema = z
  .object({
    name: nameSchema,
    profile_image: z
      .file()
      .max(1_000_000, { error: '최대 1MB까지 올릴 수 있습니다.' })
      .mime(['image/png', 'image/jpeg', 'image/webp'], {
        error: '이미지만 등록할 수 있습니다.',
      }),
    phone: z.string().regex(/^01\d-\d{4}-\d{4}$/, {
      error: '01X-XXXX-XXXX 형식이어야 합니다.',
    }),
    age: ageSchema,
    height_cm: z
      .string()
      .regex(/^\d+(?:\.\d*)?$/, { error: '숫자여야 합니다.' }),
    weight_kg: z
      .string()
      .regex(/^\d+(?:\.\d*)?$/, { error: '숫자여야 합니다.' }),
    body_fat_percentage: z
      .string()
      .regex(/^\d+(?:\.\d*)?$/, { error: '숫자여야 합니다.' }),
    muscle_mass_kg: z
      .string()
      .regex(/^\d+(?:\.\d*)?$/, { error: '숫자여야 합니다.' }),
  })
  .partial();
