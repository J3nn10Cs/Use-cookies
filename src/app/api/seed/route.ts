import { PrismaClient } from '@/generated/prisma';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs'

import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) { 

  const prisma = new PrismaClient();
//hola marci estuvo aqui - blackpink in your area


  await prisma.user.deleteMany();
  await prisma.todo.deleteMany();

  const user = await prisma.user.create({
    data : {
      email : 'jennifer@correo.com',
      password : bcrypt.hashSync('123456'),
      roles : ['admin', 'client','super-master'],
      todos : {
        create : [
          { description : 'Piedra del alma', complete : true},
          { description : 'Piedra del poder'},
          { description : 'Piedra del tiempo'},
          { description : 'Piedra del espacio'},
          { description : 'Piedra del realidad'},
        ]
      }
    }
  })

  // await prisma.todo.createMany({
  //   data : [
  //     { description : 'Piedra del alma', complete : true},
  //     { description : 'Piedra del poder'},
  //     { description : 'Piedra del tiempo'},
  //     { description : 'Piedra del espacio'},
  //     { description : 'Piedra del realidad'},
  //   ]
  // })

  return NextResponse.json({
    message : 'Seed executed'
  })
}