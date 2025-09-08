import { InputParseError, NotFoundError } from '@/src/entities/errors/common';
import type { Todo } from '@/src/entities/models/todo';
import type { ITodosRepository } from '@/src/application/repositories/todos.repository.interface';

export const softDeleteTodoUseCase = (todosRepository: ITodosRepository) =>
{return async ( input: { todoId: string; } ): Promise<Todo> => {
  const todo = await todosRepository.getTodo(input.todoId);
    
  if (input.todoId.length < 4) {
    throw new InputParseError('Todo id must be at least 4 characters');
  }

  if (!todo) {
    throw new NotFoundError('Todo does not exist');
  }

  await todosRepository.softDeleteTodo(input.todoId);

  return todo;
};};

export type ISoftDeleteTodoUseCase = ReturnType<typeof softDeleteTodoUseCase>;
