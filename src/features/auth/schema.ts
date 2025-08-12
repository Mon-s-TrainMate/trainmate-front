import { emailSchema, nameSchema, passwordSchema } from '@/lib/schema';
import z from 'zod';

export type SignInFormSchema = z.infer<typeof signInFormSchema>;
export const signInFormSchema = z.object({
  userType: z.enum(['trainer', 'member']),
  email: emailSchema,
  password: passwordSchema,
  keepLogin: z.boolean(),
});

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;
export const signUpFormSchema = z
  .object({
    terms_agreed: z.boolean().refine((value) => value),
    privacy_agreed: z.boolean().refine((value) => value),
    marketing_agreed: z.boolean(),
    user_type: z.enum(['member', 'trainer']),
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirm_password: passwordSchema,
  })
  .refine((schema) => schema.password === schema.confirm_password, {
    path: ['confirm_password'],
    error: '비밀번호가 일치하지 않습니다.',
  });
