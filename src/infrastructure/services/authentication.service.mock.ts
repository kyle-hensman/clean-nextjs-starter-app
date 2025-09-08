import { v4 as uuid } from 'uuid';

import { IAuthenticationService } from '@/src/application/services/authentication.service.interface';
import { Session, sessionSchema } from '@/src/entities/models/session';
import { User } from '@/src/entities/models/user';
import { AUTH_SESSION_UPDATE_AGE, GENERATE_USER_IMAGE } from '@/config';

export class MockAuthenticationService implements IAuthenticationService {
  private _sessions: Record<string, { session: Session; user: User }>;

  constructor() {
    this._sessions = {};
  }

  async signUpWithEmail(
    email: string,
    password: string,
    name: string,
    image?: string | undefined,
  ) {
    const user: User = {
      id: uuid(),
      email,
      emailVerified: false,
      name: name,
      image: image || GENERATE_USER_IMAGE,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockSession: {
      id: string;
      userId: string;
      expiresAt: Date;
    } = {
      id: uuid(),
      userId: user.id,
      expiresAt: new Date(AUTH_SESSION_UPDATE_AGE * 1000), // Converted to miliseconds
    };
    const session = sessionSchema.parse(mockSession);

    this._sessions[session.id] = { session, user };

    return Promise.resolve(user);
  }

  async signInWithEmail(
    email: string,
    password: string,
  ) {
    const user: User = {
      id: uuid(),
      email,
      emailVerified: false,
      name: 'mockUser',
      image: GENERATE_USER_IMAGE,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockSession: {
      id: string;
      userId: string;
      expiresAt: Date;
    } = {
      id: uuid(),
      userId: user.id,
      expiresAt: new Date(AUTH_SESSION_UPDATE_AGE * 1000), // Converted to miliseconds
    };
    const session = sessionSchema.parse(mockSession);

    this._sessions[session.id] = { session, user };

    return Promise.resolve(user);
  }

  async signOut() {
    this._sessions = {};
    window.location.replace('/login');
  }

  async getSession() {
    return this._sessions[0];
  }
}
