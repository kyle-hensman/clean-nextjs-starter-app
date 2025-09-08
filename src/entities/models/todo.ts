import { z } from 'zod';

export const selectTodoSchema = z.object({
  id: z.string(),
  title: z.string(),
  userId: z.string(),
  completed: z.boolean(),
  deleted: z.boolean(),
  archived: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable()
});
export type Todo = z.infer<typeof selectTodoSchema>;

export const insertTodoSchema = selectTodoSchema.pick({
  title: true,
  userId: true,
  completed: true,
  deleted: true,
  archived: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export type TodoInsert = z.infer<typeof insertTodoSchema>;
