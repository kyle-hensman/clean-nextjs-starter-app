import type { Todo } from '@/src/entities/models/todo';
import type { ITodosRepository } from '@/src/application/repositories/todos.repository.interface';

export const getDeletedTodosForUserUseCase = (todosRepository: ITodosRepository) =>
  async (userId: string): Promise<Todo[]> => {
    const todos = await todosRepository.getDeletedTodosForUser(userId);
    return todos;
  };

export type IGetDeletedTodosForUserUseCase = ReturnType<typeof getDeletedTodosForUserUseCase>;
