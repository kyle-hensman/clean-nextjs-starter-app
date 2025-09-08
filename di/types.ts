import { ITodosRepository } from "@/src/application/repositories/todos.repository.interface";
import { IUsersRepository } from "@/src/application/repositories/users.repository.interface";
import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import { IGetSessionUseCase } from "@/src/application/use-cases/auth/get-session.use-case";
import { ISignInUseCase } from "@/src/application/use-cases/auth/sign-in.use-case";
import { ISignOutUseCase } from "@/src/application/use-cases/auth/sign-out.use-case";
import { ISignUpUseCase } from "@/src/application/use-cases/auth/sign-up.use-case";
import { IArchiveTodoUseCase } from "@/src/application/use-cases/todos/archive-todo.use-case";
import { ICreateTodoUseCase } from "@/src/application/use-cases/todos/create-todo.use-case";
import { IDeleteTodoUseCase } from "@/src/application/use-cases/todos/delete-todo.use-case";
import { IGetArchivedTodosForUserUseCase } from "@/src/application/use-cases/todos/get-archived-todos-for-user.use-case";
import { IGetDeletedTodosForUserUseCase } from "@/src/application/use-cases/todos/get-deleted-todos-for-user.use-case";
import { IGetTodosForUserUseCase } from "@/src/application/use-cases/todos/get-todos-for-user.use-case";
import { IGetTodosUseCase } from "@/src/application/use-cases/todos/get-todos.use-case";
import { ISoftDeleteTodoUseCase } from "@/src/application/use-cases/todos/soft-delete-todo.use-case";
import { IToggleTodoUseCase } from "@/src/application/use-cases/todos/toggle-todo.use-case";
import { IUnarchiveTodoUseCase } from "@/src/application/use-cases/todos/unarchive-todo.use-case";
import { IGetSessionController } from "@/src/interface-adapters/controllers/auth/get-session.controller";
import { ISignInController } from "@/src/interface-adapters/controllers/auth/sign-in.controller";
import { ISignOutController } from "@/src/interface-adapters/controllers/auth/sign-out.controller";
import { ISignUpController } from "@/src/interface-adapters/controllers/auth/sign-up.controller";
import { IArchiveTodoController } from "@/src/interface-adapters/controllers/todos/archive-todo.controller";
import { IBulkUpdateController } from "@/src/interface-adapters/controllers/todos/bulk-update.controller";
import { ICreateTodoController } from "@/src/interface-adapters/controllers/todos/create-todo.controller";
import { IDeleteTodoController } from "@/src/interface-adapters/controllers/todos/delete-todo.controller";
import { IGetArchivedTodosForUserController } from "@/src/interface-adapters/controllers/todos/get-archived-todos-for-user.controller";
import { IGetDeletedTodosForUserController } from "@/src/interface-adapters/controllers/todos/get-deleted-todos-for-user.controller";
import { IGetTodosForUserController } from "@/src/interface-adapters/controllers/todos/get-todos-for-user.controller";
import { IGetTodosController } from "@/src/interface-adapters/controllers/todos/get-todos.controller";
import { ISoftDeleteTodoController } from "@/src/interface-adapters/controllers/todos/soft-delete-todo.controller";
import { IToggleTodoController } from "@/src/interface-adapters/controllers/todos/toggle-todo.controller";
import { IUnarchiveTodoController } from "@/src/interface-adapters/controllers/todos/unarchive-todo.controller";

