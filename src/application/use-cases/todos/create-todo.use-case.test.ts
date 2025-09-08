import { describe, expect, it } from 'vitest';

import { getInjection } from '@/di/container';

const signInUseCase = getInjection('ISignInUseCase');
const createTodoUseCase = getInjection('ICreateTodoUseCase');


describe('CreateTodoUseCase', () => {
  it('creates todo', async () => {
    const { user } = await signInUseCase({
      email: 'one@gmail.com',
      password: 'password-one',
    });
  
    expect(
      await createTodoUseCase({ title: 'Write unit tests' }, user.id)
    ).toMatchObject({
      title: 'Write unit tests',
      userId: 'mock-user-id-1',
      completed: false,
    });
  });
});
