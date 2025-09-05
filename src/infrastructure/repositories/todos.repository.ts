import { eq } from 'drizzle-orm';

import { db } from '@/drizzle';
import { todos } from '@/drizzle/schema';
import { DatabaseOperationError } from '@/src/entities/errors/common';
import { TodoInsert, Todo } from '@/src/entities/models/todo';
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

  // async getTodosForUser(userId: string): Promise<Todo[]> {
  //   try {
  //     const query = db.query.todos.findMany({
  //       where: eq(todos.userId, userId),
  //     });
  //     const usersTodos = await query.execute();
      
  //     return usersTodos;
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // }

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
}
