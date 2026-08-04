import z from "zod";

export const LoginSchema = z.object({
    username: z.string()
    .nonempty({ message: "Nombre de usuario es requerido" })
    .min(1, { message: "Nombre de usuario es requerido" }),
    password: z.string()
    .nonempty({ message: "La contraseña es requerida" })
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
})