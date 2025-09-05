import type { Todo, TodoInsert } from '@/src/entities/models/todo';

export interface ITodosRepository {
  createTodo(todo: TodoInsert): Promise<Todo>;
  getTodo(id: string): Promise<Todo | undefined>;
  getTodos(): Promise<Todo[]>;
  // getTodosForUser(userId: string): Promise<Todo[]>;
  updateTodo(id: string, input: Partial<TodoInsert>): Promise<Todo>;
  deleteTodo(id: string): Promise<void>;
}
