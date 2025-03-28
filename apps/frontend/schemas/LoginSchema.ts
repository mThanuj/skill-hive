import z from "zod";

export const LoginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email",
    }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
