import z from 'zod';

export const emailSchema = z.email();
export const passwordSchema = z
  .string()
  .trim()
  .min(10)
  .regex(/^[a-zA-Z0-9`~!@#$%^&*()\-_=+\\|.,<>/?;:'"[\]{}]+$/)
  .regex(/[a-zA-Z]/)
  .regex(/[0-9]/)
  .regex(/[`~!@#$%^&*()\-_=+\\|.,<>/?;:'"[\]{}]/);
