import { z } from 'zod';

export const getUsersSchema = z.object({
  query: z.object({
    name: z.string().optional(),
  }),
});

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email'),
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