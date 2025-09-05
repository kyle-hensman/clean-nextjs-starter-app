import { z } from 'zod';

import { InputParseError } from '@/src/entities/errors/common';
import { User } from '@/src/entities/models/user';
import { ISignInUseCase } from '@/src/application/use-cases/auth/sign-in.use-case';

const inputSchema = z.object({
  email: z.string().min(3).max(31),
  password: z.string().min(6).max(31),
});

export const signInController =
  (
    signInUseCase: ISignInUseCase
  ) =>
  async (input: Partial<z.infer<typeof inputSchema>>): Promise<User> => {
    const { data, error: inputParseError } = inputSchema.safeParse(input);

    if (inputParseError) {
      throw new InputParseError('Invalid data', { cause: inputParseError });
    }

    const { user } = await signInUseCase(data);
    return user;
  };

export type ISignInController = ReturnType<typeof signInController>;
