import z from 'zod';
import { emailSchema, passwordSchema } from '../schema';

export type FormSchema = z.infer<typeof formSchema>;
export const formSchema = z
  .object({
    terms_agreed: z.boolean().refine((value) => value),
    privacy_agreed: z.boolean().refine((value) => value),
    marketing_agreed: z.boolean(),
    user_type: z.enum(['member', 'trainer']),
    name: z.string().min(1, { error: '이름을 입력해주세요.' }),
    email: emailSchema,
    password: passwordSchema,
    confirm_password: passwordSchema,
  })
  .refine((schema) => schema.password === schema.confirm_password, {
    path: ['confirm_password'],
    error: '비밀번호가 일치하지 않습니다.',
  });
