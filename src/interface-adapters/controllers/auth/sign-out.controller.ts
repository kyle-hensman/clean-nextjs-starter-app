import { ISignOutUseCase } from "@/src/application/use-cases/auth/sign-out.use-case";

export const signOutController =
  (
    signOutUseCase: ISignOutUseCase
  ) =>
  async (): Promise<void> => {
    await signOutUseCase();
  };

export type ISignOutController = ReturnType<typeof signOutController>;
