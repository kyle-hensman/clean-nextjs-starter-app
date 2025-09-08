import { Todo } from '@/src/entities/models/todo';
import { IGetDeletedTodosForUserUseCase } from '@/src/application/use-cases/todos/get-deleted-todos-for-user.use-case';

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

export const getDeletedTodosForUserController =
  (
    getDeletedTodosForUserUseCase: IGetDeletedTodosForUserUseCase,
  ) =>
  {return async (
    userId: string,
  ): Promise<ReturnType<typeof presenter>> => {
    const todos = await getDeletedTodosForUserUseCase(userId);

    return presenter(todos ?? []);
  };};

export type IGetDeletedTodosForUserController = ReturnType<typeof getDeletedTodosForUserController>;
