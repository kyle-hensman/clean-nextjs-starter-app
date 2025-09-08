import type { Todo } from '@/src/entities/models/todo';
import type { ITodosRepository } from '@/src/application/repositories/todos.repository.interface';

export const getTodosUseCase = (todosRepository: ITodosRepository) =>
{return async (): Promise<Todo[]> => {
  const todos = await todosRepository.getTodos();
  return todos;
};};

export type IGetTodosUseCase = ReturnType<typeof getTodosUseCase>;
