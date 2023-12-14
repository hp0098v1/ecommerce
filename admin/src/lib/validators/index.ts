import * as z from "zod";

export const LoginFormValidator = z.object({
  email: z.string().email().min(2).max(50),
  password: z.string().min(8).max(50),
});
