import { object, string } from 'zod';

// Based on and for use with the zod config inside validate.ts
export const createSessionSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required'
    }),
    password: string({
      required_error: 'Password is required'
    }),
  }),
});
