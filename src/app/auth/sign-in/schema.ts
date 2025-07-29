import z from 'zod';
import { emailSchema, passwordSchema } from '../schema';

export type SignInFormSchema = z.infer<typeof signInFormSchema>;
export const signInFormSchema = z.object({
  userType: z.enum(['trainer', 'member']),
  email: emailSchema,
  password: passwordSchema,
  keepLogin: z.boolean(),
});
