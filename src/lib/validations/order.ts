import { z } from "zod";

export const OrderSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  total_price: z.number().nonnegative("El precio debe ser positivo"),
  prepaid: z.boolean(),
  delivered: z.boolean(),
  message_client: z.string(),
});

export type OrderInput = z.infer<typeof OrderSchema>;
