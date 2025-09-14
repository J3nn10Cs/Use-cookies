export const dynamic = 'force-dynamic'
export const revalidate = 0

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUseServerSession } from "@/auth/actions/auth-action";
import { PrismaClient } from "@/generated/prisma";
import { NewTodo, TodosGrid } from "@/todos";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata = {
 title: 'Listado de TODOS',
 description: 'Listado de TODOS',
};

export default async function ServerTodosPage() {

  const prisma = new PrismaClient();

  const user = await getUseServerSession();

  if(!user){
    redirect('/api/auth/signin')
  }

  const todos = await prisma.todo.findMany({
    where : { userId : user?.id},
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