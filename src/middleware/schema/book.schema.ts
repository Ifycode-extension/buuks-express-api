import { object, string, TypeOf } from 'zod';

// Based on and for use with the zod config inside validate.ts

const payload = {
  body: object({
    title: string({
      required_error: 'Title is required'
    }),
    description: string({
      required_error: 'Description is required'
    }).min(10, 'Description should be at least 10 characters long'),
    pdf: string({
      required_error: 'PDF is required'
    }),
  }),
}

export const createBookSchema = object({
  ...payload
});

export type CreateBookInput = TypeOf<typeof createBookSchema>;
