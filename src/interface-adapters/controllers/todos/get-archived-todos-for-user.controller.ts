import { IGetArchivedTodosForUserUseCase } from '@/src/application/use-cases/todos/get-archived-todos-for-user.use-case';
import { ArchivedTodo } from '@/app/_components/archived-todos';

function presenter(
  todos: ArchivedTodo[],
) {
  return todos.map((todo) => ({
    id: todo.id,
    title: todo.title,
    todoId: todo.todoId,
    completed: todo.completed,
    archivedAt: todo.archivedAt,
  }));
}

export const getArchivedTodosForUserController =
  (
    getArchivedTodosForUserUseCase: IGetArchivedTodosForUserUseCase,
  ) =>
  async (
    userId: string,
  ): Promise<ReturnType<typeof presenter>> => {
    const todos = await getArchivedTodosForUserUseCase(userId);

    return presenter(todos ?? []);
  };

export type IGetArchivedTodosForUserController = ReturnType<typeof getArchivedTodosForUserController>;
