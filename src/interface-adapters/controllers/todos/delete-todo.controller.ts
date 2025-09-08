import { z } from 'zod';

import { Todo } from '@/src/entities/models/todo';
import { InputParseError } from '@/src/entities/errors/common';
import { IDeleteTodoUseCase } from '@/src/application/use-cases/todos/delete-todo.use-case';

function presenter(
  todo: Todo,
) {
  return () => ({
    id: todo.id,
    todo: todo.title,
    completed: todo.completed,
    archived: todo.archived,
    createdAt: todo.createdAt,
  });
}

const inputSchema = z.object({ todoId: z.string() });

export const deleteTodoController =
  (
    deleteTodoUseCase: IDeleteTodoUseCase
  ) =>
  async (
    input: Partial<z.infer<typeof inputSchema>>,
  ): Promise<ReturnType<typeof presenter>> => {
    const { data, error: inputParseError } = inputSchema.safeParse(input);

    if (inputParseError) {
      throw new InputParseError('Invalid data', { cause: inputParseError });
    }

    const todo = await deleteTodoUseCase(
      { todoId: data.todoId },
    );

    return presenter(todo);
  };

export type IDeleteTodoController = ReturnType<typeof deleteTodoController>;
