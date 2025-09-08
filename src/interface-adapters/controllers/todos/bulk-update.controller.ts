import { z } from 'zod';

import { InputParseError } from '@/src/entities/errors/common';
import { IToggleTodoUseCase } from '@/src/application/use-cases/todos/toggle-todo.use-case';
import { IArchiveTodoUseCase } from '@/src/application/use-cases/todos/archive-todo.use-case';
import { IUnarchiveTodoUseCase } from '@/src/application/use-cases/todos/unarchive-todo.use-case';
import { ISoftDeleteTodoUseCase } from '@/src/application/use-cases/todos/soft-delete-todo.use-case';

const inputSchema = z.object({
  dirty: z.array(z.string()),
  deleted: z.array(z.string()),
  archived: z.array(z.string()),
  unarchived: z.array(z.string()),
});

export const bulkUpdateController =
  (
    toggleTodoUseCase: IToggleTodoUseCase,
    softDeleteTodoUseCase: ISoftDeleteTodoUseCase,
    archiveTodoUseCase: IArchiveTodoUseCase,
    unarchiveTodoUseCase: IUnarchiveTodoUseCase,
  ) =>
  {return async (
    input: z.infer<typeof inputSchema>,
  ): Promise<void> => {
    const { data, error: inputParseError } = inputSchema.safeParse(input);

    if (inputParseError) {
      throw new InputParseError('Invalid data', { cause: inputParseError });
    }

    const { dirty, deleted, archived, unarchived } = data;

    try {
      await Promise.all(
        dirty.map((t) =>
        {return toggleTodoUseCase({ todoId: t });}
        )
      );
    } catch (error) {
      console.error(error);
    }

    try {
      await Promise.all(
        deleted.map((t) =>
        {return softDeleteTodoUseCase({ todoId: t });}
        )
      );
    } catch (error) {
      console.error(error);
    }

    try {
      await Promise.all(
        archived.map((t) =>
        {return archiveTodoUseCase({ todoId: t });}
        )
      );
    } catch (error) {
      console.error(error);
    }

    try {
      await Promise.all(
        unarchived.map((t) =>
        {return unarchiveTodoUseCase({ todoId: t });}
        )
      );
    } catch (error) {
      console.error(error);
    }
  };};

export type IBulkUpdateController = ReturnType<typeof bulkUpdateController>;
