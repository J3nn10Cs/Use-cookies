import NextAuth, { NextAuthOptions } from "next-auth"

import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";

import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInEmailPassword } from "@/auth/actions/auth-action";

export const authOptions : NextAuthOptions= {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "usuario@google.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = await signInEmailPassword(credentials!.email, credentials!.password);

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } 

        return null

      }
    })
  ],
  adapter: PrismaAdapter(prisma),

  session : {
    strategy : 'jwt'
  },

  callbacks : {
    async signIn( {user, account, profile, email, credentials} ){
      
      console.log({user});

      return true
    },

    async jwt( { token, account, user } ){

      const dbuser = await prisma.user.findUnique({
        where : { email : token.email ?? 'no-email' }
      })

      if(dbuser?.isActive === false){
        throw Error('Usuario no está activo')
      }

      token.roles = dbuser?.roles ?? ['no-role']
      token.id = dbuser?.id ?? 'no-uuid'

      return token
    },

    async session( { session, token, user } ) {

      if(session && session.user){
        session.user.roles = token.roles;
        session.user.id = token.id;
      }

      return session
    }
  }
}

const handler = NextAuth(authOptions)
export { handler  as GET, handler as POST}