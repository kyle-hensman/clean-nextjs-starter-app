import { AuthenticationError } from '@/src/entities/errors/auth';
import { User } from '@/src/entities/models/user';
import type { IAuthenticationService } from '@/src/application/services/authentication.service.interface';
import type { IUsersRepository } from '@/src/application/repositories/users.repository.interface';

export const signUpUseCase =
  (
    usersRepository: IUsersRepository,
    authenticationService: IAuthenticationService
  ) =>
  async (input: {
    name: string;
    email: string;
    password: string;
    image?: string | undefined;
  }): Promise<{
    user: User;
  }> => {
    const existingUser = await usersRepository.getUserByEmail(
      input.email
    );

    if (existingUser) {
      throw new AuthenticationError('Email is already being used');
    }

    const user = await authenticationService.signUpWithEmail(
      input.name,
      input.email,
      input.password,
      input.image,
    );

    if (!user) {
      throw new AuthenticationError('There was an error signing up');
    }

    return {
      user,
    };
  };

export type ISignUpUseCase = ReturnType<typeof signUpUseCase>;
