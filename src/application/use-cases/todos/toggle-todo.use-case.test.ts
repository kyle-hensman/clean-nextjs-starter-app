import { describe, expect, it } from 'vitest';

import { getInjection } from '@/di/container';
// import { UnauthorizedError } from '@/src/entities/errors/auth';
// import { NotFoundError } from '@/src/entities/errors/common';

const signInUseCase = getInjection('ISignInUseCase');
const createTodoUseCase = getInjection('ICreateTodoUseCase');
const toggleTodoUseCase = getInjection('IToggleTodoUseCase');
// const signOutUseCase = getInjection('ISignOutUseCase');

describe('ToggleTodoUseCase', () => {
  it('toggles todo', async () => {
    const { user } = await signInUseCase({
      email: 'one@gmail.com',
      password: 'password-one',
    });
  
    const todo = await createTodoUseCase(
      { title: 'Write unit tests' },
      user.id
    );
  
    expect(
      // toggleTodoUseCase({ todoId: todo.id }, user.id)
      await toggleTodoUseCase({ todoId: todo.id })
    ).toMatchObject({
      title: 'Write unit tests',
      userId: 'mock-user-id-1',
      completed: true,
    });
  });
  
  // it('throws when unauthorized', async () => {
  //   const { user: userOne } = await signInUseCase({
  //     email: 'one@gmail.com',
  //     password: 'password-one',
  //   });
  
  //   const todo = await createTodoUseCase(
  //     { title: 'Write unit tests' },
  //     userOne.id
  //   );
  
  //   await signOutUseCase(userOne.id);
  
  //   const { user: userTwo } = await signInUseCase({
  //     email: 'two@gmail.com',
  //     password: 'password-two',
  //   });
  
  //   expect(
  //     // toggleTodoUseCase({ todoId: todo.id }, userTwo.id)
  //     toggleTodoUseCase({ todoId: todo.id })
  //   ).rejects.toBeInstanceOf(UnauthorizedError);
  // });
  
  // it('throws for invalid input', async () => {
  //   const { user } = await signInUseCase({
  //     email: 'one@gmail.com',
  //     password: 'password-one',
  //   });
  
  //   expect(
  //     // toggleTodoUseCase({ todoId: 1234567890 }, user.id)
  //     toggleTodoUseCase({ todoId: '1234567890' })
  //   ).rejects.toBeInstanceOf(NotFoundError);
  // });  
});
