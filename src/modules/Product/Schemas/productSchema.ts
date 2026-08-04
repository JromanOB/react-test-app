import z from "zod";

export const ProductSchema = z.object({
    name: z.string()
    .nonempty({ message: "El nombre es requerido" })
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
    description: z.string()
    .nonempty({ message: "La descripción es requerida" })
    .min(5, { message: "La descripción debe tener al menos 5 caracteres" }),
    price: z.number()
    .positive({ message: "El precio debe ser un número positivo" })
})