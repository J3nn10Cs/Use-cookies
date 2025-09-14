'use server'

import { PrismaClient, Todo } from "@/generated/prisma"
import { revalidatePath } from "next/cache";

export const sleep = async ( seconds : number ) => {
  return new Promise( resolve => {
    setTimeout(() => {
      resolve(true)
    }, seconds * 1000)
  })
}


export const toggleTodo = async ( id: string, complete : boolean ) : Promise<Todo>=> {

  await sleep(3);

  const prisma = new PrismaClient();

  const todo = await prisma.todo.findFirst({
    where : { id }
  })

  if(!todo){
    throw `Todo con id ${id} no encontrado`
  }

  const updatedTodo = await prisma.todo.update({
    where : {id},
    data : {complete}
  })

  revalidatePath('/dashboard/server-todos')

  return updatedTodo

}

// export const createTodo = async ( description: string ) => {

//   try {
//     const prisma = new PrismaClient();

//     const todo = await prisma.todo.create({
//       data : {description}
//     })

//     revalidatePath('/dashboard/server-todos')

//     return todo
//   } catch (error) {
    
//     return {
//       message : 'Error al crear un todo'
//     }
//   }
// }

export const deleteTodo = async () => {
  const prisma = new PrismaClient();
  
    try {
      await prisma.todo.deleteMany({
        where : {
          complete : true
        }
      })

      revalidatePath('/dashboard/server-todos')
  
      return {
        message : 'Todos eliminados'
      }
  
    } catch (error) {
      return {
        message : 'Error al eliminar un todo'
      }
    }
}
