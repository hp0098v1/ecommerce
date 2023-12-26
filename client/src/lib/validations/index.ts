import zod from "zod";

export const LoginValidation = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
})