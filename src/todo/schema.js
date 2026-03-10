import { z } from 'zod';

export const getTodosSchema = z.object({
  query: z.object({
    status: z.enum(['pending', 'in-progress', 'completed']).optional(),
    search: z.string().optional(),
  }),
});

export const createTodoSchema = z.object({
  body: z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().optional(),
    status: z.enum(['pending', 'in-progress', 'completed']).default('pending'),
  }).strict(),
});

export const updateTodoSchema = z.object({
  body: z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().optional(),
    status: z.enum(['pending', 'in-progress', 'completed']),
  }).strict(),
  params: z.object({
    id: z.string().uuid('Invalid UUID'),
  }),
});

export const patchTodoSchema = z.object({
  body: z.object({
    title: z.string().min(3).optional(),
    description: z.string().optional(),
    status: z.enum(['pending', 'in-progress', 'completed']).optional(),
  }).strip(),
  params: z.object({
    id: z.uuid('Invalid UUID'),
  }),
});

export const getTodoSchema = z.object({
  params: z.object({
    id: z.uuid('Invalid UUID'),
  }),
});

export const deleteTodoSchema = z.object({
  params: z.object({
    id: z.uuid('Invalid UUID'),
  }),
});

