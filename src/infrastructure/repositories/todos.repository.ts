import { and, eq } from 'drizzle-orm';

import { db } from '@/drizzle';
import { archivedTodos, todos } from '@/drizzle/schema';
import { DatabaseOperationError, NotFoundError } from '@/src/entities/errors/common';
import { TodoInsert, Todo } from '@/src/entities/models/todo';
import { ArchivedTodo } from '@/src/entities/models/archived-todo';
import { ITodosRepository } from '@/src/application/repositories/todos.repository.interface';

export class TodosRepository implements ITodosRepository {
  constructor() {}

  async createTodo(todo: TodoInsert): Promise<Todo> {
    const invoker = db;

    try {
      const query = invoker.insert(todos).values(todo).returning();
      const created = await query.execute();
      
      if (created) {
        return created[0];
      } else {
        throw new DatabaseOperationError('Cannot create todo');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getTodo(id: string): Promise<Todo | undefined> {
    try {
      const query = db.query.todos.findFirst({
        where: eq(todos.id, id),
      });
      const todo = await query.execute();
      
      return todo;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getTodos(): Promise<Todo[]> {
    try {
      const query = db.query.todos.findMany();
      const todos = await query.execute();

      return todos;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getArchivedTodos(): Promise<ArchivedTodo[]> {
    try {
      const query = db.query.archivedTodos.findMany();
      const todos = await query.execute();

      return todos;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getTodosForUser(userId: string): Promise<Todo[]> {
    try {
      const query = db.query.todos.findMany({
        where: and(
          eq(todos.userId, userId),
          eq(todos.archived, false),
          eq(todos.deleted, false)
        ),
      });
      const usersTodos = await query.execute();
      
      return usersTodos;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getDeletedTodosForUser(userId: string): Promise<Todo[]> {
    try {
      const query = db.query.todos.findMany({
        where: and(
          eq(todos.userId, userId),
          eq(todos.deleted, true)
        ),
      });
      const usersTodos = await query.execute();
      
      return usersTodos;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getArchivedTodosForUser(userId: string): Promise<ArchivedTodo[]> {
    try {
      const query = db.query.archivedTodos.findMany({
        where: eq(todos.userId, userId),
      });
      const usersArchivedTodos = await query.execute();
      
      return usersArchivedTodos;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateTodo(id: string, input: Partial<TodoInsert>): Promise<Todo> {
    try {
      const query = db
        .update(todos)
        .set(input)
        .where(eq(todos.id, id))
        .returning();
      const updated = await query.execute();
      
      return updated[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async softDeleteTodo(id: string): Promise<void> {
    const invoker = db;

    try {
      const query = invoker
        .update(todos)
        .set({ deleted: true })
        .where(eq(todos.id, id))
        .returning();
      await query.execute();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteTodo(id: string): Promise<void> {
    const invoker = db;

    try {
      const query = invoker
        .delete(todos)
        .where(eq(todos.id, id))
        .returning();
      await query.execute();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async archiveTodo(id: string, metadata?: Record<string, unknown>): Promise<ArchivedTodo> {
    try {
      // Get the todo to update
      const todoQuery = db.query.todos.findFirst({
        where: eq(todos.id, id),
      });
      const todo = await todoQuery.execute();
      if (!todo) {
        throw new NotFoundError('Todo does not exist');
      }

      // Update origional todo
      const updateQuery = db
        .update(todos)
        .set({ archived: true })
        .where(eq(todos.id, id))
        .returning();
      const updated = await updateQuery.execute();

      // Create the archived todo
      const archiveQuery = db.insert(archivedTodos).values({
        todoId: todo.id,
        title: todo.title,
        userId: todo.userId,
        completed: todo.completed,
        archivedAt: new Date(),
        metadata: metadata,
      }).returning();
      const archived = await archiveQuery.execute();

      if (updated && archived) {
        return archived[0];
      } else {
        throw new DatabaseOperationError('Cannot archive todo');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async unarchiveTodo(id: string): Promise<Todo> {
    try {
      // Get the todo to update
      const todoQuery = db.query.todos.findFirst({
        where: eq(todos.id, id),
      });
      const todo = await todoQuery.execute();
      if (!todo) {
        throw new NotFoundError('Todo does not exist');
      }

      // Update origional todo
      const updateQuery = db
        .update(todos)
        .set({ archived: false })
        .where(eq(todos.id, id))
        .returning();
      const updated = await updateQuery.execute();

      // Delete the archived todo
      const archiveQuery = db
        .delete(archivedTodos)
        .where(eq(archivedTodos.todoId, id))
        .returning();
      const archived = await archiveQuery.execute();

      if (updated && archived) {
        return updated[0];
      } else {
        throw new DatabaseOperationError('Cannot archive todo');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
