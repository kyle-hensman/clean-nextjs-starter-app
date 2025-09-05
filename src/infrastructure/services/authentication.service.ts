import { headers } from "next/headers";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

import { db } from '@/drizzle';
import { IAuthenticationService } from '@/src/application/services/authentication.service.interface';
import { AUTH_SESSION_EXPIRES_IN, AUTH_SESSION_UPDATE_AGE, GENERATE_USER_IMAGE } from '@/config';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
  }),
  session: {
    expiresIn: AUTH_SESSION_EXPIRES_IN,
    updateAge: AUTH_SESSION_UPDATE_AGE,
  },
  emailAndPassword: {
    enabled: true,
    // autoSignIn: false // defaults to true
  },
  plugins: [nextCookies()]
});

export class AuthenticationService implements IAuthenticationService {
  private _auth;

  constructor() {
    this._auth = auth;
  }

  async signUpWithEmail(
    name: string,
    email: string,
    password: string,
    image?: string | undefined,
  ) {
    try {
      const data = await this._auth.api.signUpEmail({
        body: {
          name,
          email,
          password,
          image: image || GENERATE_USER_IMAGE,
        }
      });

      if (!data) {
        console.error('Error signing up with email');
        return null;
      }

      return data.user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async signInWithEmail(
    email: string,
    password: string,
  ) {
    const data = await this._auth.api.signInEmail({
      body: {
        email,
        password,
        callbackURL: '/dashboard',
        rememberMe: false, // defaults to true
      }
    });

    if (!data) {
      console.error('Error signing in with email');
      return null;
    }

    return data.user;
  }

  async signOut() {
    await this._auth.api.signOut({
      headers: await headers(),
    })
  }

  async getSession() {
    const session = await this._auth.api.getSession({
      headers: await headers(),
    });

    if (!session && typeof window !== 'undefined') {
      window.location.replace('/login');
      return null;
    }

    return session;
  }
}
