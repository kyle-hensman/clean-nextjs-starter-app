import { createModule } from '@evyweb/ioctopus';

import { DI_SYMBOLS } from '@/di/types';
import { TodosRepository } from '@/src/infrastructure/repositories/todos.repository';
import { MockTodosRepository } from '@/src/infrastructure/repositories/todos.repository.mock';
import { createTodoUseCase } from '@/src/application/use-cases/todos/create-todo.use-case';
import { createTodoController } from '@/src/interface-adapters/controllers/todos/create-todo.controller';
import { getTodosController } from '@/src/interface-adapters/controllers/todos/get-todos.controller';
import { getTodosUseCase } from '@/src/application/use-cases/todos/get-todos.use-case';
import { toggleTodoController } from '@/src/interface-adapters/controllers/todos/toggle-todo.controller';
import { toggleTodoUseCase } from '@/src/application/use-cases/todos/toggle-todo.use-case';
import { deleteTodoUseCase } from '@/src/application/use-cases/todos/delete-todo.use-case';
import { bulkUpdateController } from '@/src/interface-adapters/controllers/todos/bulk-update.controller';

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
    ]);

  todosModule
    .bind(DI_SYMBOLS.IDeleteTodoUseCase)
    .toHigherOrderFunction(deleteTodoUseCase, [
      DI_SYMBOLS.ITodosRepository,
    ]);

  // todosModule
  //   .bind(DI_SYMBOLS.IGetTodosForUserUseCase)
  //   .toHigherOrderFunction(getTodosForUserUseCase, [
  //     DI_SYMBOLS.ITodosRepository,
  //   ]);

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
    .bind(DI_SYMBOLS.IBulkUpdateController)
    .toHigherOrderFunction(bulkUpdateController, [
      DI_SYMBOLS.IToggleTodoUseCase,
      DI_SYMBOLS.IDeleteTodoUseCase,
    ]);

  todosModule
    .bind(DI_SYMBOLS.ICreateTodoController)
    .toHigherOrderFunction(createTodoController, [
      DI_SYMBOLS.ICreateTodoUseCase,
    ]);

  // todosModule
  //   .bind(DI_SYMBOLS.IGetTodosForUserController)
  //   .toHigherOrderFunction(getTodosForUserController, [
  //     DI_SYMBOLS.IGetTodosForUserUseCase,
  //   ]);

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

  return todosModule;
}
