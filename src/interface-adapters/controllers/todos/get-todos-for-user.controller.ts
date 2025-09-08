import { Todo } from '@/src/entities/models/todo';
import { IGetTodosForUserUseCase } from '@/src/application/use-cases/todos/get-todos-for-user.use-case';

function presenter(
  todos: Todo[],
) {
  return todos.map((todo) => {return {
    id: todo.id,
    title: todo.title,
    completed: todo.completed,
    archived: todo.archived,
    createdAt: todo.createdAt,
  };});
}

export const getTodosForUserController =
  (
    getTodosForUserUseCase: IGetTodosForUserUseCase,
  ) =>
  {return async (
    userId: string,
  ): Promise<ReturnType<typeof presenter>> => {
    const todos = await getTodosForUserUseCase(userId);

    return presenter(todos ?? []);
  };};

export type IGetTodosForUserController = ReturnType<typeof getTodosForUserController>;
