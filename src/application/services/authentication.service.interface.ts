import { User } from '@/src/entities/models/user';

export interface IAuthenticationService {
  signUpWithEmail(
    name: string,
    email: string,
    password: string,
    image?: string | undefined,
  ): Promise<User | null>
  signInWithEmail(
    email: string,
    password: string,
  ): Promise<User| null>
  signOut(): Promise<void>
  getSession(): Promise<{
    session: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      userId: string;
      expiresAt: Date;
      token: string;
      ipAddress?: string | null | undefined;
      userAgent?: string | null | undefined;
    };
    user: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      email: string;
      emailVerified: boolean;
      name: string;
      image?: string | null | undefined;
    };
  } | null>
}
