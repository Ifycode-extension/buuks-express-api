import { object, string, TypeOf } from 'zod';

// Based on and for use with the zod config inside validate.ts
export const createUserSchema = object({
  body: object({
    name: string({ required_error: 'Name is required' }),
    password: string({
      required_error: 'Password is required'
    }).min(8, 'Password is too short - 8 characters minimum'),
    passwordConfirmation: string({ required_error: 'Password confirmation is required' }),
    email: string({
      required_error: 'Name is required'
    }).email('Not a valid email'),
  }).refine(data => data.password === data.passwordConfirmation, {
    message: 'Passwords do not maatch',
    path: ['passwordConfirmation']
  }),
});

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, 'body.passwordConfirmation'>;