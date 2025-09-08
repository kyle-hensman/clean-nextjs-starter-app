import { z } from 'zod';

export const sessionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  token: z.string(),
  expiresAt: z.date(),
  ipAddress: z.string().nullable().optional(),
  userAgent: z.string().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Session = z.infer<typeof sessionSchema>;
