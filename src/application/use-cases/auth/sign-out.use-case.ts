import type { IAuthenticationService } from '@/src/application/services/authentication.service.interface';

export const signOutUseCase =
  (
    authenticationService: IAuthenticationService
  ) =>
  async (): Promise<void> => {
    await authenticationService.signOut();
  };

export type ISignOutUseCase = ReturnType<typeof signOutUseCase>;
