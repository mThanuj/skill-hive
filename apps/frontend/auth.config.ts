import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { LoginSchema } from "./schemas/LoginSchema";
import db from "./db";
import { accounts, users } from "./db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export default {
  providers: [
    Google,
    Credentials({
      credentials: {
        email: { type: "email", label: "Email" },
        password: { type: "password", label: "Password" },
      },
      async authorize(credentials) {
        const validatedData = LoginSchema.safeParse(credentials);

        if (!validatedData.success) {
          return null;
        }

        const { email, password } = validatedData.data;

        const existingUser = await db
          .select()
          .from(users)
          .where(eq(users.email, email));

        if (existingUser.length === 0) {
          return null;
        }

        const user = existingUser[0];

        if (!user.password) {
          return null;
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        return true;
      }

      if (!user.id) {
        return false;
      }

      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.id, user.id));

      if (existingUser.length === 0) {
        return false;
      }

      return true;
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }

      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.id, token.sub));

      if (existingUser.length === 0) {
        return token;
      }

      const existingAccount = await db
        .select()
        .from(accounts)
        .where(eq(accounts.userId, token.sub));

      token.isOAuth = !!existingAccount;
      token.name = existingUser[0].name;
      token.email = existingUser[0].email;
      token.image = existingUser[0].image;

      return token;
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          isOAuth: token.isOAuth,
          name: token.name,
          email: token.email,
          image: token.image as string,
          provider: token.provider,
        },
      };
    },
  },
} satisfies NextAuthConfig;
