import { z } from 'zod';

import { Todo } from '@/src/entities/models/todo';
import { InputParseError } from '@/src/entities/errors/common';
import { UnauthenticatedError } from '@/src/entities/errors/auth';
import { ICreateTodoUseCase } from '@/src/application/use-cases/todos/create-todo.use-case';
import { IAuthenticationService } from '@/src/application/services/authentication.service.interface';

function presenter(
  todos: Todo[],
) {
  return todos.map((todo) => ({
    id: todo.id,
    title: todo.title,
    userId: todo.userId,
    completed: todo.completed,
    archived: todo.archived,
  }));
}

const inputSchema = z.object({ title: z.string().min(1) });

export const createTodoController =
  (
    authenticationService: IAuthenticationService,
    createTodoUseCase: ICreateTodoUseCase
  ) =>
  async (
    input: Partial<z.infer<typeof inputSchema>>,
    sessionId: string,
  ): Promise<ReturnType<typeof presenter>> => {
    const auth = await authenticationService.getSession();
    if (!auth || sessionId !== auth?.session.id) {
      throw new UnauthenticatedError('You must be logged in to create a todo');
    }

    const { data, error: inputParseError } = inputSchema.safeParse(input);

    if (inputParseError) {
      throw new InputParseError('Invalid data', { cause: inputParseError });
    }

    const todosFromInput = data.title.split(',').map((t) => t.trim());

    const todos = await Promise.all(todosFromInput.map((t) => createTodoUseCase({ title: t }, auth.user.id )));
    return presenter(todos ?? []);
  };

export type ICreateTodoController = ReturnType<typeof createTodoController>;