export const DI_SYMBOLS = {
  // Services
  IAuthenticationService: Symbol.for('IAuthenticationService'),

  // Repositories
  ITodosRepository: Symbol.for('ITodosRepository'),
  IUsersRepository: Symbol.for('IUsersRepository'),

  // Use Cases
  ICreateTodoUseCase: Symbol.for('ICreateTodoUseCase'),
  IDeleteTodoUseCase: Symbol.for('IDeleteTodoUseCase'),
  ISoftDeleteTodoUseCase: Symbol.for('ISoftDeleteTodoUseCase'),
  IGetTodosForUserUseCase: Symbol.for('IGetTodosForUserUseCase'),
  IGetDeletedTodosForUserUseCase: Symbol.for('IGetDeletedTodosForUserUseCase'),
  IGetTodosUseCase: Symbol.for('IGetTodosUseCase'),
  IToggleTodoUseCase: Symbol.for('IToggleTodoUseCase'),
  IArchiveTodoUseCase: Symbol.for('IArchiveTodoUseCase'),
  IUnarchiveTodoUseCase: Symbol.for('IUnarchiveTodoUseCase'),
  IGetArchivedTodosForUserUseCase: Symbol.for('IGetArchivedTodosForUserUseCase'),
  ISignInUseCase: Symbol.for('ISignInUseCase'),
  ISignOutUseCase: Symbol.for('ISignOutUseCase'),
  ISignUpUseCase: Symbol.for('ISignUpUseCase'),
  IGetSessionUseCase: Symbol.for('IGetSessionUseCase'),

  // Controllers
  ICreateTodoController: Symbol.for('ICreateTodoController'),
  IGetTodosForUserController: Symbol.for('IGetTodosForUserController'),
  IGetDeletedTodosForUserController: Symbol.for('IGetDeletedTodosForUserController'),
  IGetTodosController: Symbol.for('IGetTodosController'),
  IBulkUpdateController: Symbol.for('IBulkUpdateController'),
  IToggleTodoController: Symbol.for('IToggleTodoController'),
  IDeleteTodoController: Symbol.for('IDeleteTodoController'),
  ISoftDeleteTodoController: Symbol.for('ISoftDeleteTodoController'),
  IArchiveTodoController: Symbol.for('IArchiveTodoController'),
  IUnarchiveTodoController: Symbol.for('IUnarchiveTodoController'),
  IGetArchivedTodosForUserController: Symbol.for('IGetArchivedTodosForUserController'),
  ISignInController: Symbol.for('ISignInController'),
  ISignOutController: Symbol.for('ISignOutController'),
  ISignUpController: Symbol.for('ISignUpController'),
  IGetSessionController: Symbol.for('IGetSessionController'),
};

export interface DI_RETURN_TYPES {
  // Services
  IAuthenticationService: IAuthenticationService;

  // Repositories
  ITodosRepository: ITodosRepository;
  IUsersRepository: IUsersRepository;

  // Use Cases
  ICreateTodoUseCase: ICreateTodoUseCase;
  IDeleteTodoUseCase: IDeleteTodoUseCase;
  ISoftDeleteTodoUseCase: ISoftDeleteTodoUseCase;
  IGetTodosForUserUseCase: IGetTodosForUserUseCase;
  IGetDeletedTodosForUserUseCase: IGetDeletedTodosForUserUseCase;
  IGetTodosUseCase: IGetTodosUseCase;
  IToggleTodoUseCase: IToggleTodoUseCase;
  IArchiveTodoUseCase: IArchiveTodoUseCase;
  IUnarchiveTodoUseCase: IUnarchiveTodoUseCase;
  IGetArchivedTodosForUserUseCase: IGetArchivedTodosForUserUseCase;
  ISignInUseCase: ISignInUseCase;
  ISignOutUseCase: ISignOutUseCase;
  ISignUpUseCase: ISignUpUseCase;
  IGetSessionUseCase: IGetSessionUseCase;

  // Controllers
  IBulkUpdateController: IBulkUpdateController;
  ICreateTodoController: ICreateTodoController;
  IGetTodosForUserController: IGetTodosForUserController;
  IGetDeletedTodosForUserController: IGetDeletedTodosForUserController;
  IGetTodosController: IGetTodosController;
  IToggleTodoController: IToggleTodoController;
  IDeleteTodoController: IDeleteTodoController;
  ISoftDeleteTodoController: ISoftDeleteTodoController;
  IArchiveTodoController: IArchiveTodoController;
  IUnarchiveTodoController: IUnarchiveTodoController;
  IGetArchivedTodosForUserController: IGetArchivedTodosForUserController;
  ISignInController: ISignInController;
  ISignOutController: ISignOutController;
  ISignUpController: ISignUpController;
  IGetSessionController: IGetSessionController;
}
