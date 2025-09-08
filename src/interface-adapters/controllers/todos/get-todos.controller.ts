import { Todo } from '@/src/entities/models/todo';
import { IGetTodosUseCase } from '@/src/application/use-cases/todos/get-todos.use-case';

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

export const getTodosController =
  (
    getTodosUseCase: IGetTodosUseCase,
  ) =>
  {return async (
  ): Promise<ReturnType<typeof presenter>> => {
    const todos = await getTodosUseCase();

    return presenter(todos ?? []);
  };};

export type IGetTodosController = ReturnType<typeof getTodosController>;
