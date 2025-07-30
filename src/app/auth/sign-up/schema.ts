import z from 'zod';
import { emailSchema, passwordSchema } from '../schema';

export type SignUpAgreementFormSchema = z.infer<
  typeof signUpAgreementFormSchema
>;
export const signUpAgreementFormSchema = z.object({
  serviceTos: z.boolean().refine((value) => value === true),
  personalInformationTos: z.boolean().refine((value) => value === true),
  optionalTos: z.boolean().optional(),
});
export type SignUpUserInfoFormSchema = z.infer<typeof signUpUserInfoFormSchema>;
export const signUpUserInfoFormSchema = z
  .object({
    name: z.string().min(1),
    email: emailSchema,
    password: passwordSchema,
    passwordCheck: passwordSchema,
  })
  .refine((obj) => obj.password === obj.passwordCheck);
