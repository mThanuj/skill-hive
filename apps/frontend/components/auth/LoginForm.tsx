"use client";

import { useForm } from "react-hook-form";
import CardWrapper from "./CardWrapper";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "@/app/actions/auth.actions";
import { LoginSchema } from "@/schemas/LoginSchema";
import React from "react";
import FormError from "./FormError";
import { redirect } from "next/navigation";

const LoginForm = () => {
  const [error, setError] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setError("");
    setLoading(true);

    const response = await login(data);
    if (response?.error) {
      setError(response.error);
    } else {
      redirect("/");
    }

    setLoading(false);
  };

  return (
    <CardWrapper
      title="Login"
      description="Continue your journey"
      backButtonLabel="Don't have an account? Register here."
      backButtonHref="/auth/register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="KlBZV@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <Button type="submit">{loading ? "Loading..." : "Login"}</Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
