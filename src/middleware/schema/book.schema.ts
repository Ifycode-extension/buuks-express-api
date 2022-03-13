import { number, object, string, TypeOf } from 'zod';

// Based on and for use with the zod config inside validate.ts

const payload = {
  body: object({
    title: string({
      required_error: 'Title is required'
    }),
    description: string({
      required_error: 'Description is required'
    }).min(10, 'Description should be at least 10 characters long'),
  }),
}

const file_payload = {
  file: object({
    fieldname: string({
      required_error: 'Field name is required'
    }),
    originalname: string({
      required_error: 'Original file name is required'
    }),
    size: number({
      required_error: 'File size should be greater than 1 bytes'
    }).min(1),
  }),
}

const params = {
  params: object({
    bookId: string({
      required_error: 'bookId is required'
    }),
  }),
}

export const createBookSchema = object({
  ...payload
});

export const uploadBookSchema = object({
  ...file_payload
});

export const getOneBookSchema = object({
  ...params
});

export const deleteBookSchema = object({
  ...params
});

export type CreateBookInput = TypeOf<typeof createBookSchema>;
export type UploadBookInput = TypeOf<typeof uploadBookSchema>;
export type GetOneBookInput = TypeOf<typeof getOneBookSchema>;
export type DeleteBookInput = TypeOf<typeof deleteBookSchema>;
