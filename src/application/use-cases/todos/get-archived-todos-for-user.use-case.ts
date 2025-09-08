import type { ITodosRepository } from '@/src/application/repositories/todos.repository.interface';
import { ArchivedTodo } from '@/app/_components/archived-todos';

export const getArchivedTodosForUserUseCase = (todosRepository: ITodosRepository) =>
  async (userId: string): Promise<ArchivedTodo[]> => {
    const todos = await todosRepository.getArchivedTodosForUser(userId);
    return todos;
  };

export type IGetArchivedTodosForUserUseCase = ReturnType<typeof getArchivedTodosForUserUseCase>;
