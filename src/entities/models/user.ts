import { z } from 'zod';

import { PASSWORD_MIN_LENGTH } from '@/config';

export const userSchema = z.object({
  id: z.string(),
  name: z.string().min(2).max(255),
  email: z.email().min(3).max(255),
  emailVerified: z.boolean().default(false),
  image: z.string().min(3).max(255).nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type User = z.infer<typeof userSchema>;

export const createUserSchema = userSchema
  .pick({ email: true, name: true })
  .merge(z.object({
    password: z.string().min(PASSWORD_MIN_LENGTH).max(255)
  }));

export type CreateUser = z.infer<typeof createUserSchema>;
