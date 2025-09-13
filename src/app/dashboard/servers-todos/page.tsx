export const dynamic = 'force-dynamic'
export const revalidate = 0

import { PrismaClient } from "@/generated/prisma";
import { NewTodo, TodosGrid } from "@/todos";

export const metadata = {
 title: 'Listado de TODOS',
 description: 'Listado de TODOS',
};

export default async function ServerTodosPage() {

  const prisma = new PrismaClient();

  const todos = await prisma.todo.findMany({
    orderBy : {
      description : 'asc'
    }
  })

  return (
    <>
      <div className="px-3 w-full mx-5 mb-5">
        <h1 className="text-2xl">Server Todos</h1>
        <NewTodo/>
      </div>
      <TodosGrid todos={todos}/>
    </>
  );
}