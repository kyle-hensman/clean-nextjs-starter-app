'use server';

import { revalidatePath } from "next/cache";

import { getInjection } from "@/di/container";
import { UnauthenticatedError } from "@/src/entities/errors/auth";
import { InputParseError, NotFoundError } from "@/src/entities/errors/common";

export async function createTodo(formData: FormData) {
  try {
    const getSessionController = getInjection('IGetSessionController');
    const auth = await getSessionController();

    if (!auth) {
      return { error: 'Unauthorized' }
    }

    const data = Object.fromEntries(formData.entries());

    const createTodoController = getInjection('ICreateTodoController');
    await createTodoController(data, auth.session.id);

  } catch (error) {
    console.error(error);

    if (error instanceof InputParseError) {
      return { error: error.message };
    }

    return {
      error: 'An error happened while creating a todo.',
    };
  }

  revalidatePath('/');
  return { success: true };
}

export async function toggleTodo(todoId: string) {
  try {
    const toggleTodoController = getInjection('IToggleTodoController');
    await toggleTodoController({ todoId });

  } catch (error) {
    console.error(error);

    if (error instanceof InputParseError) {
      return { error: error.message };
    }

    if (error instanceof NotFoundError) {
      return { error: 'Todo does not exist' };
    }

    return {
      error: 'An error happened while toggling a todo.',
    };
  }

  revalidatePath('/');
  return { success: true };
}

export async function bulkUpdate(dirty: string[], deleted: string[], archived: string[], unarchived: string[]) {
  try {
    const bulkUpdateController = getInjection('IBulkUpdateController');
    await bulkUpdateController({ dirty, deleted, archived, unarchived });
  } catch (err) {
    revalidatePath('/');
    if (err instanceof InputParseError) {
      return { error: err.message };
    }
    if (err instanceof UnauthenticatedError) {
      return { error: 'Must be logged in to bulk update todos' };
    }
    if (err instanceof NotFoundError) {
      return { error: 'Todo does not exist' };
    }

    return {
      error:
        'An error happened while bulk updating the todos. The developers have been notified. Please try again later.',
    };
  }

  revalidatePath('/');
  return { success: true };
}

export async function deleteTodo(id: string) {
  try {
    const deleteTodoController = getInjection('IDeleteTodoController');
    await deleteTodoController({ todoId: id });
  } catch (err) {
    revalidatePath('/');
    if (err instanceof InputParseError) {
      return { error: err.message };
    }
    if (err instanceof UnauthenticatedError) {
      return { error: 'Must be logged in to bulk update todos' };
    }
    if (err instanceof NotFoundError) {
      return { error: 'Todo does not exist' };
    }

    return {
      error:
        'An error happened while bulk updating the todos. The developers have been notified. Please try again later.',
    };
  }

  revalidatePath('/');
  return { success: true };
}
