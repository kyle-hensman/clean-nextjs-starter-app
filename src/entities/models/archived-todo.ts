import { z } from 'zod';

export const selectArchivedTodoSchema = z.object({
  id: z.string(),
  title: z.string(),
  todoId: z.string(),
  userId: z.string(),
  completed: z.boolean(),
  archivedAt: z.date(),
});
export type ArchivedTodo = z.infer<typeof selectArchivedTodoSchema>;

export const insertArchivedTodoSchema = selectArchivedTodoSchema.pick({
  title: true,
  todoId: true,
  userId: true,
  completed: true,
  archivedAt: true,
});

export type ArchivedTodoInsert = z.infer<typeof insertArchivedTodoSchema>;
