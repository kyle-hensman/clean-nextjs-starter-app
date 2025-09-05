import { IGetSessionUseCase } from '@/src/application/use-cases/auth/get-session.use-case';

export const getSessionController =
  (
    getSessionUseCase: IGetSessionUseCase
  ) =>
  async (): Promise<{
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
    const session = await getSessionUseCase();
    return session;
  };

export type IGetSessionController = ReturnType<typeof getSessionController>;
