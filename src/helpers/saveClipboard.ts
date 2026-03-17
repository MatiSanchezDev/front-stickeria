import { OrderItem } from "@/store/slices/orderSlice";
import { toast } from "react-toastify";

export const copyOrderToClipboard = async (
  client: string,
  items: OrderItem[],
  total_price: number,
) => {
  const text = `
𝐏𝐄𝐃𝐈𝐃𝐎 𝐀 𝐂𝐎𝐍𝐅𝐈𝐑𝐌𝐀𝐑
  
NOMBRE: ${client}
  
PEDIDO:
${items.map((item) => `x${item.quantity} ${item.name}`).join("\n")}
  
TOTAL: $ ${total_price}
  
𝐂𝐎𝐍𝐅𝐈𝐑𝐌𝐀𝐑 𝐏𝐄𝐃𝐈𝐃𝐎
Para confirmar el pedido se debe abonar el total por transferencia y enviar el comprobante.
  
Nombre de la cuenta: Agustina Sanchez
Alias: lastickeriacuruzu
CVU: 0000003100050750666317
  `;

  try {
    await navigator.clipboard.writeText(text);
    console.log("Texto copiado al portapapeles");
  } catch (error) {
    console.error("Error al copiar:", error);
  }

  return text; // también lo podés guardar en tu base de datos
};

export const copyOrderToClipboardCreated = async (message: string) => {
  try {
    await navigator.clipboard.writeText(message);
    toast("📝 Mensaje copiado");
  } catch (error) {
    console.error("Error al copiar:", error);
  } // también lo podés guardar en tu base de datos
};
