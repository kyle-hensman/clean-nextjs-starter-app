import { createModule } from '@evyweb/ioctopus';

import { DI_SYMBOLS } from '@/di/types';
import { TodosRepository } from '@/src/infrastructure/repositories/todos.repository';
import { MockTodosRepository } from '@/src/infrastructure/repositories/todos.repository.mock';
import { createTodoUseCase } from '@/src/application/use-cases/todos/create-todo.use-case';
import { getTodosUseCase } from '@/src/application/use-cases/todos/get-todos.use-case';
import { getTodosForUserUseCase } from '@/src/application/use-cases/todos/get-todos-for-user.use-case';
import { toggleTodoUseCase } from '@/src/application/use-cases/todos/toggle-todo.use-case';
import { deleteTodoUseCase } from '@/src/application/use-cases/todos/delete-todo.use-case';
import { getDeletedTodosForUserUseCase } from '@/src/application/use-cases/todos/get-deleted-todos-for-user.use-case';
import { createTodoController } from '@/src/interface-adapters/controllers/todos/create-todo.controller';
import { getTodosController } from '@/src/interface-adapters/controllers/todos/get-todos.controller';
import { getTodosForUserController } from '@/src/interface-adapters/controllers/todos/get-todos-for-user.controller';
import { toggleTodoController } from '@/src/interface-adapters/controllers/todos/toggle-todo.controller';
import { bulkUpdateController } from '@/src/interface-adapters/controllers/todos/bulk-update.controller';
import { archiveTodoUseCase } from '@/src/application/use-cases/todos/archive-todo.use-case';
import { archiveTodoController } from '@/src/interface-adapters/controllers/todos/archive-todo.controller';
import { getArchivedTodosForUserController } from '@/src/interface-adapters/controllers/todos/get-archived-todos-for-user.controller';
import { getArchivedTodosForUserUseCase } from '@/src/application/use-cases/todos/get-archived-todos-for-user.use-case';
import { deleteTodoController } from '@/src/interface-adapters/controllers/todos/delete-todo.controller';
import { unarchiveTodoUseCase } from '@/src/application/use-cases/todos/unarchive-todo.use-case';
import { unarchiveTodoController } from '@/src/interface-adapters/controllers/todos/unarchive-todo.controller';
import { getDeletedTodosForUserController } from '@/src/interface-adapters/controllers/todos/get-deleted-todos-for-user.controller';
import { softDeleteTodoUseCase } from '@/src/application/use-cases/todos/soft-delete-todo.use-case';
import { softDeleteTodoController } from '@/src/interface-adapters/controllers/todos/soft-delete-todo.controller';

