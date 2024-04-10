import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/lib/db";
import * as argon2 from "argon2";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // Find user in the database
        const userFound = await db.user.findUnique({
          where: { email: credentials.email },
        });

        // If user not found, return null
        if (!userFound) throw new Error("User not found");

        // Check if the password is correct
        const passwordValid = await argon2.verify(
          userFound.password,
          credentials.password
        );

        // If password is not valid, return null
        if (!passwordValid) throw new Error("Password is not valid");

        // If user and password are valid, return user
        return {
          id: userFound.id,
          name: userFound.username,
          email: userFound.email,
        };
      },
      
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  }
);

export { handler as GET, handler as POST };
