import type { User } from '@/src/entities/models/user';
import { IUsersRepository } from '@/src/application/repositories/users.repository.interface';

export class MockUsersRepository implements IUsersRepository {
  private _users: User[];

  constructor() {
    this._users = [
      {
        id: '1',
        name: 'one',
        email: 'one@gmail.com',
        emailVerified: false,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        name: 'two',
        email: 'two@gmail.com',
        emailVerified: false,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3',
        name: 'three',
        email: 'three@gmail.com',
        emailVerified: false,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }

  async getUser(id: string): Promise<User | undefined> {
    const user = this._users.find((u) => {return u.id === id;});
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const user = this._users.find((u) => {return u.email === email;});
    return user;
  }
}