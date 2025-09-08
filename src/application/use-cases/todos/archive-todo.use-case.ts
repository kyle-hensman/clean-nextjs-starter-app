import { InputParseError } from '@/src/entities/errors/common';
import { ArchivedTodo } from '@/src/entities/models/archived-todo';
import type { ITodosRepository } from '@/src/application/repositories/todos.repository.interface';

export const archiveTodoUseCase = (todosRepository: ITodosRepository) =>
  {return async ( input: { todoId: string; } ): Promise<ArchivedTodo> => {
    if (input.todoId.length < 4) {
      throw new InputParseError('Todo id must be at least 4 characters');
    }

    const archivedTodo = await todosRepository.archiveTodo(input.todoId);
    return archivedTodo;
  };};

export type IArchiveTodoUseCase = ReturnType<typeof archiveTodoUseCase>;
