import { describe, expect, it } from 'vitest';

import { getInjection } from '@/di/container';

const signInUseCase = getInjection('ISignInUseCase');
const signOutController = getInjection('ISignOutController');

describe('SignOutController', () => {
  it('returns blank cookie', async () => {
    await signInUseCase({
      email: 'one@gmail.com',
      password: 'password-one',
    });
  
    // expect(signOutController(user.id)).resolves.toMatchObject({
    expect(await signOutController()).toBe(undefined);
  });
  
  // it('throws for invalid input', () => {
  //   expect(signOutController(undefined)).rejects.toBeInstanceOf(InputParseError);
  // });
});