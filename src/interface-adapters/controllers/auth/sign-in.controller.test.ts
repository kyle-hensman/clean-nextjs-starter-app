import { describe, expect, it } from 'vitest';

import { getInjection } from '@/di/container';
// import { InputParseError } from '@/src/entities/errors/common';
// import { AuthenticationError } from '@/src/entities/errors/auth';

const signInController = getInjection('ISignInController');

describe('SignInController', () => {
  it('signs in with valid input', async () => {
    const result = await signInController({ email: 'one@gmail.com', password: 'password-one' });

    expect(result).toHaveProperty('id');
    expect(result.id).toBe('mock-user-id-1');
    expect(result).toHaveProperty('name');
    expect(result.name).toBe('one');
    expect(result).toHaveProperty('email');
    expect(result.email).toBe('one@gmail.com');
  });
  
  // it('throws for invalid input', async () => {
  //   expect(await signInController({ email: '' })).toBeInstanceOf(
  //     InputParseError
  //   );
  //   expect(await signInController({ password: '' })).toBeInstanceOf(
  //     InputParseError
  //   );
  //   expect(await signInController({ email: 'no' })).toBeInstanceOf(
  //     InputParseError
  //   );
  //   expect(await signInController({ password: 'no' })).toBeInstanceOf(
  //     InputParseError
  //   );
  //   expect(
  //     await signInController({ email: 'one@gmail.com', password: 'short' })
  //   ).toBeInstanceOf(InputParseError);
  //   expect(
  //     await signInController({
  //       email: 'oneverylongusernamethatmakesnosense',
  //       password: 'short',
  //     })
  //   ).toBeInstanceOf(InputParseError);
  //   expect(
  //     await signInController({
  //       email: 'one@gmail.com',
  //       password: 'oneverylongpasswordthatmakesnosense',
  //     })
  //   ).toBeInstanceOf(InputParseError);
  //   expect(
  //     await signInController({
  //       email: 'oneverylongusernamethatmakesnosense',
  //       password: 'oneverylongpasswordthatmakesnosense',
  //     })
  //   ).toBeInstanceOf(InputParseError);
  // });
  
  // it('throws for invalid credentials', async () => {
  //   await expect(
  //     signInController({ email: 'nonexisting@gmail.com', password: 'doesntmatter' })
  //   ).rejects.toBeInstanceOf(AuthenticationError);
  //   expect(
  //     signInController({ email: 'one@gmail.com', password: 'wrongpass' })
  //   ).rejects.toBeInstanceOf(AuthenticationError);
  // });
});