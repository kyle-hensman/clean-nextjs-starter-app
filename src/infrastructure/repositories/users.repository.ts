import { eq } from 'drizzle-orm';

import { db } from '@/drizzle';
import { users } from '@/drizzle/schema';
import type { User } from '@/src/entities/models/user';
import { IUsersRepository } from '@/src/application/repositories/users.repository.interface';

export class UsersRepository implements IUsersRepository {
  async getUser(id: string): Promise<User | undefined> {
    try {
      const query = db.query.users.findFirst({
        where: eq(users.id, id),
      });

      const user = await query.execute();

      return user;
    } catch (error) {
      throw error; // TODO: convert to Entities error
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    try {
      const query = db.query.users.findFirst({
        where: eq(users.email, email),
      });

      const user = await query.execute();

      return user;
    } catch (error) {
      throw error; // TODO: convert to Entities error
    }
  }
}