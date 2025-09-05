import { InputParseError } from '@/src/entities/errors/common';
import type { Todo } from '@/src/entities/models/todo';
import type { ITodosRepository } from '@/src/application/repositories/todos.repository.interface';

export const createTodoUseCase = (todosRepository: ITodosRepository) =>
  async ( input: { title: string; } ): Promise<Todo> => {
    if (input.title.length < 4) {
      throw new InputParseError('Todo must be at least 4 characters');
    }

    const newTodo = await todosRepository.createTodo(
      {
        title: input.title,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    );

    return newTodo;
  };

export type ICreateTodoUseCase = ReturnType<typeof createTodoUseCase>;
