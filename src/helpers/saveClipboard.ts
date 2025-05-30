import { OrderItem } from "@/store/slices/orderSlice";

export const copyOrderToClipboard = async (
  client: string,
  items: OrderItem[],
  total_price: number
) => {
  const text = `
𝗣𝗘𝗗𝗜𝗗𝗢 𝗔 𝗖𝗢𝗡𝗙𝗜𝗥𝗠𝗔𝗥
  
NOMBRE: ${client}
  
PEDIDO:
${items.map((item) => `x${item.quantity} ${item.name}`).join("\n")}
  
TOTAL: $ ${total_price}
  
𝗖𝗢𝗡𝗙𝗜𝗥𝗠𝗔𝗥 𝗣𝗘𝗗𝗜𝗗𝗢
Para confirmar el pedido se debe paga por transferencia y enviar el comprobante.
  
Numbre de la cuenta: Agustina Sanchez
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
