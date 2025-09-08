import { z } from 'zod';

import { Todo } from '@/src/entities/models/todo';
import { InputParseError } from '@/src/entities/errors/common';
import { IToggleTodoUseCase } from '@/src/application/use-cases/todos/toggle-todo.use-case';

function presenter(
  todo: Todo,
) {
  return () => {return {
    id: todo.id,
    todo: todo.title,
    deleted: todo.deleted,
    archived: todo.archived,
    createdAt: todo.createdAt,
  };};
}

const inputSchema = z.object({ todoId: z.string() });

export const toggleTodoController =
  (
    toggleTodoUseCase: IToggleTodoUseCase
  ) =>
  {return async (
    input: Partial<z.infer<typeof inputSchema>>,
  ): Promise<ReturnType<typeof presenter>> => {
    const { data, error: inputParseError } = inputSchema.safeParse(input);

    if (inputParseError) {
      throw new InputParseError('Invalid data', { cause: inputParseError });
    }

    const todo = await toggleTodoUseCase(
      { todoId: data.todoId },
    );

    return presenter(todo);
  };};

export type IToggleTodoController = ReturnType<typeof toggleTodoController>;
