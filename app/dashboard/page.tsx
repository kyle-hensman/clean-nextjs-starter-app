import { redirect } from "next/navigation";
import Link from "next/link";

import { getInjection } from "@/di/container";
import PageWrapper from "../_components/page-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "../_components/ui/card";
import { Separator } from "../_components/ui/separator";
import { CreateTodo } from "../_components/create-todo";
import { Todos } from "../_components/todos";
import { UserMenu } from "../_components/user-menu";
import { ArchivedTodos } from "../_components/archived-todos";
import { DeletedTodos } from "../_components/deleted-todos";
import { cn } from "../_components/utils";

async function getUserSession() {
  try {
    const getSessionController = getInjection('IGetSessionController');
    const session = await getSessionController();

    return session;
  } catch (error) {
    console.error(error);
  }
}

async function getTodos(userId: string) {
  try {
    const getTodosForUserController = getInjection('IGetTodosForUserController');
    const todos = await getTodosForUserController(userId);

    return todos.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  } catch (error) {
    console.error(error);
  }
}

async function getArchivedTodos(userId: string) {
  try {
    const getArchivedTodosForUserUserController = getInjection('IGetArchivedTodosForUserController');
    const todos = await getArchivedTodosForUserUserController(userId);

    return todos.sort((a, b) => new Date(a.archivedAt).getTime() - new Date(b.archivedAt).getTime());
  } catch (error) {
    console.error(error);
  }
}

async function getDeletedTodos(userId: string) {
  try {
    const getDeletedTodosForUserController = getInjection('IGetDeletedTodosForUserController');
    const todos = await getDeletedTodosForUserController(userId);

    return todos.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  } catch (error) {
    console.error(error);
  }
}

export default async function DashboardPage({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const session = await getUserSession();
  if (!session || !session.session || !session.user) {
    redirect('/login');
  }

  const todos = await getTodos(session.user.id) || [];
  const archivedTodos = await getArchivedTodos(session.user.id) || [];
  const deletedTodos = await getDeletedTodos(session.user.id) || [];
  
  const page = (await searchParams).page

  return (
    <PageWrapper contained centered>
      <Card className="w-full max-w-lg">
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="flex-1">TODOs</CardTitle>
          <UserMenu user={session.user} />
        </CardHeader>
        <Separator />
        <CardContent className="flex flex-col p-6 gap-4">
          <div className="flex justify-between items-center">
            <span className="text-sm">
              {page === 'archived' ? 'Archived' : 'All'} Todos
            </span>
            <div className="flex justify-between items-center space-x-4 text-xs">
              <Link
                className={cn(page === undefined ? 'text-black' : 'text-muted-foreground')}
                href="/dashboard"
              >
                All
              </Link>
              <Link
                className={cn(page === 'archived' ? 'text-black' : 'text-muted-foreground')}
                href="/dashboard?page=archived"
              >
                Archived
              </Link>
              <Link
                className={cn(page === 'trash' ? 'text-black' : 'text-muted-foreground')}
                href="/dashboard?page=trash"
              >
                Trash
              </Link>
            </div>
          </div>
          {page === 'trash' ? (
            <>
              <DeletedTodos todos={deletedTodos} />
            </>
          ) : null}
          {page === 'archived' ? (
            <>
              <ArchivedTodos todos={archivedTodos} />
            </>
          ) : null}
          {page === undefined ? (
            <>
              <CreateTodo />
              <Todos todos={todos} />
            </>
          ) : null}
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
