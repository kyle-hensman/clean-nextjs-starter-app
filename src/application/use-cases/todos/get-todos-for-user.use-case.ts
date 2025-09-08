import type { Todo } from '@/src/entities/models/todo';
import type { ITodosRepository } from '@/src/application/repositories/todos.repository.interface';

export const getTodosForUserUseCase = (todosRepository: ITodosRepository) =>
  {return async (userId: string): Promise<Todo[]> => {
    const todos = await todosRepository.getTodosForUser(userId);
    return todos;
  };};

export type IGetTodosForUserUseCase = ReturnType<typeof getTodosForUserUseCase>;
