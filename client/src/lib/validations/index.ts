import * as zod from "zod";

export const RegisterValidation = zod
  .object({
    username: zod.string().min(2),
    email: zod.string().email(),
    password: zod.string().min(8),
    confirmPassword: zod.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmPassword"],
  });

export const LoginValidation = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
});
