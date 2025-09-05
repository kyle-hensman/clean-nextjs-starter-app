import { z } from 'zod';

import { Todo } from '@/src/entities/models/todo';
import { InputParseError } from '@/src/entities/errors/common';
import { ICreateTodoUseCase } from '@/src/application/use-cases/todos/create-todo.use-case';

function presenter(
  todos: Todo[],
) {
  return todos.map((todo) => ({
    id: todo.id,
    title: todo.title,
    completed: todo.completed,
  }));
}

const inputSchema = z.object({ title: z.string().min(1) });

export const createTodoController =
  (
    createTodoUseCase: ICreateTodoUseCase
  ) =>
  async (
    input: Partial<z.infer<typeof inputSchema>>,
  ): Promise<ReturnType<typeof presenter>> => {
    const { data, error: inputParseError } = inputSchema.safeParse(input);

    if (inputParseError) {
      throw new InputParseError('Invalid data', { cause: inputParseError });
    }

    const todosFromInput = data.title.split(',').map((t) => t.trim());

    const todos = await Promise.all(todosFromInput.map((t) => createTodoUseCase({ title: t })));
    return presenter(todos ?? []);
  };

export type ICreateTodoController = ReturnType<typeof createTodoController>;
