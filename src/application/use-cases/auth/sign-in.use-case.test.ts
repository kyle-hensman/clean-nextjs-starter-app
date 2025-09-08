import { describe, expect, it } from 'vitest';

import { getInjection } from '@/di/container';
// import { AuthenticationError } from '@/src/entities/errors/auth';

const signInUseCase = getInjection('ISignInUseCase');

describe('SignInUseCase', () => {
  it('returns user', async () => {
    const result = await signInUseCase({
      email: 'one@gmail.com',
      password: 'password-one',
    });
    expect(result).toHaveProperty('user');
    expect(result.user.id).toBe('mock-user-id-1');
  });
  
  // it('throws for invalid input', () => {
  //   expect(async () =>
  //   {return await signInUseCase({ email: 'non-existing@gmail.com', password: 'doesntmatter' });}
  //   ).rejects.toBeInstanceOf(AuthenticationError);
  // });
});
