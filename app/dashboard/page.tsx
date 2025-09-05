import { redirect } from "next/navigation";

import { getInjection } from "@/di/container";
import PageWrapper from "../_components/page-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "../_components/ui/card";
import { Separator } from "../_components/ui/separator";
import { CreateTodo } from "../_components/create-todo";
import { Todos } from "../_components/todos";
import { UserMenu } from "../_components/user-menu";

async function getUserSession() {
  try {
    const getSessionController = getInjection('IGetSessionController');
    const session = await getSessionController();

    return session;
  } catch (error) {
    console.error(error);
  }
}

async function getTodos() {
  try {
    const getTodosController = getInjection('IGetTodosController');
    const todos = await getTodosController();

    return todos.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  } catch (error) {
    console.error(error);    
  }
}

export default async function DashboardPage() {
  const session = await getUserSession();
  const todos = await getTodos() || [];

  if (!session || !session.session || !session.user) {
    redirect('/login');
  }
  
  return (
    <PageWrapper contained centered>
      <Card className="w-full max-w-lg">
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="flex-1">TODOs</CardTitle>
          <UserMenu user={session.user} />
        </CardHeader>
        <Separator />
        <CardContent className="flex flex-col p-6 gap-4">
          <CreateTodo />
          <Todos todos={todos} />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
