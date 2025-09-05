import { ITodosRepository } from "@/src/application/repositories/todos.repository.interface";
import { IUsersRepository } from "@/src/application/repositories/users.repository.interface";
import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import { IGetSessionUseCase } from "@/src/application/use-cases/auth/get-session.use-case";
import { ISignInUseCase } from "@/src/application/use-cases/auth/sign-in.use-case";
import { ISignOutUseCase } from "@/src/application/use-cases/auth/sign-out.use-case";
import { ISignUpUseCase } from "@/src/application/use-cases/auth/sign-up.use-case";
import { ICreateTodoUseCase } from "@/src/application/use-cases/todos/create-todo.use-case";
import { IDeleteTodoUseCase } from "@/src/application/use-cases/todos/delete-todo.use-case";
import { IGetTodosUseCase } from "@/src/application/use-cases/todos/get-todos.use-case";
import { IToggleTodoUseCase } from "@/src/application/use-cases/todos/toggle-todo.use-case";
import { IGetSessionController } from "@/src/interface-adapters/controllers/auth/get-session.controller";
import { ISignInController } from "@/src/interface-adapters/controllers/auth/sign-in.controller";
import { ISignOutController } from "@/src/interface-adapters/controllers/auth/sign-out.controller";
import { ISignUpController } from "@/src/interface-adapters/controllers/auth/sign-up.controller";
import { IBulkUpdateController } from "@/src/interface-adapters/controllers/todos/bulk-update.controller";
import { ICreateTodoController } from "@/src/interface-adapters/controllers/todos/create-todo.controller";
import { IGetTodosController } from "@/src/interface-adapters/controllers/todos/get-todos.controller";
import { IToggleTodoController } from "@/src/interface-adapters/controllers/todos/toggle-todo.controller";

export const DI_SYMBOLS = {
  // Services
  IAuthenticationService: Symbol.for('IAuthenticationService'),

  // Repositories
  ITodosRepository: Symbol.for('ITodosRepository'),
  IUsersRepository: Symbol.for('IUsersRepository'),

  // Use Cases
  ICreateTodoUseCase: Symbol.for('ICreateTodoUseCase'),
  IDeleteTodoUseCase: Symbol.for('IDeleteTodoUseCase'),
  // IGetTodosForUserUseCase: Symbol.for('IGetTodosForUserUseCase'),
  IGetTodosUseCase: Symbol.for('IGetTodosUseCase'),
  IToggleTodoUseCase: Symbol.for('IToggleTodoUseCase'),
  ISignInUseCase: Symbol.for('ISignInUseCase'),
  ISignOutUseCase: Symbol.for('ISignOutUseCase'),
  ISignUpUseCase: Symbol.for('ISignUpUseCase'),
  IGetSessionUseCase: Symbol.for('IGetSessionUseCase'),

  // Controllers
  ICreateTodoController: Symbol.for('ICreateTodoController'),
  // IGetTodosForUserController: Symbol.for('IGetTodosForUserController'),
  IGetTodosController: Symbol.for('IGetTodosController'),
  IBulkUpdateController: Symbol.for('IBulkUpdateController'),
  IToggleTodoController: Symbol.for('IToggleTodoController'),
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
  // IGetTodosForUserUseCase: IGetTodosForUserUseCase;
  IGetTodosUseCase: IGetTodosUseCase;
  IToggleTodoUseCase: IToggleTodoUseCase;
  ISignInUseCase: ISignInUseCase;
  ISignOutUseCase: ISignOutUseCase;
  ISignUpUseCase: ISignUpUseCase;
  IGetSessionUseCase: IGetSessionUseCase;

  // Controllers
  IBulkUpdateController: IBulkUpdateController;
  ICreateTodoController: ICreateTodoController;
  // IGetTodosForUserController: IGetTodosForUserController;
  IGetTodosController: IGetTodosController;
  IToggleTodoController: IToggleTodoController;
  ISignInController: ISignInController;
  ISignOutController: ISignOutController;
  ISignUpController: ISignUpController;
  IGetSessionController: IGetSessionController;
}
