import { describe, expect, it } from 'vitest';

import { getInjection } from '@/di/container';

const signInUseCase = getInjection('ISignInUseCase');
const signOutUseCase = getInjection('ISignOutUseCase');

describe('SignOutUseCase', () => {
  it('returns undefined', async () => {
    await signInUseCase({
      email: 'one@gmail.com',
      password: 'password-one',
    });

    expect(await signOutUseCase()).toBe(undefined);
  });
});
