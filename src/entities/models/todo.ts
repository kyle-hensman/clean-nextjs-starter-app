import { z } from 'zod';

export const selectTodoSchema = z.object({
  id: z.string(),
  title: z.string(),
  completed: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type Todo = z.infer<typeof selectTodoSchema>;

export const insertTodoSchema = selectTodoSchema.pick({
  title: true,
  completed: true,
  createdAt: true,
  updatedAt: true,
});

export type TodoInsert = z.infer<typeof insertTodoSchema>;
