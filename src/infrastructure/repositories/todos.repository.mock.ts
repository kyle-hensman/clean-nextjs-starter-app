import { v4 as uuidv4 } from 'uuid';

import { Todo, TodoInsert } from '@/src/entities/models/todo';
import { ITodosRepository } from '@/src/application/repositories/todos.repository.interface';

export class MockTodosRepository implements ITodosRepository {
  private _todos: Todo[];

  constructor() {
    this._todos = [];
  }

  async createTodo(todo: TodoInsert): Promise<Todo> {
    const id = uuidv4();
    const created = { ...todo, id };
    this._todos.push(created);
    return created;
  }

  async getTodo(id: string): Promise<Todo | undefined> {
    const todo = this._todos.find((t) => t.id === id);
    return todo;
  }

  async getTodos(): Promise<Todo[]> {
    return this._todos;
  }

  // async getTodosForUser(userId: string): Promise<Todo[]> {
  //   const usersTodos = this._todos.filter((t) => t.userId === userId);
  //   return usersTodos;
  // }

  async updateTodo(id: string, input: Partial<TodoInsert>): Promise<Todo> {
    const existingIndex = this._todos.findIndex((t) => t.id === id);
    const updated = {
      ...this._todos[existingIndex],
      ...input,
    };
    this._todos[existingIndex] = updated;
    return updated;
  }

  async deleteTodo(id: string): Promise<void> {
    const existingIndex = this._todos.findIndex((t) => t.id === id);
    if (existingIndex > -1) {
      delete this._todos[existingIndex];
      this._todos = this._todos.filter(Boolean);
    }
  }
}
