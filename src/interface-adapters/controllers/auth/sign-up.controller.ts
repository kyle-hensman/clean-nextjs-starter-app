import { z } from 'zod';

import { InputParseError } from '@/src/entities/errors/common';
import { User } from '@/src/entities/models/user';
import { ISignUpUseCase } from '@/src/application/use-cases/auth/sign-up.use-case';
import { PASSWORD_MIN_LENGTH } from '@/config';

const inputSchema = z
  .object({
    name: z.string().min(3).max(255),
    email: z.string().min(3).max(255),
    password: z.string().min(PASSWORD_MIN_LENGTH).max(255),
    confirmPassword: z.string().min(PASSWORD_MIN_LENGTH).max(255),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['password'],
      });
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['confirmPassword'],
      });
    }
  });

export const signUpController =
  (
    signUpUseCase: ISignUpUseCase
  ) =>
  {return async (
    input: Partial<z.infer<typeof inputSchema>>,
  ): Promise<User> => {
    const { data, error: inputParseError } = inputSchema.safeParse(input);

    if (inputParseError) {
      throw new InputParseError('Invalid data', { cause: inputParseError });
    }

    const { user } = await signUpUseCase(data);
    return user;
  };};

export type ISignUpController = ReturnType<typeof signUpController>;
