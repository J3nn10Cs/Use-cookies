# NEXT.JS Api

Pasos para ejecutar en desarrollo
1. Levantar la base de datos 
```
  docker compose up -d
```

2. Renombrar el template .env.template a .env
3. Reemplazar las variables de entorno
-- migrate dev -> modificaciones en la db primero elimina
-- npx prisma db pull -> cambios directos


# Prisma commads
```
  npx prisma init
  npx prisma migrate dev
  npx prisma generate
```
4. Ejecutar el seed 

5. Ejecutar el comando ```npm i```

6. Ejecutar el comando ```npm run dev```

# Prod


# Stage