import { User } from '@/src/entities/models/user';
import { Session, sessionSchema } from '@/src/entities/models/session';
import { IAuthenticationService } from '@/src/application/services/authentication.service.interface';
import { AUTH_SESSION_UPDATE_AGE, GENERATE_USER_IMAGE } from '@/config';
import { UnauthenticatedError } from '@/src/entities/errors/auth';

export class MockAuthenticationService implements IAuthenticationService {
  private _sessions: Record<string, { session: Session; user: User }>;

  constructor() {
    this._sessions = {};
  }

  async signUpWithEmail(
    name: string,
    email: string,
    password: string,
    image?: string | undefined,
  ) {
    const user: User = {
      id: 'new-mock-user-id-1',
      email,
      emailVerified: false,
      name: 'new',
      image: image || GENERATE_USER_IMAGE,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockSession: {
      id: string;
      token: string;
      userId: string;
      expiresAt: Date;
      createdAt: Date;
      updatedAt: Date;
    } = {
      token: 'new-mock-session-token',
      id: 'new-mock-session-id',
      userId: user.id,
      expiresAt: new Date(AUTH_SESSION_UPDATE_AGE * 1000), // Converted to miliseconds
      createdAt: new Date(), // Converted to miliseconds
      updatedAt: new Date(), // Converted to miliseconds
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
      id: 'mock-user-id-1',
      email,
      emailVerified: false,
      name: 'one',
      image: GENERATE_USER_IMAGE,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockSession: {
      id: string;
      token: string;
      userId: string;
      expiresAt: Date;
      createdAt: Date;
      updatedAt: Date;
    } = {
      token: 'mock-session-token',
      id: 'mock-session-id',
      userId: user.id,
      expiresAt: new Date(AUTH_SESSION_UPDATE_AGE * 1000), // Converted to miliseconds
      createdAt: new Date(), // Converted to miliseconds
      updatedAt: new Date(), // Converted to miliseconds
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
