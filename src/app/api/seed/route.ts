import { PrismaClient } from '@/generated/prisma';
import prisma from '@/lib/prisma';

import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) { 

  const prisma = new PrismaClient();
//hola marci estuvo aqui - blackpink in your area
  await prisma.todo.deleteMany();

  await prisma.todo.createMany({
    data : [
      { description : 'Piedra del alma', complete : true},
      { description : 'Piedra del poder'},
      { description : 'Piedra del tiempo'},
      { description : 'Piedra del espacio'},
      { description : 'Piedra del realidad'},
    ]
  })

  return NextResponse.json({
    message : 'Seed executed'
  })
}