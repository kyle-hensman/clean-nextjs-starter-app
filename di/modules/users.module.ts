import { createModule } from '@evyweb/ioctopus';

import { DI_SYMBOLS } from '@/di/types';
import { UsersRepository } from '@/src/infrastructure/repositories/users.repository';
import { MockUsersRepository } from '@/src/infrastructure/repositories/users.repository.mock';

export function createUsersModule() {
  const usersModule = createModule();

  if (process.env.NODE_ENV === 'test') {
    usersModule.bind(DI_SYMBOLS.IUsersRepository).toClass(MockUsersRepository);
  } else {
    usersModule
      .bind(DI_SYMBOLS.IUsersRepository)
      .toClass(UsersRepository, []);
  }

  return usersModule;
}