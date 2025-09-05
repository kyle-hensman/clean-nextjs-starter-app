'use server';

import { redirect } from 'next/navigation';

import { InputParseError } from '@/src/entities/errors/common';
import {
  AuthenticationError,
  UnauthenticatedError,
} from '@/src/entities/errors/auth';
import { getInjection } from '@/di/container';

export async function signUp(formData: FormData) {
  const name = formData.get('name')?.toString();
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();
  const confirmPassword = formData.get('confirm_password')?.toString();

  try {
    const signUpController = getInjection('ISignUpController');
    await signUpController({
      name,
      email,
      password,
      confirm_password: confirmPassword,
    });
  } catch (error) {
    if (error instanceof InputParseError) {
      return {
        error:
          'Invalid data. Make sure the Password and Confirm Password match.',
      };
    }
    if (error instanceof AuthenticationError) {
      return {
        error: error.message,
      };
    }
    console.error(error);

    return {
      error:
        'An error happened. The developers have been notified. Please try again later. Message: ' +
        (error as Error).message,
    };
  }

  redirect('/dashboard');
}

export async function signIn(formData: FormData) {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();

  try {
    const signInController = getInjection('ISignInController');
    await signInController({ email, password });
  } catch (error) {
    if (
      error instanceof InputParseError ||
      error instanceof AuthenticationError
    ) {
      return {
        error: 'Incorrect email or password',
      };
    }
    console.error(error);
    return {
      error:
        'An error happened. The developers have been notified. Please try again later.',
    };
  }

  redirect('/dashboard');
}

export async function signOut() {
  try {
    const signOutController = getInjection('ISignOutController');
    await signOutController();
  } catch (error) {
    if (
      error instanceof UnauthenticatedError ||
      error instanceof InputParseError
    ) {
      redirect('/login');
    }
    console.error(error);
    throw error;
  }

  redirect('/login');
}
