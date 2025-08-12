import { emailSchema, passwordSchema } from '@/lib/schema';
import z from 'zod';

export type SignInFormSchema = z.infer<typeof signInFormSchema>;
export const signInFormSchema = z.object({
  userType: z.enum(['trainer', 'member']),
  email: emailSchema,
  password: passwordSchema,
  keepLogin: z.boolean(),
});
