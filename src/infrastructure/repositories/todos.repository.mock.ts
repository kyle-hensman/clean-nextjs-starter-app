import { v4 as uuidv4 } from 'uuid';

import { Todo, TodoInsert } from '@/src/entities/models/todo';
import { ITodosRepository } from '@/src/application/repositories/todos.repository.interface';
import { ArchivedTodo } from '@/src/entities/models/archived-todo';

export class MockTodosRepository implements ITodosRepository {
  private _todos: Todo[];
  private _archivedTodos: ArchivedTodo[];

  constructor() {
    this._todos = [];
    this._archivedTodos = [];
  }

  async createTodo(todo: TodoInsert): Promise<Todo> {
    const id = uuidv4();
    const created = { ...todo, id };
    this._todos.push(created);
    return created;
  }

  async getTodo(id: string): Promise<Todo | undefined> {
    const todo = this._todos.find((t) => {return t.id === id;});
    return todo;
  }

  async getTodos(): Promise<Todo[]> {
    return this._todos;
  }

  async getTodosForUser(userId: string): Promise<Todo[]> {
    const usersTodos = this._todos.filter((t) => {return t.userId === userId;});
    return usersTodos;
  }

  async getDeletedTodosForUser(userId: string): Promise<Todo[]> {
    const usersTodos = this._todos.filter((t) => {return t.userId === userId && t.deleted === true;});
    return usersTodos;
  }

  async getArchivedTodosForUser(userId: string): Promise<ArchivedTodo[]> {
    const usersArchivedTodos = this._archivedTodos.filter((t) => {return t.userId === userId;});
    return usersArchivedTodos;
  }

  async updateTodo(id: string, input: Partial<TodoInsert>): Promise<Todo> {
    const existingIndex = this._todos.findIndex((t) => {return t.id === id;});
    const updated = {
      ...this._todos[existingIndex],
      ...input,
    };
    this._todos[existingIndex] = updated;
    return updated;
  }

  async deleteTodo(id: string): Promise<void> {
    const existingIndex = this._todos.findIndex((t) => {return t.id === id;});
    if (existingIndex > -1) {
      delete this._todos[existingIndex];
      this._todos = this._todos.filter(Boolean);
    }
  }


  async softDeleteTodo(id: string): Promise<void> {
    const existingIndex = this._todos.findIndex((t) => {return t.id === id;});
    const updated = {
      ...this._todos[existingIndex],
      deleted: true,
    };
    this._todos[existingIndex] = updated;
  }


  async archiveTodo(id: string, metadata?: Record<string, unknown>): Promise<ArchivedTodo> {
    const existingIndex = this._todos.findIndex((t) => {return t.id === id;});
    const todo = this._todos[existingIndex];
    const updated = {
      ...todo,
      archived: true,
    };
    const archived = {
      id: uuidv4(),
      title: todo.title,
      todoId: todo.id,
      userId: todo.userId,
      completed: todo.completed,
      archivedAt: new Date(),
      metadata: metadata,
    };
    this._todos[existingIndex] = updated;
    this._archivedTodos.push(archived);
    return archived;
  }

  async unarchiveTodo(id: string): Promise<Todo> {
    const existingIndex = this._todos.findIndex((t) => {return t.id === id;});
    const todo = this._todos[existingIndex];
    const updated = {
      ...todo,
      archived: false,
    };
    this._todos[existingIndex] = updated;
    this._archivedTodos = this._archivedTodos.filter((t) => {return t.todoId !== id;});
    return updated;
  }
}
