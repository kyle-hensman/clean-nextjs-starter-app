
import { describe, expect, it } from 'vitest';

import { getInjection } from '@/di/container';

// import { UnauthorizedError } from '@/src/entities/errors/auth';
// import { NotFoundError } from '@/src/entities/errors/common';

const signInUseCase = getInjection('ISignInUseCase');
const createTodoUseCase = getInjection('ICreateTodoUseCase');
const deleteTodoUseCase = getInjection('IDeleteTodoUseCase');
const getTodosForUserUseCase = getInjection('IGetTodosForUserUseCase');
// const signOutUseCase = getInjection('ISignOutUseCase');

describe('DeleteTodosUseCase', () => {
  it('deletes todo', async () => {
    const { user } = await signInUseCase({
      email: 'one@gmail.com',
      password: 'password-one',
    });
  
    const todo = await createTodoUseCase(
      { title: 'Write unit tests' },
      user.id
    );
  
    // Deletion returns the deleted object
    expect(
      await deleteTodoUseCase({ todoId: todo.id })
    ).toMatchObject({
      title: 'Write unit tests',
      userId: 'mock-user-id-1',
    });
  
    // Todos should be empty at this point
    expect(await getTodosForUserUseCase(user.id)).toMatchObject(
      []
    );
  });
  
  // it('deletes todo', async () => {
  //   const { user } = await signInUseCase({
  //     email: 'one@gmail.com',
  //     password: 'password-one',
  //   });
  
  //   const todo = await createTodoUseCase(
  //     { title: 'Write unit tests' },
  //     user.id
  //   );
  
  //   // Deletion returns the deleted object
  //   await expect(
  //     await deleteTodoUseCase({ todoId: todo.id }, user.id)
  //   ).toMatchObject({
  //     todo: 'Write unit tests',
  //     userId: '1',
  //   });
  
  //   // Todos should be empty at this point
  //   await expect(await getTodosForUserUseCase(user.id)).toMatchObject(
  //     []
  //   );
  // });
  
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
  //     deleteTodoUseCase({ todoId: todo.id }, userTwo.id)
  //   ).rejects.toBeInstanceOf(UnauthorizedError);
  // });
  
  // it('throws for invalid input', async () => {
  //   const { user } = await signInUseCase({
  //     email: 'one@gmail.com',
  //     password: 'password-one',
  //   });
  
  //   expect(
  //     deleteTodoUseCase({ todoId: '1234567890' }, user.id)
  //   ).rejects.toBeInstanceOf(NotFoundError);
  // });
});
