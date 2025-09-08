import { AuthenticationError } from '@/src/entities/errors/auth';
import type { IAuthenticationService } from '@/src/application/services/authentication.service.interface';

export const getSessionUseCase =
  (
    authenticationService: IAuthenticationService
  ) =>
  {return async (): Promise<{
    session: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      userId: string;
      expiresAt: Date;
      token: string;
      ipAddress?: string | null | undefined;
      userAgent?: string | null | undefined;
    };
    user: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      email: string;
      emailVerified: boolean;
      name: string;
      image?: string | null | undefined;
    };
  } | null> => {
    const data = await authenticationService.getSession();

    if (!data) {
      throw new AuthenticationError('Unauthorized');
    }

    return data;
  };};

export type IGetSessionUseCase = ReturnType<typeof getSessionUseCase>;
