import { z } from 'zod';

export const getUsersSchema = z.object({
  query: z.object({
    name: z.string().optional(),
  }),
});

const minLengthErrorMessage = 'Password must be at least 8 characters';
const maxLengthErrorMessage = 'Password must be at most 20 characters';
const uppercaseErrorMessage = 'Password must contain at least one uppercase letter';
const lowercaseErrorMessage = 'Password must contain at least one lowercase letter';
const numberErrorMessage = 'Password must contain at least one number';
const specialCharacterErrorMessage = 'Password must contain at least one special character';

const passwordSchema = z
  .string()
  .min(8, { message: minLengthErrorMessage })
  .max(20, { message: maxLengthErrorMessage })
  .refine((password) => /[A-Z]/.test(password), {
    message: uppercaseErrorMessage,
  })
  .refine((password) => /[a-z]/.test(password), {
    message: lowercaseErrorMessage,
  })
  .refine((password) => /[0-9]/.test(password), { message: numberErrorMessage })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: specialCharacterErrorMessage,
  });

export const loginSchema = z.object({
  body: z.object({
    email: z.email('Invalid email'),
    password: passwordSchema,
  }),
});

export const refreshTokenSchema = z.object({
  body: z.object({
    token: z.string('Invalid token'),
  }),
});

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.email('Invalid email'),
    password: passwordSchema,
  }),
})

export const putUserSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.email('Invalid email'),
  }),
  params: z.object({
    id: z.uuid('Invalid UUID'),
  }),
});

export const patchUserSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    email: z.email().optional(),
  }),
  params: z.object({
    id: z.uuid('Invalid UUID'),
  }),
});

export const getUserSchema = z.object({
  params: z.object({
    id: z.uuid('Invalid UUID'),
  }),
});

export const deleteUserSchema = z.object({
  params: z.object({
    id: z.uuid('Invalid UUID'),
  }),
});