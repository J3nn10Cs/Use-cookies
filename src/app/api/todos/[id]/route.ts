import { getUseServerSession } from '@/auth/actions/auth-action'
import { PrismaClient } from '@/generated/prisma'
import { NextResponse, NextRequest } from 'next/server'

interface Segments {
  params : {
    id : string
  }
}

export async function GET(request: Request, segments : Segments) { 

  const user = await getUseServerSession();
  
  if(!user){
    return NextResponse.json('No autorizado', {
      status : 401
    })
  }

  const id = segments.params.id
  const prima = new PrismaClient();

  const todoId = await prima.todo.findFirst({
    where : {id : id}
  })

  if(!todoId){
    return NextResponse.json({
      message : 'Todo Id no existe'
    },{status : 404})
  }

  return NextResponse.json({
    todoId
  })
}

export async function PUT(request: Request, segments : Segments) { 

  const user = await getUseServerSession();
  
  if(!user){
    return NextResponse.json('No autorizado', {
      status : 401
    })
  }

  const id = segments.params.id
  const prima = new PrismaClient();

  const todoId = await prima.todo.findFirst({
    where : {id : id}
  })

  if(!todoId){
    return NextResponse.json({
      message : 'Todo Id no existe'
    },{status : 404})
  }

  const body = await request.json();

  const updateTodo = await prima.todo.update({
    where : {id : id},
    data : {
      ...body
    }
  })

  return NextResponse.json({
    updateTodo
  })
}