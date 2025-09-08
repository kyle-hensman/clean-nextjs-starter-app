import { z } from 'zod';

import { InputParseError } from '@/src/entities/errors/common';
import { UnauthenticatedError } from '@/src/entities/errors/auth';
import { ArchivedTodo } from '@/src/entities/models/archived-todo';
import { IAuthenticationService } from '@/src/application/services/authentication.service.interface';
import { IArchiveTodoUseCase } from '@/src/application/use-cases/todos/archive-todo.use-case';

const inputSchema = z.object({ todoId: z.string().min(1) });

export const archiveTodoController =
  (
    authenticationService: IAuthenticationService,
    archiveTodoUseCase: IArchiveTodoUseCase,
  ) =>
  {return async (
    input: Partial<z.infer<typeof inputSchema>>,
    sessionId: string,
  ): Promise<ArchivedTodo> => {
    const auth = await authenticationService.getSession();
    if (!auth || sessionId !== auth?.session.id) {
      throw new UnauthenticatedError('You must be logged in to create a todo');
    }

    const { data, error: inputParseError } = inputSchema.safeParse(input);

    if (inputParseError) {
      throw new InputParseError('Invalid data', { cause: inputParseError });
    }

    const archivedTodo = await archiveTodoUseCase({ todoId: data.todoId }); 
    return archivedTodo;
  };};

export type IArchiveTodoController = ReturnType<typeof archiveTodoController>;