export function createTodosModule() {
  const todosModule = createModule();

  if (process.env.NODE_ENV === 'test') {
    todosModule.bind(DI_SYMBOLS.ITodosRepository).toClass(MockTodosRepository);
  } else {
    todosModule
      .bind(DI_SYMBOLS.ITodosRepository)
      .toClass(TodosRepository, []);
  }

  todosModule
    .bind(DI_SYMBOLS.ICreateTodoUseCase)
    .toHigherOrderFunction(createTodoUseCase, [
      DI_SYMBOLS.ITodosRepository,
      DI_SYMBOLS.IAuthenticationService,
    ]);

  todosModule
    .bind(DI_SYMBOLS.IDeleteTodoUseCase)
    .toHigherOrderFunction(deleteTodoUseCase, [
      DI_SYMBOLS.ITodosRepository,
    ]);

  todosModule
    .bind(DI_SYMBOLS.ISoftDeleteTodoUseCase)
    .toHigherOrderFunction(softDeleteTodoUseCase, [
      DI_SYMBOLS.ITodosRepository,
    ]);

  todosModule
    .bind(DI_SYMBOLS.IGetTodosForUserUseCase)
    .toHigherOrderFunction(getTodosForUserUseCase, [
      DI_SYMBOLS.ITodosRepository,
    ]);

  todosModule
    .bind(DI_SYMBOLS.IGetDeletedTodosForUserUseCase)
    .toHigherOrderFunction(getDeletedTodosForUserUseCase, [
      DI_SYMBOLS.ITodosRepository,
    ]);

  todosModule
    .bind(DI_SYMBOLS.IGetArchivedTodosForUserUseCase)
    .toHigherOrderFunction(getArchivedTodosForUserUseCase, [
      DI_SYMBOLS.ITodosRepository,
    ]);

  todosModule
    .bind(DI_SYMBOLS.IGetTodosUseCase)
    .toHigherOrderFunction(getTodosUseCase, [
      DI_SYMBOLS.ITodosRepository,
    ]);

  todosModule
    .bind(DI_SYMBOLS.IToggleTodoUseCase)
    .toHigherOrderFunction(toggleTodoUseCase, [
      DI_SYMBOLS.ITodosRepository,
    ]);

  todosModule
    .bind(DI_SYMBOLS.IArchiveTodoUseCase)
    .toHigherOrderFunction(archiveTodoUseCase, [
      DI_SYMBOLS.ITodosRepository,
      DI_SYMBOLS.IAuthenticationService,
    ]);

  todosModule
    .bind(DI_SYMBOLS.IUnarchiveTodoUseCase)
    .toHigherOrderFunction(unarchiveTodoUseCase, [
      DI_SYMBOLS.ITodosRepository,
      DI_SYMBOLS.IAuthenticationService,
    ]);

  todosModule
    .bind(DI_SYMBOLS.IBulkUpdateController)
    .toHigherOrderFunction(bulkUpdateController, [
      DI_SYMBOLS.IToggleTodoUseCase,
      DI_SYMBOLS.ISoftDeleteTodoUseCase,
      DI_SYMBOLS.IArchiveTodoUseCase,
      DI_SYMBOLS.IUnarchiveTodoUseCase,
    ]);

  todosModule
    .bind(DI_SYMBOLS.ICreateTodoController)
    .toHigherOrderFunction(createTodoController, [
      DI_SYMBOLS.IAuthenticationService,
      DI_SYMBOLS.ICreateTodoUseCase,
    ]);

  todosModule
    .bind(DI_SYMBOLS.IGetTodosForUserController)
    .toHigherOrderFunction(getTodosForUserController, [
      DI_SYMBOLS.IGetTodosForUserUseCase,
    ]);

  todosModule
    .bind(DI_SYMBOLS.IGetDeletedTodosForUserController)
    .toHigherOrderFunction(getDeletedTodosForUserController, [
      DI_SYMBOLS.IGetDeletedTodosForUserUseCase,
    ]);

  todosModule
    .bind(DI_SYMBOLS.IGetArchivedTodosForUserController)
    .toHigherOrderFunction(getArchivedTodosForUserController, [
      DI_SYMBOLS.IGetArchivedTodosForUserUseCase,
    ]);

  todosModule
    .bind(DI_SYMBOLS.IGetTodosController)
    .toHigherOrderFunction(getTodosController, [
      DI_SYMBOLS.IGetTodosUseCase,
    ]);

  todosModule
    .bind(DI_SYMBOLS.IToggleTodoController)
    .toHigherOrderFunction(toggleTodoController, [
      DI_SYMBOLS.IToggleTodoUseCase,
    ]);

  todosModule
    .bind(DI_SYMBOLS.IDeleteTodoController)
    .toHigherOrderFunction(deleteTodoController, [
      DI_SYMBOLS.IDeleteTodoUseCase,
    ]);

  todosModule
    .bind(DI_SYMBOLS.ISoftDeleteTodoController)
    .toHigherOrderFunction(softDeleteTodoController, [
      DI_SYMBOLS.ISoftDeleteTodoUseCase,
    ]);

  todosModule
    .bind(DI_SYMBOLS.IArchiveTodoController)
    .toHigherOrderFunction(archiveTodoController, [
      DI_SYMBOLS.IArchiveTodoUseCase,
    ]);

  todosModule
    .bind(DI_SYMBOLS.IUnarchiveTodoController)
    .toHigherOrderFunction(unarchiveTodoController, [
      DI_SYMBOLS.IUnarchiveTodoUseCase,
    ]);

  return todosModule;
}
