import { describe, expect, it } from 'vitest';

import { getInjection } from '@/di/container';

const signInUseCase = getInjection('ISignInUseCase');
const createTodoUseCase = getInjection('ICreateTodoUseCase');
const getTodosForUserUseCase = getInjection('IGetTodosForUserUseCase');

describe('GetTodosForUserUseCase', () => {
  it('returns todos', async () => {
    const { user } = await signInUseCase({
      email: 'one@gmail.com',
      password: 'password-one',
    });

    expect(await getTodosForUserUseCase(user.id)).toHaveLength(0);
  
    await createTodoUseCase({ title: 'todo-one' }, user.id);
    await createTodoUseCase({ title: 'todo-two' }, user.id);
    await createTodoUseCase({ title: 'todo-three' }, user.id);
  
    expect(await getTodosForUserUseCase(user.id)).toMatchObject([
      {
        title: 'todo-one',
        userId: 'mock-user-id-1',
        completed: false,
      },
      {
        title: 'todo-two',
        userId: 'mock-user-id-1',
        completed: false,
      },
      {
        title: 'todo-three',
        userId: 'mock-user-id-1',
        completed: false,
      },
    ]);
  });
});
