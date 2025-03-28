"use server";

import { signIn } from "@/auth";
import db from "@/db";
import { users } from "@/db/schema";
import { LoginSchema } from "@/schemas/LoginSchema";
import { RegisterSchema } from "@/schemas/RegisterSchema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { AuthError } from "next-auth";
import z from "zod";

export const register = async (data: z.infer<typeof RegisterSchema>) => {
  try {
    const validatedData = RegisterSchema.safeParse(data);

    if (!validatedData.success) {
      return {
        error: "Invalid data",
      };
    }

    const { name, email, password, confirmPassword } = validatedData.data;

    if (password !== confirmPassword) {
      return {
        error: "Passwords do not match",
      };
    }

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingUser.length > 0) {
      return {
        error: "User already exists",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
    });

    return {
      success: "User created successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong",
    };
  }
};

export const login = async (data: z.infer<typeof LoginSchema>) => {
  try {
    const validatedData = LoginSchema.safeParse(data);

    if (!validatedData.success) {
      return {
        error: "Invalid data",
      };
    }

    const { email, password } = validatedData.data;

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingUser.length === 0) {
      return {
        error: "User not found",
      };
    }

    const user = existingUser[0];

    if (!user.password || !user.email) {
      return {
        error: "User not found",
      };
    }

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid credentials",
          };
        default:
          console.log(error);
          return {
            error: "Verify your email address",
          };
      }
    }
  }
};
