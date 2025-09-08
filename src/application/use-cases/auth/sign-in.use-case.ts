import { AuthenticationError } from '@/src/entities/errors/auth';
import { User } from '@/src/entities/models/user';
import type { IUsersRepository } from '@/src/application/repositories/users.repository.interface';
import type { IAuthenticationService } from '@/src/application/services/authentication.service.interface';

export const signInUseCase =
  (
    usersRepository: IUsersRepository,
    authenticationService: IAuthenticationService
  ) =>
  {return async (input: {
    email: string;
    password: string;
  }): Promise<{ user: User }> => {
    const existingUser = await usersRepository.getUserByEmail(
      input.email
    );

    if (!existingUser) {
      throw new AuthenticationError('User does not exist');
    }

    const user = await authenticationService.signInWithEmail(
      input.email,
      input.password
    );

    if (!user) {
      throw new AuthenticationError('Incorrect email or password');
    }

    return {
      user,
    };
  };};

export type ISignInUseCase = ReturnType<typeof signInUseCase>;
