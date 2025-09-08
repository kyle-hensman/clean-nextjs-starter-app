import { describe, expect, it } from 'vitest';

import { getInjection } from '@/di/container';
// import { SESSION_COOKIE } from '@/config';
// import { InputParseError } from '@/src/entities/errors/common';
// import { AuthenticationError } from '@/src/entities/errors/auth';

const signUpController = getInjection('ISignUpController');

describe('SignUpController', () => {
  it('signs up with valid input', async () => {
    const result = await signUpController({
      name: 'new',
      email: 'new@gmail.com',
      password: 'password-one',
      confirmPassword: 'password-one'
    });

    expect(result).toHaveProperty('id');
    expect(result.id).toBe('new-mock-user-id-1');
    expect(result).toHaveProperty('name');
    expect(result.name).toBe('new');
    expect(result).toHaveProperty('email');
    expect(result.email).toBe('new@gmail.com');
  });

  // it('returns user', async () => {
  //   const { cookie, user } = await signUpController({
  //     username: 'nikolovlazar',
  //     password: 'password',
  //     confirm_password: 'password',
  //   });
  
  //   expect(user).toBeDefined();
  //   expect(cookie).toMatchObject({
  //     name: SESSION_COOKIE,
  //     value: `random_session_id_${user.id}`,
  //     attributes: {},
  //   });
  // });
  
  // it('throws for invalid input', () => {
  //   // empty object
  //   expect(signUpController({})).rejects.toBeInstanceOf(InputParseError);
  
  //   // below min length
  //   expect(
  //     signUpController({
  //       username: 'no',
  //       password: 'no',
  //       confirm_password: 'nah',
  //     })
  //   ).rejects.toBeInstanceOf(InputParseError);
  
  //   // wrong passwords
  //   expect(
  //     signUpController({
  //       username: 'nikolovlazar',
  //       password: 'password',
  //       confirm_password: 'passwords',
  //     })
  //   ).rejects.toBeInstanceOf(InputParseError);
  // });
  
  // it('throws for existing username', () => {
  //   expect(
  //     signUpController({
  //       username: 'one',
  //       password: 'doesntmatter',
  //       confirm_password: 'doesntmatter',
  //     })
  //   ).rejects.toBeInstanceOf(AuthenticationError);
  // });
});
