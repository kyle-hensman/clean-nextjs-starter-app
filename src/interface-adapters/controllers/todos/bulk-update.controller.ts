import { z } from 'zod';

import { InputParseError } from '@/src/entities/errors/common';
import { IToggleTodoUseCase } from '@/src/application/use-cases/todos/toggle-todo.use-case';
import { IDeleteTodoUseCase } from '@/src/application/use-cases/todos/delete-todo.use-case';

const inputSchema = z.object({
  dirty: z.array(z.string()),
  deleted: z.array(z.string()),
});

export const bulkUpdateController =
  (
    toggleTodoUseCase: IToggleTodoUseCase,
    deleteTodoUseCase: IDeleteTodoUseCase
  ) =>
  async (
    input: z.infer<typeof inputSchema>,
  ): Promise<void> => {
    const { data, error: inputParseError } = inputSchema.safeParse(input);

    if (inputParseError) {
      throw new InputParseError('Invalid data', { cause: inputParseError });
    }

    const { dirty, deleted } = data;

    try {
      await Promise.all(
        dirty.map((t) =>
          toggleTodoUseCase({ todoId: t })
        )
      );
    } catch (error) {
      console.error(error);
    }

    try {
      await Promise.all(
        deleted.map((t) =>
          deleteTodoUseCase({ todoId: t })
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

export type IBulkUpdateController = ReturnType<typeof bulkUpdateController>;
