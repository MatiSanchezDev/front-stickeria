import { z } from "zod";

export const StickerSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  price: z.number().nonnegative("El precio debe ser positivo"),
});

export type StickerInput = z.infer<typeof StickerSchema>;
