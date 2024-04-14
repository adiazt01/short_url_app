import Credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import prisma from "@/lib/db";
import * as argon2 from "argon2";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text",  },
        password: { label: "password", type: "password" },
      },
    authorize: async (credentials) => {
        // Find user in the database
        if (!credentials.email) throw new Error("No email provided");
        if (!credentials.password) throw new Error("No password provided");

        const userFound = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        // If no user found, return null
        if (!userFound) throw new Error("No user found");

        // If user found, compare password
        const passwordMatch = await argon2.verify(
          userFound.password,
          credentials.password as string
        );

        // If password doesn't match, return null
        if (!passwordMatch) throw new Error("Password doesn't match");

        // If user found and password match, return user
        return {
          name: userFound.username,
          email: userFound.email,
          id: userFound.id.toString(),
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // @ts-ignore
      session.user = token;
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
});
