import type { Todo } from '@/src/entities/models/todo';
import { NotFoundError } from '@/src/entities/errors/common';
import type { ITodosRepository } from '@/src/application/repositories/todos.repository.interface';

export const toggleTodoUseCase =
  (
    todosRepository: ITodosRepository
  ) =>
  async (
    input: {
      todoId: string;
    },
  ): Promise<Todo> => {
    const todo = await todosRepository.getTodo(input.todoId);

    if (!todo) {
      throw new NotFoundError('Todo does not exist');
    }

    const updatedTodo = await todosRepository.updateTodo(
      todo.id,
      {
        completed: !todo.completed,
        updatedAt: new Date(),
      },
    );

    return updatedTodo;
  };

export type IToggleTodoUseCase = ReturnType<typeof toggleTodoUseCase>;
