import { ArchivedTodo } from '@/src/entities/models/archived-todo';
import type { Todo, TodoInsert } from '@/src/entities/models/todo';

export interface ITodosRepository {
  createTodo(todo: TodoInsert): Promise<Todo>;
  getTodo(id: string): Promise<Todo | undefined>;
  getTodos(): Promise<Todo[]>;
  getTodosForUser(userId: string): Promise<Todo[]>;
  getDeletedTodosForUser(userId: string): Promise<Todo[]>;
  getArchivedTodosForUser(userId: string): Promise<ArchivedTodo[]>;
  updateTodo(id: string, input: Partial<TodoInsert>): Promise<Todo>;
  deleteTodo(id: string): Promise<void>;
  softDeleteTodo(id: string): Promise<void>;
  archiveTodo(id: string, metadata?: Record<string, unknown>): Promise<ArchivedTodo>;
  unarchiveTodo(id: string): Promise<Todo>;
}
