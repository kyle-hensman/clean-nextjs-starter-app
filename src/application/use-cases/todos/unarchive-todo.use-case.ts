import { InputParseError } from '@/src/entities/errors/common';
import type { ITodosRepository } from '@/src/application/repositories/todos.repository.interface';
import { Todo } from '@/app/_components/todos';

export const unarchiveTodoUseCase = (todosRepository: ITodosRepository) =>
{return async ( input: { todoId: string; } ): Promise<Todo> => {
  if (input.todoId.length < 4) {
    throw new InputParseError('Todo id must be at least 4 characters');
  }

  const unarchivedTodo = await todosRepository.unarchiveTodo(input.todoId);
  return unarchivedTodo;
};};

export type IUnarchiveTodoUseCase = ReturnType<typeof unarchiveTodoUseCase>;
