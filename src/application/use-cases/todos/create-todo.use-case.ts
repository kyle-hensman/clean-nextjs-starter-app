import { InputParseError } from '@/src/entities/errors/common';
import type { Todo } from '@/src/entities/models/todo';
import type { ITodosRepository } from '@/src/application/repositories/todos.repository.interface';

export const createTodoUseCase = (todosRepository: ITodosRepository) =>
  {return async ( input: { title: string; }, userId: string ): Promise<Todo> => {
    if (input.title.length < 4) {
      throw new InputParseError('Todo must be at least 4 characters');
    }

    const newTodo = await todosRepository.createTodo(
      {
        title: input.title,
        userId: userId,
        completed: false,
        deleted: false,
        archived: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    );

    return newTodo;
  };};

export type ICreateTodoUseCase = ReturnType<typeof createTodoUseCase>;
