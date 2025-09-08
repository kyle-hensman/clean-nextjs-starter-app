import { describe, expect, it } from 'vitest';

import { getInjection } from '@/di/container';
// import { AuthenticationError } from '@/src/entities/errors/auth';

const signUpUseCase = getInjection('ISignUpUseCase');

describe('SignUpUseCase', () => {
  it('returns user', async () => {
    const result = await signUpUseCase({
      email: 'new@gmail.com',
      password: 'password-new',
      name: 'new'
    });
    expect(result).toHaveProperty('user');
  });
  
  // it('throws for invalid input', () => {
  //   expect(async () =>
  //   {return await signUpUseCase({ email: 'one@gmail.com', password: 'doesntmatter', name: 'one' });}
  //   ).rejects.toBeInstanceOf(AuthenticationError);
  // });
});
